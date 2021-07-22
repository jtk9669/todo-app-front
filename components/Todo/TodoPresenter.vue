<template>
  <div>
    <v-row cols="12" class="justify-start">
      <v-col v-for="todo in todos" :key="todo._id" cols="6">
        <v-card>
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-text>
            {{ todo.content }}
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn small @click="view(todo)">
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn small @click="update(todo)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small @click="remove(todo)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <slot
      name="dialog"
      :is-show-dialog="isShowDialog"
      type="type"
      :target-todo="targetTodo"
    ></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { TodoItemType } from '~/api/todo/types';
export default Vue.extend({
  props: {
    todos: {
      type: Array,
      default: () => [],
      required: true,
    } as PropOptions<TodoItemType[]>,
  },
  data() {
    return {
      isShowDialog: false,
      type: '조회',
      targetTodo: {
        _id: '',
        title: '',
        content: '',
      } as TodoItemType,
    };
  },
  methods: {
    view(todo: TodoItemType) {
      this.targetTodo = todo;
      this.type = '조회';
      this.isShowDialog = true;
    },
    update(todo: TodoItemType) {
      this.targetTodo = todo;
      this.type = '수정';
      this.isShowDialog = true;
    },
    remove(todo: TodoItemType) {
      this.$emit('remove-todo', todo);
    },
  },
});
</script>

<style></style>
