import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { IconifyIconService } from './ic-icon-service';

@customElement('ic-icon')
export class IconifyIconComponent extends LitElement {

    @property({ attribute: false })
    icon: IconifyIcon

    @property()
    key: string

    getSVG(){
        if(key != null){
            return html`
                ${unsafeSVG(IconifyIconService.getIcon(this.key).body)}
            `
        }
        else{
            return html`
                ${unsafeSVG(this.icon.body)}
            `
        }
    }


    render() {
        return html`   
        <svg>
            ${this.getSVG()}
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
        "ic-icon": IconifyIconComponent,
    }
}