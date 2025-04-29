export interface message{
    id: string
    message: string
}

export interface CategoryType{
    id: string
    title: string
}

export interface ModelType{
    id: string,
    model: string,
    parameter_size: string,
    active: boolean
}

export interface RagType{
    id: string,
    title: string,
    rag: string,
    category_id: string
}