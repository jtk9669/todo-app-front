import { Plugin } from '@nuxt/types';

import { todoApis } from '@/api/todo/api';
import { TodoApiType } from '@/api/todo/types';

interface IApis {
  todo: TodoApiType;
}
declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $api: IApis;
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: IApis;
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $api: IApis;
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface Store<S> {
    $api: IApis;
  }
}

const todoPlugin: Plugin = (context, inject) => {
  console.log(typeof context);
  inject('api', {
    todo: todoApis,
  });
};

export default todoPlugin;
