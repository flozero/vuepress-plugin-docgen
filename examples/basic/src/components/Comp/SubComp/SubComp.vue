<template>
    <h1>SubComp {{text}}</h1>
</template>


<script>
export default {
    name: 'SubComp',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>


<docs>
    <SubComp />
</docs>
