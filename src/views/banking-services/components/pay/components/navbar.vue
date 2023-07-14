<template>
  <div class="navbar">
    <ul class="left-side">
      <li>
        <a-button
          :style="changeBtnStyle(backBtnHoverFlag)"
          type="outline"
          shape="circle"
          size="large"
          :disabled="continueLoading"
          @mouseenter="backBtnHoverFlag = true"
          @mouseleave="backBtnHoverFlag = false"
          @click="goBackTo()"
        >
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </li>
    </ul>
    <div class="center-side">
      <a-space direction="vertical" :size="0" fill>
        <a-typography-text
          style="line-height: 26px; font-size: 16px; color: #1d2129"
        >
          Pay
        </a-typography-text>
        <a-typography-text
          style="line-height: 26px; font-size: 14px"
          type="secondary"
        >
          To an external recipient
        </a-typography-text>
      </a-space>
    </div>
    <ul class="right-side">
      <!-- RESERVED -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { changeBtnStyle } from '@/utils/change-btn-style';

  const bottomMenuKey: any = inject('bottomMenuKey');
  const paymentForm: any = inject('paymentForm');
  const drawerTwoVisibleFlag: any = inject('drawerTwoVisibleFlag');
  const goBackModalPayVisibleFlag: any = inject('goBackModalPayVisibleFlag');
  const backBtnHoverFlag = ref(false);
  const continueLoading: any = inject('continueLoading');
  const goBackTo = () => {
    if (paymentForm.value.from.length === 0) {
      drawerTwoVisibleFlag.value = false;
      bottomMenuKey.value[0] = '0';
    } else {
      goBackModalPayVisibleFlag.value = true;
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
