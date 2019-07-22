<template>
  <ckeditor :editor="editor" v-model="editorData" :config="getConfig" :disabled="readOnly"></ckeditor>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: {
    readOnly: {
      default: false,
      type: Boolean,
      required: false
    },
    toolbar: {
      default: true,
      type: Boolean,
      required: false
    }
  },
  data: () => ({
    editorData: "",
    editor: ClassicEditor
  }),
  computed: {
    getConfig() {
      return this.toolbar ? {} : { toolbar: [] };
    }
  },
  methods: {
    getText() {
      return this.editorData;
    },
    setText(value) {
      this.editorData = value;
    }
  }
};
</script>

<style scoped>
</style>