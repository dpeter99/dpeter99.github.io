import { html } from 'lit';
import './../../../icons';

import './ic-icon';
import { IconifyIconService } from './ic-icon-service';

// This default export determines where your story goes in the story list
export default {
  title: 'Components/IconifyIcon',
};

// 👇 We create a “template” of how args map to rendering
const Template = ({ icon }) => html`<ic-icon icon=${icon}></ic-icon>`;

export const Single = Template.bind({});

Single.args = {
  /* 👇 The args you need here will depend on your component */
  icon: "mdi:wrench"
};