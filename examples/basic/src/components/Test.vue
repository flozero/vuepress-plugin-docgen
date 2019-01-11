<template>
    <h1>hello {{text}}</h1>
</template>


<script>
export default {
    name: 'Test',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>


<docs>
    <Test />
</docs>
