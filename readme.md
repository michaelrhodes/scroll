# scroll
A function that animates an element’s scrollTop or scrollLeft position.

[![Browser support](https://ci.testling.com/michaelrhodes/scroll.png)](https://ci.testling.com/michaelrhodes/scroll)

## Install
```
npm install scroll
```

### Usage
``` js
var scroll = require('scroll')

var page = /Firefox/.test(navigator.userAgent) ?
  document.documentElement :
  document.body

// Basic usage
scroll.left(page, 200)

// Register a callback
scroll.top(page, 200, function (error, scrollTop) {
  console.log(error)
  // { message: "Scroll cancelled" } or
  // { message: "Element already at target scroll position" } or
  // null

  console.log(scrollTop)
  // => The new scrollTop position of the element
  // This is always returned, even when there’s an `error`.
})

// Specify an easing function (default: 'inOutSine')
scroll.left(page, 200, { ease: 'inBounce' })

// Specify a duration in milliseconds (default: 350) and register a callback.
scroll.left(page, 200, { duration: 1000 }, function (error, scrollLeft) {
})

// Cancel a scroll animation 
var options = { ease: 'inBounce', duration: 1000 }
var cancel = scroll.top(page, 200, options, function (error, scrollTop) {
  console.log(error.message)
  // => Scroll cancelled

  page.removeEventListener('wheel', cancel)
})

page.addEventListener('wheel', cancel)
```

Note: The easing functions are those specified in [component/ease](https://github.com/component/ease).

### License
[MIT](http://opensource.org/licenses/MIT)
