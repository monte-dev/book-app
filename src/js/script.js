/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
const booksListEl = document.querySelector('.books-list');
const bookTemplateEl = document.querySelector('#template-book');
const filtersEl = document.querySelector('.filters');
const data = dataSource.books;

// Used to render html of books dataset onto the page using template
function displayBooks(){
  // for each book from the data set
  data.forEach(book => {
    const generateHTML = Handlebars.compile(bookTemplateEl.innerHTML)(book);
    const container = utils.createDOMFromHTML(generateHTML);
    booksListEl.appendChild(container);
  });
}
displayBooks();

const favoriteBooks = [];
function initActions(){
  // FAVOURITES HANDLING
  booksListEl.addEventListener('dblclick', (event) =>{
    // assign link(parent) of book image to var
    const book = event.target.offsetParent;
    if(book.classList.contains('book__image')){
      // get id of each book
      const bookID = book.getAttribute('data-id');
      // if not currently in favourites, add it else remove on double click
      if (!favoriteBooks.includes(bookID)){
        favoriteBooks.push(bookID);
        book.classList.add('favorite');
      }   
      else {
      // find bookID position in array and remove it
        const arrayIndex = favoriteBooks.indexOf(bookID);
        favoriteBooks.splice(arrayIndex, 1);
        book.classList.remove('favorite');
      }}
  });

  // FILTERS FORM
  filtersEl.addEventListener('click', e =>{
    // check if clicked element in filters form is an input checkbox
    if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter'){
      // add/remove checked checkbox to array of filters
      if(e.target.checked){
        filters.push(e.target.value);
      } else {
        const indexUnchecked = filters.indexOf(e.target.value);
        filters.splice(indexUnchecked, 1);
      }
      applyFilters();
    }
  });
}
initActions();

const filters = [];

function applyFilters(){
  for (let book of dataSource.books) {
    
    let isHidden = false;
    for (const filter of filters) {
      if(!book.details[filter]){
        isHidden = true;
        break;
      }
    }
    // Find book__image element for current book
    const bookImg = document.querySelector(`.book__image[data-id="${book.id}"]`);
    // apply/remove class hidden depending which filter is selected
    if (isHidden) {
      bookImg.classList.add('hidden');
    } else {
      bookImg.classList.remove('hidden');
    }
  }
}

