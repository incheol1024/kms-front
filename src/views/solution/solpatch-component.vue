<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-btn color="primary" @click="patchWrite">패치작성</v-btn>
    </v-card-title>
    <table-component
      ref="table"
      :headers="headers"
      v-model="search"
      :page-req="getSolutionList"
      :allow-delete="true" 
      :sort-by="'boardId'"
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
      { text: "중요도", value: "importance", sortable: false },
      { text: "버전", value: "version", sortable: false },
      { text: "작성자", value: "userId", sortable: false },
      { text: "조회수", value: "hits", sortable: false },
      { text: "수정일", value: "updDate" },
      { text: "등록일자", value: "regDate" },
      { text: "action", value: "action", sortable: false }
    ],
    search: ""
  }),
  watch: {
    id() {
      this.$refs.table.sync();
    }
  },
  methods: {
    async getSolutionList(page) {
      return await api.getSolutionPatchList(this.id, page);
    },
    patchWrite() {
      router.push(`/solutions/write/patch/${this.id}/0`);
    },
    async deleteSolution(item) {
      if (confirm("p_삭제하시겠습니까?"))
        return await api.deleteSolutionPatch(item.boardId);
    },
    clickRow(item) {
      router.push(`/solutions/write/patch/${this.id}/${item.boardId}`);
    }
  }
};
</script>

<style scoped>
</style>