export default class Section{
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items.reverse(); 
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    })
  };

  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}