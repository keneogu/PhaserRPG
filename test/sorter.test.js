import sorter from '../src/js/Helper/sorter.js';

const data = [
  {
    user: 'Player 1',
    score: 10,
  },
  {
    user: 'Player 2',
    score: 20,
  },
];

it('sorts the according to scores in descending order ', () => {
  const sorted = sorter(data);
  expect(sorted[0].user).toEqual('Player 2');
  expect(sorted[0].score).toEqual(20);
});