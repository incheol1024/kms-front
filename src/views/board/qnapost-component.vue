<template>
  <v-container :align-center="true">
    <v-layout row wrap align-content-center>
      <question-component :id="Number(id)" :name="name" :qid="Number(qid)"></question-component>

      <comment-component
        :id="Number(id)"
        :name="name"
        :qid="Number(qid)"
        :is-required-code-button="true"
        :is-required-file-button="true"
      ></comment-component>
    </v-layout>
  </v-container>
</template>
<script>
import qna from "@/components/question-component.vue"
import comment from "@/components/comment-component.vue"

export default {
  components :{
    "comment-component" : comment,
    "question-component" : qna,
  },
  props: ["id", "name", "qid"]
  /*
        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            qid: {
                type: Number,
                required: true
            }
        }
*/
};
</script>
