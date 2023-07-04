<template>
  <div class="more-options">
    <a-list :bordered="false" :split="false">
      <a-list-item>
        <a-button type="text" size="large" long>
          <template #icon>
            <icon-send />
          </template>
          <template #default>Pay</template>
        </a-button>
      </a-list-item>
      <a-list-item>
        <a-button type="text" size="large" long>
          <template #icon>
            <icon-swap />
          </template>
          <template #default>Transfer</template>
        </a-button>
      </a-list-item>
      <a-list-item>
        <a-button type="text" size="large" long>
          <template #icon>
            <icon-user-group />
          </template>
          <template #default>Manage Payees</template>
        </a-button>
      </a-list-item>
      <a-list-item>
        <a-button type="text" size="large" long>
          <template #icon>
            <icon-close />
          </template>
          <template #default>Close Menu</template>
        </a-button>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .more-options :deep(.arco-list-content > .arco-list-item) {
    padding: 0px 0px;
  }

  .more-options :deep(.arco-btn) {
    justify-content: start;
  }

  .more-options :deep(.arco-btn-size-large) {
    height: 60px;
    font-size: 16px;
  }
</style>
