import Vue from "vue";
import lodash from "lodash";
// 重要***
declare module '*.vue' {
    export default Vue
}

declare module 'vue/types/vue' {
    interface Vue {
        $Message: any,
        $Modal: any
    }
}

declare global {
    const _: typeof lodash
}