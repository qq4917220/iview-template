<template>
  <!-- <router-view></router-view> -->
  <div class="app-main">
    <Layout class="app-layout">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" style="overflow:auto">
        <!--logo-->
        <div class="logo-con">
          <img v-show="!isCollapsed" src="/static/admin/images/logo.jpg" key="max-logo" />
          <img v-show="isCollapsed" src="/static/admin/images/logo-min.jpg" key="min-logo" />
        </div>
        <!--菜单-->
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
          <Icon type="ios-navigate"></Icon>
          <span>Option 1</span>
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <MenuItem name="1-2">
          <Icon type="search"></Icon>
          <span>Option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
          <Icon type="settings"></Icon>
          <span>Option 3</span>
          </MenuItem>
          <MenuItem name="1-3">
          <Icon type="settings"></Icon>
          <span>Option 3</span>
          </MenuItem>
          <MenuItem name="1-3">
          <Icon type="settings"></Icon>
          <span>Option 3</span>
          </MenuItem>
          <MenuItem name="1-3">
          <Icon type="settings"></Icon>
          <span>Option 3</span>
          </MenuItem>
          <MenuItem name="1-3">
          <Icon type="settings"></Icon>
          <span>Option 3</span>
          </MenuItem>

        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <!--左侧缩进按钮-->
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
        </Header>
        <Content style="height:100%;margin:20px;">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped>
@import url("./master.css");
</style>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class App extends Vue {
  isCollapsed = false;
  menuitemClasses = ["menu-item", ""];
  rotateIcon = ["menu-item", ""];

  @Watch("isCollapsed")
  isCollapsedFun() {
    this.menuitemClasses = [
      "menu-item",
      this.isCollapsed == true ? "collapsed-menu" : ""
    ];
    this.rotateIcon = [
      "menu-icon",
      this.isCollapsed == true ? "rotate-icon" : ""
    ];
    console.log(this.menuitemClasses);
    console.log(this.rotateIcon);
  }

  mounted() {}

  collapsedSider() {
    let obj: any = this;
    obj.$refs.side1.toggleCollapse();
  }
}
</script>
