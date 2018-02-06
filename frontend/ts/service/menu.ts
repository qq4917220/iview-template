import Axios, { AxiosRequestConfig } from "axios";

export class MenuService {
    private loggerShow = false;
    private static instance: MenuService
    static get Instance() {
        return this.instance || (this.instance = new MenuService())
    }

    //UserMenuList-得到用户菜单列表
    async UserMenuList() {

        let dName = "UserMenuList";

        let dm: ServiceResult<ServiceList<menuModel.menuListItem>> = {}

        let reqConfig: AxiosRequestConfig = {
            method: "post",
            url: globalConfig.prefixPath + "/admin/menu",
            data: {},
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            let dr = await Axios.request(reqConfig);
            dm = {
                data: {
                    items: dr.data.data.items
                }
            }
        } catch (e) {
            dm.err = `【${e}】`
        }
        return dm

    }
};

const i = MenuService.Instance
export default i
