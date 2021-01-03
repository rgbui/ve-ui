
import Vue from "vue";
let mvm: Vue;
import confirmVue from "./confirm.vue";
export function ConfrimMessage(message: string, description?: string) {
    return new Promise((resolve, reject) => {
        if (!mvm) {
            mvm = new Vue({
                el: document.body.appendChild(document.createElement('div')),
                render: (h) => h(confirmVue, { ref: 'confirm', props: { message: message, description: description } }),
                computed: {
                    confirm() {
                        return this.$refs['confirm']
                    }
                }
            })
        } else {
            (mvm as any).open(message, description);
        }
        mvm.$off('save');
        mvm.$off('cancel')
        mvm.$on('save', (event) => {
            resolve(true);
        });
        mvm.$on('cancel', (event) => {
            reject('false');
        })
    })
}