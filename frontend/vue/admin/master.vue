<template>
  <!-- <router-view></router-view> -->
  <div class="app-main" style="position:absolute;width:100%;height:100%;">
    <Layout class="app-layout" style="height:100%;">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" style="overflow:auto">
        <!--logo-->
        <div class="logo-con">
          <img v-show="!isCollapsed" src="/admin/images/logo.jpg" key="max-logo" @click="handleClickHome" />
          <img v-show="isCollapsed" src="/admin/images/logo-min.jpg" key="min-logo" @click="handleClickHome" />
        </div>
        <!--菜单-->
        <Menu theme="dark" width="auto" accordion :active-name="menuitemActiveName" :class="menuitemClasses" @on-select="handleClickMenuItem">
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
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-paper"></Icon>
              <span>IFRAME</span>
            </template>
            <MenuItem name="iSina">SINA</MenuItem>
            <MenuItem name="iSohu">SOHU</MenuItem>
            <MenuItem name="iBaidu">BAIDU</MenuItem>
            <MenuItem name="iOther">OTHER</MenuItem>
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
                    <span class="main-user-name">{{masterUserName}}</span>
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="userCenter" divided>个人中心</DropdownItem>
                    <DropdownItem name="userPower" divided>权限设置</DropdownItem>
                    <DropdownItem name="gotoHome" divided>返回首页</DropdownItem>
                    <DropdownItem name="logout" divided>退出登录</DropdownItem>
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

@Component
export default class App extends Vue {
  masterUserName = "";
  isDebug = true;
  loggerInfo = "";
  isCollapsed = false;
  menuitemClasses = ["menu-item", ""];
  menuitemActiveName = "";
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
  }

  created() {
    this.masterUserName = loginUser.name;
  }

  mounted() {}

  //功能建设中
  building(str: any) {
    this.$Message.error({ content: str + "功能建设中" });
  }

  //返回首页
  handleClickHome() {
    this.menuitemActiveName = "";
    this.$router.push({
      name: "adminHome"
    });
  }

  //切换左侧
  collapsedSider() {
    let obj: any = this;
    obj.$refs.side1.toggleCollapse();
  }

  //用户下拉菜单点击
  handleClickUserDropdown(name: any) {
    switch (name) {
      case "gotoHome":
        this.handleClickHome();
        break;
      case "logout":
        const url = baseUrl + "/admin/logout";
        location.href = url;
        break;
      default:
        this.building(name);
        break;
    }
  }

  //用户左侧菜单点击
  handleClickMenuItem(name: string) {
    this.menuitemActiveName = name;
    console.log("this.menuitemActiveName" + this.menuitemActiveName);
    // logger.add("用户左侧菜单：" + name);
    switch (name) {
      case "iSina":
      case "iSohu":
      case "iBaidu":
      case "iOther":
        this.$router.push({
          name: "adminIframe",
          params: { id: name }
        });
        break;
      default:
        this.building(name);
        break;
    }
  }
}
</script>
