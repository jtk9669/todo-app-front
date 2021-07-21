<script lang="ts">
import Vue from 'vue';
import { TodoItemType } from '~/api/todo/types';
export default Vue.extend({
  data() {
    return {
      dialog: false,
      dialogTitle: '',
      isSaveBtn: false,
      disabled: false,
    };
  },
  methods: {
    initDialogTarget() {
      // this.id = '';
      // this.title = '';
      // this.content = '';
    },
    setDialogTarget(todo: TodoItemType) {
      console.log(todo);
      // this.id = todo._id;
      // this.title = todo.title;
      // this.content = todo.content;
    },
    showAddDialog() {
      this.dialog = true;
      this.dialogTitle = '추가';
      this.isSaveBtn = true;
      this.disabled = false;
    },
    showViewDialog() {
      this.dialog = true;
      this.dialogTitle = '상세보기';
      this.isSaveBtn = false;
      this.disabled = true;
    },
    showUpdateDialog(todo: TodoItemType) {
      this.dialog = true;
      this.dialogTitle = '수정';
      this.isSaveBtn = true;
      this.disabled = false;
      this.setDialogTarget(todo);
    },
    cancel() {
      this.dialog = false;
      this.dialogTitle = '';
      this.isSaveBtn = false;
      this.initDialogTarget();
    },
  },
});
</script>
