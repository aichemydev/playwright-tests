const _isFunction = function (f) {
  try {
    return /^\s*\bfunction\b/.test(f)
  } catch (x) {
    return false
  }
}

const _register_event = (function () {
  const register_event = function (
    element,
    type,
    handler,
    oldSchool,
    useCapture
  ) {
    if (!element) {
      console.error('No valid element provided to register_event')
      return
    }

    if (element.addEventListener && !oldSchool) {
      element.addEventListener(type, handler, !!useCapture)
    } else {
      const ontype = 'on' + type
      const old_handler = (element)[ontype] // can be undefined
      ;(element)[ontype] = makeHandler(element, handler, old_handler)
    }
  }

  function makeHandler (
    element,
    new_handler,
    old_handlers
  ) {
    return function (event) {
      event = event || fixEvent(window.event)

      // this basically happens in firefox whenever another script
      // overwrites the onload callback and doesn't pass the event
      // object to previously defined callbacks.  All the browsers
      // that don't define window.event implement addEventListener
      // so the dom_loaded handler will still be fired as usual.
      if (!event) {
        return undefined
      }

      let ret = true
      let old_result

      if (_isFunction(old_handlers)) {
        old_result = old_handlers(event)
      }
      const new_result = new_handler.call(element, event)

      if (false === old_result || false === new_result) {
        ret = false
      }

      return ret
    }
  }

  function fixEvent (event) {
    if (event) {
      event.preventDefault = fixEvent.preventDefault
      event.stopPropagation = fixEvent.stopPropagation
    }
    return event
  }

  fixEvent.preventDefault = function () {
    ;(this).returnValue = false
  }
  fixEvent.stopPropagation = function () {
    ;(this).cancelBubble = true
  }

  return register_event
})()

async function awaitableTimeout (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function eventHandler (event) {
  console.log("waiting for a second...")
  await awaitableTimeout(1000)
}

// do the registration
_register_event(document, 'submit', eventHandler, false, true)
_register_event(document, 'change', eventHandler, false, true)
_register_event(document, 'click', eventHandler, false, true)
console.log("loaded initscript")
