import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderImg, toggleLoader, spanElementRem } from './js/render-functions.js';

const searchInput = document.querySelector('.searchInput');    
// const searchButton = document.querySelector('.searchButton');
const searchForm = document.querySelector('.formForInput') 
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
  currentPage = 1;
  toggleLoader(loaderContainer);
  const query = searchInput.value.trim();
  currentQuery = query;
  if (!query) {
    iziToast.show({
      color: 'red',
      message: `Sorry, the input field must be filled in to start the photo search.`,
      position: 'topCenter',
    });
  } else {
    try {
        const images = await fetchImages(currentQuery, currentPage);
        renderImg(images, photoGallery, lightbox);
      } catch(error) {
        console.error(error);
      }
      finally {
        spanElementRem();
  }
}
});

const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load more';
loadMoreButton.classList.add('loadMoreButton');
photoGallery.insertAdjacentElement('afterend', loadMoreButton);
loadMoreButton.style.display = 'none';


loadMoreButton.addEventListener('click', async () => {
  currentPage++;    
 try {
        const images = await fetchImages(currentQuery, currentPage);
        renderImg(images, photoGallery, lightbox);
        if (images.length === 0) {
            loadMoreButton.style.display = 'none';
            iziToast.show({
                color: 'orange',
                message: `We're sorry, but you've reached the end of search results.`,
                position: 'topCenter',
            });
        }
    } catch (error)  {
        console.error(error);
    } finally {
        spanElementRem();
    }
    });

    // async function fetchImages(query, page) {
    //     const apiKey = '43209310-410b7696cb7855cc5c49690e8';
    //     const perPage = 15;
    //     const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=${perPage}`;
    //     try {
    //         const response = await axios.get(url);
    //         return response.data.hits;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // function smoothScroll() {
    //     const galleryHeight = photoGallery.getBoundingClientRect().top;
    //     window.scrollBy({
    //         top: galleryHeight,
    //         behavior: 'smooth',
    //     });
    // }