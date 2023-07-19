<template>
  <div class="navbar">
    <ul class="left-side">
      <li>
        <a-button
          :style="changeBtnStyle(backBtnHoverFlag)"
          type="outline"
          shape="circle"
          size="large"
          :disabled="deleteBtnLoading"
          @mouseenter="backBtnHoverFlag = true"
          @mouseleave="backBtnHoverFlag = false"
          @click="goBackToPayeeMgnt()"
        >
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </li>
    </ul>
    <div class="center-side">
      <a-typography-text style="line-height: 52px; font-size: 16px">
        Delete Saved Payee
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

  const deleteDrawerVisibleFlag: any = inject('deleteDrawerVisibleFlag');
  const focusedPayee: any = inject('focusedPayee');
  const deleteBtnLoading: any = inject('deleteBtnLoading');
  const backBtnHoverFlag = ref(false);
  const goBackToPayeeMgnt = () => {
    deleteDrawerVisibleFlag.value = false;
    focusedPayee.value.id = -1;
    focusedPayee.value.name = '';
    focusedPayee.value.type = '';
    focusedPayee.value.sortCode = '';
    focusedPayee.value.accountNumber = '';
    focusedPayee.value.reference = '';
    focusedPayee.value.lastPaidDate = '';
    focusedPayee.value.lastPaidAmount = 0;
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
