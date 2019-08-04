<template>
  <v-window v-model="window" class="elevation-1" vertical>
    <v-window-item>
      <h3>Site List</h3>
      <v-card>
        <v-list>
           <v-list-item-group>
          <v-list-item v-for="site in siteData" :key="site.siteId" @click="setSite(site)">
            <v-list-item-content>
              <v-list-item-title v-text="site.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="mx-2" fab dark small color="primary" >
                <v-icon color="white lighten-1" @click.stop="deleteSite(site)" >--</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
         </v-list-item-group>
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
  name:"siteslist-component",
  props: ["id"],
  mounted: function() {
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
      let _this = this;
      this.curSite = site;
     // this.window = 1;
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