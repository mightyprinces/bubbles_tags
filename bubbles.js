class Bubbles {
  constructor(wrapperEl, tagsChangedHandler) { // wrapperEl в данном случае это bubblesFirstWrapperEl из index.html

    this.tags = []; // массив текущих тегов
    this.tagsChangedHandler = tagsChangedHandler;

    this.addTag('test1');
    this.createLayout(wrapperEl); // код запускающий createLayout. wrapperEl в данном случае это bubblesFirstWrapperEl из index.html
    this.addTag('test');
  }

  /**
   * Создает разметку баблса и вставляет её в переданный враппер
   */
  createLayout(wrapperEl) { //wrapperEl в данном случае это bubblesFirstWrapperEl из index.html
    // код, создающий разметку
    this.tagsAndInputWrapperEl = document.createElement('div');
    this.tagsAndInputWrapperEl.classList.add('tags-and-input-wrapper');
    this.tagsWrapperEl = document.createElement('div');
    this.tagsWrapperEl.classList.add('tags-wrapper');
    this.tagsAndInputWrapperEl.appendChild(this.tagsWrapperEl);
    
    const tagInputEl = document.createElement('input');
    tagInputEl.classList.add('input');
    tagInputEl.setAttribute('placeholder', 'Search request');
    tagInputEl.value = '';
    tagInputEl.addEventListener('keypress', (ev) => {
      if (ev.key === "Enter") {
        this.addTag(tagInputEl.value);
        tagInputEl.value = '';
      }
    })
    // tagInputEl.focus();
    this.tagsAndInputWrapperEl.appendChild(tagInputEl);

    wrapperEl.appendChild(this.tagsAndInputWrapperEl);
  }

  /**
   * Удаляет тег из баблса при клике на тег
   */
  removeTag(tagEl) {
    console.log('remove');
    this.tagsWrapperEl.removeChild(tagEl);
    
    this.tags.splice(this.tags.indexOf(tagEl.textContent), 1);
    this.tagsChangedHandler(this.tags);
  }

  /**
   * Добавляет тег в баблс при нажатии Enter в непустом инпуте
   */
  addTag(tagValue) {
    if (
      !this.tagsWrapperEl  // проверка что tagsWrapperEl существует
      || tagValue === ''   // и что мы не создаем пустой тэг, так как value инпута не пустой
      || this.tags.includes(tagValue)
    ) return;
    
    const value = tagValue.trim();
    const tagEl = document.createElement('div');
    tagEl.classList.add('tag-bubble');
    const tagContent = document.createTextNode(value);
    tagEl.appendChild(tagContent);

    const removeEl = document.createElement('span');
    removeEl.classList.add('remove-tag');

    removeEl.addEventListener('click', (ev) => {
      ev.preventDefault();
      console.log(ev);
      this.removeTag(tagEl);
    })

    tagEl.appendChild(removeEl);
    this.tagsWrapperEl.appendChild(tagEl);
    this.tags.push(value);
    this.tagsChangedHandler(this.tags);
  }
}
