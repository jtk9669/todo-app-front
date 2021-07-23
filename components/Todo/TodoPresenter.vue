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

  methods: {
    view(todo: TodoItemType) {
      const obj = {
        targetTodo: todo,
        type: '조회',
        isShowDialog: true,
      };
      this.$store.commit('dialog/showDialog', obj);
      // this.$emit('show-dialog', obj);
    },
    update(todo: TodoItemType) {
      const obj = {
        targetTodo: todo,
        type: '수정',
        isShowDialog: true,
      };
      this.$store.commit('dialog/showDialog', obj);
      // this.$emit('show-dialog', obj);
    },
    remove(todo: TodoItemType) {
      this.$emit('remove-todo', todo);
    },
  },
});
</script>

<style></style>
