export default class Bubbles {
  constructor(wrapperEl, tagsChangedHandler, initTagsArr, initDeletedTagsArr) { // wrapperEl в данном случае это bubbles_wrapper--first из index.html
    this.isReady = false;
    this.tags = []; // массив текущих тегов
    this.deletedTags = initDeletedTagsArr; // массив удаленных
    this.tagsChangedHandler = tagsChangedHandler;
    this.createLayout(wrapperEl, initTagsArr); // код запускающий createLayout. wrapperEl в данном случае это bubbles_wrapper--first из index.html
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
          this.openDropdown();
        }
      }
    })

    this.tagsAndInputWrapperEl.appendChild(tagInputEl);
    wrapperEl.appendChild(this.tagsAndInputWrapperEl);

    for (let tag of initTagsArr) {
      this.addTag(tag);
    }

    // появление дропдауна по нажатию на инпут в случае если были удаленные теги
    // создаем элемент dropdown
    this.dropdownEl = document.createElement('ul');
    this.dropdownEl.classList.add('dropdown');
    wrapperEl.appendChild(this.dropdownEl);

    // добавляем в дропдаун удаленные теги из прошлой сессии до перезагрузки страницы
    for (let delTag of this.deletedTags) {
      this.addDeletedTagInList(delTag);
    }

    // добавляем лисенер на инпут - инпут в фокусе, курсор в инпуте
    tagInputEl.addEventListener('focus', (ev) => {
      console.log('Input Listener', this.deletedTags.length);
      this.openDropdown();
    })


    // добавляем клик по любому месту кроме дропдауна и всей секции с тэгами и инпутом
    window.addEventListener('click', (ev) => {
      if (ev.target !== this.dropdownEl && !this.dropdownEl.contains(ev.target) && ev.target !== tagInputEl) {
        this.tagsAndInputWrapperEl.classList.remove('dropdowned');
      }
    })
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

    if (this.deletedTags.includes(tagValue)) {
      this.removeDeletedTagFromList(tagValue);
    }

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

    if (this.isReady) this.tagsChangedHandler(this.tags, this.deletedTags);
  }


  /**
   * Удаляет тег из баблса при клике на тег
   */
  removeTag(tagEl) {
    this.deletedTags.push(tagEl.innerText);
    console.log('this.deletedTags in removeTag', this.deletedTags);
    this.tagsAndInputWrapperEl.removeChild(tagEl);
    this.tags.splice(this.tags.indexOf(tagEl.textContent), 1);
    this.addDeletedTagInList(tagEl.innerText);
    this.tagsChangedHandler(this.tags, this.deletedTags);
  }

  /**
   * Открытие/показ дропдауна
   */
  openDropdown() {
    if (this.deletedTags.length) {
      this.tagsAndInputWrapperEl.classList.add('dropdowned');
    }
  }


  // добавляем строку в выпадающий список ранее удаленных тегов
  addDeletedTagInList(tagValue) {
    const dropdownItemEl = document.createElement('li');
    dropdownItemEl.classList.add('dropdown_item');
    dropdownItemEl.innerText = tagValue;
    this.dropdownEl.appendChild(dropdownItemEl);

    dropdownItemEl.addEventListener('click', () => {
      this.addTag(tagValue);
    })
  }


  // удаляем строку из выпадающего списка ранее удаленных тегов
  removeDeletedTagFromList(tagValue) {
    console.log('1-this.deletedTags in removeDeletedTagFromList', this.deletedTags);
    const tagIndex = this.deletedTags.indexOf(tagValue);

    if (tagIndex === -1) return;

    this.deletedTags.splice(tagIndex, 1);
    
    let allElements = [...this.dropdownEl.querySelectorAll('.dropdown_item')];
    for (let delTagEl of allElements) {
      if (delTagEl.innerText === tagValue) this.dropdownEl.removeChild(delTagEl);
    }

    if (!this.dropdownEl.hasChildNodes()) {
      this.tagsAndInputWrapperEl.classList.remove('dropdowned');
    }
    console.log('2-this.deletedTags in removeDeletedTagFromList', this.deletedTags);
  }
}