class BaseElement extends HTMLElement {
  setClassName(className) {
    this.classList.add(className);
  }

  setTemplate(template, styles) {
    const currentHtml = this.innerHTML;
    this.innerHTML = `${currentHtml}${template}`;

    if (styles) {
      this.setStyles(styles);
    }
  }

  setStyles(styles) {
    const style = document.createElement('style');
    style.textContent = styles;

    this.prepend(style);
  }
}

export default BaseElement;
