<script lang="ts" setup>
//数字键盘
const keypad = [
  { key: '1', value: 1 },
  { key: '2', value: 2 },
  { key: '3', value: 3 },
  { key: '4', value: 4 },
  { key: '5', value: 5 },
  { key: '6', value: 6 },
  { key: '7', value: 7 },
  { key: '8', value: 8 },
  { key: '9', value: 9 },
  { key: '0', value: 0 },
  { key: '+', value: `+` },
  { key: '-', value: `-` },
  { key: 'enter', value: 'enter' },
]
//运算符
class operator {
  a: number = 0;
  b: number = 0;
  constructor(){
    this.plus = this.plus.bind(this)
    this.minus = this.minus.bind(this)
  }
  plus(a: number, b: number){
    return a + b
  }
  minus(a: number, b: number){
    return a - b
  }
}
const op = new operator()
</script>

<template>
  <div class="QphysicalButton-Box">
    <el-row>
      <el-col class="background" :span="16" :xs="24">
        <h1>QphysicalButton</h1>
        <div class="view_box"></div>
        <div class="keypad_box">
          <button class="QHButton" v-for="(item, index) in keypad" :key="item.key">
            {{ item.key }}
          </button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.QphysicalButton-Box{
  text-align: center;
  .background{
    background-color: #f0f0ee;
    height: 100vh;
    .view_box{
      margin: 0 auto;
      width: 330px;
      height: 50px;
      background-color: #fff;
    }
    .keypad_box{
      margin: 0 auto;
      width: 330px;
      display: flex;
      flex-wrap: wrap;
      .QHButton{
        padding: 15px;
        width: 100px;
        height: 60px;
        margin: 10px auto;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        font-size: 25px;
        color: #333;
        user-select: none;
        cursor: pointer;
        border: none;
        text-shadow: 1px 1px 1px #ccc;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.2),
                    -10px -10px 15px rgba(255, 255, 255, 0.5);
        &:active{
          font-size: 24px;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
                      0 0 0 rgba(255, 255, 255, 0.8),
                      inset 5px 5px 10px rgba(0, 0, 0, 0.1),
                      inset -5px -5px 10px rgba(255, 255, 255, 1);
        transition: all 0.1s ease-out;
        }
      }
    }
  }
}
</style>