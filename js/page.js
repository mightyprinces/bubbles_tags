import Bubbles from './lib/bubbles.js';
import Storage from './lib/storage.js';

class Page {
  static init() {
    const bubblesFirstWrapperEl = document.querySelector('.bubbles_wrapper--first');
    const initTagsArr = Storage.loadTags();

    // хендлер должен запускаться когда мы добавляем или удаляем тег
    function tagsChangedHandler(tags) {
      console.log('Something changed:', tags);
      Storage.saveTags(tags);
    }

    new Bubbles(bubblesFirstWrapperEl, tagsChangedHandler, initTagsArr);
  }
}

Page.init();
