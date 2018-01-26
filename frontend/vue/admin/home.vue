<template>
  <div>
    home
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
  mounted() {
    // console.log("home");
  }
}
</script>




