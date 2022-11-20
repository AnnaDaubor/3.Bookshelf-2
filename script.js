const addModal = document.getElementById('add-modal')
const closeModalButton = document.getElementById('close-modal-button')
const openModalButton = document.getElementById('open-modal-button')

function closeModal() {
  addModal.style.display = 'none'
}

function openModal() {
  addModal.style.display = 'flex'
}

closeModalButton.addEventListener('click', closeModal)
openModalButton.addEventListener('click', openModal)

let booksCount = 0;

let books = [
  {
    id: booksCount++,
    title: 'Harry Potter 1: Philosopher Stone',
    authors: 'Joanne Rowling',
    year: 2019,
    image: 'img/1.png'
  },
  {
    id: booksCount++,
    title: 'Harry Potter 2: Chamber of Secrets',
    authors: 'Joanne Rowling',
    year: 2019,
    image: 'img/2.png'
  },
  {
    id: booksCount++,
    title: 'Harry Potter 3: Prisoner of Azkaban',
    authors: 'Joanne Rowling',
    year: 2019,
    image: 'img/3.png'
  },
  {
    id: booksCount++,
    title: 'Harry Potter 4: Goblet of Fire',
    authors: 'Joanne Rowling',
    year: 2019,
    image: 'img/4.png'
  }
]

const myContainer = document.getElementById("container")

function renderBooks() {
  myContainer.innerHTML = ""
  books.forEach((book) => {
    myContainer.innerHTML += `
        <div class="container-book">

            <img class="book-image" src=${book.image} />
            <p class ="book-title">${book.title}</p>
            <p class ="book-author">${book.authors}</p>
            <p class ="book-year">${book.year}</p>
            <button id='openUpdateBook${book.id}'> Обновить </button>
            <button id='deleteBookButton${book.id}'> Удалить </button>

        </div>
        `;
  })

  books.forEach((book) => {
    document.getElementById(`deleteBookButton${book.id}`).addEventListener('click', () =>
      deleteBook(book.id));
  });

  books.forEach((book) => {
    document.getElementById(`openUpdateBook${book.id}`).addEventListener('click', () =>
      openUpdateModal(book.id))
  })

  saveToLocalStorage()
}



function clearForm() {
  document.getElementById('title').value = ""
  document.getElementById('authors').value = ""
  document.getElementById('year').value = ""
  document.getElementById('image').value = ""
}

function saveToLocalStorage() {
  const booksJson = JSON.stringify(books)
  localStorage.setItem('books', booksJson)
}

function deleteBook(id) {
  // шаг 1 - найти книгу
  let book = books.find((b) => {
    return b.id === id
  })

  // шаг 2 - узнать индекс книги в массиве
  const bookIndex = books.indexOf(book)

  //шаг 3 - удалить элемент из массива
  books.splice(bookIndex, 1)

  //шаг 4 - перерисовать список
  renderBooks()

  //шаг 5 - сохранить в Local Storage

  saveToLocalStorage()

}


function addBook() {

  const titleValue = document.getElementById('title').value
  const authorsValue = document.getElementById('authors').value
  const yearValue = document.getElementById('year').value
  const imageValue = document.getElementById('image').value

  let book = {
    id: booksCount++,
    title: titleValue,
    authors: authorsValue,
    year: yearValue,
    image: imageValue
  }

  books.push(book)

  renderBooks()
  clearForm()
  closeModal()
  saveToLocalStorage()

}

const saveButton = document.getElementById('save-button')
saveButton.addEventListener('click', addBook)

const booksJson = localStorage.getItem('books')
const savedBooks = JSON.parse(booksJson)
if (booksJson && savedBooks.length > 0) {
  books = savedBooks
}

const updateModal = document.getElementById('updateModal')

const closeUpdateModalButton = document.getElementById('closeUpdateModalButton')
closeUpdateModalButton.addEventListener('click', closeUpdateModal)

const updateBookButton = document.getElementById('updateBookButton')

function closeUpdateModal() {
  updateModal.style.display = 'none'
}



function openUpdateModal(id) {
  updateModal.style.display = 'flex'

  const currentBook = books.find(b => b.id === id)

  document.getElementById('updateTitle').value = currentBook.title
  document.getElementById('updateAuthors').value = currentBook.authors
  document.getElementById('updateYear').value = currentBook.year
  document.getElementById('updateImage').value = currentBook.image

  //function makeUpdate() {
  //  updateBook(id, makeUpdate)
  //}

  const makeUpdate = () => updateBook(id, makeUpdate)

  updateBookButton.addEventListener('click', makeUpdate)
}

function updateBook(id, makeUpdate) {

  updateBookButton.removeEventListener('click', makeUpdate)

  const oldBook = books.find(b => b.id === id)

  const newBook = {
    id,
    title: document.getElementById('updateTitle').value,
    authors: document.getElementById('updateAuthors').value,
    year: document.getElementById('updateYear').value,
    image: document.getElementById('updateImage').value
  }

  const bookIndex = books.indexOf(oldBook)

  books.splice(bookIndex, 1, newBook)

  renderBooks()
  saveToLocalStorage()
  closeUpdateModal()

}



renderBooks()


