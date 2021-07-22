// import { Plugin } from '@nuxt/types';

// import { todoApis } from '@/api/todo/api';
// import { TodoApiType } from '@/api/todo/types';

// interface IApis {
//   todo: TodoApiType;
// }

// declare module 'vue/types/vue' {
//   interface Vue {
//     $api: IApis;
//   }
// }

// declare module '@nuxt/types' {
//   interface NuxtAppOptions {
//     $api: IApis;
//   }
// }

// declare module 'vuex/types/index' {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
//   interface Store<S> {
//     $api: IApis;
//   }
// }

// const apiUtils: Plugin = (_context, inject) => {
//   const apis = {
//     todo: { ...todoApis },
//   };

//   inject('api', apis);
// };

// export default apiUtils;
