<template>
  <v-layout column>
    <v-card>
      <v-card-title>
        {{name}}
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-btn color="primary" @click="moveToWritePage">글쓰기</v-btn>
      </v-card-title>
      <table-component
        ref="table"
        :headers="headers"
        v-model="search"
        :page-req="getQnaList"
        :allow-delete="true"
        :click-row="clickRow"
        :delete-function="deleteQna"
      ></table-component>
    </v-card>
  </v-layout>
</template>

<script>
import table from "@/components/table-component.vue";
import api from "@/apis/api"
import router from "@/router"

export default {
  components: {
    "table-component": table
  },
  name: "qna",
  props: ["id", "name"],
  data: () => ({
    headers: [
      { text: "번호", value: "boardId" },
      { text: "제목", value: "subject" },
      { text: "작성자", value: "userId", sortable: false },
      { text: "조회수", value: "hits", sortable: false },
      { text: "등록일자", value: "regDate" },
      { text: "action", value: "", sortable: false }
    ],
    search: ""
  }),
  created: function() {},
  methods: {
    async getQnaList(page) {
      return await api.getQnaList(this.id,page)
    },
    moveToWritePage() {
      this.$router.push(`/qna/write/${this.name}/${this.id}`);
    },
    async deleteQna(item) {
      if (confirm("삭제하시겠습니까?"))
        return await api.deleteQna(item.boardId)
    },
    clickRow: function(item) {
      router.push(`/qna/answer/${this.name}/${this.id}/${item.boardId}`);
    }
  },
  watch: {
    id() {
      this.$refs.table.sync();
    }
  }
};
</script>
