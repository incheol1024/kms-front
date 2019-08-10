<template>
  <v-container align-center>
    <h1 style="cursor: pointer" class=".display-4 mb-3">TEAM KMS</h1>
    <v-img src="https://picsum.photos/350/165" height="125" class="grey darken-4 mb-4"></v-img>

    <v-card>
      <v-list>
        <v-list-group v-for="(item,i) in items" :key="i" prepend-icon="label" no-action>
          <template v-slot:activator>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </template>
          <v-list-item v-for="(children,k) in item.children" :key="k" @click="route(children)">
            <v-list-item-content>
              <v-list-item-title>{{children.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item @click="setting">
          <v-list-item-icon>
            <v-icon>settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="help">
          <v-list-item-icon>
            <v-icon>help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router";
import api from "@/apis/api";
import { SideNavBus } from "@/bus";

export default {
  data: () => ({
    items: [
      {
        text: "Solutions",
        children: [],
        type: "SOL"
      },
      {
        text: "Sites",
        children: [],
        type: "SITE"
      },
      {
        text: "Dev QnA",
        children: [],
        type: "QNA"
      }
    ]
  }),
  created() {
    SideNavBus.$on("login", this.setMenuItem);
  },
  methods: {
    route(children) {
      if (children.type === "SOL") router.push(`/solutions/${children.id}`);
      else if (children.type === "SITE") router.push(`/sites/${children.id}`);
      else if (children.type === "QNA")
        router.push(`/qna/${children.name}/${children.id}`);
    },
    setting() {
      router.push("/setting");
    },
    help() {
      router.push("/help");
    },
    setMenuItem() {
      this.items
        .filter(item => item.children.length < 1)
        .forEach(async item => {
          try {
            var response = await api.getMenu(item.type);
            item.children = response.data;
          } catch (e) {
            console.error(e);
          }
        });
    }
  }
};
</script>
