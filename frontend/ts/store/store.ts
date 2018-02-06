import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash'

Vue.use(Vuex);

let currentHome = {
    id: 0,
    icon: "home",
    title: "首页",
    url: "adminHome",
    status: true
}

const store = new Vuex.Store({
    state: {
        menuList: [],   //菜单
        currentMenuID: "",  //当前菜单ID
        currentMenuTitle: "", //当前菜单标题
        currentMenuUrl: "",//当前菜单链接
        currentPath: [], //当前路径
        pageOpened: [] //打开的页面
    },
    mutations: {
        setMenuList(state, menuList) {
            state.menuList = menuList;
        },
        setCurrentMenuID(state, menuID) {
            if (menuID == "" && localStorage["currentMenuID"]) {
                state.currentMenuID = localStorage["currentMenuID"];
            } else {
                state.currentMenuID = menuID;
            }
        },
        setCurrentMenuTitle(state, title) {
            state.currentMenuTitle = title;
        },
        setCurrentMenuUrl(state, url) {
            state.currentMenuUrl = url;
        },
        setCurrentPath(state, menuID) {
            if (menuID == "") {
                state.currentPath = []
                return;
            }
            let menuList: menuModel.menuListItem[] = state.menuList;
            let currentPath: any = [];
            let currentHomeUrl = {
                id: 0,
                icon: "home",
                title: "首页",
                url: "{url:'adminHome'}",
                status: true
            }
            if (menuID == "0") {
                currentPath.push(currentHome);
            } else {
                _.each(menuList, (item) => {
                    if (!item.children) {
                        if (item.id == Number(menuID)) {
                            currentPath.push(currentHome);
                            currentPath.push(item);
                        }
                    } else {
                        _.each(item.children, (item2: menuModel.menuListItem) => {
                            if (item2.id == Number(menuID)) {
                                currentPath.push(currentHome);
                                currentPath.push(item);
                                currentPath.push(item2);
                            }
                        });
                    }
                });
            }
            state.currentPath = currentPath;
        },
        setPageOpened(state) {
            if (state.pageOpened.length == 0 && localStorage["pageOpened"]) {
                state.pageOpened = JSON.parse(localStorage["pageOpened"])
            }
        },
        addPageOpened(state, menuID) {
            if (menuID == "") {
                return;
            }
            let menuList: menuModel.menuListItem[] = state.menuList;
            let pageOpened: any = state.pageOpened;
            if (menuID == "0") {
                let f = _.findIndex(pageOpened, (s: any) => {
                    return (s.id == 0)
                })
                if (f == -1) {
                    pageOpened.push(currentHome);
                }
            } else {
                _.each(menuList, (item) => {
                    if (!item.children) {
                        if (item.id == Number(menuID)) {
                            let f = _.findIndex(pageOpened, (s: any) => {
                                return (s.id == Number(menuID))
                            })
                            if (f == -1) {
                                pageOpened.push(item);
                            }
                        }
                    } else {
                        _.each(item.children, (item2: menuModel.menuListItem) => {
                            if (item2.id == Number(menuID)) {
                                let f = _.findIndex(pageOpened, (s: any) => {
                                    return (s.id == Number(menuID))
                                })
                                if (f == -1) {
                                    pageOpened.push(item2);
                                }

                            }
                        });
                    }
                });
            }
            localStorage["pageOpened"] = JSON.stringify(pageOpened)
            state.pageOpened = pageOpened;
        },
        removePageOpened(state, menuID) {
            state.pageOpened.map((item: menuModel.menuListItem, index) => {
                if (item.id === menuID) {
                    state.pageOpened.splice(index, 1);
                }
            });
        },
        clearAllPageOpened(state, currentItem?) {
            state.pageOpened = []
            let arr: any = [];
            arr.push(currentHome)
            if (currentItem) {
                arr.push(currentItem)
            }
            state.pageOpened = arr;
        }
    },
    getters: {
        currentMenuGroup(state) {
            if (state.currentPath.length > 2) {
                let arr = []
                arr.push(state.currentPath[1]["id"])
                return arr
            } else {
                return []
            }
        },
        currentMenuRouteTo(state) {
            //生成url
            let url = state.currentMenuUrl;
            let iUrl = "";
            let iName = "adminIframe";
            if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1) {
                url = encodeURIComponent(url);
                iUrl += url;
            } else if (url.indexOf("webapp") > -1) {
                iUrl = globalConfig.prefixPath + "/";
                iName = "adminUrl";
                iUrl += url;
            } else if (url == "adminHome") {
                iUrl = url;
                iName = url;
            }
            else {
                iUrl = globalConfig.prefixPath + "/easyui/";
                iName = "adminEasyui";
                url = encodeURIComponent(url);
                iUrl += encodeURIComponent(url);
            }
            // console.log('store iUrl', iUrl);
            return (iName == "adminUrl") ? iUrl : {
                name: iName,
                params: { url: iUrl }
            }
        }
    },
    modules: {
    }
});

export default store;
