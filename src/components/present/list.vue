<template>
  <div class="vp-list">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in columns" :key="index">{{ col.label }}</th>
          <th v-if="editable"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in list" :key="rowIndex">
          <td v-for="(col, colIndex) in columns" :key="colIndex">
            <div
              v-if="is(col, row) ? true : false"
              :is="is(col, row)"
              :style="col.style || {}"
              v-bind="getBinds(col, row)"
              v-on="getEvents(col, row)"
            ></div>
          </td>
          <td v-if="editable">
            <vp-icon
              @click.native="remove(rowIndex)"
              icon="times:font"
            ></vp-icon>
          </td>
        </tr>
        <tr v-if="editable">
          <td>
            <vp-icon @click.native="add()" icon="plus:font"></vp-icon>
          </td>
          <td v-for="(col, index) in columns" :key="index"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    columns: { type: Object },
    list: { type: Object, default: [] },
    getImageUrl: { type: Function as PropType<(src: string) => string> },
    uploadImage: {
      type: Function as PropType<
        (file: File, callback: (r: string) => void) => void
      >,
    },
    editable: { type: Boolean, default: true },
  },
  model: {
    prop: "list",
    event: "change",
  },
  methods: {
    remove(at) {
      if (Array.isArray(this.list)) this.list.removeAt(at);
    },
    add() {
      if (!Array.isArray(this.list)) this.$set(this, "list", []);
      var json: Record<string, any> = {};
      if (Array.isArray(this.columns)) {
        this.columns.each((col) => {
          if (typeof col.default != "undefined") json[col.name] = col.default;
        });
      }
      this.list.push(json);
      this.save();
    },
    is(col, row) {
      switch (col.type) {
        case "int":
        case "double":
          return "VpNumber";
        case "string":
        case "textarea":
          return "VpInput";
        case "date":
        case "datetime":
        case "time":
          return "VpDate";
        case "image":
          return "VpUploadImage";
        case "link":
        case "text":
          return "VpText";
        case "button":
          return "VpButton";
        case "bool":
        case "boolean":
        case "switch":
          return "VpSwitch";
        case "check":
          return "VpCheck";
        case "select":
          return "VpSelect";
        case "devide":
        case "line":
          return "VpDevide";
        case "checkGroup":
          return "VpCheckGroup";
        case "slider":
          return "VpSlider";
        default:
          if (this.editable == true) {
            return "VpInput";
          } else return "VpText";
      }
    },
    getBinds(col, row) {
      var val;
      if (row && typeof col.name != "undefined") {
        if (col.name.indexOf(".") > -1) {
          var ns = col.name.split(/\./g);
          for (let i = 0; i < ns.length; i++) {
            if (i == 0) val = row[ns[0]];
            else
              val = typeof val == "object" && val !== null ? val[ns[i]] : val;
          }
        } else val = row[col.name];
      }
      if (typeof col.computed == "function") {
        var r = col.computed(val, row);
        if (typeof r != "undefined") val = r;
      }
      var props = {};
      if (typeof col.props == "object") {
        for (let n in col.props) {
          if (n.startsWith("_") || n.startsWith("$")) continue;
          props[n] = col.props[n];
        }
      }
      switch (col.type) {
        case "int":
          return {
            value: val,
            ...props,
          };
        case "slider":
          return {
            value: val,
            ...props,
          };
        case "double":
          return {
            value: val,
            precision: 2,
            ...props,
          };
        case "string":
          return {
            value: val,
            ...props,
            sync: false,
          };
        case "textarea":
          return { type: "textarea", value: val, sync: false, ...props };
        case "date":
        case "datetime":
        case "time":
          return { mode: col.type, value: val, ...props };
        case "image":
          return {
            getImageUrl: this.getImageUrl,
            uploadImage: this.uploadImage,
            src: val,
            ...props,
          };
        case "link":
          return { text: val, type: "link", ...props };
        case "text":
          return { text: val, ...props };
        case "button":
          return { text: val, ...props };
        case "bool":
        case "boolean":
        case "switch":
        case "check":
          return { checked: val, ...props };
        case "select":
          return {
            value: val,
            ...props,
          };
        case "checkGroup":
          return {
            value: val,
            type: "radio",
            ...props,
          };
        case "devide":
        case "line":
          return {
            text: col.label,
            ...props,
          };
        default:
          if (this.editable == true) {
            return { value: val, ...props };
          } else {
            return { text: val, ...props };
          }
          break;
      }
    },
    save() {
      this.$emit("change", this.list);
    },
    getEvents(col, row) {
      switch (col.type) {
        case "int":
        case "double":
        case "string":
        case "textarea":
        case "slider":
          return {
            input: (value: number) => {
              this.$set(row, col.name, value);
              this.save();
            },
          };
        case "date":
        case "datetime":
        case "time":
        case "bool":
        case "boolean":
        case "check":
        case "switch":
        case "select":
        case "checkGroup":
          return {
            change: (value) => {
              this.$set(row, col.name, value);
              this.save();
            },
          };
        case "image":
          return {
            change: (value) => {
              this.$set(row, col.name, value);
              this.save();
            },
          };
        case "link":
        case "text":
          return {};
        case "button":
          return {
            click: (event: MouseEvent) => {
              this.$emit("click", { row, col });
            },
          };
        case "devide":
        case "line":
          return {};
      }
    },
  },
});
</script>
<style lang="less">
.vp-list {
  width: 100%;
  table {
    min-width: 100%;
    border-right: 1px solid @grey-border-2x;
    border-bottom: 1px solid @grey-border-2x;
    border-spacing: 0px;
    border-radius: @radius;
    thead tr {
      background-color: @grey-background;
      border-radius: @radius @radius 0px 0px;
    }
    td,
    th {
      padding: @gap;
      border-left: 1px solid @grey-border-2x;
      border-top: 1px solid @grey-border-2x;
      font-weight: normal;
      > .vp-icon {
        color: @text-color-2x;
        display: inline-flex;
        width: 24px;
        height: 24px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
    tr {
      min-height: @height;
    }
  }
}
</style>