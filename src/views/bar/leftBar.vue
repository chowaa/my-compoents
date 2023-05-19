<script lang="ts" setup>
import router from '@/router';

const routerTo = (item: any) => {
  router.push(item.path)
}
const leftBarData = [
  { index: '1', title: 'ShoppingCart', icon: 'el-icon-location', path: '/ShoppingCart' },
  { index: '2', title: 'HelloWorld', icon: 'el-icon-menu', path: '/HelloWorld' },
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