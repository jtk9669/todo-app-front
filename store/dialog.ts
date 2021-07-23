import { GetterTree, MutationTree } from 'vuex';
import { TodoItemType } from '~/api/todo/types';
import { RootState } from '~/store';

export const state = () => ({
  isShowDialog: false,
  type: '조회',
  disabled: false,
  todoTarget: {
    _id: '',
    title: '',
    content: '',
  } as TodoItemType,
});

export type DialogState = ReturnType<typeof state>;

export const getters: GetterTree<DialogState, RootState> = {
  getIsShowDialog: (state) => state.isShowDialog,
  getType: (state) => state.type,
  getDisabled: (state) => state.disabled,
  getTodoTarget: (state) => state.todoTarget,
};

export const mutations: MutationTree<DialogState> = {
  showDialog(state, obj: any) {
    // 다이얼로그 ON
    state.todoTarget = obj.targetTodo;
    state.isShowDialog = obj.isShowDialog;
    state.type = obj.type;
  },
  cancelDialog(state) {
    state.isShowDialog = false;
  },
  setIsShowDialog(state, isShowDialog) {
    state.isShowDialog = isShowDialog;
  },
  setTitle(state, title: string) {
    state.todoTarget.title = title;
  },
  setContent(state, content: string) {
    state.todoTarget.content = content;
  },
};

// export default { state, getters, mutations };
