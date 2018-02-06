declare interface ServiceResult<T> {
    err?: string
    data?: T
}

declare interface ServiceList<T> {
    pageIndex?: number
    pageSize?: number
    pageCount?: number
    total?: number
    items: T[]
}