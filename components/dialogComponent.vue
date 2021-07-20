<template>
  <v-dialog max-width="600px" :value="dialog" @input="$emit('update:dialog', !dialog)">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <slot name="field"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">취소</v-btn>
        <v-btn v-if="isSaveBtn" @click="save">{{ title }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    isSaveBtn: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    save() {
      this.$emit('save');
    },
  },
});
</script>

<style></style>
