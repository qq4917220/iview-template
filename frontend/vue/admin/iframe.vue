<template>

    <div>
        <iframe v-for="(item, idx) in cachePages" :key="idx" v-show="item==iframeUrl" frameborder="0" :name="idx" :src="item" marginWidth="0" marginHeight="0" width="100%" height="100%" style="display:block;margin:0px;overflow-x:hidden;min-height:600px;">
            您的浏览器不支持嵌入式框架，或者当前配置为不显示嵌入式框架。
        </iframe>
    </div>

</template>

<style scoped>

</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class Iframe extends Vue {
    @Watch('$route')
    onRoute() {
        this.$store.commit('addCachePages', this.iframeUrl)
    }

    get cachePages() {
        return this.$store.state.cachePages
    }

    get iframeUrl() {
        return decodeURIComponent(this.$route.params.url)
    }

    mounted() {
        this.$store.commit('addCachePages', this.iframeUrl)
    }
}
</script>