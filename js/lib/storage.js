export default class Storage {
  static loadTags() {
    const tags = localStorage.getItem("selected_tags");
    return tags ? JSON.parse(tags) : [];
  }

  static loadDeletedTags() {
    const deletedTags = localStorage.getItem("deleted_tags");
    return deletedTags ? JSON.parse(deletedTags) : [];
  }

  static saveTags(tags) {
    localStorage.setItem("selected_tags", JSON.stringify(Array.from(tags.keys())));
  }

  static saveDeletedTags(deletedTags) {
    localStorage.setItem("deleted_tags", JSON.stringify(Array.from(deletedTags.keys())));
  }
}