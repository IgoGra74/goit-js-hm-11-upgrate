import axios from 'axios';

export function getImagesByQuery(query) {
  axios.defaults.baseURL = 'https://pixabay.com';
  const searchParams = new URLSearchParams({
    key: '42099926-52a1046a87902a6e56a7e135a',
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  console.log(searchParams);
  axios
    .get(`/api?${searchParams}`)
    .then(res => {
      return res.json();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: 'An error occurred while fetching data. Please try again.',
        position: 'topRight',
        messageColor: '#FFFFFF',
        backgroundColor: '#FF6347',
        iconUrl: null,
      });
      console.error('Error fetching data:', error);
      throw error;
    });
}
