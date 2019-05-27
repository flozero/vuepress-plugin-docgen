const tmpl = function(props = {}) {
  let ret = '';

  Object.keys(props).forEach(p => {
    const n = props[p].type.name ? props[p].type.name : '';
    const v = props[p].defaultValue && props[p].defaultValue.value ? props[p].defaultValue.value : '';
    const d = props[p].description ? props[p].description : ''

    ret += `| ${p} | ${n} | ${v} | ${d}`
  })
  return ret;
}

module.exports = function(data) {
  return `
  ## Props
  | Prop name     | Type        | Default  | Description  |
  | ------------- |-------------| ---------| -------------|
  ${tmpl(data)}
  `
}