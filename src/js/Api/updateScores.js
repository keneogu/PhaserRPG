import 'regenerator-runtime/runtime';
import { URL, APIkey } from './constants.js';

const updateScores = async ({ user, score }) => {
  try {
    const res = await fetch(`${URL}/games/${APIkey}/scores`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user,
        score,
      }),
    });
    await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export default updateScores;