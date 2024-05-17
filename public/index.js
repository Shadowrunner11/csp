
const request = new Request('/reports', {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
});

const cspViolations = [];

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}


const debouncedFetch = debounce((data) => {
  request.body = data;
  fetch(request)
}, 1500);

document.addEventListener('securitypolicyviolation', (event)=>{
  const data = {
    violatedDirective:event.violatedDirective,
    blockedURI: event.blockedURI,
    effectiveDirective: event.effectiveDirective,
    constructor: event.target.constructor?.name,
    elementName: event.target.nodeName,
  }

  cspViolations.push(data);

  debouncedFetch({cspViolations})
})
