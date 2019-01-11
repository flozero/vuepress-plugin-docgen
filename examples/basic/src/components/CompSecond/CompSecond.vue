<template>
    <h1>CompSecond {{text}}</h1>
</template>


<script>
export default {
    name: 'CompSecond',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>


<docs>
    <CompSecond />
</docs>
