import BaseElement from '../../core/BaseElement';

import template from './App.html';
import styles from './App.css';

class App extends BaseElement {
  constructor() {
    super();

    this.setClassName('my-app');
    this.setTemplate(template, styles);

    this.labelForm = this.querySelector('form');
    this.labelForm.addEventListener('submit', this.onSubmit.bind(this));
  }

  connectedCallback() {
    console.log('App.connectedCallback');
  }

  onSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const labelElement = formElement.elements.label;

    this.addCheckbox(labelElement.value);

    formElement.reset();
  }

  addCheckbox(label) {
    const checkbox = document.createElement('my-checkbox');
    // const checkbox = document.createElement('adv-checkbox');
    const id = this.querySelectorAll(checkbox.tagName).length + 1;

    checkbox.setAttribute('label', label);
    // checkbox.innerHTML = `<span slot="label">${label}</span>`;
    checkbox.setAttribute('name', `checkbox_${id}`);

    this.appendChild(checkbox);

    // setTimeout(() => {
    //   checkbox.setAttribute('label', `${label} updated`);
    // }, 1000);

    checkbox.addEventListener('change', (e) => {
      console.log(
        `Checkbox '${label} (${e.detail.name})" changed:`,
        e.detail.checked,
      );
    });

    checkbox.addEventListener('remove', (e) => {
      console.log(`Checkbox '${label} (${e.detail.name})" removed!`);
    });
  }
}

customElements.define('my-app', App);

export default App;
