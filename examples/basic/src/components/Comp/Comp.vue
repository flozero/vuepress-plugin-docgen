<template>
    <h1>hello {{text}}</h1>
</template>


<script>
export default {
    name: 'Comp',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>


<docs>
    <Comp />
</docs>
