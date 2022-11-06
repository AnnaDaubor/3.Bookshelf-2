const addModal = document.getElementById('add-modal')
const closeModalButton = document.getElementById('close-modal-button')
const openModalButton = document.getElementById('open-modal-button')

function closeModal() {
  addModal.style.display='none'
}

function openModal() {
  addModal.style.display='flex'
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
      title:'Harry Potter 3: Prisoner of Azkaban',
      authors: 'Joanne Rowling',
      year: 2019,
      image: 'img/3.png'
    },
    {
      id: booksCount++,
      title:'Harry Potter 4: Goblet of Fire',
      authors: 'Joanne Rowling',
      year: 2019,
      image:'img/4.png'
    }
  ]

    const myContainer = document.getElementById("container")
    
    function renderBooks() {
      myContainer.innerHTML=""
      books.forEach((book)=> {
        myContainer.innerHTML += `
        <div class="container-book">

            <img class="book-image" src=${book.image} />
            <p class ="book-title">${book.title}</p>
            <p class ="book-author">${book.authors}</p>
            <p class ="book-year">${book.year}</p>
            <button onclick='updateBook(${book.id})'> Изменить </button>
            <button onclick='deleteBook(${book.id})'> Удалить </button>

        </div>
        `
      })
    }
   
    function clearForm() {
      document.getElementById('title').value =""
      document.getElementById('authors').value=""
      document.getElementById('year').value=""
      document.getElementById('image').value=""
    }

    function saveToLocalStorage() {
      const booksJson = JSON.stringify(books)
      localStorage.setItem('books', booksJson)
    }

    function deleteBook (id) {
      // шаг 1 - найти книгу
      let book = books.find((b)=> {
            return b.id === id
      })

      // шаг 2 - узнать индекс книги в массиве
      const bookIndex = books.indexOf(book)

      //шаг 3 - удалить элемент из массива
      books.splice(bookIndex,1)

      //шаг 4 - перерисовать список
      renderBooks()

      //шаг 5 - сохранить в Local Storage

      saveToLocalStorage()

    }

    function addBook() {
      
      const titleValue =document.getElementById('title').value
      const authorsValue =document.getElementById('authors').value
      const yearValue =document.getElementById('year').value
      const imageValue =document.getElementById('image').value

      let book = {
            id: booksCount++,
            title:titleValue,
            authors:authorsValue,
            year: yearValue,
            image: imageValue
      }
     
      books.push(book)

      renderBooks()
      clearForm()
      closeModal()
      saveToLocalStorage()

    }
    
    const saveButton=document.getElementById('save-button')
    saveButton.addEventListener('click',addBook)

    const booksJson = localStorage.getItem('books')
    const savedBooks = JSON.parse(booksJson)
    if (booksJson && savedBooks.length > 0) {
        books=savedBooks
    }

    renderBooks()

  
