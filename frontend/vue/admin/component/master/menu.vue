<template>
  <Menu theme="dark" width="auto" accordion :active-name="menuitemActiveName" :class="menuitemClasses" @on-select="handleClickMenuItem">
    <div v-for="(item, index) in menuList" :key="index">
      <!--单链接-->
      <MenuItem :name="item.id" v-if="!item.children">
      <Icon :type="item.icon?item.icon:'ios-navigate'"></Icon>
      <span>{{item.title}}</span>
      </MenuItem>
      <!--带子菜单-->
      <Submenu name="3" v-if="item.children">
        <template slot="title">
          <Icon :type=" item.icon?item.icon: 'folder' "></Icon>
          <span>{{item.title}}</span>
        </template>
        <MenuItem :name="item2.id" v-for="(item2, index2) in item.children" :key="index2">
        <Icon :type="item2.icon?item2.icon:'ios-navigate'"></Icon>{{item2.title}}</MenuItem>
      </Submenu>
    </div>
  </Menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Axios, { AxiosResponse, AxiosError } from "axios";
import VueRouter from "vue-router";
import moment from "moment";
import _ from "lodash";

import session from "weex-session";

@Component({
  components: {}
})
export default class test extends Vue {
  @Prop() menuList: menuModel.menuListItem[] = [];
  @Prop() isCollapsed = false;

  mounted() {}
}
</script>




