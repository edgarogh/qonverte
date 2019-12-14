import { INPUT_FORMATS, OUTPUT_FORMATS } from '../formats';

export default function showFormats() {
    const formats = new Map([...INPUT_FORMATS, ...OUTPUT_FORMATS]);

    const longestNameLength = Array.from(formats.values())
        .map((format) => format.name.length)
        .sort((a, b) => b - a)
        [0];

    console.log(`MODES ${'NAME'.padEnd(longestNameLength)} ID`);
    for (const [id, format] of formats) {
        const flags = `${format.from ? 'i' : ' '}${format.to ? 'o' : ' '}`;
        const name = format.name.padEnd(longestNameLength);
        console.error(`${flags}    ${name} ${id}`);
    }
}
