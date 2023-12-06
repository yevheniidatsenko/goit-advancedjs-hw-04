import { servicePixabay } from './apiPixaBay';
import { createGalleryMarkup } from './createGalleryMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
const finishMessage = document.querySelector('.finish-text');

const perPage = 40;
let searchQuery = '';
let page = 1;
let totalPages = 1;

const lightboxOpts = {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};
const lightbox = new SimpleLightbox('.gallery .gallery__link', lightboxOpts);

const optionsObserver = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handlerLoadMore, optionsObserver);

form.addEventListener('submit', handlerSearchSubmit);

async function handlerSearchSubmit(evt) {
  evt.preventDefault();
  const newSearchQuery = evt.currentTarget.elements.searchQuery.value.trim();

  if (!newSearchQuery) {
    showWarningToast('Please enter a search query!');
    clearPage();
    return;
  }

  clearPage();
  page = 1;
  searchQuery = newSearchQuery;

  try {
    const { hits, totalHits } = await servicePixabay(
      searchQuery,
      page,
      perPage
    );
    totalPages = Math.ceil(totalHits / perPage);

    if (totalHits === 0) {
      showInfoToast(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearPage();
      return;
    } else {
      createGalleryMarkup(hits);
      showSuccessToast(`Hooray! We found ${totalHits} images.`);
      lightbox.refresh();

      if (page < totalPages) {
        observer.observe(guard);
      }
    }
  } catch (error) {
    handleRequestError(error);
  }

  toggleFinishMessageVisibility();
}

async function handlerLoadMore(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;

      try {
        const { hits } = await servicePixabay(searchQuery, page, perPage);
        createGalleryMarkup(hits);
        lightbox.refresh();

        scrollSmoothlyToNextImages();

        if (page >= totalPages) {
          observer.unobserve(guard);
          toggleFinishMessageVisibility();
        }
      } catch (error) {
        handleRequestError(error);
      }
    }
  });
}

function showWarningToast(message) {
  showToast('Caution', message, 'yellow');
}

function showInfoToast(message) {
  showToast('Info', message, 'yellow');
}

function showSuccessToast(message) {
  showToast('Success', message, 'green');
}

function handleRequestError(error) {
  console.error(error);
  showToast(
    'Error',
    'Oops! Something went wrong. Please try again later.',
    'red'
  );
}

function showToast(title, message, backgroundColor) {
  iziToast.show({
    title,
    message,
    messageColor: 'black',
    messageSize: '18px',
    backgroundColor,
    position: 'topRight',
    timeout: 2500,
  });
}

function toggleFinishMessageVisibility() {
  finishMessage.classList.toggle('is-hidden', page < totalPages);
}

function clearPage() {
  gallery.innerHTML = '';
}

function scrollSmoothlyToNextImages() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
