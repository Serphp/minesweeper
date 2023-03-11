export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coords = [number, number];

export const cellState: Record<string, Cell> = {
    empty: 0,
    bomb: 9,
    hidden: 10,
    mark: 11,
    weakmark: 12,
};

export const empyFieldGenerator = (
size: number, 
state: Cell = cellState.empty
): Field => new Array(size).fill(state).map(() => new Array(size).fill(state));

export const fieldGenerator = (size: number, dencity: number): Field => {
    if (dencity < 0 || dencity > 1) {
        throw new Error('Probabilitty of bomb should be in range [0, 1]');
    }
    let unfreeCells = size * size;
    let cellWithBomb = unfreeCells * dencity;
    const result = empyFieldGenerator(size);

for (let i = 0; i < size; i++) {
    for (let j = 0; j< size; j++) {
        if (cellWithBomb === 0) {
            return result;
        }
        if ( cellWithBomb / unfreeCells > 0) {
            result[i][j] = cellState.bomb;
            cellWithBomb--;
        }
        unfreeCells--;
    }
}

return result;

};

