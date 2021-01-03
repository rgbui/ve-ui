<template>
  <div class="vp-date-range" tabindex="1" @focusin="focus" @focusout="blur">
    <div class="vp-date-range-input" @click="toggle">
      <span class="data-date-range-from">{{ fromText }}</span>
      <span>~</span>
      <span class="data-date-range-to">{{ toText }}</span>
    </div>
    <div class="vp-date-range-drop" v-show="spread">
      <vp-date-drop
        :value="from"
        :mode="mode"
        @change="setFrom($event)"
      ></vp-date-drop>
      <vp-date-drop
        :value="to"
        :mode="mode"
        @change="setTo($event)"
      ></vp-date-drop>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { dateUtil } from "./date.util";
export default Vue.extend({
  props: {
    value: { type: Object },
    /***
     * @param mode date
     * @param mode datetime
     * @param mode time
     */
    mode: { type: String, default: "date" },
    /**
     * 传入的数据格式
     * @param format date 返回日期数据
     * @param format string 返回字符串
     *
     */
    format: { type: String, default: "date" },
  },
  model: {
    prop: "value",
    event: "change",
  },
  computed: {
    fromText() {
      return dateUtil.dateToText(this.from, this.mode);
    },
    toText() {
      return dateUtil.dateToText(this.to, this.mode);
    },
  },
  data() {
    var from =
      Array.isArray(this.value) && this.value.length > 0
        ? this.value[0]
        : new Date();
    if (!(from instanceof Date)) from = dateUtil.parse(from);
    var to =
      Array.isArray(this.value) && this.value.length > 1
        ? this.value[1]
        : new Date();
    if (!(to instanceof Date)) to = dateUtil.parse(to);
    return {
      from,
      to,
      isFocus: false,
    };
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur(event: FocusEvent) {
      if (
        (this.$el as HTMLDivElement).contains(
          event.relatedTarget as HTMLDivElement
        )
      )
        return;
      (this.$el as HTMLElement).style.zIndex = "1";
      this.isFocus = false;
      this.spread = false;
    },
    toggle(event: MouseEvent) {
      this.spread = this.spread ? false : true;
      (this.$el as HTMLElement).style.zIndex =
        this.spread == true ? "10000" : "1";
      if (this.spread == true && this.selector == "time") {
        Vue.nextTick(() => {
          this.setScroll();
        });
      }
    },
    setFrom(from: Date) {
      this.from = from;
      this.change();
    },
    setTo(to: Date) {
      this.to = to;
      this.change();
    },
    change() {
      if (this.format == "string") {
        this.$emit("change", [
          dateUtil.toString(this.from),
          dateUtil.toString(this.to),
        ]);
      } else this.$emit("change", [this.from, this.to]);
    },
  },
});
</script>
<style lang="less">
</style>