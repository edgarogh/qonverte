import { Transform } from 'stream';

export const IDS = ['b64', 'base64'];

export function from() {
    let overflow = '';

    return new Transform({
        transform(chunk: Buffer, _, cb) {
            const chunkString = overflow + chunk.toString('utf8');

            const remaining = chunkString.length % 4;

            overflow = chunkString.slice(chunkString.length - remaining);
            const processable = chunkString.slice(0, chunkString.length - remaining);

            cb(null, Buffer.from(processable, 'base64'));
        },
        flush(cb) {
            if (overflow) {
                cb(null, Buffer.from(overflow, 'base64'));
            }
        },
    });
}

export function to() {
    let overflow: Buffer | null = null;

    return new Transform({
        transform(chunk: Buffer, _, cb) {
            if (overflow) {
                chunk = Buffer.concat([overflow, chunk]);
                overflow = null;
            }

            const remaining = chunk.length % 3;

            if (remaining !== 0) {
                overflow = chunk.slice(chunk.length - remaining);
                chunk = chunk.slice(0, chunk.length - remaining);
            }

            cb(null, Buffer.from(chunk.toString('base64'), 'utf8'));
        },
        flush(cb) {
            if (overflow) {
                cb(null, Buffer.from(overflow.toString('base64'), 'utf8'));
            }
        },
    });
}
