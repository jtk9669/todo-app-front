import axios from 'axios';
import {
  TodoListQuery,
  TodoFindByIdQuery,
  TodoDeleteQuery,
  TodoUpdateQuery,
} from './queries';
import { TodoItemType } from './types';

export default {
  async todoList(page: number = 1, cntPerPage: number = 4) {
    const { query, variables } = TodoListQuery(page, cntPerPage);
    const {
      data: {
        data: { TodoList },
      },
    } = await axios.post('http://localhost:4000/graphql', {
      query,
      variables,
    });

    return TodoList;
    // console.log(totalPageSize);
    // this.todos = data;
    // // sync spoed slot
    // this.$emit('update:total-page-size', totalPageSize);
    // //  this.totalPageSize = totalPageSize;
  },
  async todoView(item: TodoItemType) {
    const { query, variables } = TodoFindByIdQuery(item);
    const {
      data: {
        data: {
          TodoFindById, // : { data: todo }
        },
      },
    } = await axios.post('http://localhost:4000/graphql', { query, variables });
    return TodoFindById; // { data: todo }
    // // sync spoed slot
    // this.targetTodo = todo;

    // // 다이얼로그 함수 호출
    // this.$emit('show-view-dialog');
    // // this.showViewDialog();
  },
  async todoRemove(item: TodoItemType) {
    const { query, variables } = TodoDeleteQuery(item);
    const {
      data: {
        data: {
          TodoDelete, // : { data }
        },
      },
    } = await axios.post('http://localhost:4000/graphql', { query, variables });
    return TodoDelete;
    // this.todoList(this.page);
  },
  async todoUpdate(todo: TodoItemType) {
    const { query, variables } = TodoUpdateQuery(todo);
    await axios.post('http://localhost:4000/graphql', { query, variables });

    //     // 다이얼로그 함수 호출
    // // this.cancel();
    // this.$emit('cancel');
    // this.todoList(this.page);
  },
};
