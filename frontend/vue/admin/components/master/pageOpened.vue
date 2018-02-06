<template>
  <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
    <div class="close-all-tag-con">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="primary">
          标签选项
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
      <transition-group name="taglist-moving-animation">
        <Tag type="dot" v-for="(item, index) in pageTagsList" ref="tagsPageOpened" :key="item.id" :name="item.id" @on-close="closePage" @click.native="linkTo(item)" :closable="item.id===0?false:true" :color="item.children?(item.children[0].id===currentMenuID?'blue':'default'):(item.id===currentMenuID?'blue':'default')">{{ item.title }}</Tag>
      </transition-group>
    </div>
  </div>
</template>

<style lang="less">
@import "../../master.less";
</style>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Axios, { AxiosRequestConfig } from "axios";
import VueRouter from "vue-router";
// import moment from "moment";
import _ from "lodash";

@Component({
  components: {}
})
export default class MasterPageOpened extends Vue {
  @Prop() pageTagsList: menuModel.menuListItem[];

  tagBodyLeft = 0;
  tagsCount: 1;

  //实例对象
  get refsTag() {
    let obj: any = this;
    if (this.pageTagsList) {
      return obj.$refs.tagsPageOpened;
    }
  }

  //当前菜单ID
  get currentMenuID() {
    return Number(this.$store.state.currentMenuID);
  }

  //检查路由
  @Watch("$route")
  routerFun(to: any) {
    let obj: any = this;
    obj.$nextTick(() => {
      _.each(this.refsTag, (item: any, index: any) => {
        if (this.currentMenuID == item.name) {
          let tag = obj.refsTag[index].$el;
          obj.moveToView(tag);
        }
      });
    });
    obj.tagsCount = obj.pageTagsList.length;
  }

  //初始化
  mounted() {
    let obj: any = this;
    // this.refsTag = obj.$refs.tagsPageOpened;
    setTimeout(() => {
      // console.log("this.refsTag", this.refsTag);
      _.each(this.refsTag, (item: any, index: any) => {
        if (this.currentMenuID == item.name) {
          let tag = obj.refsTag[index].$el;
          obj.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug
    obj.tagsCount = obj.pageTagsList.length;
  }

  //关闭功能集合
  closePage(event: any, name: string) {
    let obj: any = this;
    let pageOpenedList = obj.$store.state.pageOpened;
    let lastPageObj = pageOpenedList[0];
    if (localStorage["currentMenuID"] == name) {
      let len = pageOpenedList.length;
      for (let i = 1; i < len; i++) {
        if (pageOpenedList[i].id === name) {
          if (i < len - 1) {
            lastPageObj = pageOpenedList[i + 1];
          } else {
            lastPageObj = pageOpenedList[i - 1];
          }
          break;
        }
      }
    } else {
      let tagWidth = event.target.parentNode.offsetWidth;
      obj.tagBodyLeft = Math.min(obj.tagBodyLeft + tagWidth, 0);
    }
    // console.log(lastPageObj);
    obj.$store.commit("removePageOpened", name);
    // obj.$store.commit("closePage", name);
    pageOpenedList = obj.$store.state.pageOpened;
    localStorage.pageOpened = JSON.stringify(pageOpenedList);
    if (localStorage["currentMenuID"] == name) {
      obj.linkTo(lastPageObj);
    }
  }

  //跳转到新页面
  linkTo(item: menuModel.menuListItem) {
    //console.log(item);
    let id = item.id;
    let title = item.title;
    let url = item.url;
    //写入数据
    var storage = window.localStorage;
    storage["currentMenuID"] = id;
    storage["currentMenuTitle"] = title; //兼容easyui
    storage["currentMenuUrl"] = url; //兼容easyui
    this.$store.commit("setCurrentMenuID", id);
    this.$store.commit("setCurrentMenuTitle", title);
    this.$store.commit("setCurrentMenuUrl", url);
    // obj.$store.commit("setCurrentMenuRouteTo", url);
    this.$store.commit("addPageOpened", id);

    this.$router.push(this.$store.getters.currentMenuRouteTo);
  }

  //鼠标滚动
  handlescroll(e: any) {
    // console.log(e);
    let obj: any = this;
    var type = e.type;
    let delta = 0;
    if (type === "DOMMouseScroll" || type === "mousewheel") {
      delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
    }
    let left = 0;
    if (delta > 0) {
      left = Math.min(0, obj.tagBodyLeft + delta);
    } else {
      if (
        obj.$refs.scrollCon.offsetWidth - 100 <
        obj.$refs.scrollBody.offsetWidth
      ) {
        if (
          obj.tagBodyLeft <
          -(
            obj.$refs.scrollBody.offsetWidth -
            obj.$refs.scrollCon.offsetWidth +
            100
          )
        ) {
          left = obj.tagBodyLeft;
        } else {
          left = Math.max(
            obj.tagBodyLeft + delta,
            obj.$refs.scrollCon.offsetWidth -
              obj.$refs.scrollBody.offsetWidth -
              100
          );
        }
      } else {
        obj.tagBodyLeft = 0;
      }
    }
    obj.tagBodyLeft = left;
  }

  handleTagsOption(type: any) {
    let obj: any = this;
    if (type === "clearAll") {
      obj.$store.commit("clearAllPageOpened");
      localStorage["pageOpened"] = JSON.stringify(obj.$store.state.pageOpened);
      obj.$router.push({
        name: "adminHome"
      });
    } else {
      let m;
      if (Number(localStorage["currentMenuID"]) != 0) {
        m = {
          id: Number(localStorage["currentMenuID"]),
          title: localStorage["currentMenuTitle"],
          icon: "",
          url: localStorage["currentMenuUrl"],
          status: true
        };
      }
      obj.$store.commit("clearAllPageOpened", m);
      localStorage["pageOpened"] = JSON.stringify(obj.$store.state.pageOpened);
    }
    obj.tagBodyLeft = 0;
  }

  //移动并定位标签
  moveToView(tag: any) {
    let obj: any = this;
    if (tag.offsetLeft < -obj.tagBodyLeft) {
      // 标签在可视区域左侧
      obj.tagBodyLeft = -tag.offsetLeft + 10;
    } else if (
      tag.offsetLeft + 10 > -obj.tagBodyLeft &&
      tag.offsetLeft + tag.offsetWidth <
        -obj.tagBodyLeft + obj.$refs.scrollCon.offsetWidth - 100
    ) {
      // 标签在可视区域
      obj.tagBodyLeft = Math.min(
        0,
        obj.$refs.scrollCon.offsetWidth -
          100 -
          tag.offsetWidth -
          tag.offsetLeft -
          20
      );
    } else {
      // 标签在可视区域右侧
      obj.tagBodyLeft = -(
        tag.offsetLeft -
        (obj.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
        20
      );
    }
  }
}
</script>