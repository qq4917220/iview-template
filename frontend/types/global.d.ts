declare var globalConfig: globalConfigStatic



interface BaseModalModel {
    isShow: boolean
    isLoading: boolean
    isErr: boolean
    errMsg: string
    isEdit: boolean
    title: string
    okBtnText: string
}

interface BaseModal<T> {
    isShow: boolean
    isLoading: boolean
    isErr: boolean
    errMsg: string
    isEdit: boolean
    title: string
    okBtnText: string
    data: T
}