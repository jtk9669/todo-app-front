<template>
  <div>
    <slot :todos="todos" :target-todo="targetTodo"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  TodoDeleteQuery,
  TodoFindByIdQuery,
  TodoListQuery,
  TodoUpdateQuery,
} from '~/api/todo/api';
import { TodoItemType } from '~/api/todo/types';
export default Vue.extend({
  props: {
    page: {
      type: Number,
      default: () => 1,
      required: true,
    },
    totalPageSize: {
      type: Number,
      default: () => 1,
      required: true,
    },
    cntPerPage: {
      type: Number,
      default: () => 4,
      required: true,
    },
  },
  data() {
    return {
      todos: [] as TodoItemType[],
      targetTodo: {
        _id: '',
        title: '',
        content: '',
      } as TodoItemType,
    };
  },
  methods: {
    todoList(page: number) {
      const { query, variables } = TodoListQuery(page, this.cntPerPage);
      this.$axios
        .post('http://localhost:4000/graphql', { query, variables })
        .then(
          ({
            data: {
              data: {
                TodoList: {
                  page: { totalPageSize },
                  data,
                },
              },
            },
          }) => {
            console.log(totalPageSize);
            this.todos = data;
            // sync spoed slot
            this.$emit('update:total-page-size', totalPageSize);
            //  this.totalPageSize = totalPageSize;
          },
        );
    },
    todoView(item: TodoItemType) {
      const { query, variables } = TodoFindByIdQuery(item);
      this.$axios
        .post('http://localhost:4000/graphql', { query, variables })
        .then(
          ({
            data: {
              data: {
                TodoFindById: { data: todo },
              },
            },
          }) => {
            // sync spoed slot
            this.targetTodo = todo;

            // 다이얼로그 함수 호출
            this.$emit('show-view-dialog');
            // this.showViewDialog();
          },
        );
    },
    todoRemove(item: TodoItemType) {
      const { query, variables } = TodoDeleteQuery(item);
      this.$axios
        .post('http://localhost:4000/graphql', { query, variables })
        .then(
          ({
            data: {
              data: {
                TodoDelete: { data },
              },
            },
          }) => {
            console.log(data);
            this.todoList(this.page);
          },
        );
    },
    todoUpdate(todo: TodoItemType) {
      const { query, variables } = TodoUpdateQuery(todo);
      this.$axios
        .post('http://localhost:4000/graphql', { query, variables })
        .then(() => {
          // 다이얼로그 함수 호출
          // this.cancel();
          this.$emit('cancel');
          this.todoList(this.page);
        });
    },
  },
});
</script>
