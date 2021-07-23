<template>
  <div>
    <slot
      name="todo-presenter"
      :todos="todos"
      :remove-todo="removeTodo"
      :update-todo="updateTodo"
      :add-todo="addTodo"
    ></slot>
    <slot name="todo-presenter-dialog"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
    };
  },
  watch: {
    page() {
      this.listTodo(this.page, this.cntPerPage);
    },
  },
  created() {
    this.listTodo(this.page, this.cntPerPage);
  },

  methods: {
    // ...mapMutations({
    //   setTotalPageSize: 'pagenation/setTotalPageSize',
    // }),

    listTodo(page: number, cntPerPage: number) {
      this.$api.todo.todoList(page, cntPerPage).then((data) => {
        this.todos = data.data;
        this.$store.commit(
          'pagenation/setTotalPageSize',
          data.page.totalPageSize,
        );
        // this.$emit('update:total-page-size', data.page.totalPageSize);
      });
    },
    removeTodo(todo: TodoItemType) {
      this.$api.todo.todoRemove(todo).then(() => {
        this.listTodo(this.page, this.cntPerPage);
      });
    },
    updateTodo(todo: TodoItemType) {
      console.log('updateTodo call!');
      this.$api.todo
        .todoUpdate(todo)
        .then(() => this.listTodo(this.page, this.cntPerPage));
    },
    addTodo(todo: TodoItemType) {
      this.$api.todo
        .todoCreate(todo.title, todo.content)
        .then(() => this.listTodo(this.page, this.cntPerPage));
    },
  },
});
</script>

function mapMutations(arg0: {}): any { throw new Error('Function not
implemented.'); }
