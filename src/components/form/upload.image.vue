<template>
  <div class="vp-upload-image">
    <img :src="imgUrl" v-if="imgUrl ? true : false" />
    <div
      class="vp-upload-image-wrapper"
      :class="{ 'vp-upload-image-cover': imgUrl ? true : false }"
    >
      <input
        type="file"
        :id="fileId"
        ref="file"
        accept="image/*"
        @change="change"
      />
      <label :for="fileId" v-if="loading ? false : true">+</label>
      <vp-loading v-if="loading ? true : false"></vp-loading>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
let inputFileCounter = 1;
export default Vue.extend({
  props: {
    src: { type: String, default: "" },
    getImageUrl: { type: Function as PropType<(src: string) => string> },
    uploadImage: {
      type: Function as PropType<
        (file: File, callback: (r: string) => void) => void
      >,
    },
  },
  model: {
    prop: "src",
    event: "change",
  },
  data() {
    return {
      loading: false,
      fileId: "vp_upload_image_" + (inputFileCounter += 1),
    };
  },
  computed: {
    imgUrl() {
      if (this.src) {
        if (typeof this.getImageUrl == "function")
          return this.getImageUrl(this.src);
        else return this.src;
      } else return "";
    },
  },
  methods: {
    change(event: MouseEvent) {
      var file = (this.$refs["file"] as HTMLInputElement).files[0];
      if (file) {
        if (typeof this.uploadImage == "function") {
          this.loading = true;
          this.uploadImage(file, (src) => {
            this.src = src;
            this.loading = false;
            this.$emit("change", this.src);
          });
        } else throw new Error("not found upload image service api");
      }
    },
  },
});
</script>
<style lang="less">
.vp-upload-image {
  width: 100px;
  height: 100px;
  position: relative;
  &-wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: @grey-background-2x;
    border: 1px solid @grey-border-2x;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: @radius;
    input[type="file"] {
      display: none;
    }
    label {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      margin-top: -15px;
      margin-left: -15px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: @text-color-2x;
      font-size: 24px;
      cursor: pointer;
    }
    .vp-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &-cover {
    background-color: transparent;
    label {
      visibility: hidden;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
    }
    &:hover {
      label {
        visibility: visible;
      }
    }
  }
  img {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: @radius;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>