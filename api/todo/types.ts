export type TodoItemType = {
  _id: string;
  title: string;
  content: string;
};

export type Page = {
  page: number;
  cntPerPage: number;
  totalPageSize: number;
  totalCount: number;
  remainder: number;
  start_page_num: number;
  end_page_num: number;
  isPrev: number;
  isNext: number;
  prev_page_num: number;
  next_page_num: number;
};

export type TodoItemListResponseType = {
  ok: boolean;
  page: Page;
  data: TodoItemType[];
};

export type TodoApiType = {
  todoList(
    page?: number,
    cntPerPage?: number,
  ): Promise<TodoItemListResponseType>;
  todoView(item: TodoItemType): Promise<TodoItemType>;
  todoCreate(title: string, content: string): Promise<void>;
  todoUpdate(todo: TodoItemType): Promise<void>;
  todoRemove(item: TodoItemType): Promise<void>;
};
