<template>
  <div class="navbar">
    <ul class="left-side">
      <li>
        <a-button
          :style="changeBtnStyle(backBtnHoverFlag)"
          type="outline"
          shape="circle"
          size="large"
          @mouseenter="backBtnHoverFlag = true"
          @mouseleave="backBtnHoverFlag = false"
          @click="goBackToPayTo()"
        >
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </li>
    </ul>
    <div class="center-side">
      <a-typography-text
        style="line-height: 52px; font-size: 16px; color: #1d2129"
      >
        Add New Payee
      </a-typography-text>
    </div>
    <ul class="right-side">
      <!-- RESERVED -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { changeBtnStyle } from '@/utils/change-btn-style';

  const payToDrawerVisibleFlag: any = inject('payToDrawerVisibleFlag');
  const goBackModalAddPayeeVisibleFlag: any = inject(
    'goBackModalAddPayeeVisibleFlag'
  );
  const addPayeeFormData: any = inject('addPayeeFormData');
  const backBtnHoverFlag = ref(false);
  const goBackToPayTo = () => {
    if (
      addPayeeFormData.value.name === '' &&
      addPayeeFormData.value.type === '' &&
      addPayeeFormData.value.sortCode === '' &&
      addPayeeFormData.value.accountNumber === '' &&
      addPayeeFormData.value.reference === ''
    ) {
      payToDrawerVisibleFlag.value = false;
    } else {
      goBackModalAddPayeeVisibleFlag.value = true;
    }
  };
</script>

<style lang="less" scoped>
  .navbar {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .left-side {
    width: 100px;
    height: 36px;
    list-style: none;
    text-align: left;
    padding-inline-start: 0px;
    li {
      margin-left: 12px;
    }
  }

  .center-side {
    width: 300px;
    height: 52px;
    text-align: center;
  }

  .right-side {
    width: 100px;
    height: 36px;
    list-style: none;
    text-align: right;
    padding-inline-start: 0px;
    li {
      margin-right: 12px;
    }
  }
</style>
