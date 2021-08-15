# vue3-slide-up-down

Like jQuery's [`slideUp`](http://api.jquery.com/slideup/) / [`slideDown`](http://api.jquery.com/slidedown/), but for [Vue 3](vuejs.org)!

Forked from Daniel Diekmeier's [`vue-slide-up-down`](https://github.com/danieldiekmeier/vue-slide-up-down) project.

## Demo

Coming soon

## Installation

```sh
npm i vue3-slide-up-down
```

Usage with Webpack or other module bundlers:

```js
import SlideUpDown from 'vue3-slide-up-down'

app.component('slide-up-down', SlideUpDown)
```

Or use the UMD build directly in your browser (the component is provided as `window.Vue3SlideUpDown`).

```html
<script
  type="text/javascript"
  src="node_modules/vuejs/dist/vue.min.js"
></script>
<script
  type="text/javascript"
  src="node_modules/vue3-slide-up-down/dist/vue3-slide-up-down.umd.js"
></script>
<script type="text/javascript">
  Vue.component('slide-up-down', Vue3SlideUpDown)
</script>
```

## Usage

The component takes five props:

| name           | type    | required | description                                 | default       |
| -------------- | ------- | -------- | ------------------------------------------- | ------------- |
| v-model        | boolean | yes      | Whether to show the component or not        | N/A           |
| duration       | number  | no       | How long the animation will be in ms        | 500           |
| timingFunction | string  | no       | The CSS transition-timing-function property | "ease-in-out" |
| tag            | string  | no       | The HTML tag to use for the wrapper element | "div"         |
| responsive     | boolean | no       | Animate height when contents are changed    | false         |

```html
<div class="MyContent">
  <h1>Always show this</h1>

  <slide-up-down v-model="active" :duration="1000">
    Only show this if "active” is true
  </slide-up-down>
</div>
```

The component emits five Vue events:

- `open-start`
- `open-end`
- `close-start`
- `close-end`
- `layout-shift`

```html
<slide-up-down @close-end="() => console.log('done closing!')" />
```