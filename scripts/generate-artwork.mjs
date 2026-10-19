import { mkdir, readFile, writeFile } from 'node:fs/promises'

await mkdir('public/work', { recursive: true })
const styles = `<style>:root{--navy:#0a2342;--slate:#1c354b;--grey:#73858c;--white:#f5f7f8;--line:#9eb3c1;--light:#d9e4eb;--sand:#c7ac91;--clay:#a9876d;--rock:#775d4a;--earth:#8eaba0;--field:#607e73}text{font-family:Arial,sans-serif} .navy{fill:var(--navy)}.light{fill:var(--light)}.white{fill:var(--white)}.stroke{stroke:var(--line);fill:none}</style>`
const svg = (title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 840" role="img"><title>${title}</title>${styles}${body}</svg>`
const grids = Array.from(
  { length: 15 },
  (_, i) =>
    `<path d="M${i * 90} 0V840M0 ${i * 90}H1200" stroke="var(--line)" stroke-width="1" opacity=".18"/>`,
).join('')

await writeFile(
  'public/work/planora.svg',
  svg(
    'Planora — conceptual workflow illustration',
    `
<rect width="1200" height="840" fill="var(--slate)"/>${grids}
<circle cx="830" cy="315" r="280" class="stroke"/><circle cx="830" cy="315" r="210" class="stroke" opacity=".4"/>
<text x="74" y="100" fill="var(--light)" font-size="24" letter-spacing="5">PLANORA / ENGINEERED COLLABORATION</text>
<path d="M150 390H330V300H540V420H770V330H1050" stroke="var(--light)" stroke-width="3" fill="none"/>
<g transform="translate(100 260)"><rect width="250" height="180" rx="8" fill="var(--navy)" stroke="var(--line)"/><text x="30" y="53" fill="var(--line)" font-size="22">01 / SCRUM</text><text x="30" y="121" class="white" font-size="47">Plan.</text></g>
<g transform="translate(475 350)"><rect width="250" height="180" rx="8" fill="var(--light)"/><text x="30" y="53" class="navy" font-size="22">02 / KANBAN</text><text x="30" y="121" class="navy" font-size="47">Build.</text></g>
<g transform="translate(850 240)"><rect width="250" height="180" rx="8" fill="var(--navy)" stroke="var(--line)"/><text x="30" y="53" fill="var(--line)" font-size="22">03 / QUALITY</text><text x="30" y="121" class="white" font-size="47">Review.</text></g>
<text x="74" y="710" class="white" font-size="85" letter-spacing="-4">Progress, connected.</text><path d="M77 750H1120" class="stroke"/>
`,
  ),
)

const contours = Array.from(
  { length: 9 },
  (_, i) =>
    `<ellipse cx="880" cy="180" rx="${120 + i * 45}" ry="${80 + i * 28}" class="stroke" transform="rotate(-24 880 180)"/>`,
).join('')
await writeFile(
  'public/work/caeloterra.svg',
  svg(
    'CaeloTerra — Earth observation and farm planning illustration',
    `
<rect width="1200" height="840" fill="var(--navy)"/>${contours}
<path d="M-40 475L430 230 900 580 510 950Z" fill="var(--earth)"/>
<path d="M55 440L438 310 620 447 247 580Z" fill="var(--field)"/><path d="M270 600L655 471 841 610 461 750Z" fill="var(--slate)"/>
${Array.from({ length: 10 }, (_, i) => `<path d="M${50 + i * 34} ${449 - i * 11}l175 129" stroke="var(--light)" stroke-width="2" opacity=".45"/>`).join('')}
${Array.from({ length: 10 }, (_, i) => `<path d="M${276 + i * 34} ${609 - i * 11}l175 129" stroke="var(--line)" stroke-width="2"/>`).join('')}
<path d="M782 350V525H966" class="stroke" stroke-dasharray="7 8" stroke-width="2"/><circle cx="782" cy="350" r="9" class="white"/><circle cx="966" cy="525" r="9" fill="var(--earth)"/>
<text x="74" y="99" class="light" font-size="24" letter-spacing="4">CAELOTERRA / CLIMATE + CONTEXT</text><text x="735" y="681" class="white" font-size="58" letter-spacing="-2">Rooted in data.</text><text x="745" y="730" class="light" font-size="23">EARTH OBSERVATIONS → FARM DECISIONS</text>
`,
  ),
)

await writeFile(
  'public/work/unseen-jo.svg',
  svg(
    'Unseen Jo — illustrative Jordan-inspired sandstone landscape',
    `
<rect width="1200" height="840" fill="var(--light)"/><circle cx="855" cy="200" r="88" fill="var(--white)"/>
<path d="M0 410L120 345 193 420 303 256 388 348 485 220 561 324 670 254 735 349 833 265 972 410 1080 337 1200 412V840H0Z" fill="var(--sand)"/>
<path d="M0 215L100 240 165 330 215 321 296 520 374 587 485 840H0Z" fill="var(--clay)"/>
<path d="M1200 132L1116 186 1077 270 985 306 948 432 891 471 794 840H1200Z" fill="var(--rock)"/>
<path d="M0 410L100 432 151 512 215 549 279 678 341 840H0Z" fill="var(--rock)"/><path d="M1200 385L1092 462 1051 560 1000 620 971 750 904 840H1200Z" fill="var(--clay)"/>
<path d="M420 840C390 720 590 633 585 548C690 679 548 762 629 840" fill="var(--white)" opacity=".65"/>
<g fill="none" stroke="var(--sand)" stroke-width="3" opacity=".5"><path d="M1160 253l-63 55-19 99-61 53-24 104"/><path d="M1149 416l-57 60-19 90-40 63"/><path d="M110 402l37 60 61 37 23 76"/></g>
<text x="76" y="107" class="navy" font-size="26" letter-spacing="4">UNSEEN JO / A DIFFERENT WAY TO DISCOVER</text>
<rect x="63" y="637" width="655" height="153" rx="3" fill="var(--navy)"/><text x="95" y="710" class="white" font-size="66" letter-spacing="-3">Discover Jordan.</text><text x="99" y="756" class="light" font-size="25">THROUGH YOUR OWN PERSPECTIVE.</text>
`,
  ),
)

await writeFile(
  'public/work/moodle.svg',
  svg(
    'Moodle — structured Excel administration illustration',
    `
<rect width="1200" height="840" fill="var(--light)"/>${grids}
<circle cx="875" cy="360" r="230" fill="var(--white)"/>
<g transform="translate(130 180) rotate(-9 160 180)"><rect width="325" height="385" rx="8" fill="var(--white)" stroke="var(--grey)"/><path d="M55 100H270M55 160H270M55 220H270M55 280H270M55 340H270M120 100V340M205 100V340" stroke="var(--grey)"/><text x="52" y="65" class="navy" font-size="28">EXCEL / INPUT</text></g>
<path d="M465 370H730" fill="none" stroke="var(--navy)" stroke-width="3"/><path d="M710 348l23 22-23 22" fill="none" stroke="var(--navy)" stroke-width="3"/>
<g transform="translate(785 228)"><rect width="230" height="300" rx="7" fill="var(--navy)"/><ellipse cx="115" cy="55" rx="64" ry="22" stroke="var(--light)" fill="var(--slate)" stroke-width="2"/><path d="M51 55V171c0 30 128 30 128 0V55M51 115c0 30 128 30 128 0" stroke="var(--light)" fill="none" stroke-width="2"/><text x="43" y="249" class="white" font-size="28">MOODLE</text></g>
<text x="77" y="106" class="navy" font-size="24" letter-spacing="4">EXCEL → PHPSPREADSHEET → MOODLE</text><text x="77" y="723" class="navy" font-size="79" letter-spacing="-4">Structure over repetition.</text>
`,
  ),
)

const brandingImage = `<image x="970" y="58" width="150" height="85.84" href="data:image/png;base64,${(await readFile('public/branding/ra-logo-light.png')).toString('base64')}"/>`

await writeFile(
  'public/social-preview.svg',
  svg(
    'Ramez Ahmad — Full-Stack Developer and Software Engineer',
    `<rect width="1200" height="840" fill="var(--navy)"/><text x="80" y="180" class="light" font-size="28" letter-spacing="4">RAMEZ AHMAD ALMAAYE'H</text><text x="80" y="330" class="white" font-size="78" letter-spacing="-4">Engineering</text><text x="80" y="440" class="white" font-size="78" letter-spacing="-4">Thoughtful Digital</text><text x="80" y="550" class="light" font-size="78" letter-spacing="-4">Experiences.</text><path d="M80 650H1120" class="stroke"/><text x="80" y="723" class="light" font-size="29">FULL-STACK DEVELOPER / SOFTWARE ENGINEER / JORDAN</text>${brandingImage}`,
  ),
)
console.log('Generated four original editorial project illustrations and a social preview.')
