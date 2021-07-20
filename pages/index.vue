<template>
  <v-container class="ma-10">
    <v-container>
      <todo-component
        :todos="todos"
        @todo-view="todoView"
        @todo-update="showUpdateDialog"
        @todo-remove="todoRemove"
      ></todo-component>
    </v-container>

    <v-container>
      <v-btn @click="showAddDialog">추가</v-btn>
      <dialog-component
        :title="dialogTitle"
        :dialog.sync="dialog"
        :is-save-btn="isSaveBtn"
        @cancel="cancel"
        @save="save"
      >
        <template #[`field`]>
          <v-text-field v-model="id" disabled label="id" />
          <v-text-field v-model="title" :disabled="disabled" label="제목" />
          <v-textarea v-model="content" :disabled="disabled" label="내용" />
        </template>
      </dialog-component>
    </v-container>

    <v-container>
      <pagenation-component :page.sync="page" :total-page-size="totalPageSize" @todo-list="todoList" />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import dialogComponent from '@/components/dialogComponent.vue';
import pagenationComponent from '@/components/pagenationComponent.vue';
import todoComponent from '@/components/todoComponent.vue';
import {
  TodoCreateQuery,
  TodoDeleteQuery,
  TodoFindByIdQuery,
  TodoListQuery,
  TodoUpdateQuery,
} from '~/api/todo/api';
import { TodoItemType } from '~/api/todo/types';
export default Vue.extend({
  components: {
    dialogComponent,
    pagenationComponent,
    todoComponent,
  },
  data() {
    return {
      dialog: false,
      dialogTitle: '',
      isSaveBtn: false,
      disabled: false,
      id: '',
      title: '',
      content: '',
      page: 1,
      totalPageSize: 1,
      cntPerPage: 4,
      todos: [],
    };
  },
  created() {
    this.todoList(this.page);
  },
  methods: {
    initDialogTarget() {
      this.id = '';
      this.title = '';
      this.content = '';
    },
    setDialogTarget(todo: TodoItemType) {
      this.id = todo._id;
      this.title = todo.title;
      this.content = todo.content;
    },
    showAddDialog() {
      this.dialog = true;
      this.dialogTitle = '추가';
      this.isSaveBtn = true;
      this.disabled = false;
    },
    showViewDialog() {
      this.dialog = true;
      this.dialogTitle = '상세보기';
      this.isSaveBtn = false;
      this.disabled = true;
    },
    showUpdateDialog(todo: TodoItemType) {
      this.dialog = true;
      this.dialogTitle = '수정';
      this.isSaveBtn = true;
      this.disabled = false;
      this.setDialogTarget(todo);
    },
    cancel() {
      this.dialog = false;
      this.dialogTitle = '';
      this.isSaveBtn = false;
      this.initDialogTarget();
    },
    todoList(page: number) {
      const { query, variables } = TodoListQuery(page, this.cntPerPage);
      this.$axios.post('http://localhost:4000/graphql', { query, variables }).then(
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
          this.todos = data;
          this.totalPageSize = totalPageSize;
        },
      );
    },
    todoView(item: TodoItemType) {
      const { query, variables } = TodoFindByIdQuery(item);
      this.$axios.post('http://localhost:4000/graphql', { query, variables }).then(
        ({
          data: {
            data: {
              TodoFindById: { data: todo },
            },
          },
        }) => {
          this.id = todo._id;
          this.title = todo.title;
          this.content = todo.content;
          this.showViewDialog();
        },
      );
    },
    todoRemove(item: TodoItemType) {
      const { query, variables } = TodoDeleteQuery(item);
      this.$axios.post('http://localhost:4000/graphql', { query, variables }).then(
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
      this.$axios.post('http://localhost:4000/graphql', { query, variables }).then(() => {
        this.cancel();
        this.todoList(this.page);
      });
    },
    save() {
      const { query, variables } = TodoCreateQuery({
        _id: '',
        title: this.title,
        content: this.content,
      });
      this.$axios.post('http://localhost:4000/graphql', { query, variables }).then(() => {
        this.cancel();
        this.todoList(this.page);
      });
    },
  },
});
</script>
