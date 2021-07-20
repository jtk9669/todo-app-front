<template>
  <v-pagination
    :value="page"
    :length="totalPageSize"
    @input="
      $emit('update:page', $event);
      $emit('todo-list', $event);
    "
  />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPageSize: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style></style>
