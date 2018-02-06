<template>
    <Menu ref="sideMenu" theme="dark" width="auto" accordion :active-name="activateMenu" :open-names="activateMenuGroup" :class="menuItemClass" @on-select="handleClick">
        <div v-for="(item, index) in menuList" :key="index">
            <!--单链接-->
            <MenuItem :name="item.id" v-if="!item.children">
            <Icon :type="item.icon?item.icon:'ios-navigate'"></Icon>
            <span>{{item.title}}</span>
            </MenuItem>
            <!--带子菜单-->
            <Submenu :name="item.id" v-if="item.children">
                <template slot="title">
                    <Icon :type="item.icon?item.icon: 'folder' "></Icon>
                    <span>{{item.title}}</span>
                </template>
                <MenuItem :name="item2.id" v-for="(item2, index2) in item.children" :key="index2">
                <Icon :type="item2.icon?item2.icon:'ios-navigate'"></Icon>{{item2.title}}</MenuItem>
            </Submenu>
        </div>
    </Menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Axios, { AxiosRequestConfig } from 'axios'
import VueRouter from 'vue-router'
import moment from 'moment'
import _ from 'lodash'

@Component({
    components: {}
})
export default class MasterMenu extends Vue {
    @Prop() shrink = false
    @Prop() menuList: menuModel.menuListItem[]
    @Prop() activateMenu: number
    @Prop() activateMenuGroup: Array<number>

    //换样式
    get menuItemClass() {
        return ['menu-item', this.shrink == true ? 'collapsed-menu' : '']
    }

    //用户左侧菜单点击
    handleClick(id: string) {
        let url = ''
        let title = ''
        _.each(this.menuList, (item: menuModel.menuListItem) => {
            if (!item.children) {
                if (item.id == Number(id)) {
                    // console.log("item", item);
                    url = item.url
                    title = item.title
                }
            } else {
                _.each(item.children, (item2: menuModel.menuListItem) => {
                    if (item2.id == Number(id)) {
                        // console.log("item2", item2);
                        url = item2.url
                        title = item2.title
                    }
                })
            }
        })
        if (title == '') {
            return
        }

        //写入数据
        var storage = window.localStorage
        storage['currentMenuID'] = id
        storage['currentMenuTitle'] = title //兼容easyui
        storage['currentMenuUrl'] = url //兼容easyui
        this.$store.commit('setCurrentMenuID', id)
        this.$store.commit('setCurrentMenuTitle', title)
        this.$store.commit('setCurrentMenuUrl', url)
        this.$store.commit('addPageOpened', id)

        //跳转
        this.$router.push(this.$store.getters.currentMenuRouteTo)
    }

    updated() {
        let obj: any = this
        this.$nextTick(() => {
            if (obj.$refs.sideMenu) {
                obj.$refs.sideMenu.updateOpened()
                obj.$refs.sideMenu.updateActiveName()
            }
        })
    }
}
</script>




