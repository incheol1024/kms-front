<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline primary lighten-2" primary-title>Error!!!!</v-card-title>
      <v-card-text>{{errormsg}}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {ErrorBus} from "@/bus"

export default {
  data: () => ({
    errormsg: "",
    dialog: false
  }),
  created(){
    ErrorBus.$on("error",this.openError)
  },
  methods: {
    openError(msg) {
      if(typeof msg.response === 'undefined')
        this.errormsg = msg.message
      else if(typeof msg.response.data !== 'undefined')
        this.errormsg = msg.response.data
      else
        this.errormsg = msg.response;
      this.dialog = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
