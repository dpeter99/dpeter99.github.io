import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('project-card')
export class ProjectCard extends LitElement {
  render() {
    return html`
      <div>Hello from MyElement!</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "project-card": ProjectCard,
  }
}