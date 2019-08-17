<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-btn color="primary" @click="bugWrite">버그작성</v-btn>
    </v-card-title>
    <table-component
      ref="table"
      :headers="headers"
      v-model="search"
      :page-req="getSolutionBugList"
      :allow-delete="true"
      :delete-function="deleteSolution"
      :click-row="clickRow"
    ></table-component>
  </v-card>
</template>

<script>
import table from "@/components/table-component.vue";
import api from "@/apis/api";
import router from "@/router";
export default {
  components: {
    "table-component": table
  },
  props: ["id"],
  data: () => ({
    headers: [
      { text: "번호", value: "boardId" },
      { text: "제목", value: "subject" },
      { text: "작성자", value: "userId", sortable: false },
      { text: "사이트", value: "site", sortable: false },
      { text: "조회수", value: "hits", sortable: false },
      { text: "등록일자", value: "regDate" },
      { text: "수정일", value: "updDate" },
      { text: "담당자", value: "manager", sortable: false },
      { text: "해결여부", value: "completed", sortable: false },
      { text: "action", value: "action", sortable: false }
    ],
    search: ""
  }),
  watch: {
    id: function() {
      this.$refs.table.sync();
    }
  },
  methods: {
    async getSolutionBugList(page) {
      return await api.getSolutionBugList(this.id, page);
    },
    bugWrite: function() {
      router.push(`/solutions/write/bug/${this.id}/0`);
    },
    async deleteSolution(item) {
      if (confirm("삭제하시겠습니까?"))
        return await api.deleteSolution(item.boardId);
    },
    clickRow: function(item) {
      router.push(`/solutions/write/bug/${this.id}/${item.boardId}`);
    }
  }
};
</script>

<style scoped>
</style>