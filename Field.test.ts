import { empyFieldGenerator, cellState, fieldGenerator, Cell } from "./Field";

const { empty, bomb, hidden } = cellState;

const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe('Field Generator', () => {
    describe('sempyFieldGenerator test', () => {
        it('2x2', () => {
            expect(empyFieldGenerator(2)).toStrictEqual([
            [empty, empty],
            [empty, empty],
            ]); 
        });
    });
    it('3x3', () => {
        expect(empyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
        ]); 
    });
    it('4x4 with hidden state', () => {
        expect(empyFieldGenerator(4)).toStrictEqual([
        [empty, empty, empty, empty],
        [empty, empty, empty, empty],
        [empty, empty, empty, empty],
        [empty, empty, empty, empty],
        ]); 
    });
    describe('Simple case', () => {
        it('Wrong density', () => {
            const errorText = 'Probabilitty of bomb should be in range [0, 1]';
            expect(() => fieldGenerator(1, -1)).toThrow(errorText);
            
            expect(() => fieldGenerator(1, 2)).toThrow(errorText);
        });
        it('Smallest possible field without mines', () => {
            expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
        });
        it('Big field without mines', () => {
            expect(fieldGenerator(10, 0)).toStrictEqual([
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],            
            [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],         
            ]);   
            });
        it('Smallest possible field with mines', () => {
            expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
        });
        it('2x2 field with mines', () => {
            expect(fieldGenerator(2, 1)).toStrictEqual([
                [bomb, bomb],
                [bomb, bomb],
        ]);
    });
        it('2x2 fiel with 50% probability', () => {
            const fiel = fieldGenerator(2, 0.5);
            const flatfield = fiel.flat();

            console.table(fiel);
            console.table(flatfield);

            const cellWithBomb = flatfield.filter((cell) => cell === bomb);
            const emptycell = flatfield.filter((cell) => cell === 2);

            expect(cellWithBomb).toHaveLength(2);
            expect(emptycell).toHaveLength(2);
        });
        it('Example of game = 10x10 with 1/4 mined cells (-25 mines)', () => {
        const size = 10;
        const mines = 25;

        const probability = mines / (size * size);
        const field = fieldGenerator(size, probability);

        console.table(field);
        const flatfield = field.flat();
        expect(flatfield.filter(cellWithBombFilter)).toHaveLength(mines);
        });
    });
    // END
});
