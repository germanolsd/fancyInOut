# FancyInOut
---
This is a quick library to add performatic animations aimed at conditional rendering.
It exports a vanilla JS handler and a vue.js component.

The animations are rendered in plain JS with requestAnimationFrame

The vue component is a small wrapper that uses the standard vue \<Transition \/\> component and hooks the enter and leave animations with vue's conditional rendering

Using with vanilla JS
```js
import {fancyInOut} from 'FancyInOut'

const {triggerEnter, triggerLeave} = fancyInOut({...options})

const el:HTMLelement; //html element to animate
const callback:Function; // optional callback function to call at the end of an animation
triggerEnter(el, callback?) //triggers the enter animation
triggerLeave(el, callback?) //triggers the leave animation
```

```
//template
<FancyInOutVue>
  <elementToAnimate v-if="condition" />
</FancyInOutVue>

//script
import {FancyInOutVue} from 'FancyInOut'
```

callbacks are called whenever the enter or leave animation ends

| Option           | Description                                      | Default Value | Type | Values
| -------          | -----------                                      | ------------- | ---- | ------
| x           | The x-coordinate of the initial enter position | '150px'| String |  any valid css unit declaration except for %: "10vh", "5ch", "200px"
| y           | The y-coordinate of the initial enter position | '150px' | String | same as X
| angle       | The angle of rotation in degrees               | 90     | Number | the angle for the curve, the smallest the angle is, the smallest the delta of the curve is
| duration    | The duration of the animation in milliseconds  | 400    | Number | duration for the animation
| initialScale| The initial scale of the element               | 0.3    | Number | set to 1 to skip scale animation entirely
| initialOpacity| The initial opacity of the element           | 0.1    | Number |  set to 1 to skip opacity animation entirely
| cubicBezier | The cubic bezier curve for easing              | 'easeInOut'| String or Number[] | css cubic-bezier for the animation, possible values are "linear", "easeIn", "easeOut", "easeInOut", "materialEasing", or any valid css cubic-bezier declaration. [0.2, 1, 0.45, 0.9].

## local development
---
To run locally, just clone this repo and run 
>`npm i && npm run dev`