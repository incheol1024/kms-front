<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline primary lighten-2" primary-title>Error!!!!</v-card-title>
      <v-card-text>{{errormsg}}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    errormsg: "",
    dialog: false
  }),
  methods: {
    openError(msg) {
      this.errormsg = msg;
      dialog = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
