<template>
  <v-layout>
    <v-flex>
      <v-window v-model="window" class="elevation-1" vertical>
        <v-window-item>
          <v-card-title>
            <!--<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>-->
            <h3>Project : {{curProject.name}}</h3>
          </v-card-title>

          <table-component
            ref="table"
            :headers="boardHeader"
            :page-req="getPage_board"
            :click-row="clickBoard"
            :allow-delete="true"
            :delete-function="deleteBoard"
          ></table-component>
          <v-btn color="primary" @click="addBoard">Add Board</v-btn>
          <v-btn color="primary" @click="addBoard">인수인계 등록</v-btn>
          <v-btn color="primary" @click="backProject">BACK Project</v-btn>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>

<script>
import table from "@/components/table-component.vue";
import { PROJECTMODEL } from "@/model";
import * as util from "@/util";
import router from "@/router"
import api from "@/apis/api"

export default {
  components: {
    "table-component": table
  },
  props: ["id", "siteId", "projectId"],
  mounted: function() {},
  watch: {
    id: function(id) {
      this.$refs.table.sync();
    }
  },
  data: () => ({
    window: 0,
    curProject: util.copyObject(PROJECTMODEL),
    dialog: false,
    startDialog: false,
    endDialog: false,
    boardHeader: [
      { text: "boardId", value: "boardId" },
      { text: "제목", value: "subject" },
      { text: "작성자", value: "userId" },
      { text: "수정일", value: "updDate" },
      { text: "등록일", value: "regDate" },
      { text: "조회수", value: "hits" },
      { text: "action", value: "action", sortable: false }
    ]
  }),
  methods: {
    // getBoard: function (item) {
    //     let _this = this;
    //     _this.curProject.name=item.name;
    //     _this.curProject.projectId = item.projectId;
    //     this.window = 2;
    //     this.$refs.table2.sync();
    // },
    getPage_board: function(page) {
      console.log("dd");
      let _this = this;
      if (this.projectId === 0) return;
      return api.getSiteProjectBoardList(_this.id,_this.siteId,_this.projectId,page)
    },
    addBoard: function() {
      let _this = this;
      router.push(
        `/sites/write/${_this.id}/${_this.siteId}/${_this.projectId}/0`
      );
    },
    clickBoard: function(item) {
      let _this = this;
      router.push(
        `/sites/write/${_this.id}/${_this.siteId}/${_this.projectId}/${item.boardId}`
      );
    },
    deleteBoard: function(item) {
      let _this = this;
      if (confirm("삭제하시겠습니까?"))
        return api.deleteSiteProjectBoard(_this.curSite.siteId,_this.curProject.projectId,item.boardId)
    },
    backProject(){
      router.go(-1)
    }
  }
};
</script>