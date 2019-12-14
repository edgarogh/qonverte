import { INPUT_FORMATS, OUTPUT_FORMATS } from '../formats';

export default function parseArgs(args: string[]) {
    const [arg0, arg1, arg2] = args;

    if (args.length === 0) {
        throw new Error(`Too few arguments`);
    }

    if (args.length === 1) {
        if (INPUT_FORMATS.has(arg0)) {
            return {
                input: INPUT_FORMATS.get(arg0).from,
                output: OUTPUT_FORMATS.get('binary').to,
            };
        } else {
            throw new Error(`Unknown input format: ${arg0}`);
        }
    }

    if (args.length === 2) {
        if (arg0 === 'to') {
            if (OUTPUT_FORMATS.has(arg1)) {
                return {
                    input: INPUT_FORMATS.get('binary').from,
                    output: OUTPUT_FORMATS.get(arg1).to,
                };
            } else {
                throw new Error(`Unknown output format: ${arg1}`);
            }
        } else {
            throw new Error(`First argument must be 'to'`);
        }
    }

    if (args.length === 3) {
        if (arg1 === 'to') {
            if (INPUT_FORMATS.has(arg0)) {
                if (OUTPUT_FORMATS.has(arg2)) {
                    return {
                        input: INPUT_FORMATS.get(arg0).from,
                        output: OUTPUT_FORMATS.get(arg2).to,
                    };
                } else {
                    throw new Error(`Unknown output format: ${arg0}`);
                }
            } else {
                throw new Error(`Unknown input format: ${arg0}`);
            }
        } else {
            throw new Error(`Middle argument should be 'to'`)
        }
    }

    throw new Error(`Too much arguments given`);
}
