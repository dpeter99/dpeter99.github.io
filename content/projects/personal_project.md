---
title: "Personal_project"
date: 2021-07-07T13:10:53+02:00
draft: true
---

As in this website. 😀

The site is automatically built form the source files hosted on github, and published to the gh-pages branch. I'm using GH pages for the hosting.

### The setup
This site uses Hugo to build the static files that get serverd. For the theme I'm using webpack to build everything nicely.

### The theme
The theme is using SCSS for the styles.
SCSS allows for more dscriptive styles and also the creation of reusable components. With this I can make so called ``mixin``s that can be included into multiple styles later. For example this is what I use for media selectors:
```scss {linenos=table,hl_lines=[1],linenostart=1}
@include mixins.media-breakpoint-up(lg) { 
    grid-template-columns: repeat(2, minmax(240px, 1fr));
}
```
This than when colmpiling scss gets converted to the appropriate media querry.

SCSS needs to be compiled to normal css that every browser can understand. This is done by wbepack and the ``sass-loader`` plugin.
