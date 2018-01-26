<template>
  <div>
    <div>app</div>
    <router-view></router-view>
  </div>
</template>

<style>

</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted() {
    console.log("app");
  }
}
</script>
