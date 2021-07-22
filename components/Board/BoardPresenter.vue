<template>
  <v-container class="ma-10">
    <todo-container
      :page="page"
      :total-page-size.sync="totalPageSize"
      :cnt-per-page="cntPerPage"
    >
      <template #[`todo-presenter`]="parentSlot">
        <todo-presenter
          :todos="parentSlot.todos"
          @remove-todo="parentSlot.removeTodo"
        >
          <template #[`dialog`]="child">
            {{ child }}

            <dialog-presenter
              :is-show-dialog.sync="child.isShowDialog"
              :type="child.type"
              @update-todo="parentSlot.updateTodo"
              @add-todo="parentSlot.addTodo"
            >
              <template #[`field`]>
                <v-text-field v-model="child.targetTodo._id" label="id" />
                <v-text-field v-model="child.targetTodo.title" label="title" />
                <v-text-field
                  v-model="child.targetTodo.content"
                  label="content"
                />
              </template>
            </dialog-presenter>
          </template>
        </todo-presenter>
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
// import { TodoItemType } from '~/api/todo/types';

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
    };
  },
  methods: {},
});
</script>
