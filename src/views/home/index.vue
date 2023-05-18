<script setup lang="ts">
import LeftBar from '@/views/bar/leftBar.vue'
import topBar from '@/views/bar/topBar.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <topBar />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftBar />
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout{
  :deep(.el-header){
    padding: 0 ;
    position: sticky;
    top: 0;
    width: 100%;
  }
  .main{
    padding: 0 ;
    height: 100%;
    width: 100vh;
  }
}

</style>
