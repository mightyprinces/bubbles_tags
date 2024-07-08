export default class Storage {
  constructor(prefix) {
    this.prefix = prefix;
  }

  loadTags() {
    const tags = localStorage.getItem(`${this.prefix}_selected_tags`);
    return tags ? JSON.parse(tags) : [];
  }

  loadDeletedTags() {
    const deletedTags = localStorage.getItem(`${this.prefix}_deleted_tags`);
    return deletedTags ? JSON.parse(deletedTags) : [];
  }

  saveTags(tags) {
    localStorage.setItem(`${this.prefix}_selected_tags`, JSON.stringify(Array.from(tags.keys())));
  }

  saveDeletedTags(deletedTags) {
    localStorage.setItem(`${this.prefix}_deleted_tags`, JSON.stringify(Array.from(deletedTags.keys())));
  }
}