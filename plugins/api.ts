// import Vue from 'vue'
// import api from '~/api/index'
// export default ({ app }, inject) => {
//   inject('myPlugin', Vue.observable({...api}))
// }

import { Plugin } from '@nuxt/types';

declare module '@nuxt/types' {
  interface Context {
    $api: Object;
  }
}

const apiPlugin: Plugin = (context) => {
  context.$api = Object;
};

export default apiPlugin;
