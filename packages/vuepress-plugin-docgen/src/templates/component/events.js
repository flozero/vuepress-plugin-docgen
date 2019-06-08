const tmpl = function(events) {
  let ret = ''
  Object.keys(events).forEach(i => {
    const e = events[i];
    const t = e.type && e.type.names ? e.type.names.join(' ') : '';
    ret += `| ${i} | ${t} | ${events[i].description || ''}`
  })
  return ret;
}

module.exports = function(events) {

  if (Object.keys(events).length === 0) return ''

  return `
  ## Events
  | Event name     | Type        | Description  |
  | ------------- |------------- | -------------|
  ${tmpl(events)}
  `
}