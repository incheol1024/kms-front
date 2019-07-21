<template inline-template>
  <div>
    <v-data-table
      :headers="headers"
      :items="datas"
      :pagination.sync="pagination"
      :total-items="totalCount"
      :select-all="!!allowSelect"
      v-model="selection"
      :loading="loading"
      must-sort
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td v-if="allowSelect">
            <v-checkbox v-model="props.selected" primary hide-details @change="updateSelection"></v-checkbox>
          </td>
          <td
            v-for="value in mappingHeader(props.item)"
            :key="value.id"
            @click="clickRow(props.item)"
          >{{ value }}</td>
          <td v-if="allowDelete || allowEdit">
            <v-icon v-if="allowEdit" small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon v-if="allowDelete" small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as util from "@/util"

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
        this.datas.push(copyObject(item));
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
    selection: {
      default() {
        return [];
      },
      type: Array
    },
    search: {
      default: "",
      type: String
    },
    clickRow: {
      default(item) {},
      type: Function
    }
  },
  data: () => ({
    datas: [],
    pagination: {},
    loading: false,
    length: 0,
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
        console.error(e)
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
    mappingHeader(item) {
      let arr = [];
      this.headers.forEach(it => {
        if ("undefined" !== typeof item[it.value]) arr.push(item[it.value]);
      });
      return arr;
    },
    updateSelection() {
      this.$emit("update:selection", this.selection);
    },
    clear() {
      this.datas = [];
    }
  }
};
</script>

<style scoped>
tr:hover {
  cursor: pointer;
}

td:hover {
  cursor: pointer;
}

table thead tr th span {
  font-size: 1.0625rem !important;
}
</style>