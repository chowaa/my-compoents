<script lang="ts" setup>
import router from '@/router';
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
// } from '@element-plus/icons-vue'
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
const routerTo = (item: any) => {
  // console.log(item)
  router.push(item.path)
}
const leftBarData = [
  { index: '1', title: 'ShoppingCart', icon: 'el-icon-location', path: '/ShoppingCart' },
  // { index: '2', title: 'Navigator Two', icon: 'el-icon-menu', path: '/home' },
  // { index: '3', title: 'Navigator Three', icon: 'el-icon-setting', path: '/home'}
]
</script>

<template>
  <div class="leftBar">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-menu-item :index=index v-for="(item, index) in leftBarData" :key="index" @click="routerTo(item)">
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>

</style>