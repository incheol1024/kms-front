.
<template>
  <v-layout column>
    <v-flex class="mb-5">
      <v-layout align-center>
        <v-card raised>
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0">Current Group</h4>
            </div>
          </v-card-title>
          <tree-component
            ref="tree"
            :items="items"
            :busname="'tree'"
            :cachekey="'id'"
            @nodeevent="actived"
          ></tree-component>
          <v-btn text color="primary" @click="NewItem">New</v-btn>
          <v-btn text color="primary" @click="EditName">EditName</v-btn>
          <v-btn text color="primary" @click="DeleteItem">Delete</v-btn>
        </v-card>

       
        <v-icon slot="activator" color="pink" @click="Move">arrow_forward</v-icon>
         

        <v-card raised>
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0">Moved Group</h4>
            </div>
          </v-card-title>
          <tree-component ref="subtree" :items="items" :busname="'subtree'" :cachekey="'id'"></tree-component>
        </v-card>
      </v-layout>
    </v-flex>

    <v-flex>
      <v-card raised>
        <v-card-title>
          Child User, Group
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <table-component ref="table" :headers="headers" :search="search"></table-component>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title>Set New Name</v-card-title>
        <v-card-text>
          <v-text-field v-model="newname" label="Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import tree from "@/components/tree-component.vue";
import table from "@/components/table-component.vue";
import api from "@/apis/api";
import * as util from "@/util"

export default {
  components: {
    "tree-component": tree,
    "table-component": table
  },
  async created() {
    try {
      let reponse = await api.getGroup();
      this.items = reponse.data;
      this.$refs.tree.recurCache(this.items);
      this.$refs.subtree.recurCache(this.items);
    } catch (e) {
      console.error(e);
    }
  },
  data: () => ({
    items: {},
    newname: "",
    search: "",
    headers: [
      { text: "name", value: "name", sortable: false },
      { text: "type", value: "type", sortable: false }
    ],
    dialog: false,
    updateMode: false
  }),
  methods: {
    async actived(page) {
      this.$refs.table.clear();
      if (this.$refs.tree.active.items) {
        try {
          let response = await api.getGroupChild(
            this.$refs.tree.active.items.id,
            page
          );
          let groupList = response.data.groupList.content;
          let userList = response.data.userList.content;
          this.$refs.table.total = groupList.length + userList.length;
          for (let i = 0; i < groupList.length; i++) {
            groupList[i].type = "Group";
            this.$refs.table.addFunction(groupList[i]);
          }
          for (let i = 0; i < userList.length; i++) {
            userList[i].type = "User";
            this.$refs.table.addFunction(userList[i]);
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    async confirm() {
    try{
        if (this.updateMode) {
            this.$refs.tree.active.items.name = this.newname;
            let reponse = await api.getSingleGroup(this.$refs.tree.active.items)
            this.$refs.tree.updateNode(this.newname);
        } else {
            let temp = util.copyObject(GroupModel);
            temp.parentId = this.$refs.tree.active.items.id;
            temp.name = this.newname;
            let reponse = await api.addGroup(temp)
            temp.id = value.data;
            this.$refs.tree.addNode(temp);
        }
    }
        catch(e){
            console.error(e)
        }
        finally{
      this.dialog = false;
        }
    },
    NewItem() {
      this.dialog = true;
      this.updateMode = false;
      this.newname = "";
    },
    EditName() {
      this.dialog = true;
      this.updateMode = true;
      this.newname = this.$refs.tree.active.items.name;
    },
    async Move() {
      let temp = util.copyObject(GroupModel);
      temp.id = this.$refs.tree.active.items.id;
      temp.parentId = this.$refs.subtree.active.items.id;
      temp.name = this.$refs.tree.active.items.name;
      let reponse = await api.updateGroup(temp)
        this.$refs.tree.moveNode(_this.$refs.subtree.active.items.id);
    },
    async DeleteItem() {
     let reponse = api.deleteGroup(_this.$refs.tree.active.items.id)
     this.$refs.tree.deleteNode();
    }
  }
};
</script>
