import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38057284-2d27e05e6e0b6b5960c0abd06';

async function getResponse(searchQuery, per_page, page) {
  const param = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page,
    page,
  });
  try {
    const response = await axios.get(`${BASE_URL}?&${param}`);
    return response.data;
  } catch (error) {
    onFetchError('getResponse error');
  }
}

export default { getResponse };
