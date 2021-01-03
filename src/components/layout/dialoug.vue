
<template>
  <div class="dialoug-cover" v-if="show" @mousedown="closeCover">
    <div class="dialoug" :style="outDialougStyle">
      <div class="dialoug-head" v-if="head">
        <vp-icon :icon="icon"></vp-icon><span>{{ title }}</span>
      </div>
      <div class="dialoug-btns" v-if="head">
        <vp-icon icon="times:font" @click.native="close"></vp-icon>
      </div>
      <div class="dialoug-content" :style="bodyStyle">
        <slot></slot>
      </div>
      <div class="dialoug-footer" v-if="$slots.footer ? true : false">
        <slot name="footer">
          <vp-button>保存</vp-button>
          <vp-button type="grey">取消</vp-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.dialoug-cover {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.25);
  .dialoug {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border: 1px solid @grey-border;
    box-shadow: @shadow;
    border-radius: @radius-2x;
    width: 600px;
    min-height: 400px;
    background-color: @grey-background;
    &-head {
      height: 29px;
      background: @grey-fill-bar;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: @gap;
      font-weight: bold;
      border-bottom: 1px solid @grey-border-3x;
      .vp-icon {
        padding-right: @gap-space;
      }
    }
    &-btns {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .vp-icon {
        display: inline-flex;
        width: 22px;
        height: 22px;
        justify-content: center;
        align-items: center;
        color: @text-color-disabled;
        cursor: pointer;
        background-color: transparent;
        border-radius: @radius;
        &:hover {
          background-color: @grey-background-2x;
        }
      }
    }
    &-content {
      padding: @gap-max;
      position: absolute;
      top: 30px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      overflow: auto;
    }
    &-footer {
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 39px;
      background-color: @grey-background;
      border-top: 1px solid @grey-border-2x;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    dialougStyle: { type: Object, default: null },
    contentStyle: { type: Object, default: null },
    icon: { type: String },
    title: { type: String, default: "" },
    head: { type: Boolean, default: true },
    show: { type: Boolean, default: false },
    coverCloseAbled: { type: Boolean, default: false },
  },
  computed: {
    outDialougStyle() {
      var style: Record<string, any> = {};
      Object.assign(style, this.dialougStyle);
      if (typeof style.height != "undefined") style.minHeight = style.height;
      return style;
    },
    bodyStyle() {
      var style: Record<string, any> = {};
      Object.assign(style, this.contentStyle);
      if (this.$slots.footer) {
        style.bottom = "40px";
      }
      return style;
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    closeCover(event: MouseEvent) {
      if (this.coverCloseAbled == true) return;
      if (event.target === this.$el) {
        this.close();
      } else return;
    },
  },
});
</script>