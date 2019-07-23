<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <commentwrite-component
        :id="Number(id)"
        :name="name"
        :qid="Number(qid)"
        :is-required-code-button="isRequiredCodeButton"
        :is-required-file-button="isRequiredFileButton"
      ></commentwrite-component>
    </v-flex>

    <v-flex xs12>
      <commentlist-component :id="Number(id)" :name="name" :qid="Number(qid)"></commentlist-component>
    </v-flex>

    <template v-show="seenCommentpage">
      <v-flex xs12>
        <commentpage-component :id="Number(id)" :name="name" :qid="Number(qid)"></commentpage-component>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import commentwrite from "@/views/writingboard/commentwrite-component.vue";
import commentlist from "@/components/commentlist-component.vue"
import commentpage from "@/components/commentpage-component.vue";

export default {
  components: {
    "commentwrite-component": commentwrite,
    "commentpage-component": commentpage,
    "commentlist-component" : commentlist
  },
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
    },
    isRequiredCodeButton: {
      type: Boolean,
      default: false
    },
    isRequiredFileButton: {
      type: Boolean,
      default: false
    }
  }
};
</script>

