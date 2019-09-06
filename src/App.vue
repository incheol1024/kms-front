<template>
  <v-app id="app">
    <v-app-bar color="blue darken-3" dark app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-text-field
        flat
        solo-inverted
        hide-details
        label="Search"
        @keyup.enter="submit"
        placeholder="Press Enter"
        v-model="word"
      ></v-text-field>
      <v-btn icon @click="logout">
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <side-nav></side-nav>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid grid-list-md fill-height>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>

    <error-component></error-component>
  </v-app>
</template>

<script>
// @ is an alias to /src
import api from "./apis/api";
import router from "./router";
import sideNav from "./SideNav.vue";
import errorComponent from "./components/error-component"

export default {
  components: {
    router,
    "side-nav": sideNav,
    "error-component" : errorComponent
  },
  data: () => ({
    drawer: null,
    word : ""
  }),
  methods: {
    async logout() {
      try {
        var response = await api.logout();
      } finally {
        router.push("/login");
      }
    },
    submit() {
      router.push(`/search/${this.word}`);
    }
  }
};

router.push("login");
</script>

<style lang="stylus"></style>
