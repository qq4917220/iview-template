<template>
    <div class="main-breadcrumb">
        <Breadcrumb>
            <BreadcrumbItem v-for="item in currentPath" :key="item.id">{{ item.title }}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VueRouter from 'vue-router'

@Component({
    components: {}
})
export default class MasterNav extends Vue {
    @Prop() currentPath: menuModel.menuListItem[]
}
</script>




