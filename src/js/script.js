class BooksList {
  constructor(data) {
    this.data = data;

    this.initData();
    this.getElements();
    this.displayBooks();
    this.initActions();
    this.applyFilters();
    this.applyRatingColor();
  }
  // find data
  initData() {
    this.data = dataSource.books;
    console.log('Data:', this.data);
    
  }
  // find elements used throughout class.
  getElements() {
    this.booksListEl = document.querySelector('.books-list');
    this.bookTemplateEl = document.querySelector('#template-book');
    this.filtersEl = document.querySelector('.filters');
  }
  // render books from dataset onto html
  displayBooks() {
    this.data.forEach((book) => {
    // convert to a value used in %
      const ratingWidth = book.rating * 10;
      const ratingBgc = this.applyRatingColor(book.rating);
      // use spread syntax to assign new values ratingWidth and ratingBgc to object book
      const generateHTML = Handlebars.compile(this.bookTemplateEl.innerHTML)({...book,	ratingWidth, ratingBgc,});
      const container = utils.createDOMFromHTML(generateHTML);
      this.booksListEl.appendChild(container);
    });
  }
  // Add event listeners to filters elements and book covers to add them to favourites
  initActions() {
    const favoriteBooks = [];
    // FAVOURITES HANDLING
    this.booksListEl.addEventListener('dblclick', (event) => {
    // assign link(parent) of book image to var
      const book = event.target.offsetParent;
      if (book.classList.contains('book__image')) {
      // get id of each book
        const bookID = book.getAttribute('data-id');
        // if not currently in favourites, add it else remove on double click
        if (!favoriteBooks.includes(bookID)) {
          favoriteBooks.push(bookID);
          book.classList.add('favorite');
        } else {
        // find bookID position in array and remove it
          const arrayIndex = favoriteBooks.indexOf(bookID);
          favoriteBooks.splice(arrayIndex, 1);
          book.classList.remove('favorite');
        }
      }
    });
    this.filters = [];

    // FILTERS FORM
    this.filtersEl.addEventListener('click', (e) => {
    // check if clicked element in filters form is an input checkbox
      if (
        e.target.tagName === 'INPUT' &&
			e.target.type === 'checkbox' &&
			e.target.name === 'filter'
      ) {
      // add/remove checked checkbox to array of filters
        if (e.target.checked) {
          this.filters.push(e.target.value);
        } else {
          const indexUnchecked = this.filters.indexOf(e.target.value);
          this.filters.splice(indexUnchecked, 1);
        }

        this.applyFilters(this.filters);
      }
    });
    return this.filters;
  }
  // loop through books in data set and apply filters , then grab book by ID and add/remove css to filtered books
  applyFilters() {
    for (let book of this.data) {
      let isHidden = false;
      for (const filter of this.filters) {
        if (!book.details[filter]) {
          isHidden = true;
          break;
        }
      }
      // Find book__image element for current book
      const bookImg = document.querySelector(
        `.book__image[data-id="${book.id}"]`
      );
      // apply/remove class hidden depending which filter is selected
      if (isHidden) {
        bookImg.classList.add('hidden');
      } else {
        bookImg.classList.remove('hidden');
      }
    }
    
  }
  // use rating called in displayBooks method to apply styles
  applyRatingColor(rating) {
    if (rating <= 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}
// eslint-disable-next-line no-unused-vars
const app = new BooksList();
