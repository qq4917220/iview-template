import Vue, { VNode } from 'vue'

declare module "vue/types/vue" {
    interface Vue {
        $Modal: iview.Modal
        $Message: iview.Message
        $Loading: iview.Loading
        $Notice: iview.Notice
    }
}

declare namespace iview {
    interface Modal {
        info: (config: ModalConfig) => void
        success: (config: ModalConfig) => void
        warning: (config: ModalConfig) => void
        error: (config: ModalConfig) => void
        confirm: (config: ModalConfig) => void
        remove: () => void
    }

    interface ModalConfig {
        title?: string
        content?: string
        render?: (this: Vue, h: any) => VNode
        width?: number
        okText?: string
        cancelText?: string
        loading?: boolean
        scrollable?: boolean
        onOk?: () => void
        onCancel?: () => void
    }

    interface Message {
        info: (config: MessageConfig) => void
        success: (config: MessageConfig) => void
        warning: (config: MessageConfig) => void
        error: (config: MessageConfig) => void
        loading: (config: MessageConfig) => void
        config: (config: MessageConfig) => void
        destory: () => void
    }

    interface MessageConfig {
        content?: string
        duration?: number
        onClose?: () => void
        closable?: boolean
    }

    interface Loading {
        start: (config: LoadingConfig) => void
        finish: (config: LoadingConfig) => void
        error: (config: LoadingConfig) => void
    }

    interface LoadingConfig {
        color?: string
        failedColor?: string
        height?: number
    }

    interface Notice {
        info: (config: NoticeConfig) => void
        success: (config: NoticeConfig) => void
        warning: (config: NoticeConfig) => void
        error: (config: NoticeConfig) => void
        open: (config: NoticeConfig) => void
    }

    interface NoticeConfig {
        title?: string
        desc?: string
        duration?: number
        key?: number
    }
}