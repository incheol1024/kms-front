<template>
  <v-layout>
    <v-card flat width="100%">
      <router-view></router-view>
      <v-bottom-navigation v-model="bottomNav" shift :color="color">
        <v-btn dark @click="moveUser">
          <span>User</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn dark @click="moveGroup">
          <span>Group</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn dark @click="moveACL">
          <span>Permission</span>
          <v-icon>visibility</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-card>
  </v-layout>
</template>

<script>
import router from "@/router";

export default {
  props: ["name", "id"],
  data: () => ({
    bottomNav: 0
  }),
  methods: {
    moveUser() {
      router.push("/setting/user");
    },
    moveGroup() {
      router.push("/setting/group");
    },
    moveACL() {
      router.push("/setting/permission");
    }
  },
  mounted() {
    router.push("/setting/user");
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "blue";
      }
    }
  }
};
</script>