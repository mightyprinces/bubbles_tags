export default class Storage {
  static loadTags() {
    const tags = localStorage.getItem("selected_tags");
    return tags ? JSON.parse(tags) : [];
  }

  static saveTags(tags) {
    localStorage.setItem("selected_tags", JSON.stringify(tags));
  }
}