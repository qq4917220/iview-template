// <reference types='bluebird' />

declare var C: CStatic


/**
 * 全局配置对象接口
 */
interface CStatic {
    /**
     * 是否调试模式
     */
    debug: boolean

    /**
     * 版本号
     */
    version: string

    /**
     * 监听端口
     */
    port: number

    /**
     * 项目运行目前前缀
     */
    subDir: string

    [key: string]: any
}
