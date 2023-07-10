<template>
  <div class="navbar">
    <ul class="left-side">
      <!-- RESERVED -->
    </ul>
    <div class="center-side">
      <a-space :size="12">
        <img
          style="width: 36px; height: 36px"
          src="@/assets/images/magpie-logo-white.png"
          alt="Magpie Logo"
        />
        <a-typography-text
          style="
            color: white;
            line-height: 36px;
            font-size: 28px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
              'Lucida Sans', Arial, sans-serif;
          "
        >
          Magpie
        </a-typography-text>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-button
          :style="changeBtnStyleHome(logoutBtnHoverFlag)"
          type="outline"
          shape="circle"
          size="large"
          @mouseenter="logoutBtnHoverFlag = true"
          @mouseleave="logoutBtnHoverFlag = false"
          @click="handleLogout"
        >
          <template #icon>
            <icon-export />
          </template>
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useUser from '@/hooks/user';
  import { changeBtnStyleHome } from '@/utils/change-btn-style';

  const { logout } = useUser();
  const logoutBtnHoverFlag = ref(false);
  const handleLogout = () => {
    logout();
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
    height: 36px;
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
