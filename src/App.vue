<template>
  <v-app id="app">
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 100px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        @keyup.enter="submit"
        placeholder="Press Enter"
      ></v-text-field>
      <v-btn icon @click="logout">
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <side-nav></side-nav>
    </v-navigation-drawer>
    
    <v-content>
      <v-container fluid grid-list-md  fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import api from "./apis/api";
import router from "./router";
import sideNav from "./SideNav.vue";

export default {
  components: {
    router,
    "side-nav": sideNav
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    async logout() {
      try {
        var response = await api.logout();
      } finally {
        window.location.replace("login");
      }
    },
    submit() {
      router.push("/search");
    },
  }
};

router.push("login");
</script>

<style lang="stylus"></style>
