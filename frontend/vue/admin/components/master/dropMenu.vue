<template>
    <div class="user-dropdown-menu-con ">
        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer trigger="click" @on-click="handleClick">
                <a href="javascript:void(0)">
                    <span class="main-user-name">{{masterUserName}}</span>
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <!-- <DropdownItem name="userCenter" divided>个人中心</DropdownItem> -->
                    <DropdownItem name="userPermission" divided v-if="isAdmin">权限设置</DropdownItem>
                    <DropdownItem name="gotoHome" divided>返回首页</DropdownItem>
                    <DropdownItem name="logout" divided>退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
        </Row>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VueRouter from 'vue-router'

@Component({
    components: {}
})
export default class MasterDropMenu extends Vue {
    isAdmin = Boolean(globalConfig.user.role == 'admin')

    get masterUserName() {
        return globalConfig.user.name
    }

    //用户下拉菜单点击
    handleClick(name: any) {
        switch (name) {
            case 'userPermission':
                // let iUrl = globalConfig.prefixPath + "/easyui/";
                // iUrl += encodeURIComponent("/admin/");
                // this.$router.push({
                //   name: "adminEasyui",
                //   params: { url: iUrl }
                // });
                location.href = globalConfig.prefixPath + '/admin/'
                break
            case 'gotoHome':
                this.handleClickHome()
                break
            case 'logout':
                const url = globalConfig.prefixPath + '/webapp/admin/logout'
                location.href = url
                break
            default:
                this.building(name)
                break
        }
    }

    //功能建设中
    building(str: any) {
        this.$Message.error({ content: str + '功能建设中' })
    }

    //返回首页
    handleClickHome() {
        this.$router.push({
            name: 'adminHome'
        })
    }
}
</script>




