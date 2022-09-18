
const books = [
    {
      title: 'Harry Potter 1: Philosopher Stone',
      authors: 'Joanne Rowling',
      year: 2019,
      image: 'img/1.png'
    },
    {
      title: 'Harry Potter 2: Chamber of Secrets',
      authors: 'Joanne Rowling',
      year: 2019,
      image: 'img/2.png'
    },
    {
      title:'Harry Potter 3: Prisoner of Azkaban',
      authors: 'Joanne Rowling',
      year: 2019,
      image: 'img/3.png'
    },
    {
      title:'Harry Potter 4: Goblet of Fire',
      authors: 'Joanne Rowling',
      year: 2019,
      image:'img/4.png'
    }
    ]

    const myContainer = document.getElementById("container")
    
    books.forEach((book)=> {
        myContainer.innerHTML += `
        <div class="container-book">
        <img class="book-image" src=${book.image} />
        <p class ="book-title">${book.title}</p>
        <p class ="book-author">${book.authors}</p>
        <p class ="book-year">${book.year}</p>
        <button> Изменить </button>
        <button> Удалить </button>
        </div>
        `
    })

