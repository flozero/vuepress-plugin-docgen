<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  render: function(createElement) {
    return createElement('div', this.$props.text)
  }
}
</script>

<docs>
  <withtemplate text="text props"/>
</docs>
