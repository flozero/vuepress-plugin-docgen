const params = function(params) {
  let ret = `
  ### Params

  | Param name     | Type        | Description  |
  | ------------- |------------- | -------------|
  `;

  Object.keys(params).forEach(i => {
  const p = params[i]
  const t = p.type && p.type.name ? p.type.name : '';
  const n = p.name ? p.name : '';
  const d = p.description ? p.description : ''

    ret += `| ${n} | ${t} | ${d} |\n`
  })

  return ret;
}

const returns = function(returns) {

    const p = returns;
    const t = p.type && p.type.name ? p.type.name : '';
    const d = p.description ? p.description : ''

    return `
  ### Return
  | Type        | Description  |
  | ------------- | -------------|
  | ${t} | ${d} |
  `
}

const tmpl = function(methods) {
  let ret = '';

  methods.forEach(m => {
    ret +=  `
  <span style="color:rgba(34, 167, 240, 1)"><h3>${m.name || ''}</h3></span>
  > ${m.description || ''}

  ${m.params ? params(m.params) : ''}
  ${m.returns ? returns(m.returns) : ''}
  `
  })
  return ret;
}

module.exports = function(methods) {
  if (Object.keys(methods).length === 0) return ''
  return `
  ## Methods
  ${tmpl(methods)}
  `
}