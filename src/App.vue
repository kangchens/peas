<template>
  <div class="App">
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
  width: 100vw;
  height: 100vh;
  text-align: center;
  color: skyblue;
  font-size: cale( 100vw / 68.5);
}
</style>
