<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-text-field v-model="curSite.boardDetailDto.subject" label="제목" single-line></v-text-field>
        </v-flex>
        <v-flex xs12>
            <write-component ref="editor" v-bind:read-only="curSite.boardDetailDto.readOnly"></write-component>
        </v-flex>
        <v-flex xs12 lg4>
            <v-btn v-if="!curSite.boardDetailDto.readOnly" :loading="loading" :disabled="loading" color="primary"
                   @click="save">
                {{buttonName}}
            </v-btn>
             <v-btn color="primary" @click="back">BACK Project</v-btn>
        </v-flex>
        <v-flex v-if="showComment" xs12>
            <comment-component comment-component :qid="boardId"></comment-component>
        </v-flex>
    </v-layout>
</template>
<script>
import write from "@/components/write-component.vue"
import comment from "@/components/comment-component.vue"
import {SiteDto} from "@/model" 
import * as util from "@/util"
import api from "@/apis/api"
import router from "@/router"

export default  {
    components : {
        "write-component" : write,
        "comment-component" : comment
    },
    props: ["menuId","siteId","projectId", "boardId"],
    data: () => ({
        buttonName: "New Save",
        loading: false,
        showComment : false,
        curSite: util.copyObject(SiteDto)
    }),
    mounted() {
         if (this.boardId === "0") {
            this.buttonName = "New Save";
            this.showComment = false;
        } else {
           
            this.buttonName = "Edit";
            this.showComment = true;
            api.getSiteDeatil(this.menuId,this.siteId,this.projectId,this.boardId)
            .then(value => {
                this.curSite.boardDetailDto = value.data;
                this.$refs.editor.setText(this.curSite.boardDetailDto.contents);
            }).catch(error => console.error(error));
            this.curSite.boardId = this.boardId;
        }
    },
  methods: {
      save: function save() {
          this.loading = true;
          this.curSite.siteId = this.siteId;
          this.curSite.projectId=this.projectId;
          this.curSite.boardDetailDto.boardId = this.curSite.boardId;
          this.curSite.boardDetailDto.contents = this.$refs.editor.getText();
          let fetch ;

          if (this.boardId !== "0")
              fetch = api.updateSiteProjectBoard(this.curSite)
          else
              fetch = api.addSiteProjectBoard(this.curSite)
          fetch.then(response => {
          }).catch(error => console.error(error))
              .finally(() => {
                  this.loading = false;
                  this.$router.go(-1);
                  //this.$router.push(`/sites/${this.menuId}`);
              });
      },
       back(){
           console.log('tt')
         router.go(-1)
    }
  }
}
</script>