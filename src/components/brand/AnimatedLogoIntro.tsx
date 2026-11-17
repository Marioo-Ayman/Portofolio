// Painted silhouettes come from the supplied JPEG. Paths only reveal pixels.
const strokes = [
  ["M", ["M 36 87 L 342 55", "M 100 70 L 85 270", "M 207 65 L 197 235", "M 295 60 L 295 270"]],
  ["A", ["M 211 270 Q 180 425 72 535", "M 205 365 Q 250 460 330 535"]],
  ["R", ["M 45 611 L 341 611 L 335 706 L 84 694", "M 95 625 L 84 840", "M 162 705 Q 200 794 345 823"]],
  ["I", ["M 185 837 L 184 1043"]],
  ["O", ["M 127 930 C -25 1008 78 1193 225 1132 C 381 1079 304 962 245 938"]],
] as const;

export function AnimatedLogoIntro() {
  return <><div className="awakening-art-half awakening-art-upper" aria-hidden="true"><svg className="awakening-art" viewBox="-555 -200 1500 1600">
    <defs>
      {strokes.map(([name, paths]) => <mask id={`ink-${name}`} key={name} maskUnits="userSpaceOnUse" x="-20" y="-20" width="440" height="1260">
        {paths.map((path,i)=><path key={i} data-brush={name} d={path} fill="none" stroke="white" strokeWidth={name === "O" ? 116 : 142} strokeLinecap="butt" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />)}
        <rect data-ink-complete={name} width="390" height="1210" fill="white" opacity="0" />
      </mask>)}
      <mask id="ink-seal" maskUnits="userSpaceOnUse" x="0" y="0" width="390" height="1210">
        <path data-seal-brush d="M -15 1260 L 405 1260 L 405 1240 L 335 1216 L 277 1245 L 217 1227 L 150 1250 L 82 1221 L -15 1235 Z" fill="white" />
      </mask>
      <radialGradient id="crimson-halo"><stop stopColor="#e00028" stopOpacity=".42"/><stop offset=".5" stopColor="#9b001a" stopOpacity=".12"/><stop offset="1" stopColor="#9b001a" stopOpacity="0"/></radialGradient>
    </defs>
    <g data-camera id="awakening-world">
      <circle data-halo cx="194" cy="1035" r="510" fill="url(#crimson-halo)" opacity="0" />
      <g data-seal><image href="/images/brand/seal.png" width="390" height="1210" mask="url(#ink-seal)" /></g>
      <image data-circle href="/images/brand/circle.png" x="-111" y="740" width="610" height="590" opacity="0" />
      {["M","A","R"].map(name => <g key={name} data-letter={name}>
        <image href={`/images/brand/${name.toLowerCase()}.png`} width="390" height="1210" mask={`url(#ink-${name})`} />
      </g>)}
      <g data-power>
        {["I","O"].map(name => <image key={name} data-letter={name} href={`/images/brand/${name.toLowerCase()}.png`} width="390" height="1210" mask={`url(#ink-${name})`} />)}
      </g>
      <circle data-wave cx="194" cy="1035" r="172" fill="none" stroke="#8474ee" strokeWidth="2" opacity="0" />
      <circle data-refraction cx="194" cy="1035" r="174" fill="none" stroke="#d5ccff" strokeWidth="18" opacity="0" />
      {[0,1,2].map(i=><path key={i} data-energy d={`M ${i===1?390:-70} ${100+i*270} Q ${i===1?760:-390} 700 194 1035`} fill="none" stroke={i===1?"#7160bf":"#b6102c"} strokeWidth={i===1?2:4} pathLength="1" strokeDasharray="1" strokeDashoffset="1" opacity="0" />)}
      {Array.from({length:21},(_,i)=><path key={i} data-fragment d={`M ${165+(i%7)*10} ${1010+Math.floor(i/7)*15} l ${5+i%4} -5 l -2 10 Z`} fill={i%3===0?"#b30020":"#fff4f0"} opacity="0" />)}
      {Array.from({length:12},(_,i)=><circle key={i} data-spark cx="194" cy="1035" r={i%3+1.5} fill="#d91737" opacity="0" />)}
      {Array.from({length:15},(_,i)=><path key={i} data-ink-dust d={`M ${65+(i%3)*100} ${90+Math.floor(i/3)*220} l 5 -9 l -2 12 Z`} fill="#fff4f0" opacity="0" />)}
    </g>
  </svg></div><div className="awakening-art-half awakening-art-lower" aria-hidden="true">
    <svg className="awakening-art" viewBox="-555 -200 1500 1600"><use href="#awakening-world" /></svg>
  </div></>;
}
