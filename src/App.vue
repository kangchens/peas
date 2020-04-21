<template>
  <div class="App">
    Hello World11111
    <div class="review">
      <router-view></router-view>
    </div>
    <div class="checkbtn">
      <router-link to="/about">关于</router-link>
      <br>
      <router-link to="/home">我的</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.App {
  color: skyblue;
}
</style>