<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue'

const value1 = ref(0)
const ballDivRef: any = ref(null)

const ballMove = () => {
  const progress = value1.value
  if(ballDivRef.value) {
    ballDivRef.value.style.setProperty('--delay', `-${progress}s`)
  }
}
watch(value1, ballMove)

</script>

<template>
  <div class="slider_box" ref="ballDivRef">
    <el-row>
      <el-col :span="16" :xs="24">
        <h1>slider</h1>
        <div class="ball" >
          <div class="eye left"></div>
          <div class="eye right"></div>
          <div class="mouth"></div>
        </div>
        <input class="range" type="range" v-model="value1" min="0" max="1" step="0.01">
      </el-col>
    </el-row>

  </div>
</template>

<style lang="scss" scoped>
.slider_box{
  text-align: center;
  --delay:0s;
  .ball{
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    margin: 20px auto;
    position: relative;
    // animation: move 1s var(--delay) linear forwards paused;
    animation: colorchange 1s var(--delay) linear forwards paused;
    .eye{
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 30px;
    }
    .mouth{
      width: 40px;
      height: 4px;
      background-color: #fff;
      position: absolute;
      top: 50px;
      left: 30px;
      animation: mouth 1s var(--delay) linear forwards paused;
    }
    .left{
      left: 20px;
      animation: leftEyeChange 1s var(--delay) linear forwards paused;
    }
    .right{
      right: 20px;
      animation: rightEteChange 1s var(--delay) linear forwards paused;
    }
  }
  @keyframes move {
    100% {
      transform: translateX(200px);
    }
  }
  @keyframes colorchange {
    0% {
      background-color: red;
    }
    50% {
      background-color: blue;
    }
    100% {
      background-color: green;
    }
  }
  @keyframes eye {
    0% {
      clip-path: inset(50%);
    }
    50% {
      clip-path: polygon(0%);
    }
    100% {
      clip-path: polygon(50%);
    }
  }
  @keyframes leftEyeChange {
    0%{
      clip-path: polygon(0 75%, 100% 0%, 100% 100%, 0% 100%);
    }
    50%{
      clip-path: polygon(0 35%, 100% 35%, 100% 65%, 0 65%);
    }
    100%{
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  @keyframes rightEteChange {
    0% {
      clip-path: polygon(0 0, 100% 70%, 100% 100%, 0 100%);
    }
    50%{
      clip-path: polygon(0 35%, 100% 35%, 100% 65%, 0 65%);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  @keyframes mouth {
    from{
      height: 4px;
      box-shadow: inset 0 -4px 0 #fff;
      transform: translateY(20px);
      clip-path: inset(50% 0% 0% 0%);
    }
    to{
      height: 20px;
      box-shadow: inset 0 -20px 0 #fff;
      transform: translateY(0);
      clip-path: inset(50% 0% 0% 0%);
    }
  }
}
</style>