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
      </v-flex>
          <v-layout>
      <v-dialog v-model="dialog" width="500" persistent="true">
        <v-card>
          <v-card-title class="headline primary lighten-2" primary-title>ADD NEW PROJECT</v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="curProject.name" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
                  v-model="startDialog"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="curProject.startDate"
                      label="Start Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="curProject.startDate" @input="startDialog = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
                  v-model="endDialog"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="curProject.endDate"
                      label="End Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="curProject.endDate" @input="endDialog = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="curProject.manager" label="Manager"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog =false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addProject">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout> 
    </v-layout>
 
  </v-layout>
</template>

<script>
import table from "@/components/table-component.vue";
import * as util from "@/util"
import {PROJECTMODEL} from "@/model"
import router from "@/router"
import api from "@/apis/api"

export default {
  components: {
    "table-component": table
  },
  props: ["id", "siteId"],
  watch: {
   
  },
  data: () => ({
    window: 0,
    curProject: util.copyObject(PROJECTMODEL),
    dialog: false,
    startDialog: false,
    endDialog: false,
    projectHeader: [
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
        return api.getSiteProjectList(this.id, this.siteId, page)
    },
    addProject: function() {
      let _this = this;
      _this.curProject.siteId = _this.siteId;
      _this.curProject.projectId = 0;
      api.addSiteProject(_this.siteId,_this.curProject)
        .then(res => {
          _this.curProject.projectId = res.data;
          _this.$refs.table.addFunction(_this.curProject);
        })
        .catch(reason => console.error(reason));
      this.dialog = false;
       this.$refs.table.sync();
    },
    deleteProject: function(item) {
      if (confirm("삭제하시겠습니까?"))
        return api.deleteSiteProject(item.siteId, item.projectId)
        this.$refs.table.sync();
    },
    getBoard: function(item) {
      let _this = this;
      _this.curProject.name = item.name;
      _this.curProject.projectId = item.projectId;

      router.push(`/sites/${this.id}/${this.siteId}/${item.projectId}`);
    
    }
  }
};
</script>