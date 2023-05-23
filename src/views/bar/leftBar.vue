<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';

const leftBarData = [
  { index: 1, title: 'ShoppingCart', icon: 'el-icon-location', path: '/ShoppingCart' },
  { index: 2, title: 'HelloWorld', icon: 'el-icon-menu', path: '/HelloWorld' },
  { index: 3, title: 'DragAndDrop', icon: 'el-icon-setting', path: '/DragAndDrop' }
  // { index: '3', title: 'Navigator Three', icon: 'el-icon-setting', path: '/home'}
]
const isActive = ref( 0 );

const thisPath = router.currentRoute.value.path;
const thisIndex = leftBarData.findIndex((item: any) => item.path === thisPath);
isActive.value = thisIndex;

const routerTo = (item: any) => {
  isActive.value = item.index - 1
  router.push(item.path)
}
</script>

<template>
  <div class="leftBar">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-menu-item class="menu-item" :class="{active: isActive === index}" :index=item.index v-for="(item, index) in leftBarData" :key="index" @click="routerTo(item)">
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.leftBar{
  :deep(.el-menu){
    border-right: 0;
  }
}
.menu-item{
  padding: 10px 16px;
  line-height: 1.5;
  font-size: .9rem;
  border-radius: 8px;
  margin: 5px;
}
.active{
  background-color: #ecf5ff !important;
  color: #337ecc !important;
}
</style>