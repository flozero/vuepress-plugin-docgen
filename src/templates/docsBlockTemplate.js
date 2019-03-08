module.exports = (docsBlock) => `
## Code\n\n\`\`\`html\n${docsBlock.content.replace(
/(\r\n|\n|\r)/gm,
'',
)}\n\`\`\`\n\n## Preview\n${docsBlock.content}
`