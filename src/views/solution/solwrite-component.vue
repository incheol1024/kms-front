<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-text-field v-model="curSolution.boardDetailDto.subject" label="제목" single-line></v-text-field>
    </v-flex>
    <v-flex xs12>
      <write-component ref="editor" v-bind:read-only="curSolution.boardDetailDto.readOnly"></write-component>
    </v-flex>
    <v-flex xs12 lg4>
      <v-btn
        v-if="!curSolution.boardDetailDto.readOnly"
        :loading="loading"
        :disabled="loading"
        color="primary"
        @click="save"
      >{{buttonName}}</v-btn>
    </v-flex>
    <v-flex v-if="showComment" xs12>
      <comment-component comment-component :qid="boardId"></comment-component>
    </v-flex>
  </v-layout>
</template>

<script>
import * as util from "@/util";
import {SolutionDto} from "@/model";
import api from "@/apis/api";
import router from "@/router";
import table from "@/components/table-component.vue";
import comment from "@/components/comment-component.vue";
import write from "@/components/write-component.vue";
import {ErrorBus} from "@/bus";

export default {
  components: {
    "table-component": table,
    "comment-component": comment,
    "write-component" : write
  },
  props: ["menuId", "boardId"],
  data: () => ({
    buttonName: "New Save",
    loading: false,
    showComment: false,
    curSolution: util.copyObject(SolutionDto)
  }),
  async mounted() {
    if (this.boardId === "0") {
      this.buttonName = "New Save";
      this.showComment = false;
    } else {
      this.buttonName = "Edit";
      this.showComment = true;
      let response = await api.getSolutionDetail(this.menuId, this.boardId);
      this.curSolution.boardDetailDto = response.data;
      this.$refs.editor.setText(this.curSolution.boardDetailDto.contents);
      this.curSolution.boardId = this.boardId;
    }
  },
  methods: {
    async save() {
      this.loading = true;
      this.curSolution.menuId = this.menuId;
      this.curSolution.boardDetailDto.boardId = this.curSolution.boardId;
      this.curSolution.boardDetailDto.contents = this.$refs.editor.getText();
      try {
        if (this.boardId !== "0") await api.updateSolution(this.curSolution);
        else await api.addSolution(this.curSolution);
      } catch (e) {
        ErrorBus.$emit("error",e)
      } finally {
        this.loading = false;
        router.push(`/solutions/${this.menuId}`);
      }
    }
  }
};
</script>