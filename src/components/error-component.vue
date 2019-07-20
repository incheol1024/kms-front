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
    
}
</script>

<style lang="stylus" scoped>

</style>
