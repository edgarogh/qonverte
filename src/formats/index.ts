import FS from 'fs';
import Path from 'path';
import { Transform } from 'stream';

export interface Format {
    name: string;
    readonly IDS?: string[],
    from?(): Transform;
    to?(): Transform;
}

export const INPUT_FORMATS = new Map<string, Format>();
export const OUTPUT_FORMATS = new Map<string, Format>();

for (const fileName of FS.readdirSync(__dirname)) {
    if (fileName.startsWith('index')) continue;

    const { name } = Path.parse(fileName);
    const module: Format = require('./' + fileName);
    module.name = name;

    const names = module.IDS || [name];

    for (const name of names) {
        if (module.from) INPUT_FORMATS.set(name, module);
        if (module.to) OUTPUT_FORMATS.set(name, module);
    }
}
