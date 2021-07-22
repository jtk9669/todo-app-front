<template>
  <v-container class="ma-10">
    <todo-container
      :page="page"
      :total-page-size.sync="totalPageSize"
      :cnt-per-page="cntPerPage"
      :todo-target="todoTarget"
    >
      <template #[`todo-presenter`]="scopedSlot">
        <todo-presenter
          :todos="scopedSlot.todos"
          @show-dialog="showDialog"
          @remove-todo="scopedSlot.removeTodo"
        />
        <dialog-presenter
          :is-show-dialog.sync="isShowDialog"
          :type="type"
          @update-todo="scopedSlot.updateTodo(todoTarget)"
          @add-todo="scopedSlot.addTodo(todoTarget)"
        >
          <template #[`field`]>
            <v-text-field v-model="todoTarget._id" label="id" />
            <v-text-field v-model="todoTarget.title" label="title" />
            <v-text-field v-model="todoTarget.content" label="content" />
          </template>
        </dialog-presenter>
      </template>
    </todo-container>
    <v-pagination v-model="page" :length="totalPageSize" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoContainer from '@/components/Todo/TodoContainer.vue';
import TodoPresenter from '@/components/Todo/TodoPresenter.vue';
import DialogPresenter from '../Dialog/DialogPresenter.vue';
import { TodoItemType } from '~/api/todo/types';

export default Vue.extend({
  components: {
    TodoPresenter,
    TodoContainer,
    DialogPresenter,
  },
  data() {
    return {
      page: 1,
      cntPerPage: 3,
      totalPageSize: 1,
      isShowDialog: false,
      type: '조회',
      disabled: false,
      todoTarget: {
        _id: '',
        title: '',
        content: '',
      } as TodoItemType,
    };
  },
  methods: {
    showDialog(obj: any) {
      // 다이얼로그 ON
      this.todoTarget = obj.targetTodo;
      this.isShowDialog = obj.isShowDialog;
      this.type = obj.type;
    },
  },
});
</script>
