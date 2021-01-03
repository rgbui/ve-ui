<template>
  <div class="vp-message" :class="['vp-message-' + type]">
    <vp-icon :icon="icon"></vp-icon>
    <span>{{ message }}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    type: { type: String, default: "info" },
    message: { type: String, default: "string" },
  },
  computed: {
    icon() {
      if (this.type == "info") return "check-circle:font";
      else if (this.type == "warn") return "exclamation-circle:font";
      else if (this.type == "error") return "times-circle:font";
    },
  },
});
</script>
<style lang="less">
.vp-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #fff;
  border-radius: @radius-2x;
  border: 1px solid @grey-border;
  padding: @gap;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &-info {
    background-color: #87d068;
  }
  &-warn {
    background-color: #fa0;
  }
  &-error {
    background-color: #f50;
  }
  .vp-icon {
    width: 30px;
    height: 30px;
    font-size: 16px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: @gap;
  }
  span {
    color: @text-color-2x;
  }
}
</style>