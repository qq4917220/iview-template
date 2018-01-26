<template>
  <iframe frameborder="0" name="Iframe1" :src="iframeUrl" marginWidth="0" marginHeight="0" width="100%" height="100%" style="display:block;margin:0px;overflow-x:hidden">
    您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
  </iframe>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";

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
  async iframeChange(id: string) {
    let reqConfig: AxiosRequestConfig = {
      method: "post",
      url: baseUrl + "/admin/menu",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    };
    let menuData = await Axios.request(reqConfig);
    let data: menuModel.menuResult<menuModel.menuListItem> = menuData.data;
    if (data.err) {
      return;
    }
    let url = "";

    _.each(data.data!.items, item => {
      if (!item.children) {
        if (item.id == Number(id)) {
          url = item.url;
        }
      } else {
        _.each(item.children, item2 => {
          if (item2.id == Number(id)) {
            url = item2.url;
          }
        });
      }
    });
    if (url.indexOf("http") == -1) {
      this.iframeUrl = baseUrl + "/" + url;
    } else {
      this.iframeUrl = url;
    }
  }
}
</script>




