const booksListEl = document.querySelector('.books-list');
const bookWrapper = document.querySelector('#template-book');
const data = dataSource.books;


// Used to render html of books dataset onto the page using template
function displayBooks(data){
  // for each book from the data set
  data.forEach(book => {
    console.log(book);
    const generateHTML = Handlebars.compile(bookWrapper.innerHTML)(book);
    const container = utils.createDOMFromHTML(generateHTML);
    booksListEl.appendChild(container);
  });

}
displayBooks(data);