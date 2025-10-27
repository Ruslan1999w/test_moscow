<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-modal-provider>
          <n-dialog-provider>
            <demo />
          </n-dialog-provider>
        </n-modal-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent } from "vue";
import Demo from "./components/Table.vue";

export default defineComponent({
  components: {
    Demo,
  },
});
</script>
