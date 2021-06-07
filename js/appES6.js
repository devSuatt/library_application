// book Class
class Book {
    constructor(title, author, image) {
        this.bookId = Math.floor(Math.random() * 10000);
        this.title = title;
        this.author = author;
        this.image = image;
    }
}

// UI Class
class UI {

    addbookToList(book) {
        const list = document.getElementById('book-list');

        var html = `
        <tr>
            <td><img src="images/${book.image}" width="75" height="100"/></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td> <a href="#" data-id="${book.bookId}" class="btn btn-danger btn-sm delete">Delete</a> </td>
        </tr>
        `;

        list.innerHTML += html;

    }

    clearControl() {
        const title = document.getElementById('title').value = "";
        const author = document.getElementById('author').value = "";
        const image = document.getElementById('image').value = "";
    }

    deletebook(element) {
        if (confirm('Are you sure?')) {
            if (element.classList.contains('delete')) {
                element.parentElement.parentElement.remove();
                return true;
            }
        }
    }

    showAlert(message, className) {
        var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
        `;

        const row = document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin', alert);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

}

class Storage {

    static getbooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displaybooks() {
        const books = Storage.getbooks();

        books.forEach(book => {
            const ui = new UI();
            ui.addbookToList(book);
        });

    }

    static addbook(book) {
        const books = Storage.getbooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deletebook(element) {
        if (element.classList.contains('delete')) {
            const id = element.getAttribute('data-id');
            console.log(id);
            const books = Storage.getbooks();
            books.forEach((book, index) => {

                if (book.bookId == id) {
                    books.splice(index, 1);
                }

            });

            localStorage.setItem('books', JSON.stringify(books));

        }
    }

}

document.addEventListener('DOMContentLoaded', Storage.displaybooks);

const form = document.getElementById('new-book');
form.addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const image = document.getElementById('image').value;

    //create book object
    const book = new Book(title, author, image);
    console.log(book);

    // create UI
    const ui = new UI();

    if (title === '' || author === '' || image === '') {
        ui.showAlert('Please complete the form', 'warning');
    }
    else {
        // add book to list
        ui.addbookToList(book);

        // save to LS
        Storage.addbook(book);

        // clear controls
        ui.clearControl();

        ui.showAlert('book has been added', 'success');
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();

    // delete book    
    if (ui.deletebook(e.target) == true) {
        // delete book from LS
        Storage.deletebook(e.target);

        ui.showAlert('the book has been deleted', 'danger');

    }

});

