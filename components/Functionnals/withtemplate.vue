<template functional>
  <div>
    <h1>Hello {{props.text}}</h1>
  </div>
</template>


<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
}
</script>

<docs>
  <withtemplate />
</docs>
