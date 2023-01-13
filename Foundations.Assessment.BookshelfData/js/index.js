// IMPORT BOOKDATA ARRAY
import { bookData } from "./book-data.js";

// SELECT DIV FROM HTML
const containerDiv = document.querySelector(".bookshelf");

//CREATE A CLASS THAT HOLDS THE PROPERTIES OF EACH BOOK
class Book {
  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.language = book.language;
    this.subject = book.subject;
    this.ele = document.createElement("div");
    this.comment = book.comment;
  }
  bookInitialize() {
    const that = this;
    this.ele.innerHTML = `<h3><strong>Title:</strong> ${this.title}</h3>
    <p><strong>Author:</strong> ${this.author}</p>
    <p><strong>Subject:</strong> ${this.subject}</p>
    <p><strong>Language:</strong> ${this.language}</p>
    <p><strong>Comments:</strong></p>`;
    // CREATE COMMENT BUTTON
    const commentButton = document.createElement("button");
    this.ele.setAttribute("class", "book");
    commentButton.innerText = "Leave Comment";
    this.ele.appendChild(commentButton);
    containerDiv.appendChild(this.ele);
    //PREVENTS COMMENTS FROM DISPLAYING UNDEFINED IF IT DOES NOT EXIST YET
    if (this.comment === undefined) {
      this.comment = [];
    } else {
      this.comment.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.setAttribute("class", "commentDiv");
        commentDiv.style.overflow = "auto";
        commentDiv.textContent = comment;
        this.ele.appendChild(commentDiv);
      });
    }
    // ADD EVENT LISTENER TO COMMENT BUTTON
    commentButton.addEventListener("click", () => {
      commentButton.style.display = "none";
      //CREATE COMMENT INPUT AND SEND BUTTON
      const commentInput = document.createElement("input");
      commentInput.setAttribute("class", "commentBox");
      commentButton.setAttribute("class", "comment");
      commentInput.setAttribute("maxLength", "280");
      commentInput.setAttribute("type", "text");
      commentInput.setAttribute("rows", "7");
      commentInput.style.width = "100%";
      const sendButton = document.createElement("button");
      sendButton.innerText = "Send Comment";
      sendButton.setAttribute("class", "send");
      that.ele.appendChild(commentInput);
      that.ele.appendChild(sendButton);
      // CREATE EVENT LISTENER TO SEND BUTTON
      sendButton.addEventListener("click", () => {
        const comment = document.querySelector(".commentBox").value;
        bookData.forEach((book) => {
          if (book.title === that.title && book.author === that.author) {
            if (book.comment === undefined) {
              book.comment = [];
              book.comment.push(comment);
              bookshelf.render();
            } else {
              book.comment.push(comment);
              bookshelf.render();
            }
          }
        });
      });
    });
  }
}

//CREATE BOOKSHELF CLASS HOLDS THE BOOKDATA ARR AND CREATES AND EMPTY ARR
class Bookshelf {
  constructor() {
    this.books = bookData;
    this.bookshelf = [];
  }
  //CREATE A METHOD TO MAP EACH BOOK IN THE BOOKDATA ARR TO NEW INSTANCE OF THE CLASS BOOK
  render() {
    // CLEAR CONTAINER TO PREVENT REPEATING BOOKS WHEN BOOKS ARE ADDED
    document.body.querySelector(".bookshelf").innerHTML = "";
    //USE MAP TO CREATE NEW ARR WITH NEW INSTANCE OF BOOK FOR EACH OBJ IN THE BOOKDATA ARR
    this.bookshelf = this.books.map((book) => new Book(book).bookInitialize());
  }
}
// CREATE A NEW INSTANCE OF BOOKSHELF
const bookshelf = new Bookshelf();
bookshelf.render();

const saveButton = document.querySelector("#saveButton");
// ADD EVENT LISTENER TO SAVE BUTTON TO TAKE VALUES OF INPUTS
saveButton.addEventListener("click", () => {
  const bookTitle = document.querySelector("#bookTitle").value;
  const bookAuthor = document.querySelector("#bookAuthor").value;
  const bookSubject = document.querySelector("#bookSubject").value;
  const bookLanguage = document.querySelector("#bookLanguage").value;
  const createBook = (bookTitle, bookAuthor, bookSubject, bookLanguage) => {
    const createObj = {};
    createObj.author = bookAuthor;
    createObj.language = bookLanguage;
    createObj.subject = bookSubject;
    createObj.title = bookTitle;
    return createObj;
  };
  const addedBook = createBook(
    bookTitle,
    bookAuthor,
    bookSubject,
    bookLanguage
  );
  bookData.push(addedBook);
  //RE CALL THE RENDER FUNC TO DISPLAY NEW BOOKS ADDED
  bookshelf.render();
  //SELECT THE INPUTS AND CLEAR IT'S VALUES ONCE THE NEW BOOKSHELF IS RENDERED
  const bookTitleInput = document.querySelector("#bookTitle");
  const bookAuthorInput = document.querySelector("#bookAuthor");
  const bookSubjectInput = document.querySelector("#bookSubject");
  const bookLanguageInput = document.querySelector("#bookLanguage");
  bookTitleInput.value = "";
  bookAuthorInput.value = "";
  bookSubjectInput.value = "";
  bookLanguageInput.value = "";
});

//SORT MENU
const sort = document.querySelectorAll("#sortBooks");
sort.forEach((option) => {
  option.addEventListener("change", () => {
    if (option.value === "A-Z") {
      bookData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option.value === "Z-A") {
      bookData.sort((a, b) => b.title.localeCompare(a.title));
    }
    bookshelf.render();
  });
});
