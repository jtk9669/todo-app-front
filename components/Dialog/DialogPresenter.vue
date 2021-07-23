<template>
  <div>
    <v-dialog
      max-width="600px"
      :value="isShowDialog"
      @input="$store.commit('setIsShowDialog', !isShowDialog)"
    >
      <v-card>
        <v-card-title>{{ type }}</v-card-title>
        <v-card-text>
          <slot name="field"></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">취소</v-btn>
          <v-btn v-if="type === '수정'" @click="save">{{ type }}</v-btn>
          <v-btn v-if="type === '추가'" @click="add">{{ type }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    isShowDialog: {
      type: Boolean,
      default: () => false,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    cancel() {
      // this.$emit('update:isShowDialog');
      this.$store.commit('dialog/cancelDialog');
    },
    save() {
      this.$emit('update-todo');
      this.cancel();
    },
    add() {
      this.$emit('add-todo');
      this.cancel();
    },
  },
});
</script>
