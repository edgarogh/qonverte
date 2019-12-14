import omelette, { Callback } from 'omelette';
import { INPUT_FORMATS, OUTPUT_FORMATS } from '../formats';

const arg0 = [
    ...INPUT_FORMATS.keys(),
    ...OUTPUT_FORMATS.keys(),
    'to',
];

const arg1: Callback = ({ before, reply }) => {
    if (before === 'to') reply([...OUTPUT_FORMATS.keys()]);
    else reply(['to']);
};

const arg3 = [...OUTPUT_FORMATS.keys()];

export default omelette`qonverte ${arg0} ${arg1} ${arg3}`;
