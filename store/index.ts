import { GetterTree, MutationTree } from 'vuex';
export const state = () => ({
  counter: 0,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  getCounter: (state) => {
    return state.counter;
  },
};

export const mutations: MutationTree<RootState> = {
  increment: (state) => {
    state.counter++;
  },
};
