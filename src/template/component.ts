export default `
# {{displayName}}

## Props & methods
| Prop name     | Type        | Default  | Description  |
| ------------- |-------------| ---------| -------------|
{{#each props}}
| {{@key}} | {{this.type.name}} | {{this.defaultValue.value}} | {{{this.description}}} |
{{/each}}
`
