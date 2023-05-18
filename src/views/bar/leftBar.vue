<script lang="ts" setup>
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
// } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const leftBarData = [
  { index: '1', title: 'Navigator One', icon: 'el-icon-location', path: '/home' },
  { index: '2', title: 'Navigator Two', icon: 'el-icon-menu', path: '/home' },
  { index: '3', title: 'Navigator Three', icon: 'el-icon-setting', path: '/home'}
]
</script>

<template>
  <div class="leftBar">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item :index=index v-for="(item, index) in leftBarData" :key="index">
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>

</style>