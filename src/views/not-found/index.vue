<template>
  <div class="app-container">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <div class="not-found-container">
          <a-card class="not-found-card" :bordered="false">
            <div class="not-found-content">
              <a-layout>
                <a-layout-header></a-layout-header>
                <a-layout-content>
                  <a-result
                    class="not-found-warning"
                    status="404"
                    subtitle="404 Not Found"
                  >
                    <template #extra>
                      <a-space>
                        <a-button
                          key="back"
                          type="primary"
                          size="large"
                          @click="back"
                        >
                          Back
                        </a-button>
                      </a-space>
                    </template>
                  </a-result>
                </a-layout-content>
                <a-layout-footer></a-layout-footer>
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
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const back = () => {
    // warning： Go to the node that has the permission
    router.push({ name: 'banking-services' });
  };
</script>

<style lang="less" scoped>
  .app-container {
    height: 100vh;
  }

  .app-container :deep(.arco-layout-content) {
    background-color: rgb(var(--gray-3));
  }

  .not-found-container {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .not-found-card {
    width: 500px;
  }

  .not-found-card :deep(.arco-card-body) {
    padding: 0px;
  }

  .not-found-content :deep(.arco-layout) {
    height: 100vh;
  }

  .not-found-content :deep(.arco-layout-header),
  .not-found-content :deep(.arco-layout-footer) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 140px;
  }

  .not-found-content :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  .not-found-warning :deep(.arco-result-icon-404) {
    padding-top: 0px;
  }

  .not-found-warning :deep(.arco-result-icon) {
    margin-bottom: 20px;
  }
</style>
