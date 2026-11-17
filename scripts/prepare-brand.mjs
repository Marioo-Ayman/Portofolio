// Reproducible pixel extraction; no generated or redrawn letter geometry.
// Usage: node scripts/prepare-brand.mjs <original-logo.jpeg>
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const source = process.argv[2];
if (!source) throw new Error('Supply the original MARIO JPEG path.');
const out = 'public/images/brand';
await mkdir(out, { recursive: true });
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const white = (x, y) => Math.max(0, Math.min(data[(y*w+x)*3+1], data[(y*w+x)*3+2]) - 24) * 255 / 231;
const boxes = [[343,192,636,439],[349,421,643,714],[343,731,644,1018],[444,995,529,1198],[347,1056,641,1337]];
const labels = new Int8Array(w*info.height).fill(-1);
// Flood the five disconnected white components, including antialiased edges.
for (let k=0; k<boxes.length; k++) {
  const [x0,y0,x1,y1]=boxes[k]; let seed=-1;
  for(let y=y0; y<y1 && seed<0; y++) for(let x=x0; x<x1; x++) if(white(x,y)>160) {seed=y*w+x;break;}
  const queue=[seed]; labels[seed]=k;
  for(let i=0;i<queue.length;i++) for(const n of [queue[i]-1,queue[i]+1,queue[i]-w,queue[i]+w]) {
    const x=n%w,y=Math.floor(n/w);
    if(x<300||x>=690||y<160||y>=1370||labels[n]>=0||white(x,y)<14) continue;
    labels[n]=k;queue.push(n);
  }
}
// Retain detached brush flecks, assigning them to their nearest component.
for(let y=160;y<1370;y++)for(let x=300;x<690;x++)if(white(x,y)>0&&labels[y*w+x]<0){
  let best=Infinity,label=0;
  boxes.forEach(([x0,y0,x1,y1],k)=>{const d=Math.max(x0-x,0,x-x1)**2+Math.max(y0-y,0,y-y1)**2;if(d<best){best=d;label=k;}});
  labels[y*w+x]=label;
}
async function exportPixels(name, box, pixel) {
  const [x0,y0,width,height]=box, rgba=Buffer.alloc(width*height*4);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const xx=x+x0,yy=y+y0,p=(yy*w+xx)*3;
    rgba.set(pixel(xx,yy,[data[p],data[p+1],data[p+2]]).map(v=>Math.round(Math.min(255,Math.max(0,v)))),(y*width+x)*4);
  }
  await sharp(rgba,{raw:{width,height,channels:4}}).png({compressionLevel:9}).toFile(`${out}/${name}.png`);
}
const vertical=[300,160,390,1210],compact=[845,115,610,1295];
const unmatte=(_x,_y,c)=>{const peak=Math.max(...c);if(peak<14)return [0,0,0,0];return [...c.map(v=>v*255/peak),peak];};
await exportPixels('vertical',vertical,unmatte);
await exportPixels('compact',compact,unmatte);
for(const [k,name] of ['m','a','r','i','o'].entries()) await exportPixels(name,vertical,(x,y)=>[255,255,255,labels[y*w+x]===k?white(x,y):0]);
await exportPixels('seal',vertical,(x,y,c)=>{
  // White occludes the stamp. Fill only those concealed pixels; visible ink stays sampled.
  return unmatte(x,y,white(x,y)>0?[164,5,5]:c);
});
await exportPixels('circle',[845,820,610,590],(x,y,c)=>{
  const a=white(x,y)/255;
  const inside=((x-1150)/289)**2+((y-1117)/283)**2<1;
  // No source exists behind the overlapping R: only concealed disk pixels are filled.
  if(a>.03&&!inside)return [0,0,0,0];
  return unmatte(x,y,a>0?[183,1,0]:c);
});
await writeFile(`${out}/geometry.json`,JSON.stringify({sourceSize:[w,info.height],verticalCrop:vertical,compactCrop:compact,letterBounds:boxes.map(b=>[b[0]-300,b[1]-160,b[2]-b[0],b[3]-b[1]]),ioCenter:[194,1035]},null,2)+'\n');
console.log('Exported nine transparent source-pixel assets.');
