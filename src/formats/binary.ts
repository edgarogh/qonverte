import { PassThrough } from 'stream';

export const IDS = ['bin', 'binary'];

export function from() {
    return new PassThrough();
}

export function to() {
    return new PassThrough();
}
