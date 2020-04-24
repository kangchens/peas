<template>
  <div class="App">
    <div>
      1111
      <router-link to="/home">go Home</router-link>
      <router-link to="/about">go About</router-link>
    </div>
    <div>
      <p>{{getCounter}}</p>
      <button @click="add">add</button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang='ts'>
import { mapActions, mapGetters,mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getCounter'])
  },
  methods: {
    ...mapMutations(['add'])
  }
};
</script>
<style lang="less" scoped>
.App {
  text-align: center;
  color: skyblue;
  font-size: 28px;
}
</style>
