<script>
import simpleMixin from '../mixins/simple';
import subwithrender from './subComponents/subwithrender';

export default {
  name: 'MdButton',
  mixins: [simpleMixin],
  computed: {
    bigText() {
      return "big Text";
    }
  },
  render(createElement) {
    return createElement(
      'div', { },
      [
        createElement('h1', this.text),
        createElement('h1', this.bigText),
        createElement(subwithrender, {
          props: {
            someProp: 'i am a sub component with props'
          }
        })
      ]
    )
  }
}
</script>

<docs>
  <withrender />
</docs>