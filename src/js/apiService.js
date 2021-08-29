export default class PicturesApiService {
  constructor() {
    this.inputValue = '';
    this.pageNum = 1;
  }

  fetchPicture() {
    const key = '23129737-24f03c8dbe97b8724820f585e';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.pageNum}&per_page=12&key=${key}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.pageNum += 1;

        return data.hits;
      });
  }

  resetPage() {
    this.pageNum = 1;
  }

  get value() {
    return this.inputValue;
  }

  set value(newValue) {
    this.inputValue = newValue;
  }
}
