<script setup lang="ts">
import LeftBar from '@/views/bar/leftBar.vue'
import topBar from '@/views/bar/topBar.vue'
</script>

<template>
  <div class="common-layout">
    <el-header class="handerbar">
      <topBar />
    </el-header>
    <el-aside  class="sidebar">
      <LeftBar />
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<style lang="scss" scoped>

</style>
