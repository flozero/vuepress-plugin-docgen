<template>
  <div>
    <!-- @slot Use this slot default -->
    <slot></slot>
  </div>
</template>
 
<script>
/**
 * This is an example of creating a reusable grid component and using it with external data.
 * @version 1.0.5
 * @author [Rafael](https://github.com/rafaesc92)
 * @since Version 1.0.1
 */
export default {
  name: 'Comp',
  props: {
    /**
     * object/array defaults should be returned from a factory function
     * @version 1.0.5
     * @since Version 1.0.1
     * @see See [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
     * @link See [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
     */
    msg: {
      type: [String, Number],
      default: ""
    },
    /**
     * Model example
     * @model
     */
    value: {
      type: String
    },
    /**
     * describe data
     * @version 1.0.5
     */
    data: [Array],
    /**
     * get columns list
     */
    columns: [Array],
    /**
     * filter key
     * @ignore
     */
    filterKey: {
      type: String,
      default: 'example'
    }
  },
  data () {
    return {
      sortKey: '',
      sortOrders: []
    }
  },
  methods: {
    /**
     * Sets the order
     *
     * @public
     * @version 1.0.5
     * @since Version 1.0.1
     * @param {string} key Key to order
     * @returns {string} Test
     */
    sortBy: function () {
      /**
       * Success event.
       *
       * @event success
       * @type {object} 
       */
      this.$emit('success', {
        demo: 'example',
      })
    },
    hiddenMethod: function(){}
  }
}
</script>


<docs>
    <Comp>Default comp Slot</Comp>
</docs>