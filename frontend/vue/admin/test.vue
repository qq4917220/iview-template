<template>
  <div>
    test
    <div>{{test}}</div>
    <div>{{testNumber}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Axios, { AxiosResponse, AxiosError } from "axios";
import VueRouter from "vue-router";
import moment from "moment";
import _ from "lodash";

import session from "weex-session";

@Component({
  components: {}
})
export default class test extends Vue {
  test = "111111111";
  testNumber = 0;

  mounted() {
    // console.log("home");
    this.$store.commit("updateTest");
    this.test = this.$store.state.test;
    this.testNumber = this.$store.state.testNumber;
    localStorage.setItem("testNumber", this.testNumber + "");
    // this.testName = this.$store.state.test;
  }
}
</script>




