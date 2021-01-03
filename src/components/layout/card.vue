<template>
  <div class="vp-card">
    <div class="vp-card-title" v-if="title ? true : false">{{ title }}</div>
    <div class="vp-card-content">
      <slot>
        <span class="vp-card-content-html" v-html="contentValue"></span
      ></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    getContent: { type: Function },
    data: { type: Object },
  },
  computed: {
    contentValue() {
      if (typeof this.getContent == "function")
        return this.getContent(this.data);
      var c = this.content.replace(/\$\{([^\}]+)\}/g, ($, $1) => {
        if (
          $1 == "value" &&
          typeof this.data != "object" &&
          this.data !== null
        ) {
          return this.data;
        } else {
          if (typeof this.data == "object") {
            if (typeof this.data[$1] != "undefined") return this.data[$1];
          }
        }
        return $;
      });
      c = c.replace(/\\n/g, "<br/>");
      return c;
    },
  },
});
</script>
<style lang="less">
.vp-card {
  width: 100%;
  display: block;
  box-sizing: border-box;
  b {
    font-weight: bold;
  }
  &-content {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @grey-background-2x;
    border-radius: @radius;
    padding: @gap;
    &-html {
      text-align: center;
      line-height: 20px;
      display: inline-block;
    }
  }
}
</style>