// import './styles.css';
import API from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const select = document.querySelector('.breed-select');
// const divCat = document.querySelector('.cat-info');

// select.addEventListener('change', onSelect);

// function onSelect(evt) {
//   openLoader();
//   const catId = evt.target.value;
//   renderCatCard(catId);
// }
// API.fetchBreeds().then(renderSelectData).catch(onFetchError);

// function openLoader() {
//   document.querySelector('.loader-container').style.display = 'flex';
// }
// function closeLoader() {
//   document.querySelector('.loader-container').style.display = 'none';
// }

// function renderSelectData(resp) {
//   select.innerHTML = createMarkupForSelect(resp.data);
//   closeLoader();

//   // renderCatCard(resp.data[0].id);
//   console.log(resp.data);
// }

// function createMarkupForSelect(arr) {
//   return arr
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join('');
// }
// function renderCatCard(id) {
//   API.fetchCatByBreed(id)
//     .then(resp => {
//       divCat.innerHTML = createMarkupCatCard(resp.data);
//       closeLoader();
//     })
//     .catch(onFetchError);
// }

// function createMarkupCatCard(arr) {
//   const cat = arr[0].breeds[0];
//   return `<img src="${arr[0].url}" alt="${cat.name}" width="300" height="auto" />
//   <div class="info-container">
//        <h2>${cat.name}</h2>
//       <p>${cat.description}</p>
//       <p><b>Temperament: </b>${cat.temperament}</p>
//   </div>`;
// }

// function onFetchError(error) {
//   const errorEl = document.querySelector('.error');
//   Notify.failure(errorEl.textContent, {
//     timeout: 1000,
//   });
//   console.log(error);
// }
