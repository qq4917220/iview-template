<template>
  <iframe frameborder="0" name="Iframe1" :src="iframeUrl" marginWidth="0" marginHeight="0" width="100%" height="100%" style="display:block;margin:0px;overflow-x:hidden">
    您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
  </iframe>
  <!-- 
        <script type="text/javascript" src="/javascripts/jQuery-1.11.3.min.js"></script>
        <script type="text/javascript" src="/jquery-easyui-1.5/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="/jquery-easyui-1.5/locale/easyui-lang-zh_CN.js"></script>
        <script type="text/javascript" src="/javascripts/moment.js"></script>
        <script type="text/javascript" src="/javascripts/aliyun-sdk.js"></script>
        <script type="text/javascript" src="/javascripts/oss-js-upload.js"></script>
        <script type="text/javascript" src="/editor/kindeditor.js"></script>
        <script type="text/javascript" src="/editor/lang/zh_CN.js"></script>
        <script type="text/javascript" src="/javascripts/commonjs.js"></script>
        <script type="text/javascript" src="/javascripts/jquery.zclip.js"></script>
        <script type="text/javascript" src="/plupload-2.1.2/js/plupload.full.min.js"></script>
        <script type="text/javascript" src="https://g.alicdn.com/dingding/open-develop/1.5.1/dingtalk.js"></script>
        <script type="text/javascript" src="http://g.alicdn.com/dingding/dingtalk-pc-api/2.3.1/index.js"></script> -->

  <!-- <link rel='stylesheet' href='/jquery-easyui-1.5/themes/default/easyui.css' />
        <link rel='stylesheet' href='/jquery-easyui-1.5/themes/icon.css' />
        <link rel='stylesheet' href='/stylesheets/style.css' />
        <link rel='stylesheet' href='/upload/uploadify.css' />
        <link href="/uploadify/uploadify.css" type="text/css" /> -->

  <!-- <div id="CenterTabDiv" class="easyui-tabs" style="width: 100%; height: 100%" data-options="fit:true">

        </div> -->
</template>

<style scoped>

</style>

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
    this.iframeUrl = url;
  }
}
</script>