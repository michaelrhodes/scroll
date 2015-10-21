var raf = require('raf-component')
var ease = require('ease-component')

function scroll (prop, element, to, options, callback) {
  var start = +new Date
  var from = element[prop]
  var cancelled = false
  var type = 'inOutSine'
  var duration = 350

  if (typeof options === 'function') {
    callback = options
  }
  else {
    options = options || {}
    type = options.ease || type
    duration = options.duration || duration
    callback = callback || function () {}
  }

  var easing = ease[type]

  if (from === to) {
    return callback(
      new Error('Element already at target scroll position'),
      element[prop]
    )
  }

  function cancel () {
    cancelled = true
  }

  function animate (timestamp) {
    if (cancelled) {
      return callback(
        new Error('Scroll cancelled'),
        element[prop]
      )
    }

    var now = +new Date
    var time = Math.min(1, ((now - start) / duration))
    var eased = easing(time)

    element[prop] = (eased * (to - from)) + from

    time < 1 ?
      raf(animate) :
      callback(null, element[prop])
  }

  raf(animate)

  return cancel
}

module.exports = {
  top: function (element, to, options, callback) {
    return scroll('scrollTop', element, to, options, callback)
  },
  left: function (element, to, options, callback) {
    return scroll('scrollLeft', element, to, options, callback)
  }
}
