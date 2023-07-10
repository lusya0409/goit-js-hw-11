import './styles.css';
import API from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const target = document.querySelector('.js-guard');
const form = document.querySelector('#search-form');
const divGallery = document.querySelector('.gallery');
const btnLoader = document.querySelector('.load-more');
let currentPage = 1;
const PER_PAGE = 40;
const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
let options = {
  root: null,
  rootMargin: '300px',
};
let observer = new IntersectionObserver(onLoad, options);

closeLoader();

form.addEventListener('submit', onSubmit);
btnLoader.addEventListener('click', loadNextPage);
form.autoload.addEventListener('change', autoloadChange);

function autoloadChange(e) {
  if (e.target.checked) {
    observer.observe(target);
    closeLoader();
  } else {
    observer.unobserve(target);
    openLoader();
  }
}

function onSubmit(evt) {
  evt.preventDefault();

  divGallery.innerHTML = '';
  currentPage = 1;
  loadNextPage();
}

async function loadNextPage() {
  const data = await API.getResponse(
    form.searchQuery.value,
    PER_PAGE,
    currentPage
  );
  renderGalleryCard(data.hits, data.totalHits);
  console.log(data);
}

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadNextPage();
    }
  });
}
function openLoader() {
  btnLoader.classList.remove('is-hidden');
}
function closeLoader() {
  btnLoader.classList.add('is-hidden');
}

function renderGalleryCard(hits, totalHits) {
  closeLoader();
  if (!hits || !hits.length) {
    return onFetchError();
  }

  if (currentPage === 1) {
    successSearch(totalHits);
    divGallery.innerHTML = createMarkupCard(hits);
    // console.dir(form.autoload);
    if (form.autoload.checked) observer.observe(target);
  } else {
    divGallery.insertAdjacentHTML('beforeEnd', createMarkupCard(hits));
    smoothScrollGallery(hits[0].id);
  }
  lightbox.refresh();

  if (totalHits > PER_PAGE * currentPage) {
    currentPage += 1;
    if (!form.autoload.checked) openLoader();
  } else {
    observer.unobserve(target);
    endSearch();
  }
}
function createMarkupCard(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        id,
      }) => `<div class="photo-card">
              <a id="card-${id}" href="${largeImageURL}" class="gallery-link">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes </b>${likes}
                  </p>
                  <p class="info-item">
                    <b>Views </b>${views}
                  </p>
                  <p class="info-item">
                    <b>Comments </b>${comments}
                  </p>
                  <p class="info-item">
                  <b>Downloads </b>${downloads}
                  </p>
                </div>
              </a>
            </div>`
    )
    .join('');
}
function successSearch(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    timeout: 5000,
  });
}
function onFetchError(error) {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 2000,
    }
  );
  console.log(error);
}
function endSearch() {
  Notify.warning("We're sorry, but you've reached the end of search results.", {
    timeout: 10000,
    position: 'center-bottom',
  });
}
function smoothScrollGallery(id) {
  const { top } = document
    .querySelector(`#card-${id}`)
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: top - 74,
    behavior: 'smooth',
  });
}
