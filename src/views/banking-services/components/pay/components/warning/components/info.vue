<template>
  <div class="continue-payment-container">
    <div class="warning-sign-container">
      <img
        style="width: 80px; height: 80px"
        src="@/assets/images/warning-sign.png"
        alt="Warning Sign"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .continue-payment-container {
    height: 100%;
    padding: 12px;
  }

  .warning-sign-container {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
