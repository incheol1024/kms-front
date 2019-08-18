<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="datas"
      :options.sync="pagination"
      :server-items-length="totalCount"
      :show-select="allowSelect"
      :loading="loading"
      :sort-by="sortBy"
      :sort-desc="false"
      must-sort
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td
              v-for="value in mappingHeader(item)"
              :key="value.id"
              @click="clickRow(item)"
            >{{ value }}</td>
            <td v-if="allowDelete || allowEdit">
              <v-icon v-if="allowEdit" small class="mr-2" @click="editItem(item)">edit</v-icon>
              <v-icon v-if="allowDelete" small @click="deleteItem(item)">delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as util from "@/util";
import {ErrorBus} from "@/bus"

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
      default(item) {
        return new Promise(function(resolve, reject) {});
      },
      type: Function
    },
    deleteFunction: {
      default(item) {
        return new Promise(function(resolve, reject) {});
      },
      type: Function
    },
    clickRow: {
      default(item) {},
      type: Function
    },
    sortBy : {
      default : '',
      type : String,
      required : true
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
        ErrorBus.$emit("error",e)
      } finally {
        this.loading = false;
      }
    },
    async editItem(item) {
      try {
        await this.editFunction(item);
      } catch (e) {
        ErrorBus.$emit("error",e)
      }
    },
    async deleteItem(item) {
      try {
        let response = await this.deleteFunction(item);
        this.datas.splice(this.datas.indexOf(item), 1);
      } catch (e) {
        ErrorBus.$emit("error",e)
      }
    },
    mappingHeader(item) {
      let arr = [];
      this.headers.forEach(it => {
        if ("undefined" !== typeof item[it.value]) {
          arr.push(item[it.value]);
        } else if (it.value !== "actions" && it.value !== "action") {
          arr.push("");
        }
      });
      return arr;
    },
    clear() {
      this.datas = [];
    }
  }
};
</script>

<style scoped>
</style>