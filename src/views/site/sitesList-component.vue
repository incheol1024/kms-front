<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-window v-model="window" class="elevation-1" vertical>
    <v-window-item>
      <h3>Site List</h3>
      <v-card>
        <v-list>
          <v-list-tile v-for="site in siteData" :key="site.siteId" @click="setSite(site)">
            <v-list-tile-content>
              <v-list-tile-title v-html="site.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1" @click="deleteSite(site)">close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-spacer></v-spacer>
        <v-text-field v-model="siteName" label="input SiteName" single-line hide-details></v-text-field>
        <v-btn color="primary" @click="addSite">Add Site</v-btn>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script>
import * as util from "@/util"
import {SITEMODEL , PROJECTMODEL} from "@/model"
import router from "@/router"
import api from "@/apis/api"

export default {
  props: ["id"],
  mounted: function() {
    console.log("siteList call");
    this.getSiteList(this.id);
  },
  watch: {
    id: function(id) {
      this.window = 0;
      this.getSiteList(id);
    }
  },
  data: () => ({
    window: 0,
    siteData: [],
    curSite: util.copyObject(SITEMODEL),
    siteName: "",

    curProject: util.copyObject(PROJECTMODEL),
    dialog: false,
    startDialog: false,
    endDialog: false
  }),
  methods: {
    getSiteList: function(id) {
      let _this = this;
      api.getSiteList(id)
        .then(res => {
          _this.siteData = res.data;
        })
        .catch(reason => console.error(reason));
    },
    setSite: function(site) {
      console.log(site);
      let _this = this;
      this.curSite = site;
      this.window = 1;
      router.push(`/sites/${this.id}/${this.curSite.siteId}`);
    },
    addSite: function() {
      let _this = this;
      let site = util.copyObject(SITEMODEL);
      site.menuId = this.id;
      site.name = this.siteName;
      api.addSite(site)
        .then(res => {
          site.siteId = res.data;
          _this.siteData.push(site);
        })
        .catch(reason =>  console.error(reason));
    },
    deleteSite: function(site) {
      let _this = this;
      if (confirm("삭제하시겠습니까?")) {
        api.deleteSite(site.siteId)
          .then(res => {
            _this.siteData.splice(_this.siteData.indexOf(site), 1);
          })
          .catch(reason =>  console.error(reason));
      }
    }
  }
};
</script>