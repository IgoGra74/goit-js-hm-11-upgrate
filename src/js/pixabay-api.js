import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function getImagesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: '42099926-52a1046a87902a6e56a7e135a',
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios
    .get(`https://pixabay.com//api?${searchParams}`)
    .then(res => res.data)
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
