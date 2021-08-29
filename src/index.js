import './sass/main.scss';

import PicturesApiService from './js/apiService';

import cardTpl from './partials/card.hbs';

import debounce from 'lodash.debounce';
import { async } from 'q';

const refs = {
  input: document.querySelector('.search-form'),
  list: document.querySelector('.gallery'),
  button: document.querySelector('.button'),
};

const picturesApiService = new PicturesApiService();

refs.input.addEventListener('submit', onInput);
refs.button.addEventListener('click', debounce(loadMore, 500));

function onInput(e) {
  e.preventDefault();

  clearPicturesList();

  picturesApiService.value = e.currentTarget.elements.query.value;
  picturesApiService.resetPage();
  picturesApiService.fetchPicture().then(renderPicturesList);
}

async function loadMore() {
  await picturesApiService.fetchPicture().then(renderPicturesList);

  refs.list.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function renderPicturesList(hits) {
  refs.list.insertAdjacentHTML('beforeend', cardTpl(hits));
  refs.button.classList.remove('is-hidden');
}

function clearPicturesList() {
  refs.list.innerHTML = '';
}

