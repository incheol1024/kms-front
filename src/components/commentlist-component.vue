<template>

    <v-layout row wrap>
        <v-flex xs12>
            <v-card :flat="true">
                <template v-for="(comment, index) in comments">
                    <v-card-title>
                        <v-avatar color="grey lighten-4"
                                  :tile="avatarTile"
                                  :size="avatarSize">
                            <v-icon dark>account_circle</v-icon>
                        </v-avatar>
                        {{ comment.cmtId }} - {{ comment.cmtDate }}
                        <v-spacer></v-spacer>

                        <v-btn icon @click="updateComment(comment, index)">
                            <v-icon>build</v-icon>

                        </v-btn>
                        <v-btn icon @click="deleteComment(comment.cmtId, index)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-title>

                    <v-card-actions>
                        <div v-html="comment.cmtContents"></div>
                    </v-card-actions>

                    <codemirror ref="myCm"
                                :value="comment.cmtCode"
                                :options="cmOptions"
                                v-if="isExistData(comment.cmtCode)"
                    >
                    </codemirror>

                    <v-card-actions v-if="isExistDocEntry(comment.docDtos)">
                        <div>
                            <template v-for="doc in comment.docDtos">
                                <v-chip close color="orange" label :key="index"
                                        @click="fileDownload(doc)">
                                    {{doc.docName}}
                                </v-chip>
                            </template>
                        </div>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn icon color="blue lighten-2" @click.prevent="updateLike(comment.cmtId, index)">
                            <v-icon>thumb_up</v-icon>
                        </v-btn>
                        <span class="subheading mr-2">{{comment.cmtLike}}</span>
                    </v-card-actions>
                    <v-divider :light="dividerLineLight"></v-divider>
                </template>
            </v-card>
        </v-flex>

        <v-flex xs12>
            <commentpage-component
                    ref="commentPage"
                    :id="Number(id)"
                    :name="name"
                    :qid="Number(qid)"
                    @refresh-comments="refreshComments">
            </commentpage-component>
        </v-flex>
    </v-layout>

</template>


<script>
import commentpage from "@/components/commentpage-component.vue";
import axios from "axios";

   export default {
  components: {
    
    "commentpage-component": commentpage
  
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
        },
        data() {
            return {
                cmtId: 1,
                cmtContents: "default comment",
                cmOptions: {
                    tabSize: 4,
                    mode: 'text/javascript',
                    theme: 'monokai',
                    lineNumbers: true,
                    line: true,
                    styleActiveLine: true,
                    lineWrapping: true,
                    lineSeparator: "</br>",
                    readOnly: 'nocursor'
                },
                multiPartFile: [],
                comments: [],
                docs: [],
                avatarTile: true,
                avatarSize: '80px',
                dividerLineLight: true,
                cardFlat: true,
                dialog: false
            }
        },
        created: function () {
            console.log("commentlist-component created");
        },
        methods: {
            requestFirstPage: function () {
                console.log("commentlist-component requestFirstPage");
                this.$refs.commentPage.getComments(1);
            },
            refreshComments: function (comments) {
                this.comments = comments;
            },
            updateComment: function () {

                console.log("update Comment");
                this.dialog = true;
                return;

                axios.post('/comment/update',
                    {
                        boardId: this.boardId,
                        cmtId: this.cmtId,
                        cmtContents: this.cmtContents
                    })
                    .then(response => {
                        this.comments.push(response.data);
                    })
                    .catch(error => {
                        catchPromise(error);
                    });
            },
            deleteComment: function (cmtId, index) {
                if (confirm('답글을 삭제 하시겠습니까?')) {
                    axios.delete('/comment/delete',
                        {
                            params: {cmtId: cmtId}
                        })
                        .then(response => {
                            if (Number(response.data) === Number(cmtId)) {
                                // const pageNumber = this.$refs.commentPage.getCurrentPageNumber();
                            }
                        })
                        .catch(error => {
                            catchPromise(error);
                        })
                } else {
                    // Do nothing!
                }
            },
            updateLike: function (cmtId, index) {

                axios.post('/comment/like/' + cmtId)
                    .then(response => {
                        this.comments[index].cmtLike = response.data.cmtLike;
                        console.log(response.data);
                    })
                    .catch(error => {
                        catchPromise(error);
                    })
            },
            fileDownload: function (doc) {

                axios.get('/file/download/' + doc.docId,
                    {docId: doc.docId},
                    {headers: {responseType: 'blob'}})
                    .then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', doc.docName); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            isExistData: function (data) {
                if (data === undefined || data === null || data === '0' || 0 === Number(data)) {
                    return false;
                } else {
                    return true;
                }
            },
            isExistDocEntry: function (docEntry) {
                //docEntry 배열임 배열로 처리해야함
                if (docEntry === null || docEntry === undefined)
                    return false;
                if (docEntry.length > 0)
                    return true;
                return false;
            },
            onCmReady(cm) {
                console.log('the editor is readied!', cm);
            },
            onCmFocus(cm) {
                console.log('the editor is focus!', cm);
            },
            onCmCodeChange(newCode) {
                console.log('this is new code', newCode);
                this.code = newCode
            },
            onCkViewReady(editor) {
                console.log('this is ckeditor view ready');
            }

        },
        watch: {
            pageNumber: function () {
                console.log("commentlist-component " + this.pageNumber);
            }
        }
    }
</script>

<style scoped>

</style>