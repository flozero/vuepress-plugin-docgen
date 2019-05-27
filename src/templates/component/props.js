const tmpl = function(props = {}) {
  let ret = '';

  Object.keys(props).forEach(p => {
    const pr = props[p]
    const n = pr.type.name ? pr.type.name : '';
    const v = pr.defaultValue && pr.defaultValue.value ? pr.defaultValue.value : '';
    const d = pr.description ? pr.description : ''

    ret += `| ${p} | ${n} | ${v} | ${d} | \n`
  })
  return ret;
}

module.exports = function(props) {
  if (Object.keys(props).length === 0) return '';
  return `
  ## Props
  | Prop name     | Type        | Default  | Description  |
  | ------------- |-------------| ---------| -------------|
  ${tmpl(props)}
  `
}