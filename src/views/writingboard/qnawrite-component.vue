<template>
    <v-container grid-list-xs align-content-center>
        <v-layout row wrap>
            <v-flex xs2>
                <v-avatar :size="logoSize" :tile="tile">
<!--                    <img :src="getLanguageLogoName" alt="X">-->
                </v-avatar>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                        v-model="subject"
                        :counter="30"
                        :rules="titleRules"
                        :label="labelTitle"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12>
                <write-component ref="questionEditor"></write-component>
            </v-flex>
            <v-flex xs12>
                <codemirror-component ref="kmsCodemirror" :language-mode="getLanguageMode"></codemirror-component>
            </v-flex>

            <v-spacer></v-spacer>
            <div></div>
            <v-flex xs12>
                <v-btn
                        :loading="uploading"
                        :disabled="uploading"
                        color="blue-grey"
                        class="white--text"
                        block
                        @click="registerQuestion"
                >
                    Upload
                    <v-icon right dark>cloud_upload</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import codeMirror from "@/components/codemirror-component.vue";
    import write from "@/components/write-component.vue"
    import api from "@/apis/api"
    import router from "@/router"

    export default {
        components: {
            "codemirror-component": codeMirror,
            "write-component": write
        },
        props: ["id", "name"],
        data() {
            return {
                subject: "",
                contents: "contents..",
                code: "const a = 10",
                labelTitle: "제목",
                titleRules: [
                    v => v.length <= 30 || "Title must be less than 30 characters"
                ],
                uploading: false,
                codemirror: true,
                //avatar attribute
                logoSize: 80,
                tile: true
            };
        },
        created: function () {
            (function (object) {
                object.select = object.name;
            })(this);
        },
        methods: {
            async registerQuestion() {
                if (!this.validateQna()) {
                    return;
                }

                this.uploading = true;

                await api.addQna(this.id, this.subject, this.$refs.questionEditor.getText())
                    .then(response => {
                        router.push(
                            "/qna/answer/" +
                            this.name +
                            "/" +
                            this.id +
                            "/" +
                            response.data.boardId
                        );
                        this.uploading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            moveToQnaPage: function (_this) {
                console.log("moveToQnaPage is called");
                this.$router.push("/qna/write/" + _this.name + "/" + _this.id);
            },
            validateQna: function () {
                if (this.select === null || this.select === undefined) {
                    alert("select language!");
                    return false;
                } else if (this.subject.trim().length < 1) {
                    alert("fulfill your subject!");
                    return false;
                } else if (this.$refs.questionEditor.getText().trim() < 1) {
                    alert("fulfill your question content!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        watch: {},
        computed: {
            getLanguageMode() {
                return {name: this.name};
            },
            getLanguageLogoName() {
                return require("@/assets/" + this.name + ".png");
            }
        }
    };
</script>