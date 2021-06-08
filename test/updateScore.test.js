import updateScores from '../js/Api/updateScore.js';

require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

it('Send the score using the API', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
  const onResponse = jest.fn();
  const onError = jest.fn();
  return updateScores({ user: 'Alien', score: 60 })
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
    });
});