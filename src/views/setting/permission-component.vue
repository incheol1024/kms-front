<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex align-space-around>
        <v-card>
          <v-card-title>
            <v-layout wrap column>
              <h3 class="headline mb-0">Acl List</h3>
              <v-list two-line>
                <template v-for="data in listData">
                  <v-list-tile :key="data.aclId" ripple @click="setItem(data)">
                    <v-list-tile-content>
                      <v-list-tile-title>{{data.aclId}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{data.aclName}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider :key="data.aclId"></v-divider>
                </template>
              </v-list>
            </v-layout>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="newAcl">NewAcl</v-btn>
            <v-btn color="primary" @click="deleteAcl">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-tabs color="transparent">
            <v-tab>Edit Acl</v-tab>
            <v-tab>Set User/Group</v-tab>
            <v-tab-item>
              <v-card-title class="title">
                <v-layout wrap row>
                  <v-form>
                    <v-text-field label="Acl Id" v-model="curAcl.aclId"></v-text-field>
                    <v-text-field label="Acl Name" v-model="curAcl.aclName"></v-text-field>
                    <h6>Has Permission</h6>
                    <v-chip
                      v-for="value in curAcl.hasPermission"
                      :key="value.value"
                      v-show="value.has"
                      close
                      v-model="value.has"
                      @input="deleteRule(value)"
                    >{{value.name}}</v-chip>
                    <h6>Add NewRule</h6>
                    <v-select :items="addPermission" outline item-text="name" @change="addRule"></v-select>
                  </v-form>
                </v-layout>
              </v-card-title>
              <v-card-actions>
                <v-btn color="primary" @click="confirmAcl">{{aclText}}</v-btn>
              </v-card-actions>
            </v-tab-item>
            <v-tab-item>
              <v-card-title class="title">
                <v-layout wrap column>
                  <table-component
                    ref="table"
                    :headers="headers"
                    :page-req="aceReq"
                    :allow-delete="true"
                    :delete-function="deleteAce"
                  ></table-component>
                </v-layout>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-text-field class="mr2" label="Ace(Gropp/User) Id" v-model="aceText"></v-text-field>
                <v-btn color="primary" @click="addAce">AddAce</v-btn>
              </v-card-actions>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as util from "@/util";
import api from "@/apis/api";
import table from "@/components/table-component.vue";

export default {
  components: {
    "table-component": table
  },
  data: () => ({
    curAcl: util.copyObject(ACLMODEL),
    listData: [],
    updateMode: false,
    aclText: "Make",

    curAce: util.copyObject(ACEMODEL),
    aceText: "",
    headers: [
      { text: "aceId", value: "aceId" },
      { text: "action", value: "action", sortable: false }
    ]
  }),
  async created() {
    let response = await api.getAclList(util.getJavaMaxPage());
    this.listData = response.data.content;
  },
  computed: {
    addPermission() {
      return this.curAcl.hasPermission.filter(permission => !permission.has);
    }
  },
  methods: {
    async confirmAcl() {
      if (this.updateMode) await api.updateAcl(this.curAcl);
      else {
        let reponse = await api.addAcl(this.curAcl);
        this.listData.push = this.curAcl;
      }
      this.updateMode = false;
      this.curAcl = util.copyObject(ACLMODEL);
    },
    async deleteAcl() {
      await api.deleteAcl(this.curAcl.aclId);
      this.listData.splice(this.listData.indexOf(this.curAcl), 1);
      this.newAcl();
    },
    newAcl() {
      this.updateMode = false;
      this.curAcl = util.copyObject(ACLMODEL);
      this.aclText = "Make";
    },
    setItem(item) {
      this.curAcl = item;
      this.aclText = "Update";
      this.updateMode = true;
      this.$refs.table.sync();
    },
    addRule(item) {
      this.curAcl.hasPermission.filter(it => it.value === item)[0].has = true;
    },
    deleteRule(item) {
      item.has = false;
    },
    async aceReq(page) {
      if (this.curAcl.aclId !== "") {
        return await api.getAceList(this.curAcl.aclId, page);
      }
    },
    async deleteAce(item) {
      return await api.deleteAce(item.aclId, item.aceId);
    },
    async addAce() {
      if (this.curAcl.aclId !== "") {
        let ace = { aclId: this.curAcl.aclId, aceId: this.aceText };
        await api.addAce(ace);
        this.$refs.table.addFunction(ace);
      }
    }
  }
};
</script>