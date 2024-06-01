import Bubbles from './lib/bubbles.js';
import Storage from './lib/storage.js';

class Page {
  static init() {
    const bubblesFirstWrapperEl = document.querySelector('.bubbles_wrapper--first');
    const initTagsArr = Storage.loadTags();
    const initDeletedTagsArr = Storage.loadDeletedTags();

    // хендлер должен запускаться когда мы добавляем или удаляем тег
    function tagsChangedHandler(tags, deletedTags) {
      console.log('Something changed:', tags);
      Storage.saveTags(tags);
      Storage.saveDeletedTags(deletedTags);
    }

    new Bubbles(bubblesFirstWrapperEl, tagsChangedHandler, initTagsArr, initDeletedTagsArr);
  }
}

Page.init();
