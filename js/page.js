import Bubbles from './lib/bubbles.js';
import Storage from './lib/storage.js';

class Page {
  static init() {
    const storageFirst = new Storage('first');
    const storageSecond = new Storage('second');

    const bubblesFirstWrapperEl = document.querySelector('.bubbles_wrapper--first');
    const initTagsArrFirst = storageFirst.loadTags();
    const initDeletedTagsArrFirst = storageFirst.loadDeletedTags();

    const bubblesSecondWrapperEl = document.querySelector('.bubbles_wrapper--second');
    const initTagsArrSecond = storageSecond.loadTags();
    const initDeletedTagsArrSecond = storageSecond.loadDeletedTags();

    // хендлер должен запускаться когда мы добавляем или удаляем тег
    function tagsChangedHandlerFirst(tags, deletedTags) {
      // console.log('Something changed:', tags);
      storageFirst.saveTags(tags);
      storageFirst.saveDeletedTags(deletedTags);
    }
    function tagsChangedHandlerSecond(tags, deletedTags) {
      // console.log('Something changed:', tags);
      storageSecond.saveTags(tags);
      storageSecond.saveDeletedTags(deletedTags);
    }

    new Bubbles(bubblesFirstWrapperEl, tagsChangedHandlerFirst, initTagsArrFirst, initDeletedTagsArrFirst);
    new Bubbles(bubblesSecondWrapperEl, tagsChangedHandlerSecond, initTagsArrSecond, initDeletedTagsArrSecond);
  }
}

Page.init();
