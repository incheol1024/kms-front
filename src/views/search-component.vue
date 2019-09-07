<template>
  <v-layout column>
    <v-card v-for="data in searchData" :key="data.id" class="mx-auto" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{data.time}}</div>
          <v-list-item-title class="headline mb-1">{{data.name}}</v-list-item-title>
          <v-list-item-subtitle>{{data.user}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-layout>
</template>

<script>
import api from "@/apis/api";

export default {
  props: ["word"],
  data: () => ({
    searchData: []
  }),
  watch: {
    word() {
      this.search();
    }
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      let response = await api.searchFts(this.word);
      this.searchData = response.data.content;
    }
  }
};
</script>