<template>
<li class="tree-node">
  <button v-if="items.children && items.children.length" @click="toggle"><i class="material-icons" >{{iconName}}</i></button>
  <span @click="activeChange" v-bind:class="{ active : activeNow }">{{ items.name }}</span>
  <ul v-if="items.children && items.children.length && showChild">
    <treenode-component v-for="(child,i) in items.children" :key="i" :items="child" :busname="busname" :parentnode="getParent()"></treenode-component>
  </ul>
</li>
</template>

<script>
import treeNode from "@/components/treenode-component.vue";
import {EventBus} from "@/bus.js"

export default {
  name: "treenode-component",
  components: {
    "treenode-component": treeNode
  },
  props: {
    items: {},
    parentnode: {},
    busname : ""
  },
  data: () => ({
    showChild: false,    
    iconName: "keyboard_arrow_right",
    activeNow: false
  }),
  methods: {
    activeChange: function activeChange() {
      EventBus.$emit(this.busname, this);
      this.activeNow = !this.activeNow;
    },
    toggle: function toggle() {
      this.showChild = !this.showChild;
      if (this.showChild) this.iconName = "keyboard_arrow_down";
      else this.iconName = "keyboard_arrow_right";
    },
    getParent: function getParent() {
      return this;
    }
  }
};
</script>

<style>
.tree-node{
  align-items: center;
  cursor: pointer;
}

.tree-node i {
  color: rgba(0, 0, 0, 0.54);
}

.tree-node span {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.87);
  vertical-align: top;
}

.active {
  color: #1976d2 !important;
}
</style>
