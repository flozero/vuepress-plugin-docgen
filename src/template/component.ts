export default `
# {{displayName}}
{{#if description}}
> {{description}}
{{/if}}

## Props
| Prop name     | Type        | Default  | Description  |
| ------------- |-------------| ---------| -------------|
{{#each props}}
| {{@key}} | {{this.type.name}} | {{this.defaultValue.value}} | {{{this.description}}} |
{{/each}}

## Methods

`
