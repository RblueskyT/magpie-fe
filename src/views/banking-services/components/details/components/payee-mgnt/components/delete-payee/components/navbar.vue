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
          @click="goBackToPayeeMgnt()"
        >
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
      </li>
    </ul>
    <div class="center-side">
      <a-typography-text
        style="line-height: 52px; font-size: 16px; color: #f53f3f"
      >
        Confirm Delete
      </a-typography-text>
    </div>
    <ul class="right-side">
      <!-- RESERVED -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';

  const deleteDrawerVisibleFlag: any = inject('deleteDrawerVisibleFlag');
  const focusedPayee: any = inject('focusedPayee');
  const defaultNavbarBtnStyle = {
    borderColor: '#ffffff',
    color: '#4e5969',
    fontSize: '24px',
  };
  const hoverNavbarBtnStyle = {
    borderColor: '#ffffff',
    color: '#4e5969',
    fontSize: '26px',
  };
  const backBtnHoverFlag = ref(false);

  const changeBtnStyle = (hoverFlag: boolean) => {
    if (hoverFlag === false) {
      return defaultNavbarBtnStyle;
    }
    return hoverNavbarBtnStyle;
  };
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
