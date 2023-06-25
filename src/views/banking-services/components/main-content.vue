<template>
  <div class="main-content-container">
    <Home v-show="bottomMenuKey[0] == '0'" />
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  import Home from './home.vue';

  const bottomMenuKey: any = inject('bottomMenuKey');
</script>

<style lang="less" scoped>
  .main-content-container {
    padding: 8px 8px;
    height: 100%;
    overflow-y: auto;
  }
</style>
