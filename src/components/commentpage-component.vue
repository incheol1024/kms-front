<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <v-card :flat="cardFlat" :hover="true">
        <v-card-text>
          <v-pagination
            v-model="number"
            :dark="true"
            :length="totalPages"
            :circle="true"
            :total-visible="totalVisible"
            :value="number"
          ></v-pagination>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import api from "@/apis/api"

export default {
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
  },
  data() {
    return {
      page: 1,
      size: 3,
      sort: "cmtId,desc",
      comments: [],
      totalVisible: 5,
      maxPage: 5,
      // page object variable
      empty: false, // 코멘트가 있는지 여부
      first: true, // 첫번째 페이지 여부
      last: false, // 마지막 페이지 여부
      totalPages: 0, // 총 필요 페이지 수
      number: 1, // 현재 페이지 번호 ( 요청시 number-1을 보낼것)
      totalElements: 0, // 총 댓글 개수
      numberOfElements: 0, // 현재 댓글 개수
      // vuetify component props
      cardFlat: true
    };
  },

  created: function() {
    console.log("commnetpage-component created");
    this.getComments(this.page);
  },
  methods: {
    getComments: function(pageNumber) {
        api.getCommentList(this.qid,pageNumber,this.size,this.sort)
        .then(response => {
          this.setPageValues(response.data);
          return response;
        })
        .then(response => {
          if (response.data.content.length > 0) {
            this.removeComment();
            this.setComment(response.data.content);
            this.emitComment();
          }
        })
        .catch(error => {
            console.error(error)
        });
    },
    emitComment: function() {
      console.log("emitComment");
      this.$emit('refresh-comments', this.comments);
      // commentBus.$emit('refresh-comments', this.comments);
    },
    removeComment: function() {
      this.comments = [];
    },
    setComment: function(contents) {
      contents.forEach(content => {
        this.comments.push(content);
      });
    },
    setPageValues: function(responseData) {
      this.empty = responseData.empty;
      this.first = responseData.first;
      this.last = responseData.last;
      this.totalPages = responseData.totalPages;
      this.number = responseData.number + 1;
      this.totalElements = responseData.totalElements;
      this.numberOfElements = responseData.numberOfElements;
    },
    getTotalPages() {
      return this.totalPages;
    },
    getCurrentPageNumber: function() {
      return this.number;
    }
  },
  watch: {
    number: function(number) {
      this.getComments(number);
    }
  }
};
</script>
