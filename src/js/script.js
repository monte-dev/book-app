const booksListEl = document.querySelector('.books-list');
const bookWrapper = document.querySelector('#template-book');
const data = dataSource.books;


// Used to render html of books dataset onto the page using template
function displayBooks(){
  // for each book from the data set
  data.forEach(book => {
    console.log(book);
    const generateHTML = Handlebars.compile(bookWrapper.innerHTML)(book);
    const container = utils.createDOMFromHTML(generateHTML);
    booksListEl.appendChild(container);
  });

}
displayBooks();

const favoriteBooks = [];

function initActions(){
  // find all book covers rendered on page
  const bookImages = document.querySelectorAll('.book__image');
  // loop through each cover and add double click event listener
  for (const bookImg of bookImages) {
    bookImg.addEventListener('dblclick', () =>{
      // get id of each book
      const bookID = bookImg.getAttribute('data-id');
      // if not currently in favourites, add it else remove on double click
      if (!favoriteBooks.includes(bookID)){
        favoriteBooks.push(bookID);
        bookImg.classList.add('favorite');
      }   
      else {
        // find bookID position in array and remove it
        const arrayIndex = favoriteBooks.indexOf(bookID);
        favoriteBooks.splice(arrayIndex, 1);
        bookImg.classList.remove('favorite');
      }
    });
  }
}

initActions();