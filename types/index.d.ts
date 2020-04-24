export as namespace Types

export interface PlainObject {
    [key: string]: any
}

/**
 * 定义枚举数据格式
 */
export interface EnumObject {
    key: string
    value: string
    label: string
}
