<script lang="ts" setup>
import { reactive } from 'vue'

//拖拽对象
class DragItem {
  name: string;
  el: Element | null;
  start: number;
  end: number;
  startEl: Element | null;
  dragEnterEl: Element | null;
  timer: any;
  constructor(name: string) {
    let start = 0;
    let end = 0;
    this.start = start;
    this.end = end;
    this.name = name;
    this.dragEnterEl = null;
    this.startEl = null;
    this.timer = null;
    this.el = document.querySelector(`.${name}`);
  }
  // 拖拽开始
  dragStart(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    const target = event.target as HTMLElement;
    if(target.classList.contains('clone')) {
      return;
    }
    this.startEl = target
    this.start = index;
  }
  // 拖拽中
  dragOver(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    event.preventDefault();
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      const target = event.target as HTMLElement;
      this.dragEnterEl = target;
    }, 100);
  }

  // 拖拽结束
  dragEnd(event: DragEvent, index: number, item?: any) {
    // 获取目标元素
    if (index || event || item) { }
    // const target = event.target as HTMLElement;
  }

  // 清除样式
  clearStyle() {
    document.querySelectorAll('.dragAndDrop__right__content__item').forEach((item) => {
      item.classList.remove('dragAndDrop__right__content__item--active');
    })
  }

  // 拖拽进入
  dragEnter(event: DragEvent, index: number, item?: any) {
    this.clearStyle()
    if (item || index) { }
    // 获取目标元素
    const target = event.target as HTMLElement;
    if (target.classList.contains('dragAndDrop__left__content__item')) {

    } else if( target.classList.contains('dragAndDrop__right__content__item') ){
      target.classList.add('dragAndDrop__right__content__item--active');
    }
  }
  // 拖拽放手
  dragDrop(event: DragEvent, index: number, item?: any) {
    if (item) { }
    const target = event.target as HTMLElement;
    if (target.classList.contains('dragAndDrop__left__content__item')) {
      const moveItem = leftData[this.start];
      leftData.splice(this.start, 1);
      leftData.splice(index, 0, moveItem);
    } else if( target.classList.contains('dragAndDrop__right__content__item') ){
      this.clearStyle()
      if(this.startEl){
        const cloned:any = this.startEl.cloneNode(true);
        cloned.classList.add('clone')
        target.appendChild(cloned);
      }
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
                <div class="dragAndDrop__left__content__item dragAndDrop__box" v-for="(item, index) in leftData"
                  :key="item.name" :draggable="true" 
                  @dragstart="dragItem.dragStart($event, index, item)"
                  @dragenter="dragItem.dragEnter($event, index)" 
                  @dragend="dragItem.dragEnd($event, index, item)"
                  @dragover="dragItem.dragOver($event, index, item)" 
                  @drop="dragItem.dragDrop($event, index, item)">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dragAndDrop__right">
              <div class="dragAndDrop__right__content">
                <div class="dragAndDrop__right__content__item bg dragAndDrop__box" v-for="index in 9" :key="index"
                  @dragend="dragItem.dragEnd($event, index)"
                  @dragenter="dragItem.dragEnter($event, index)" 
                  @drop="dragItem.dragDrop($event, index)"
                  @dragover="dragItem.dragOver($event, index)"
                  >
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
.clone{
  -webkit-user-drag:none
}
.dragAndDrop {
  --width: 210px;
  --height: 75px;
  --margin: 5px auto;
  --dragAndDrop__left__content__item-bg: antiquewhite;
  text-align: center;

  .dragAndDrop__box {
    width: var(--width);
    height: var(--height);
    margin: var(--margin);
  }

  .dragAndDrop__left {
    .dragAndDrop__left__content {
      display: flex;
      flex-direction: column;
      .drag-move {
        transition: transform 0.3s;
      }

      .dragAndDrop__left__content__item {
        background-color: var(--dragAndDrop__left__content__item-bg);
      }
    }
  }

  .dragAndDrop__right {
    width: 100%;

    .dragAndDrop__right__content {
      display: flex;
      flex-wrap: wrap;

      .dragAndDrop__right__content__item {
        width: calc(var(--width) + 20px) ;
        height: calc(var(--height) + 30px);
        display: flex;
        align-items: center;
        .dragAndDrop__left__content__item{
          background-color: var(--dragAndDrop__left__content__item-bg);
        }
      }
      .bg{
        background-color: aquamarine;

      }
      .dragAndDrop__right__content__item--active {
        background-color: #e9ebec;
      }
    }
  }
}
</style>