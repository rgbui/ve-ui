<template>
  <div class="vp-scan">
    <span
      v-if="$slots.prepend || prepend ? true : false"
      class="vp-scan-prepend"
    >
      <slot name="prepend">{{ prepend }}</slot>
    </span>
    <input
      type="text"
      @keydown.enter="enter"
      v-model="code"
      :placeholder="placeholder"
      :style="inputStyle"
      @input="input"
    />
    <vp-icon icon="life-ring:font" class="vp-scan-append"></vp-icon>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    code: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    prepend: { type: String, default: "" },
    indent: { type: Number },
  },
  computed: {
    inputStyle() {
      var style: Record<string, any> = {};
      if (typeof this.indent == "number") style.textIndent = this.indent + "px";
      return style;
    },
  },
  methods: {
    enter(event: MouseEvent) {
      this.$emit("enter", (event.target as HTMLInputElement).value);
    },
    input(event: FocusEvent) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },
  },
});
</script>
<style lang="less">
.vp-scan {
  display: block;
  width: 100%;
  position: relative;
  input {
    height: @height;
    width: 100%;
    box-sizing: border-box;
    color: @text-color;
    background-color: @grey;
    border-radius: @radius;
    border: 1px solid @grey-border-3x;
    box-shadow: @shadow-inner-2x;
    text-indent: @gap-min;
    &::-webkit-input-placeholder {
      color: @text-color-disabled;
    }
  }
  &-prepend {
    position: absolute;
    top: 0px;
    left: @gap;
    height: @height;
    color: @text-color;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  &-append {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 20px;
    color: @text-color-disabled;
    height: @height;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
[data-device="mobile"] .vp-scan {
  input {
    height: @height-mobile;
  }
  &-prepend {
    height: @height-mobile;
  }
  &-append {
    height: @height-mobile;
    width: @height-mobile;
  }
}
</style>