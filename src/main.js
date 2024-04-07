// main.js


import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderImg, toggleLoader, spanElementRem } from './js/render-functions.js';

const searchInput = document.querySelector('.searchInput');
const searchButton = document.querySelector('.searchButton');
const searchForm = document.querySelector('.formForInput');
const photoGallery = document.querySelector('.photoGallery');
const loaderContainer = document.querySelector('.loaderContainer');
const loadMoreButton = document.querySelector('.loadMoreButton');

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  photoGallery.innerHTML = '';
  toggleLoader(loaderContainer);
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  await fetchAndRenderImages(currentQuery, currentPage);
});

loadMoreButton.addEventListener('click', async () => {
  toggleLoader(loaderContainer);
  currentPage++;
  await fetchAndRenderImages(currentQuery, currentPage);
});

async function fetchAndRenderImages(query, page) {
  try {
    const images = await fetchImages(query, page);
    renderImg(images, photoGallery, lightbox);
    toggleLoader(loaderContainer);
    if (images.length < 15) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topCenter',
      });
    } else {
      loadMoreButton.style.display = 'block';
    }
    smoothScroll();
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topCenter',
    });
    toggleLoader(loaderContainer);
  }
}

function smoothScroll() {
  const cardHeight = document.querySelector('.blockForAllElements').offsetHeight;
  window.scrollBy({
    top: cardHeight * 2,
    left: 0,
    behavior: 'smooth'
  });
}




// import iziToast from 'izitoast';
// import "izitoast/dist/css/iziToast.min.css";


// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { fetchImages } from './js/pixabay-api.js';
// import { renderImg, toggleLoader, spanElementRem } from './js/render-functions.js';

// const searchInput = document.querySelector('.searchInput');    
// const searchButton = document.querySelector('.searchButton');
// const searchForm = document.querySelector('.formForInput') 
// const photoGallery = document.querySelector('.photoGallery');
// const loaderContainer = document.querySelector('.loaderContainer');

// const lightbox = new SimpleLightbox('.gallery a', {   
//   captionDelay: 250,
//   captionsData: 'alt',
// });

// searchForm.addEventListener('submit', event => {   
//   event.preventDefault();
//   photoGallery.innerHTML = '';
//   toggleLoader(loaderContainer);
//   const query = searchInput.value.trim();
//   if (!query) {
//     iziToast.show({
//       color: 'red',
//       message: `Sorry, the input field must be filled in to start the photo search.`,
//       position: 'topCenter',
//     });
//   } else {
//     fetchImages(query)
//       .then(images => {
//         if (images.length === 0) {
//           iziToast.show({
//             color: 'red',
//             message: `Sorry, there are no images matching your search query. Please try again!`,
//             position: 'topCenter',
//           });
//         } else {
//           renderImg(images, photoGallery, lightbox);
//         }
//       })
//       .catch(error => {
//         console.error(error);
//       })
//       .finally(() => spanElementRem());
//   }
// });
