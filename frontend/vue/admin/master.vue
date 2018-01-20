<template>
  <!-- <router-view></router-view> -->
  <div class="app-main" style="position:absolute;width:100%;height:100%;">
    <Layout class="app-layout" style="height:100%;">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" style="overflow:auto">
        <!--logo-->
        <div class="logo-con">
          <img v-show="!isCollapsed" src="/static/admin/images/logo.jpg" key="max-logo" @click="handleClickHome" />
          <img v-show="isCollapsed" src="/static/admin/images/logo-min.jpg" key="min-logo" @click="handleClickHome" />
        </div>
        <!--菜单-->
        <Menu theme="dark" width="auto" :class="menuitemClasses" @on-select="handleClickMenuItem">
          <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          <span>广告管理</span>
          </MenuItem>
          <MenuItem name="2">
          <Icon type="ios-navigate"></Icon>
          <span>推广功能</span>
          </MenuItem>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              <span>数据查询</span>
            </template>
            <MenuItem name="3-1">文章查询</MenuItem>
            <MenuItem name="3-2">评论查询</MenuItem>
            <MenuItem name="3-3">举报查询</MenuItem>
          </Submenu>
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
                    <DropdownItem name="gotoHome" divided>返回首页</DropdownItem>
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
    logger.add("切换" + this.isCollapsed);
    this.menuitemClasses = [
      "menu-item",
      this.isCollapsed == true ? "collapsed-menu" : ""
    ];
    this.rotateIcon = [
      "menu-icon",
      this.isCollapsed == true ? "rotate-icon" : ""
    ];
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

  //功能建设中
  building(str) {
    this.$Message.error({ content: str + "功能建设中" });
  }

  //返回首页
  handleClickHome() {
    const url = baseUrl + "/admin/home/";
    location.href = url;
  }

  //切换左侧
  collapsedSider() {
    let obj: any = this;
    obj.$refs.side1.toggleCollapse();
  }

  //用户下拉菜单点击
  handleClickUserDropdown(name) {
    logger.add("用户下拉菜单：" + name);
    switch (name) {
      case "gotoHome":
        this.handleClickHome();
        break;
      case "loginOut":
        session.reset();
        const url = baseUrl + "/admin/login/";
        location.href = url;
        break;
      default:
        this.building(name);
        break;
    }
  }

  //用户左侧菜单点击
  handleClickMenuItem(name) {
    logger.add("用户左侧菜单：" + name);
    switch (name) {
      default:
        this.building(name);
        break;
    }
  }
}
</script>
