<template>
  <div class="app-container">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <div class="app-inner-container">
          <a-card class="app-inner-card" :bordered="false">
            <div id="drawerContainer" class="app-inner-content">
              <a-layout>
                <a-layout-header>
                  <NavBar />
                </a-layout-header>
                <a-layout-content>
                  <Home />
                </a-layout-content>
                <a-layout-footer>
                  <BottomMenu />
                </a-layout-footer>
              </a-layout>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <!-- DETAILS, PAY, TRANSFER -->
    <a-drawer
      v-model:visible="paymentDrawerVisibleFlag"
      placement="right"
      :mask="false"
      :closable="false"
      width="500"
      popup-container="#drawerContainer"
      :esc-to-close="false"
      :header="false"
      :footer="false"
    >
      <div>TODO</div>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, provide, readonly } from 'vue';
  import { useUserStore } from '@/store';
  import NavBar from './components/navbar.vue';
  import Home from './components/home.vue';
  import BottomMenu from './components/bottom-menu.vue';

  const userStore = useUserStore();
  const group = computed(() => {
    return userStore.group;
  });
  const bankAccounts = computed(() => {
    return userStore.bankAccounts;
  });
  const bottomMenuKey = ref(['0']);
  const paymentDrawerVisibleFlag = ref(false);

  provide('group', readonly(group));
  provide('bankAccounts', readonly(bankAccounts));
  provide('bottomMenuKey', bottomMenuKey);
  provide('paymentDrawerVisibleFlag', paymentDrawerVisibleFlag);
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

  .app-inner-content {
    position: relative;
    overflow: hidden;
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

  .app-inner-content :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
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

  .app-inner-content :deep(.arco-drawer-body) {
    padding: 0px;
  }
</style>
