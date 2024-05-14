export default class Bubbles {
  constructor(wrapperEl, tagsChangedHandler, initTagsArr) { // wrapperEl в данном случае это bubblesFirstWrapperEl из index.html
    this.isReady = false;
    this.tags = []; // массив текущих тегов
    this.tagsChangedHandler = tagsChangedHandler;
    this.createLayout(wrapperEl, initTagsArr); // код запускающий createLayout. wrapperEl в данном случае это bubblesFirstWrapperEl из index.html
    this.isReady = true;
  }

  /**
   * Создает разметку баблса и вставляет её в переданный враппер
   */
  createLayout(wrapperEl, initTagsArr) { //wrapperEl в данном случае это bubblesFirstWrapperEl из index.html
    this.tagsAndInputWrapperEl = document.createElement('div');
    this.tagsAndInputWrapperEl.classList.add('tags-and-input-wrapper');
    
    const tagInputEl = document.createElement('input');
    tagInputEl.classList.add('input');
    tagInputEl.setAttribute('placeholder', 'Search request');
    tagInputEl.value = '';
    tagInputEl.addEventListener('keydown', (ev) => {
      if (ev.key === "Enter") {
        this.addTag(tagInputEl.value);
        tagInputEl.value = '';
      }

      if (ev.key === "Backspace") {
        if (ev.repeat) { return }
        if (tagInputEl.value === '' && this.tagsAndInputWrapperEl.firstChild !== tagInputEl) { // проверка что инпут пустой и что во врапере есть элементы кроме инпута, то есть теги
          this.removeTag(this.tagsAndInputWrapperEl.lastChild.previousElementSibling);
        }
      }
    })
    
    this.tagsAndInputWrapperEl.appendChild(tagInputEl);
    wrapperEl.appendChild(this.tagsAndInputWrapperEl);

    for (let tag of initTagsArr) {
      this.addTag(tag);
    }
  }

  /**
   * Удаляет тег из баблса при клике на тег
   */
  removeTag(tagEl) {
    this.tagsAndInputWrapperEl.removeChild(tagEl);
    this.tags.splice(this.tags.indexOf(tagEl.textContent), 1);
    this.tagsChangedHandler(this.tags);
  }

  /**
   * Добавляет тег в баблс при нажатии Enter в непустом инпуте
   */
  addTag(tagValue) {
    tagValue = tagValue.trim();
    if (
      !this.tagsAndInputWrapperEl  // проверка что tagsAndInputWrapperEl существует
      || tagValue === ''   // и что мы не создаем пустой тэг, так как tagValue инпута не пустой
      || this.tags.includes(tagValue)
    ) return;
    
    const tagEl = document.createElement('div');
    tagEl.classList.add('tag-bubble');
    const tagTextEl = document.createElement('div');
    tagTextEl.classList.add('tag-text');
    tagTextEl.textContent = tagValue;
    tagEl.appendChild(tagTextEl);

    const removeEl = document.createElement('span');
    removeEl.classList.add('remove-tag');
    removeEl.addEventListener('click', () => {
      this.removeTag(tagEl);
    })
    tagEl.appendChild(removeEl);
    this.tagsAndInputWrapperEl.insertBefore(tagEl, this.tagsAndInputWrapperEl.lastChild);
    this.tags.push(tagValue);

    if (this.isReady) this.tagsChangedHandler(this.tags);
  }
}