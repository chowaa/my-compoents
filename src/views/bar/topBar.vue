<script lang="ts" setup>

</script>

<template>
  <div class="topBar">topBar</div>
</template>

<style lang="scss" scoped>
.topBar {
  --border-color: var(--el-border-color);
  --header-height: 55px;
  --bg-color: var(--el-bg-color);
  width: 100%;
  color: #000000;
  text-align: center;
  line-height: 50px;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
  padding: 0 12px 0 24px;
  background-image: radial-gradient(transparent 1px,var(--bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  top: 0;
  box-sizing: border-box;
}
</style>