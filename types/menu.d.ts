declare namespace menuModel {
    interface menuInfo {
        Id: number,
        Parentid: string,
        Title: string,
        Url: string,
        Layer: number,
        Seq: number,
        Icon: string,
        CreateBy: string,
        CreateDate: Date,
        UpDateBy: string,
        UpDateDate: Date
    }
    interface userMenuInfo {
        UserId: string,
        UserName: string,
        MenuIds: string,
        MenuNames: string,
        CreateBy: string,
        CreateDate: Date,
        UpDateBy: string,
        UpDateDate: Date
    }
    interface roleMenu {
        Id: number,
        RoleName: string,
        UserIds: string,
        UserNames: string,
        MenuIds: string,
        DeleteFlag: number,
        CreateBy: string,
        CreateDate: Date,
        UpDateBy: string,
        UpDateDate: Date
    }

    interface menuResult<T> {
        err?: any
        data?: {
            items: T[]
        }
    }

    interface menuListItem {
        id: number
        icon: string
        title: string
        url: string
        status: boolean
        children?: menuListItem[]
    }

}