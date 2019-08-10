<template>
  <v-card>
    <v-list two-line class="mb-5">
      <template v-for="(item, index) in items">

        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        
        <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

        <v-list-item v-else :key="item.title">
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      { header: "Today Announce" },
      {
        title: "EDM Bug Patch 4.1.1",
        subtitle: "와 AIX 안됨.."
      },
      { divider: true, inset: true },
      {
        title: "ECM New Feature 6.1.2",
        subtitle: "마이그 자동화"
      },
      { divider: true, inset: true },
      {
        title: "게맛",
        subtitle: "간장게장~~"
      }
    ]
  }),
  methods: {}
};
</script>

<style scoped>
</style>