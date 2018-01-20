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
              <span>内容管理</span>
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
          <div class="header-navicon">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
          </div>
          <!--右侧登录-->
          <div class="header-avator">
            <div class="user-dropdown-menu-con">
              <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                  <a href="javascript:void(0)">
                    <span class="main-user-name">userName</span>
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="userCenter" divided>个人中心</DropdownItem>
                    <DropdownItem name="userPower" divided>权限设置</DropdownItem>
                    <DropdownItem name="loginOut" divided>退出登录</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
              </Row>
            </div>
          </div>
        </Header>
        <Content style="height:100%;margin:20px;">
          <router-view></router-view>
          <div v-html="loggerInfo">
          </div>
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
import logger from "weex-logger";
import session from "weex-session";

@Component
export default class App extends Vue {
  isDebug = true;
  loggerInfo = "";
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
    logger.add(this.menuitemClasses, true);
    logger.add(this.rotateIcon, true);
  }

  created() {
    if (this.isDebug) {
      logger.start(content => {
        this.loggerInfo = content;
      });
    }
    logger.add("-----------logger begin------------");
  }

  mounted() {}

  collapsedSider() {
    let obj: any = this;
    obj.$refs.side1.toggleCollapse();
  }
}
</script>
