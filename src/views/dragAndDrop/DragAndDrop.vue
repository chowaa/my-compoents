<script lang="ts" setup>
import { reactive } from 'vue'

//拖拽对象
class DragItem {
  start: number = 0; // 开始位置
  end: number = 0; // 结束位置
  startEl: Element | null = null; // 开始元素
  dragEnterEl: Element | null = null; // 进入元素
  flag: boolean = false;
  constructor() {
  
  }

  // 拖拽开始
  dragStart(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    const target = event.target as HTMLElement;
    // 设置开始元素
    this.startEl = target
    // 设置开始位置
    this.start = index;
  }

  // 拖拽中
  dragOver(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    // 阻止默认事件
    if(this.startEl !== null) {
      event.preventDefault();
    }
  }

  // 拖拽进入
  dragEnter(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    this.flag = false;
    this.dragEnterEl = null
    this.clearStyle()
    const target = event.target as HTMLElement;
    if(item === 'right' && this.startEl !== null) {
      // 右侧拖拽
      target.classList.add('dragAndDrop__right__content__item--active');
      // 设置进入元素
      event.dataTransfer?.dropEffect;
      event.preventDefault();
      this.dragEnterEl  = target;
      // 当前为右侧拖拽，设置标识符
      this.flag = true;
    } else {
      // 左侧拖拽
      this.end = index;
    }
  }

  // 拖拽放手
  dragDrop(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    const moveItem = leftData[this.start];
    leftData.splice(this.start, 1);
    leftData.splice(this.end, 0, moveItem);
  }

  // 拖拽结束
  dragEnd(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    this.clearStyle();
    if (this.flag === true) { 
      this.clearChild(this.dragEnterEl as Element);

      // 当初始元素和进入元素都存在时，将开始元素克隆到进入元素中
      if(this.startEl && this.dragEnterEl){
        const cloned:any = this.startEl.cloneNode(true);
        this.clearEvent(cloned);
        cloned.classList.add('noDrag')
        this.dragEnterEl.appendChild(cloned);
      }
    }
    this.reset()
  }

  // 清除元素中的事件和样式
  clearEvent(el: Element) {
    const cloneEl = el.cloneNode(true);
    if (el.parentNode) {
      el.parentNode.replaceChild(cloneEl, el);
    }
  }

  // 清除元素子元素
  clearChild(el: Element) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  // 恢复默认值
  reset() {
    this.start = 0;
    this.end = 0;
    this.startEl = null;
    this.dragEnterEl = null;
    this.flag = false;
  }

  // 清除样式
  clearStyle() {
    document.querySelectorAll('.dragAndDrop__right__content__item').forEach((item) => {
      item.classList.remove('dragAndDrop__right__content__item--active');
    })
  }
}


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
const dragItem = new DragItem();
</script>

<template>
  <div class="dragAndDrop">
    <el-row>
      <el-col :span="16" :xs="24">
        <h1>DragAndDrop</h1>
        <el-row>
          <el-col :span="6">
            <div class="dragAndDrop__left">
              <div class="dragAndDrop__left__title">这里是可以拖动的</div>
              <div class="dragAndDrop__left__content dragItem">
                <div class="dragAndDrop__left__content__item dragAndDrop__box" v-for="(item, index) in leftData"
                  :key="item.name" :draggable="true" 
                  @dragstart="dragItem.dragStart($event, index, item)"
                  @dragenter="dragItem.dragEnter($event, index, item)" 
                  @dragend="dragItem.dragEnd($event, index, item)"
                  @dragover="dragItem.dragOver($event, index, item)" 
                  @drop="dragItem.dragDrop($event, index, item)"
                  >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dragAndDrop__right clone">
              <div class="dragAndDrop__right__content">
                <div class="dragAndDrop__right__content__item bg dragAndDrop__box noDrag" v-for="index in 9" :key="index"
                  @dragenter="dragItem.dragEnter($event, index, 'right')"
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
.noDrag{
  *{
    pointer-events: none;
    -webkit-user-drag:none
  }
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