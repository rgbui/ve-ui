<template>
  <div class="vp-space" :class="['vp-space-' + arrow]" :style="style">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    arrow: { type: String, default: "x" },
    gap: { type: Number, default: 10 },
    block: { type: Boolean, default: true },
    align: { type: String, default: "left" },
    valign: { type: String, default: "middle" },
    padding: { type: Number },
    height: { type: Number },
  },
  mounted() {
    this.updateGap();
  },
  updated() {
    this.updateGap();
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      if (this.block == false) style.display = "inline-flex";

      style.justifyContent = "flex-start";
      if (this.align == "center") style.justifyContent = "center";
      else if (this.align == "right") style.justifyContent = "flex-end";

      style.alignItems = "center";
      if (this.valign == "top") style.alignItems = "flex-start";
      else if (this.valign == "bottom") style.alignItems = "flex-end";

      if (typeof this.height == "number") style.height = this.height + "px";
      if (typeof this.padding == "number") style.padding = this.padding + "px";
      return style;
    },
  },
  methods: {
    updateGap() {
      var ele: HTMLDivElement = this.$el;
      var cs = ele.children;
      for (let i = 0; i < cs.length - 1; i++) {
        let el: HTMLDivElement = cs[i] as HTMLDivElement;
        if (this.arrow == "x") el.style.marginRight = this.gap + "px";
        else if (this.arrow == "y") el.style.marginBottom = this.gap + "px";
      }
    },
  },
});
</script>
<style lang="less">
.vp-space {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  &-y {
    flex-direction: column;
  }
}
</style>