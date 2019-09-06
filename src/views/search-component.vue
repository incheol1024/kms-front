<template>
  <v-layout column>
    <v-flex v-for="data in searchData" :key="data.id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{data.name}}</div>
            <span></span>
          </div>
        </v-card-title>      
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import api from "@/apis/api"

export default {
  props : ['word'],
  data: () => ({
    searchData: []
  }),
  watch : {
    word(){
      this.search()
    }
  },
  created(){
      this.search()
  },
  methods :{
    async search(){
      let response = await api.searchFts(this.word)
      this.searchData = response.data.content
    }
  }
};
</script>