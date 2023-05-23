<script lang="ts" setup>
const squareUrl =  new URL(`@/assets/imgs/headPortrait.jpg`, import.meta.url).href

const iconUrls = [
  { url: new URL(`@/assets/svgs/vite.svg`, import.meta.url).href, link:'https://cn.vitejs.dev/'},
  { url: new URL(`@/assets/svgs/webpack.svg`, import.meta.url).href, link:'https://webpack.docschina.org/'},
  { url: new URL(`@/assets/svgs/vue.svg`, import.meta.url).href, link:'https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application'},
  { url: new URL(`@/assets/svgs/ts.svg`, import.meta.url).href, link:'https://www.tslang.cn/docs/handbook/variable-declarations.html' },
  { url: new URL(`@/assets/svgs/youtube.svg`, import.meta.url).href, link:'https://www.youtube.com' },
  { url: new URL(`@/assets/svgs/github.svg`, import.meta.url).href, link:'https://github.com/chowaa/my-compoents'},

]

</script>

<template>
  <!-- <el-row class="topBar" :gutter="20">
    <el-col :span="3"></el-col>
    <el-col :span="18"> -->
      <div class="topBar">
        <div class="topBar_center">

          <el-row>
            <el-col :span="12" class="topBar_left topBar_flex">
              <el-avatar shape="square" size="" :src="squareUrl" />
              <el-text class="mx-1" tag="b" size="large">chowaa</el-text>
            </el-col>
            <el-col :span="12" class="topBar_right topBar_flex">
              <a v-for="(item, index) in iconUrls" class="topBar_flex" :href="item.link" :key="index">
                <img class="git_img" :src="item.url"/>
              </a>
            </el-col>
          </el-row>
        </div>

      </div>
    <!-- </el-col>
    <el-col :span="3"></el-col>
  </el-row> -->
</template>

<style lang="scss" scoped>
.topBar_center{
  max-width: calc(var(--vp-screen-max-width));
  margin: 0 auto;
}
.topBar_flex{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.topBar_left,.topBar_right{
  .el-avatar{
    margin-right: 10px;
  }
}
.topBar_right{
  justify-content: flex-end;
  .git_img{
    margin: 0 10px;
    width: 20px;
    height: 20px;
  }
}
</style>