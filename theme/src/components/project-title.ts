import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '/src/components/util/icon-row.ts';
import "../components/util/iconify_icons/ic-icon";

import style1 from './project-title.scss?lit';
import { statusToIcons } from '../icons';

@customElement('project-title')
export class ProjectTitle extends LitElement {

  @property()
  title: string;

  @property({ type: Array })
  status: string[];

  @property()
  repo?: string

  render() {

    return html`
    <div class="project-title">
      <h2 class="card__title">
        ${this.title}
      </h2>
    
      <div class="icons">
        <icon-row .icons=${this.status.map(statusToIcons)}></icon-row>
      </div>
    
      ${this.repo != undefined ? html`
      <div class="project_links">
        <a href="${this.repo}">
          <span class="iconify" data-icon="fa-brands:github"></span>
        </a>
      </div>
      ` : null}
    
    </div>
    `;
  }

  static get styles() {
    return [style1];
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "project-title": ProjectTitle,
  }
}