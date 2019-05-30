<template functional>
  <div>
    <no-ssr>
      <h1>Hello {{props.text}}</h1>
    </no-ssr>
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
