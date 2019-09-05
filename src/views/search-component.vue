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
  data: () => ({
    searchData: []
  }),
  async created(){
    let response = await api.searchFts('aaa')
    this.searchData = response.data
  },
  methods: {
    searchDoc() {
      alert("와우!!");
    }
  }
};
</script>