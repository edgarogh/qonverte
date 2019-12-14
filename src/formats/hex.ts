import { Transform } from 'stream';

export const IDS = ['hex', 'hexadecimal'];

export function from() {
    let lastChar = '';

    return new Transform({
        transform(chunk: Buffer, _, cb) {
            const chunkAsString = lastChar + chunk.toString('utf8');
            const even = chunkAsString.length % 2 == 0;
            const processable = (even)
                ? chunkAsString
                : chunkAsString.slice(0, chunkAsString.length - 1);

            lastChar = (!even)
                ? chunkAsString[chunkAsString.length - 1]
                : '';

            cb(null, Buffer.from(processable, 'hex'));
        },
        final() {
            if (lastChar) throw Error('Hex decoding failed: stream ended with an odd hex digit count');
        },
    });
}

export function to() {
    return new Transform({
        transform(chunk: Buffer, _, cb) {
            cb(null, Buffer.from(Buffer.from(chunk).toString('hex'), 'utf8'));
        },
    });
}
