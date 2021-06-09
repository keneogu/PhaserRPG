import { URL, APIkey } from './constants.js';
import sorter from '../Helper/sorter.js';
import 'regenerator-runtime/runtime';

const getScores = async () => {
  try {
    const res = await fetch(`${URL}/games/${APIkey}/scores`, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
    const { result } = await res.json();
    const sortedResult = sorter(result);

    return sortedResult.slice(0, 10);
  } catch (error) {
    throw new Error(error);
  }
};

export default getScores;