<template>
  <v-layout>
    <v-dialog v-model="dialog" width="500" persistent>
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
            <v-flex xs12 sm6 md4>
              <v-combobox v-model="curProject.grade" :items="grades"  label="난이도"></v-combobox>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-combobox v-model="curProject.step" :items="steps"  label="진척현황"></v-combobox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="closeModal">Close</v-btn>
          <v-btn color="blue darken-1"  @click="addProject">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import * as util from "@/util"
import {PROJECTMODEL,GRADE,STEP} from "@/model"
import api from "@/apis/api"
import { debuglog } from 'util';

export default {
  props: {
     id: {
                type: Number,
                required: true
          },
      siteId:{
                type: Number,
                required: true
          },
      projectId:{
                type: Number,
          },
      dialog : {
                type: Boolean,
                default: false
      },
      curProject:{ type: Object,default: false}
              
      
  },
  mounted: function() {
   
  },
  beforeMount:function(){
    console.log('before');
    console.log(this.curProject);
    console.log('prop test');
    console.log(this.curProjects);
  },
  computed:function(){
    console.log('compute call')
    console.log(this.curProjects);
  },


  data: () => ({
    curProject: util.copyObject(PROJECTMODEL),
    dialog: false,
    startDialog: false,
    endDialog: false,
    grades: util.copyObject(GRADE),
    steps:util.copyObject(STEP)
  }),
  methods: {
    addProject: function() {
    let _this = this;
      _this.curProject.siteId = _this.siteId;
      _this.curProject.projectId = 0;
      
     
      //
      api.addSiteProject(_this.siteId,_this.curProject)
        .then(res => {
         // _this.curProject.projectId = res.data;
         // _this.$refs.table.addFunction(_this.curProject);
        })
        .catch(reason => console.error(reason));
      this.dialog = false;
      this.$emit('closemodal');
      
    },
    closeModal(){
      this.dialog = false;
      this.$emit('closemodal');
    }
  }
};
</script>