
import messageVue from "./message.vue";
import Vue from "vue";
let mvm: Vue;
let timer: number;
export function message(content: string, type?: 'info' | 'error' | 'warn') {
    if (!mvm) {
        mvm = new Vue({
            el: document.body.appendChild(document.createElement('div')),
            render: (h) => h(messageVue, { ref: 'message', props: { message: content, type: type } }),
            computed: {
                message() {
                    return this.$refs['message']
                }
            }
        })
    } else {
        (mvm as any).message = content;
        (mvm as any).type = type;
        (mvm.$el as HTMLElement).style.display = 'block';
    }
    if (typeof timer != 'undefined') {
        clearTimeout(timer);
        timer = undefined;
    }
    timer = setTimeout(() => {
        (mvm.$el as HTMLElement).style.display = 'none';
        clearTimeout(timer);
        timer = undefined;
    }, 3e3);
}