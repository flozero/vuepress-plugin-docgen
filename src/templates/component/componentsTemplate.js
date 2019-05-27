module.exports = `
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
{{#each methods}}
<span style="color:rgba(34, 167, 240, 1)"><h3>{{this.name}}</h3></span>
>{{this.description}}
### Params
| Param name     | Type        | Description  |
| ------------- |------------- | -------------|
{{#each this.params}}
| {{this.name}} | {{this.type.name}} | {{{this.description}}} |
{{/each}}

### Return
| Type        | Description  |
| ------------- | -------------|
| {{this.returns.type.name}} | {{this.returns.description}} | 
{{else}}
{{/each}}

## Events
{{#each events}}
| Event name     | Type        | Description  |
| ------------- |------------- | -------------|
| {{@key}} | {{#each this.type}}{{this}}{{/each}} | {{ this.description }}
{{/each}}
`;
