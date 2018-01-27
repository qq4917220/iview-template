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
          <div v-for="(item, index) in menuMenuItems" :key="index">
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
import Axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";

@Component
export default class App extends Vue {
  masterUserName = "";
  isDebug = true;
  loggerInfo = "";
  isCollapsed = false;
  menuitemClasses = ["menu-item", ""];
  menuitemActiveName = "";
  rotateIcon = ["menu-item", ""];
  menuMenuItems: menuModel.menuListItem[] = [];

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

  mounted() {
    this.masterUserName = loginUser.name;
    this.initMenu();
  }

  //初始化菜单
  async initMenu() {
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
    this.menuMenuItems = data.data!.items;
  }

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
  handleClickMenuItem(id: string) {
    this.menuitemActiveName = name;
    // logger.add("用户左侧菜单：" + id);
    let url = "";
    _.each(this.menuMenuItems, (item: menuModel.menuListItem) => {
      if (!item.children) {
        if (item.id == Number(id)) {
          url = item.url;
        }
      } else {
        _.each(item.children, (item2: menuModel.menuListItem) => {
          if (item2.id == Number(id)) {
            url = item2.url;
          }
        });
      }
    });
    console.log(url);
    if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1) {
      this.$router.push({
        name: "adminIframe",
        params: { url: encodeURIComponent(url) }
      });
    } else {
      let iUrl = baseUrl + "/" + encodeURIComponent(url);
      this.$router.push(url);
    }
  }
}
</script>
