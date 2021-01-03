<template>
  <vp-dialoug :head="false" cover-close-abled>
    <div class="vp-confirm">
      <div class="vp-confirm-head">
        <vp-icon icon="question:font"></vp-icon>
        <span>{{ content }}</span>
      </div>
      <div class="vp-confirm-description" v-if="description ? true : false">
        {{ description }}
      </div>
    </div>
    <vp-space align="center" slot="footer">
      <vp-button @click.native="save">确认</vp-button>
      <vp-button @click.native="cancel" type="grey">取消</vp-button>
    </vp-space>
  </vp-dialoug>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    content: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  computed: {
    dialoug() {
      return this.$refs.dialoug;
    },
  },
  mounted() {
    this.dialoug.open();
  },
  methods: {
    save(event: MouseEvent) {
      this.$emit("save", event);
    },
    cancel(event: MouseEvent) {
      this.$emit("cancel", event);
    },
    open(content: string, description: string) {
      this.content = content;
      this.description = description || "";
      this.dialoug.open();
    },
  },
});
</script>
<style lang="less">
.vp-confirm {
  &-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .vp-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      display: inline-flex;
      margin-right: @gap-space;
      background-color: #fa0;
    }
    span {
      color: @text-color-2x;
    }
  }
  &-description {
    color: @text-color-disabled;
  }
}
</style>