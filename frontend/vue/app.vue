<template>
    <div>
        <div>app</div>
        <MasterHeader></MasterHeader>
        <router-view></router-view>
        <MasterFooter></MasterFooter>
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
