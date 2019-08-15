<template inline-template>
  <div>
    <v-data-table
      :headers="headers"
      :items="datas"
      :options.sync="pagination"
      :server-items-length="totalCount"
      :show-select="allowSelect"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as util from "@/util";

export default {
  props: {
    headers: {
      default: [],
      type: Array,
      required: true
    },
    pageReq: {
      default(page) {
        return new Promise(function(resolve, reject) {});
      },
      type: Function
    },
    pageRes: {
      default(value, _this) {
        _this.datas = value.data.content;
      },
      type: Function
    },
    allowEdit: {
      default: false,
      type: Boolean
    },
    allowDelete: {
      default: false,
      type: Boolean
    },
    allowSelect: {
      default: false,
      type: Boolean
    },
    addFunction: {
      default(item) {
        this.datas.push(util.copyObject(item));
      },
      type: Function
    },
    editFunction: {
      default(item) {},
      type: Function
    },
    deleteFunction: {
      default(item) {
        return new Promise(function(resolve, reject) {});
      },
      type: Function
    },
  },
  data: () => ({
    datas: [],
    pagination: {},
    loading: false,
    totalCount: 0
  }),
  watch: {
    pagination: {
      handler() {
        this.sync();
      },
      deep: true
    }
  },
  methods: {
    async sync(e) {
      this.loading = true;
      try {
        let response = await this.pageReq(util.jsTojavaPage(this.pagination));
        if (response !== undefined) {
          this.pageRes(response, this);
          this.totalCount = response.data.totalElements;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    editItem: function editItem(item) {
      this.editFunction(item);
    },
    async deleteItem(item) {
      try {
        let response = await this.deleteFunction(item);
        this.datas.splice(this.datas.indexOf(item), 1);
      } catch (e) {
        console.error(e);
      }
    },
    clear() {
      this.datas = [];
    }
  }
};
</script>

<style scoped>
</style>