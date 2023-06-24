<template>
  <div class="app-container">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <div class="app-inner-container">
          <a-card class="app-inner-card" :bordered="false">
            <div class="app-inner-content">
              <a-layout>
                <a-layout-header><NavBar /></a-layout-header>
                <a-layout-content>
                  <Home v-show="bottomMenuKey[0] == '0'" />
                </a-layout-content>
                <a-layout-footer>
                  <div class="bottom-menu">
                    <a-menu
                      v-model:selected-keys="bottomMenuKey"
                      mode="horizontal"
                    >
                      <a-menu-item key="0">
                        <template #icon>
                          <icon-home />
                        </template>
                        Home
                      </a-menu-item>
                      <a-menu-item key="1">
                        <template #icon>
                          <icon-send />
                        </template>
                        Pay
                      </a-menu-item>
                      <a-menu-item key="2">
                        <template #icon>
                          <icon-swap />
                        </template>
                        Transfer
                      </a-menu-item>
                    </a-menu>
                  </div>
                </a-layout-footer>
              </a-layout>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, provide, readonly } from 'vue';
  import { useUserStore } from '@/store';
  import Home from './components/home.vue';
  import NavBar from './components/navbar.vue';

  const userStore = useUserStore();
  const group = computed(() => {
    return userStore.group;
  });
  const bankAccounts = computed(() => {
    return userStore.bankAccounts;
  });
  const bottomMenuKey = ref(['0']);

  provide('group', readonly(group));
  provide('bankAccounts', readonly(bankAccounts));
</script>

<style lang="less" scoped>
  .app-container {
    height: 100vh;
  }

  .app-container :deep(.arco-layout-content) {
    background-color: rgb(var(--gray-3));
  }

  .app-inner-container {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .app-inner-card {
    width: 500px;
  }

  .app-inner-card :deep(.arco-card-body) {
    padding: 0px;
  }

  .app-inner-content :deep(.arco-layout) {
    height: 100vh;
  }

  .app-inner-content :deep(.arco-layout-header) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f73131;
    height: 80px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .app-inner-content :deep(.arco-layout-footer) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-top: 1px solid var(--color-neutral-3);
  }

  .bottom-menu {
    width: 100%;
  }

  .bottom-menu :deep(.arco-menu-inner) {
    text-align: center;
    padding: 14px 0;
  }

  .bottom-menu :deep(.arco-menu-item) {
    width: 145px;
    margin-left: 0;
    padding: 0;
  }

  .app-inner-content :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
  }
</style>
