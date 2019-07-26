<template>
  <v-layout>
    <!-- <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
      <v-item v-for="n in 3" :key="n">
        <div slot-scope="{ active, toggle }">
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>fiber_manual_record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group> -->
    <v-flex>
      <siteslist-component :id="id"></siteslist-component>
    </v-flex>
  
  </v-layout>
</template>

<script>
import siteslist from "./site/siteslist-component.vue";

export default {
  components: {
    "siteslist-component": siteslist
  },
  props: ["id"]
  
};
</script>