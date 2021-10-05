import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '/src/components/util/icon-row.ts';
import "../components/util/ic-icon";


import wrench from "@iconify/icons-mdi/wrench";
import pauseCircle from "@iconify/icons-mdi/pause-circle";
import snowflake from "@iconify/icons-mdi/snowflake";
import skullOutline from "@iconify/icons-mdi/skull-outline";
import checkDecagram from "@iconify/icons-mdi/check-decagram";
import { IconifyIconComponent } from '../components/util/ic-icon';
const icons = {
  "mdi:wrench": wrench,
  "mdi:pause-circle": pauseCircle,
  "mdi:snowflake": snowflake,
  "mdi:skull-outline": skullOutline,
  "mdi:check-decagram": checkDecagram,
};

function statusToIcons(status: string): object {
  switch (status) {
    case "active": return icons['mdi:wrench'];
    case "on-hold": return icons['mdi:pause-circle'];
    case "deep-freezed": return icons['mdi:snowflake'];
    case "abandoned": return icons['mdi:skull-outline'];
    case "finished": return icons['mdi:check-decagram'];
    default:
      break;
  }
}

import style1 from './project-title.scss?lit';

@customElement('project-title')
export class ProjectTitle extends LitElement {

  @property()
  title: string;

  @property({ type: Array })
  status: string[];

  @property()
  repo?: string

  render() {

    console.log(this.status);
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