<template>
  <div class="main-breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem v-for="item in currentPath" :key="item.id">{{ item.title }}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Axios, { AxiosRequestConfig } from "axios";
import VueRouter from "vue-router";
// import moment from "moment";
// import _ from "lodash";

@Component({
  components: {}
})
export default class MasterNav extends Vue {
  @Prop() currentPath: menuModel.menuListItem[];
}
</script>




