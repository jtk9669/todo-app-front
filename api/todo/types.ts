
 
export type TodoItemType={
    _id : string,
    title : string,
    content : string
 }
 
 export type TodoApiType={
    list : (page : number, cntPerPage: number, callback : (query: string, variables: Object) => void) => void,
    create : (item : TodoItemType, callback : (query: string, variables: Object) => void) => void,
    update : (item : TodoItemType, callback : (query: string, variables: Object) => void) => void,
    delete : (item : TodoItemType, callback : (query: string, variables: Object) => void) => void,
 }
    
    