<template>
  <div class="vp-devide">
    <label
      ><slot>{{ text }}</slot></label
    >
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    align: { type: String, default: "left" },
    text: { type: String },
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      style.justifyContent = "flex-start";
      if (this.align == "center") style.justifyContent = "center";
      else if (this.align == "right") style.justifyContent = "flex-end";
      return style;
    },
  },
});
</script>
<style lang="less">
.vp-devide {
  position: relative;
  height: 10px;
  margin: @gap 0px;
  &::after {
    content: "\20";
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 0px;
    right: 0px;
    transform: translate(0, 50%);
    height: 1px;
    background-color: @grey-border-3x;
  }
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  label {
    margin: 0px @gap;
    padding: 0px @gap-space;
    display: inline-flex;
    background-color: @grey-background;
  }
}
</style>