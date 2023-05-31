<script lang="ts" setup>
import { reactive } from 'vue'

// 拖动启动数据
class DragStartData {
  public index: number;
  public item: any;
  constructor(index: number, item: any) {
    this.index = index;
    this.item = item;
  }
}

// 拖拽事件
class DragItem {
  public start: number = 0;
  public end: number = 0;
  public startEl: Element | null = null;
  public dragEnterEl: Element | null = null;
  public flag: boolean = false;

  // 拖拽开始
  public dragStart(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    const target = event.target as HTMLElement;
    this.startEl = target;
    this.start = index;
  }

  // 拖拽中
  public dragOver(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    if (this.startEl !== null) {
      event.preventDefault();
    }
  }

  // 拖拽进入
  public dragEnter(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    this.flag = false;
    this.dragEnterEl = null;
    this.clearStyle();
    const target = event.target as HTMLElement;
    if (item === 'right' && this.startEl !== null) {
      target.classList.add('dragAndDrop__right__content__item--active');
      this.dragEnterEl = target;
      this.flag = true;
    } else {
      this.end = index;
    }
  }

  // 拖拽离开
  public dragDrop(event: DragEvent, index: number, leftData: any[], item?: any) {
    if (index || event || item) { }
    const moveItem = leftData[this.start];
    leftData.splice(this.start, 1);
    leftData.splice(this.end, 0, moveItem);
  }

  // 拖拽结束
  public dragEnd(event: DragEvent, index: number, item?: any) {
    if (index || event || item) { }
    this.clearStyle();
    if (this.flag === true) {
      this.clearChild(this.dragEnterEl as Element);
      if (this.startEl && this.dragEnterEl) {
        const cloned: any = this.startEl.cloneNode(true);
        this.clearEvent(cloned);
        cloned.classList.add('noDrag')
        this.dragEnterEl.appendChild(cloned);
      }
    }
    this.reset()
  }

  // 清除事件
  private clearEvent(el: Element) {
    const cloneEl = el.cloneNode(true);
    if (el.parentNode) {
      el.parentNode.replaceChild(cloneEl, el);
    }
  }

  // 清除子元素
  private clearChild(el: Element) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
  
  // 重置数据
  private reset() {
    this.start = 0;
    this.end = 0;
    this.startEl = null;
    this.dragEnterEl = null;
    this.flag = false;
  }

  // 清除样式
  private clearStyle() {
    document.querySelectorAll('.dragAndDrop__right__content__item').forEach((item) => {
      item.classList.remove('dragAndDrop__right__content__item--active');
    })
  }
}

class DragAndDrop {
  private leftData: any[];
  private dragItem: DragItem;

  constructor(leftData: any[]) {
    this.leftData = leftData;
    this.dragItem = new DragItem();
  }

  public handleDragStart(event: DragEvent, index: number, item?: any) {
    const dragStartData = new DragStartData(index, item);
    this.dragItem.dragStart(event, dragStartData.index, dragStartData.item);
  }

  public handleDragOver(event: DragEvent, index: number, item?: any) {
    this.dragItem.dragOver(event, index, item);
  }

  public handleDragEnter(event: DragEvent, index: number, item?: any) {
    this.dragItem.dragEnter(event, index, item);
  }

  public handleDragDrop(event: DragEvent, index: number, item?: any) {
    this.dragItem.dragDrop(event, index, this.leftData, item);
  }

  public handleDragEnd(event: DragEvent, index: number, item?: any) {
    this.dragItem.dragEnd(event, index, item);
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
const myDgAndDp:DragAndDrop = new DragAndDrop(leftData);
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
                  @dragstart="myDgAndDp.handleDragStart($event, index, item)"
                  @dragenter="myDgAndDp.handleDragEnter($event, index, item)" 
                  @dragend="myDgAndDp.handleDragEnd($event, index, item)"
                  @dragover="myDgAndDp.handleDragOver($event, index, item)" 
                  @drop="myDgAndDp.handleDragDrop($event, index, item)"
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
                  @dragenter="myDgAndDp.handleDragEnter($event, index, 'right')"
                  @dragover="myDgAndDp.handleDragOver($event, index)"
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