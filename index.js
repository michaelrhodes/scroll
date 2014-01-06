var raf = require('raf-component')
var ease = require('ease-component')
var listener = require('eventlistener')

var scroll = function(direction, element, target, options, callback) {
  var type = 'inOutSine'
  var duration = 350

  if (typeof options === 'function') {
    callback = options
  }

  else {
    options = options || {}
    type = options.ease || type
    duration = options.duration || duration
  }
  
  callback = callback || function() {} 

  var start = +new Date
  var from = element['scroll' + direction]
  var to = (target == null ?
    element['scroll' + (direction === 'Top' ? 'Height' : 'Width')] :
    target
  )

  var cancelled = false
  var cancel = function() {
    cancelled = true
    listener.remove(element, 'mousewheel', cancel)
  }
  
  if (from === to) {
    return callback(new Error(
      'Element already at target position.'
    ))
  }
  
  listener.add(element, 'mousewheel', cancel)

  var scroll = function(timestamp) {
    if (cancelled) {
      return callback(new Error(
        'Scroll cancelled by the user.'
      ))
    }

    var now = +new Date
    var time = Math.min(1, ((now - start) / duration))
    var eased = ease[type](time)

    element['scroll' + direction] = (eased * (to - from)) + from

    if (time < 1) {
      return raf(scroll)
    }
    
    cancel()  
    callback(null, element['scroll' + direction])
  }

  raf(scroll)
}

module.exports = {
  top: function(element, target, options, callback) {
    scroll('Top', element, target, options, callback)
  },
  left: function(element, target, options, callback) {
    scroll('Left', element, target, options, callback)
  }
}
