var run = require('tape')
var scroll = require('../')

var container = document.createElement('div')
var box = document.createElement('div')

container.style.cssText = [
  'height: 100px',
  'outline: 1px solid #000',
  'overflow: scroll',
  'width: 100px'
].join(';')

box.style.cssText = [
  'outline: 1px solid #888',
  'height: 50px',
  'width: 300px'
].join(';')

var n = 50
while (--n) {
  container.appendChild(box.cloneNode(true))
}

document.body.appendChild(container)

run('it works', function(test) {
  container.scrollTop = 0
  container.scrollLeft = 200 

  test.plan(2)

  scroll.top(container, 200, function(error, position) {
    clearTimeout(timeout)
    test.ok(position === 200, 'it scrolled down 200 pixels')
  })

  var leftOptions = { duration: 1000, ease: 'inBounce' }
  scroll.left(container, -200, leftOptions, function(error, position) {
    clearTimeout(timeout)
    test.ok(position === 0, 'it scrolled across 200 pixels')
  })

  var timeout = setTimeout(function() {
    test.fail('it never called back :\'(')
    test.end() 
  }, 1100)
})
