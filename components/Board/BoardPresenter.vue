<template>
  <v-container class="ma-10">
    <p>getType:{{ getType }}</p>
    <p>getPage: {{ getPage }}</p>
    <todo-container
      :page="getPage"
      :total-page-size="getTotalPageSize"
      :cnt-per-page="getCntPerPage"
      :todo-target="getTodoTarget"
    >
      <template #[`todo-presenter`]="scopedSlot">
        <todo-presenter
          :todos="scopedSlot.todos"
          @show-dialog="showDialog"
          @remove-todo="scopedSlot.removeTodo"
        />
        <v-btn
          @click="
            showDialog({ targetTodo: {}, isShowDialog: true, type: '추가' })
          "
          >추가</v-btn
        >
        <dialog-presenter
          :is-show-dialog="getIsShowDialog"
          :type="getType"
          @update-todo="scopedSlot.updateTodo(getTodoTarget)"
          @add-todo="scopedSlot.addTodo(getTodoTarget)"
        >
          <template #[`field`]>
            <v-text-field :value="getTodoTarget._id" label="id" />
            <v-text-field
              :value="getTodoTarget.title"
              label="title"
              @input="setTitle"
            />
            <v-text-field
              :value="getTodoTarget.content"
              label="content"
              @input="setContent"
            />
          </template>
        </dialog-presenter>
      </template>
    </todo-container>
    <v-pagination
      :value="getPage"
      :length="getTotalPageSize"
      @input="setPage"
    />
    {{ getCounter }} <v-btn @click="increment">클릭</v-btn><br />
    {{ getPage }}
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import TodoContainer from '@/components/Todo/TodoContainer.vue';
import TodoPresenter from '@/components/Todo/TodoPresenter.vue';
import DialogPresenter from '../Dialog/DialogPresenter.vue';

export default Vue.extend({
  components: {
    TodoPresenter,
    TodoContainer,
    DialogPresenter,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getCounter: 'getCounter',
      getPage: 'pagenation/getPage',
      getCntPerPage: 'pagenation/getCntPerPage',
      getTotalPageSize: 'pagenation/getTotalPageSize',
      getIsShowDialog: 'dialog/getIsShowDialog',
      getType: 'dialog/getType',
      getDisabled: 'dialog/getDisabled',
      getTodoTarget: 'dialog/getTodoTarget',
    }),
  },
  methods: {
    ...mapMutations({
      increment: 'increment',
      setPage: 'pagenation/setPage',
      showDialog: 'dialog/showDialog',
      setTitle: 'dialog/setTitle',
      setContent: 'dialog/setContent',
    }),
  },
});
</script>
