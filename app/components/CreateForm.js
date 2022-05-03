import Marionette from "backbone.marionette";
import template from "../templates/createForm.jst";

export default Marionette.View.extend({
  tagName: "form",
  template: template,
  events: {
    "click button": "addBook",
  },
  addBook(e) {
    e.preventDefault();
    this.trigger("createform:addbook", {
      title: this.$("#book-title").val(),
      author: this.$("#book-author").val(),
      genre: this.$("#book-genre").val(),
      id: this.$("#book-id").val(),
    });
  },
});
