import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';



@customElement('ic-icon')
export class IconifyIcon extends LitElement {

    @property({attribute:false})
    icon:IconifyIcon

  render() {
    return html`   
    <svg>
    ${unsafeSVG(this.icon.body)}
    </svg>
    `;
  }

  static get styles() {
		return css`
        svg{
            width:24px;
            height:24px;
        }
        :host{
            width:24px;
            height:24px;
        }
        `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "ic-icon": IconifyIcon,
  }
}