import getScores from '../src/js/Api/getScore.js';

require('jest-fetch-mock').enableMocks();

describe('testing getScores api endpoint', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns the users name and score as an array of object', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        result: [
          {
            name: 'Alien',
            score: 40,
          },
        ],
      }),
    );
    const res = await getScores();
    expect(res[0].name).toBe('Alien');
    expect(res[0].score).toBe(40);
    expect(res).toBeInstanceOf(Array);
    expect(res).not.toContain({ name: 'XYZ', score: 0 });
  });

  it('should check users are NOT present at the beginning', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        result: [],
      }),
    );
    const res = await getScores();
    expect(res).toHaveLength(0);
  });
});