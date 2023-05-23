<script lang="ts" setup>
import { reactive } from 'vue'

//拖拽对象
class DragItem {
  name: string;
  el: Element | null;
  start: number;
  end: number;
  constructor(name: string) {
    let start = 0;
    let end = 0;
    this.start = start;
    this.end = end;
    this.name = name;
    this.el = document.querySelector(`.${name}`);
  }
  // 拖拽开始
  dragStart( event:DragEvent, item: any, index: number) {
    if(event.dataTransfer){
      event.dataTransfer.effectAllowed = 'move';
    }
    this.start = index;
    console.log(item, index)
    console.log(event,'dragStart');
  }
  // 拖拽中
  dragOver( event:DragEvent, item: any, index: number ){
    event.preventDefault();
    console.log(event,'dragOver');
    console.log(item, index);

  }
  // 拖拽结束
  dragEnd( event:DragEvent, item: any, index: number ) {
    // 获取目标元素
    const target = event.target as HTMLElement;
    console.log(target, 'target');
    console.log(event,'dragEnd');
    console.log(item, index);
  }
  // 拖拽进入
  dragEnter( event:DragEvent, index: number, item?: any ) {
    if(item||index){}
    // 获取目标元素
    const target = event.target as HTMLElement;
    if (target.classList.contains('dragAndDrop__left__content__item')) {
    }
  }
  // 拖拽放手
  dragDrop( event:DragEvent, item: any, index: number ) {
    if(item){}
    const target = event.target as HTMLElement;
    if (target.classList.contains('dragAndDrop__left__content__item')) {
      const moveItem = leftData[this.start];
      leftData.splice(this.start, 1);
      leftData.splice(index, 0, moveItem); 
    }
  }
}
const dragItem = new DragItem('dragItem');


// 可拖拽数据
const leftData = reactive([
  { name: 'CSS' },
  { name: 'JAVASCRIPT' },
  { name: 'VUE' },
  { name: 'TYPESCRIPT' },
  { name: 'REACT' },
  { name: 'NODEJS' },
  { name: 'HTML' },
  { name: 'ECMOSCRPIT' },
  { name: 'AXIOS' }
])
</script>

<template>
  <div class="dragAndDrop">
    <el-row>
      <el-col :span="16" :xs="24">
        <el-row>
          <el-col :span="6">
            <div class="dragAndDrop__left">
              <!-- <div class="dragAndDrop__left__title">左侧</div> -->
              <div class="dragAndDrop__left__content dragItem">
                <div class="dragAndDrop__left__content__item dragAndDrop__box" 
                  v-for="(item, index) in leftData" :key="item.name" 
                  :draggable="true" 
                  @dragstart="dragItem.dragStart( $event, item, index)"
                  @dragenter="dragItem.dragEnter( $event, index )"
                  @dragend="dragItem.dragEnd( $event,item, index)"
                  @dragover="dragItem.dragOver( $event, item, index )"
                  @drop="dragItem.dragDrop( $event, item, index )"
                  >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dragAndDrop__right">
              <div class="dragAndDrop__right__content">
                <div class="dragAndDrop__right__content__item dragAndDrop__box" v-for="index in 9" :key="index"
                @dragenter="dragItem.dragEnter( $event, index )">
                  <!-- {{ dragItem.name }} -->
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dragAndDrop{
  --width:210px;
  --height:75px;
  --margin: 5px auto;
  text-align: center;
  .dragAndDrop__box{
    width: var(--width);
    height: var(--height);
    margin: var(--margin);
  }
  .dragAndDrop__left{
    .dragAndDrop__left__content{
      display: flex;
      flex-direction: column;
      .drag-move {
        transition: transform 0.3s;
      }
      .dragAndDrop__left__content__item{
        background-color:antiquewhite;
      }
    }
  }
  .dragAndDrop__right{
    width: 100%;
    .dragAndDrop__right__content{
      display: flex;
      flex-wrap: wrap;
      .dragAndDrop__right__content__item{
        background-color: aquamarine;
      }
    }
  }
}
</style>