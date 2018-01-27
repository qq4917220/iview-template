<template>
  <iframe frameborder="0" name="Iframe1" :src="iframeUrl" marginWidth="0" marginHeight="0" width="100%" height="100%" style="display:block;margin:0px;overflow-x:hidden">
    您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
  </iframe>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Iframe extends Vue {
  iframeUrl = "";

  @Watch("$route")
  routeFun() {
    this.iframeChange(this.$route.params.url);
  }
  mounted() {
    this.iframeChange(this.$route.params.url);
  }
  iframeChange(url: string) {
    let iUrl = decodeURIComponent(url);
    this.iframeUrl = iUrl;
  }
}
</script>