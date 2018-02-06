declare module 'swig'

interface globalConfigStatic {
    appName: string
    appVersion: string
    user: globalUserModel
    ip: string
    prefixPath: string
}

interface globalUserModel {
    id: string
    name: string
    role: string
}