import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //fetch recipe based on id
    const data = await res.json(); //format result using JSON function

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); //throw error message if no result found
    return data;
  } catch (err) {
    throw err;
  }
};
