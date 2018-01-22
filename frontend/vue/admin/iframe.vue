<template>
  <iframe frameborder="0" name="Iframe1" :src="iframeUrl" marginWidth="0" marginHeight="0" width="100%" height="100%" style="display:block;margin:0px;overflow-x:hidden">
    您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
  </iframe>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// import Axios, { AxiosResponse, AxiosError } from "axios";
import VueRouter from "vue-router";
// import moment from "moment";
// import _ from "lodash";

import session from "weex-session";
import logger from "weex-logger";

@Component({
  components: {}
})
export default class Iframe extends Vue {
  iframeId = "";
  iframeName = "";
  iframeUrl = "";

  @Watch("$route")
  routeFun() {
    this.iframeChange(this.$route.params.id);
  }
  mounted() {
    this.iframeChange(this.$route.params.id);
  }
  iframeChange(id: string) {
    switch (id) {
      case "iSina":
        this.iframeUrl = "//www.sina.com.cn";
        break;
      case "iSohu":
        this.iframeUrl = "//www.sohu.com";
        break;
      case "iBaidu":
        this.iframeUrl = "//www.baidu.com";
        break;
      default:
        this.iframeUrl = "";
        break;
    }
  }
}
</script>




