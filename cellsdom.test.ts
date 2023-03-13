import { cellState, Field } from './Field';
import { incrementNei } from './cellsdom';

const { empty, bomb } = cellState;

describe('Check increment', () => {
    describe('Simple case', () => {
        it('Field with only one item', () => {
            expect(incrementNei([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
        });
    });
    it('Field withg one bomb', () => {
        expect(incrementNei(
            [0, 0], 
            [[bomb, empty],
            [empty, empty]])
            ).toStrictEqual([
                [bomb, 1], 
                [1, 1]]);
    });
    it('Field withg two bomb', () => {
        expect(incrementNei(
            [0, 0], 
            [[bomb, empty],
            [empty, bomb]])
            ).toStrictEqual([
                [bomb, 1], 
                [1, bomb]]);
    })
});