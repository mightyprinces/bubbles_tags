class Bubbles extends EventTarget {
  constructor(wrapperEl) {
    super(); // это вызов конструктора родительского класса EventTarget, нужно чтоб события работали
    this.tags = []; // массив текущих тегов
    // какой-то твой код, например запускающий createLayout
    this.#createLayout();
  }

  /**
   * Создает разметку баблса и вставляет её в переданный враппер
   */
  #createLayout() {
    // какой-то твой код, создающий разметку
    
  }

  /**
   * Создает событие change когда изменилось содержимое баблса
   */
  #emitChangeEvent() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.tags,
    }));
  }

  /**
   * Удаляет тег из баблса при клике на тег
   */
  #removeTag(tagEl) {
    // какой-то твой код, удаляющий данный тег из верстки и из this.tags
    this.#emitChangeEvent();
  }

  /**
   * Добавляет тег в баблс при нажатии Enter в непустом инпуте
   */
  #addTag() {
    // какой-то твой код, добавляющий тег в верстку и в this.tags
    this.#emitChangeEvent();
  }

}