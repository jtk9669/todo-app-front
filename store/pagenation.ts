import { GetterTree, MutationTree } from 'vuex';
import { RootState } from '~/store';

export const state = () => ({
  page: 1,
  cntPerPage: 3,
  totalPageSize: 1,
});

export type PagenationState = ReturnType<typeof state>;

export const getters: GetterTree<PagenationState, RootState> = {
  getPage: (state) => state.page,
  getCntPerPage: (state) => state.cntPerPage,
  getTotalPageSize: (state) => state.totalPageSize,
};

export const mutations: MutationTree<PagenationState> = {
  setPage: (state, page: number) => (state.page = page),
  setCntPerPage: (state, cntPerPage: number) => (state.cntPerPage = cntPerPage),
  setTotalPageSize: (state, totalPageSize: number) =>
    (state.totalPageSize = totalPageSize),
};

// export default { state, getters, mutations };
