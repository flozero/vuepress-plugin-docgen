<script>
export default {
  name: 'MdButton',
  props: {
    someProp: {
      type: String,
      default: ""
    }
  },
  render(createElement) {
    return createElement(
      'div', { },
      [ 
        createElement('button', this.someProp)
      ]
    )
  }
}
</script>

<docs>
  <subwithrender />
</docs>