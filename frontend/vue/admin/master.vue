<template>

    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <!--logo-->
            <div class="logo-con">
                <img @click="home" :style="{cursor: 'pointer'}" v-show="!shrink" src="/admin/images/logo.jpg" key="max-logo" />
                <img @click="home" :style="{cursor: 'pointer'}" v-show="shrink" src="/admin/images/logo-min.jpg" key="min-logo" />
            </div>
            <!--菜单-->
            <master-menu :shrink="shrink" :menuList="menuList" :activateMenu="activateMenu" :activateMenuGroup="activateMenuGroup"></master-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <!--左侧缩进按钮-->
                    <Icon :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)',margin:'18px',cursor:'pointer'}" @click.native="collapsedSider" type="navicon-round" size="20"></Icon>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <!--中间导航-->
                        <master-nav :currentPath="currentPath"></master-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
          <lock-screen></lock-screen>
          <message-tip v-model="mesCount"></message-tip>
          <theme-switch></theme-switch> -->

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <master-drop-menu></master-drop-menu>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <master-page-opened :pageTagsList="pageTagsList"></master-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px',height:'100%;'}">
            <div class="single-page" style="height:100%;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>

</template>

<style lang="less">
@import './master.less';
</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import masterMenu from './components/master/menu.vue'
import masterDropMenu from './components/master/dropMenu.vue'
import masterNav from './components/master/nav.vue'
import masterPageOpened from './components/master/pageOpened.vue'
import menuService from '../../ts/service/menu'

@Component({
    components: {
        masterMenu: masterMenu,
        masterDropMenu: masterDropMenu,
        masterNav: masterNav,
        masterPageOpened: masterPageOpened
    }
})
export default class App extends Vue {
    // //监视器
    @Watch('$route')
    routerFun() {
        // console.log(this.$router.currentRoute);
        if (this.$router.currentRoute.name == 'adminHome') {
            localStorage['currentMenuID'] = '0'
            this.$store.commit('setCurrentMenuID', '0')
            this.$store.commit('setCurrentMenuTitle', '首页')
            this.$store.commit('setCurrentMenuUrl', 'adminHome')
            this.$store.commit('addPageOpened', '0')
            let userID: string = globalConfig.user.id
            if (userID != localStorage['currentUserID']) {
                localStorage.clear()
                localStorage['currentUserID'] = userID
            }
        }
    }

    //是否缩进
    shrink = false

    //菜单列表
    get menuList() {
        return this.$store.state.menuList
    }

    //当前菜单组
    get activateMenuGroup() {
        return this.$store.getters.currentMenuGroup
    }

    //当前菜单项
    get activateMenu() {
        return Number(this.$store.state.currentMenuID)
    }

    //当前NAV面包屑
    get currentPath() {
        this.$store.commit('setCurrentPath', this.$store.state.currentMenuID) //生成NAV面包屑
        return this.$store.state.currentPath
    }

    //标签页列表
    get pageTagsList() {
        return this.$store.state.pageOpened
    }

    created() {
        this.$store.commit('setCurrentMenuID', '') //初始化当前菜单
        this.$store.commit('setPageOpened', '') //初始化标签页
        this.init()
    }

    async init() {
        await this.initMenu()
    }

    //初始化菜单
    async initMenu() {
        let menuResult: ServiceResult<
            ServiceList<menuModel.menuListItem>
        > = await menuService.UserMenuList()
        if (menuResult.err) {
            // console.log(menuResult.err);
            return []
        }
        this.$store.commit('setMenuList', menuResult.data!.items)
    }

    get rotateIcon() {
        return ['menu-icon', this.shrink == true ? 'rotate-icon' : '']
    }

    //切换左侧
    collapsedSider() {
        this.shrink = this.shrink ? false : true
    }

    //返回首页
    home() {
        this.$router.push({ name: 'adminHome' })
    }
}
</script>
