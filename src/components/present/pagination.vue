<template>
  <div
    class="vp-pagination"
    :class="[
      disabled == true || disabled == 'disabled'
        ? 'vp-pagination-disabled'
        : '',
    ]"
  >
    <a
      class="vp-pagination-page"
      @click="click({ index: index - 1 })"
      :class="{ 'vp-pagination-text': index == 1 }"
      ><vp-icon icon="angle-left:font"></vp-icon
    ></a>
    <a
      v-for="(pa, i) in pages"
      :key="i"
      @click="click(pa)"
      :class="pa.classList"
      >{{ pa.text }}</a
    >
    <a
      class="vp-pagination-page"
      @click="click({ index: index + 1 })"
      :class="{ 'vp-pagination-text': index == page }"
      ><vp-icon icon="angle-right:font"></vp-icon
    ></a>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    disabled: { type: [Boolean, String], default: false },
    total: { type: Number, default: 0 },
    index: { type: Number, default: 1 },
    size: { type: Number, default: 20 },
  },
  model: {
    prop: "index",
    event: "change",
  },
  computed: {
    page() {
      this.toNumber("total");
      this.toNumber("size");
      this.toNumber("index");
      var page = Math.ceil(this.total / this.size);
      return page;
    },
    pages() {
      var page = this.page;
      var index: number = this.index;
      if (index <= 0) index = 1;
      if (index > page) index = page;
      var ps: (string | number)[] = [];
      if (this.total > 0) {
        if (index - 3 > 1)
          [1, "...", index - 2, index - 1, index].forEach((p) => ps.push(p));
        else for (var i = 1; i <= index; i++) ps.push(i);
        if (index + 3 < page)
          [index + 1, index + 2, "...", page].forEach((p) => ps.push(p));
        else for (var j = index + 1; j <= page; j++) ps.push(j);
      } else ps = [];
      return ps.map((p) => {
        var classList: string[] = ["vp-pagination-page"];
        if (p == index) classList.push("vp-pagination-current");
        else if (typeof p == "number") {
        } else classList.push("vp-pagination-text");
        return {
          text: p,
          index: typeof p == "number" ? p : undefined,
          classList,
        };
      });
    },
  },
  methods: {
    toNumber(n) {
      if (typeof this[n] == "number") return this[n];
      else {
        var v = parseInt(this[n]);
        if (isNaN(v)) {
          if (n == "total") v = 0;
          else if (n == "index") v = 1;
          else if (n == "size") v = 20;
        }
        this.$set(this, n, v);
      }
    },
    click(pa) {
      if (this.disabled == true || this.disabled == "disabled") return;
      if (typeof pa.index == "number" && pa.index != this.index) {
        if (pa.index <= 0) return;
        else if (pa.index > this.page) return;
        this.index == pa.index;
        this.$emit("change", pa.index);
      }
    },
  },
});
</script>
<style lang="less">
.vp-pagination {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a:first-child {
    margin-left: 0px;
  }
  &-page {
    width: 30px;
    height: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: @text-color-2x;
    border-radius: @radius-2x;
    border: 1px solid @grey-border-2x;
    box-sizing: border-box;
    margin-left: @gap;
    &:hover {
      color: #fff;
      background-color: @primary-color;
    }
  }
  &-current {
    color: #fff;
    background-color: @primary-color;
    &:hover {
      color: #fff;
    }
  }
  &-text {
    color: @text-color-disabled;
    border: 1px solid @grey-border;
    cursor: default;
    &:hover {
      color: @text-color-disabled;
      background-color: transparent;
    }
  }
}
</style>