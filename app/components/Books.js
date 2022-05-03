import Backbone from "backbone";
import Marionette from "backbone.marionette";
import template from "../templates/books.jst";
import book from "./Book";

export default Marionette.CollectionView.extend({
  tagName: "ul",
  template: template,
  childView: book,
  childViewEvents: {
    "book:deletebook": "deleteBook",
  },
  deleteBook(id) {
    this.trigger("books:deletebook", id);
  },
});
