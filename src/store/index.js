import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    counter:0
}
const mutations = {
    add:({commit})=>commit('add')
}
const actions = {
    add:(state)=>{
        state.counter++
    }
}
const getters = {
    getCounter (state) {
        return state.counter
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})