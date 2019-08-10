<template>
  <v-layout >
    <v-layout >
      <v-flex xs12 >
            <h3>Site :</h3>
            <table-component
              ref="table"
              :headers="projectHeader"
              :page-req="getProjects"
              :allow-delete="true"
              :delete-function="deleteProject"
              :click-row="getBoard"
            ></table-component>
            <v-btn color="primary" @click="dialog = true">Add Project</v-btn>
            <v-btn color="primary" @click="backSite">BACK SITE</v-btn>
            <v-btn color="primary" @click="boardCall">Board Call</v-btn>
      </v-flex>
          <v-layout>
            <sitesdialog-component 
              :id="Number(this.id)"
              :siteId="Number(this.siteId)"
              :dialog="dialog"
              v-on:closemodal="closemodal">
            </sitesdialog-component>
     
           </v-layout> 
      </v-layout>
 
  </v-layout>
</template>

<script>
import table from "@/components/table-component.vue";
import sitedialog from "@/views/site/sitesdialog-component.vue";
import * as util from "@/util"
import {PROJECTMODEL} from "@/model"
import {GRADE} from "@/model"
import {STEP} from "@/model"
import router from "@/router"
import api from "@/apis/api"
import { setPriority } from 'os';

export default {
  name:"project-component",
  components: {
    "table-component": table,
    "sitesdialog-component": sitedialog
  },
  props: ["id", "siteId"],
  watch: {

   
  },
  data: () => ({
    window: 0,
    curProject: util.copyObject(PROJECTMODEL),
    curGrade: util.copyObject(GRADE),
    curStep: util.copyObject(STEP),
    dialog: false,
    startDialog: false,
    endDialog: false,
    projectHeader: [
      { text: "siteId", value: "siteId" ,hide : true},
      { text: "projectId",value:"projectId"},
      { text: "프로젝트명", value: "name" },
      { text: "등급(상,중,하)", value: "grade" },
      { text: "진척현황", value: "step" },
      { text: "시작일자", value: "startDate" },
      { text: "완료일자", value: "endDate" },
      { text: "관리자", value: "manager", sortable: false },
      { text: "action", value: "action", sortable: false }
    ]
  }),
  methods: {
    getProjects: function(page) {
      if (this.siteId === 0) return;
      console.log(page);
        return api.getSiteProjectList(this.id, this.siteId, page)
    },

    deleteProject: function(item) {
      if (confirm("삭제하시겠습니까?"))
        return api.deleteSiteProject(item.siteId, item.projectId)
        this.$refs.table.sync();
    },
    getBoard: function(item) {

      console.log('board call');
      let _this = this;
      _this.curProject.name = item.name;
      _this.curProject.projectId = item.projectId;

      router.push(`/sites/${this.id}/${this.siteId}/${item.projectId}`);
    },
    backSite(){
      console.log("siteback ")
      router.go(-1)
    },
    closemodal(){
     this.dialog = false;
     this.$refs.table.sync();
    },
    boardCall(){
      router.push(`/sites/13/9/17`);
    }

  }
};
</script>