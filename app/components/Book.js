import Backbone from "backbone";
import Marionette from "backbone.marionette";
import template from "../templates/book.jst";

export default Marionette.View.extend({
  tagName: "li",
  template: template,
  events: {
    "click button": "deleteBook",
  },
  deleteBook() {
    this.trigger("book:deletebook", this.model.id);
  },
});
