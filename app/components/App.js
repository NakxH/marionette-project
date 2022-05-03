import Marionette from "backbone.marionette";
import AppView from "./AppView";
import books from "./Books";

export default Marionette.Application.extend({
  region: "#app",

  onStart() {
    this.showView(new AppView());
  },
});
