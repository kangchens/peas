import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    counter:0,
    user:{}
}
const mutations = {
    setuser:(state,data)=>{
        console.log('data',data)
        state.user = data
    }
}
const actions = {
    add:(state)=>{
        state.counter++
    },
    setuser:({commit, state},res)=>{
        console.log('value=======>',res);
        commit('setuser',res)
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