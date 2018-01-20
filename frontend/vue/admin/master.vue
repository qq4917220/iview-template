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
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

/*后添加*/
.logo-con {
  padding: 8px;
  text-align: center;
}
.logo-con img {
  height: 44px;
  width: auto;
}
.header-navicon {
  cursor: pointer;
  display: inline-block;
}
.header-avator {
  display: inline-block;
  position: absolute;
  right: 10px;
}
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
