<template>
  <input type="file" :accept="accept" @change="_change" />
</template>
<script>
// polyfill
import 'blueimp-canvas-to-blob';
import loadImage from 'blueimp-load-image';

// https://www.npmjs.com/package/blueimp-load-image#options
const defaultOptions = {
  maxWidth: 750,
  orientation: true,
  canvas: true
};

export default {
  name: 'ImagePicker',
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    validate: {
      type: Function
    }
  },
  methods: {
    _change(e) {
      const file = e.target.files[0];
      if (!this.validate || this.validate(file)) {
        loadImage(
          file,
          (canvas, data) => {
            this.$emit('pick', canvas, data);
          },
          {
            ...defaultOptions,
            ...this.options
          }
        );
      }
    }
  }
};
</script>
