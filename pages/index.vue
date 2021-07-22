<template>
  <div>
    <board-presenter></board-presenter>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardPresenter from '@/components/Board/BoardPresenter.vue';
export default Vue.extend({
  components: {
    BoardPresenter,
  },
});
</script>

<style></style>
