import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_DjX7ZaLbQUvAneYUcJq6j8upL76nJFzn6j1gyGmihfQw9rcXCpAK4iPLqb2VnXfK';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`);
}
function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

export default { fetchBreeds, fetchCatByBreed };
