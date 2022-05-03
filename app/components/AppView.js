import Backbone from "backbone";
import Marionette from "backbone.marionette";
import template from "../templates/app.jst";
import Books from "./Books";
import CreateForm from "./CreateForm";

const booksCollection = new Backbone.Collection();

export default Marionette.View.extend({
  tagName: "div",
  regions: {
    "create-form": "#create-form",
    "books-list": "#books-list",
  },
  childViewEvents: {
    "createform:addbook": "addBook",
    "books:deletebook": "deleteBook",
  },
  deleteBook(id) {
    fetch(`http://localhost:3001/api/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then(() => {
        booksCollection.remove(booksCollection.get(id));
      });
  },
  addBook({ title, author, genre }) {
    fetch("http://localhost:3001/api/books", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author,
        genre: genre,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then((res) => {
        booksCollection.add(res);
      });
  },
  onRender() {
    this.showChildView("create-form", new CreateForm());
    fetch("http://localhost:3001/api/books")
      .then((res) => res.json())
      .then((data) => {
        booksCollection.add(data);
        this.showChildView(
          "books-list",
          new Books({ collection: booksCollection })
        );
      });
  },
  template: template,
});
