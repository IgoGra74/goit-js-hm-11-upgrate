import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { renderImage } from './js/render-functions.js';

const formSearch = document.querySelector('.form-inline');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

formSearch.addEventListener('submit', onFormSubmit);

const lightbox = new SimpleLightbox('.gallery a', {});

function onFormSubmit(event) {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Caution',
      titleColor: '#FFFFFF',
      message: 'Please enter text to search',
      position: 'topRight',
      messageColor: '#FFFFFF',
      backgroundColor: '#4169E1',
      iconUrl: null,
    });
    return;
  }
  galleryContainer.innerHTML = '';
  loader.style.display = 'block';

  getImagesByQuery(query)
    .then(function ({ hits, total }) {
      if (Array.isArray(hits) && hits.length > 0 && total > 0) {
        renderImage(hits);

        lightbox.refresh();
      } else {
        iziToast.warning({
          titleColor: '#FFFFFF',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
          messageSize: '16px',
          position: 'topRight',
          messageColor: '#FFFFFF',
          backgroundColor: '#EF4040',
          iconUrl: null,
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: 'An error occurred while fetching data. Please try again.',
        position: 'topRight',
        messageColor: '#FFFFFF',
        backgroundColor: '#FF6347',
        iconUrl: null,
      });
    })
    .finally(function () {
      event.target.reset();
      loader.style.display = 'none';
    });
}
