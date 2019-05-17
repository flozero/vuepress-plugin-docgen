const remark = require('remark')
const visit = require('unist-util-visit')

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

module.exports = markdown => {
    function processCode() {
        return ast => {
            visit(ast, 'code', node => {
                node.type = 'html'
                node.lang += ' live'
                node.value = `<vue-live code="${htmlEscape(node.value)}"/>`
            })
        }
    }

    const rendered = remark()
        .use(processCode)
        .processSync(markdown)
        .toString()
    return rendered
}
