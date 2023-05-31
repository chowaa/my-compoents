<script lang="ts" setup>
import { reactive } from 'vue'

// 定义拖动启动数据类
class DragStartData {
  public index: number;// 拖拽开始索引
  public item: any;// 拖拽开始元素数据
  constructor(index: number, item: any) {
    this.index = index;
    this.item = item;
  }
}

// 定义拖拽事件类
class DragItem {
  private start: number = 0;// 拖拽开始索引
  private end: number = 0;// 拖拽结束索引
  private startEl: Element | null = null;// 拖拽开始元素
  private dragEnterEl: Element | null = null;// 拖拽进入元素
  private flag: boolean = false;// 是否拖拽进入元素

  // 拖拽开始方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public dragStart(event: DragEvent, index: number, item?: any) :void {
    if (index || event || item) { }
    // 如果事件对象有 dataTransfer 属性
    if (event.dataTransfer) {
      // 设置允许的拖拽效果为 "move"
      event.dataTransfer.effectAllowed = 'move';
    }
    // 获取事件目标元素，并将其类型转换为 HTMLElement
    const target = event.target as HTMLElement;
    // 将目标元素赋值给 startEl
    this.startEl = target;
    // 将传入的索引值赋值给 start
    this.start = index;
  }

  // 拖拽过程中方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public dragOver(event: DragEvent, index: number, item?: any) :void {
    if (index || event || item) { }
    // 如果 startEl 不为 null，说明拖拽已经开始
    if (this.startEl !== null) {
      // 阻止默认事件，以允许拖拽操作继续进行
      event.preventDefault();
    }
  }

  // 拖拽进入方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public dragEnter(event: DragEvent, index: number, item?: any) :void {
    if (index || event || item) { }
    // 将 flag 设置为默认值 false
    this.flag = false;
    // 将 dragEnterEl 设置为 null
    this.dragEnterEl = null;
    // 调用 clearStyle 方法清除样式
    this.clearStyle();
    // 获取事件目标元素，并将其类型转换为 HTMLElement
    const target = event.target as HTMLElement;
    // 如果 item 等于 'right' 且 startEl 不为 null
    if (item === 'right' && this.startEl !== null) {
      // 为目标元素添加 'dragAndDrop__right__content__item--active' 类
      target.classList.add('dragAndDrop__right__content__item--active');
      // 将目标元素赋值给 dragEnterEl
      this.dragEnterEl = target;
      // 将 flag 设置为 true
      this.flag = true;
    } else {
      // 将传入的索引值赋值给 end
      this.end = index;
    }
  }

  // 拖拽离开方法
  /**
   * 
   * @param event 拖拽元素
   * @param index 拖拽元素索引
   * @param leftData 原始数据
   * @param item 拖拽元素数据
   */
  public dragDrop(event: DragEvent, index: number, leftData?: any[], item?: any) :void {
    if (index || event || item) { }
    if(leftData){
      // 获取要移动的元素
      const moveItem = leftData[this.start];
      // 从原始位置移除元素
      leftData.splice(this.start, 1);
      // 将元素插入到新位置
      leftData.splice(this.end, 0, moveItem);
    }
  }

  // 拖拽结束方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public dragEnd(event: DragEvent, index: number, item?: any) :void {
    if (index || event || item) { }
    // 清除样式
    this.clearStyle();
    // 如果 flag 为 true，表示拖拽元素进入了目标元素
    if (this.flag === true) {
      // 清除目标元素的子元素
      this.clearChild(this.dragEnterEl as Element);
      // 如果开始拖拽的元素和目标元素都存在
      if (this.startEl && this.dragEnterEl) {
        // 克隆开始拖拽的元素
        const cloned: any = this.startEl.cloneNode(true);
        // 清除克隆元素的事件
        this.clearEvent(cloned);
        // 为克隆元素添加 'noDrag' 类
        cloned.classList.add('noDrag')
        // 将克隆元素添加到目标元素中
        this.dragEnterEl.appendChild(cloned);
      }
    }
    // 重置拖拽相关数据
    this.reset()
  }

  // 清除事件方法
  /**
   * @param el 需要清除事件的元素
   * @returns void
   */
  private clearEvent(el: Element) :void {
    const cloneEl = el.cloneNode(true);
    if (el.parentNode) {
      el.parentNode.replaceChild(cloneEl, el);
    }
  }

  // 清除子元素方法
  /**
   * @param el 需要清除子元素的元素
   * @returns void
   */
  private clearChild(el: Element) :void {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
  
  // 重置数据方法
  private reset() :void {
    this.start = 0;
    this.end = 0;
    this.startEl = null;
    this.dragEnterEl = null;
    this.flag = false;
  }

  // 清除样式方法
  private clearStyle() :void {
    document.querySelectorAll('.dragAndDrop__right__content__item').forEach((item) => {
      item.classList.remove('dragAndDrop__right__content__item--active');
    })
  }
}

// 定义拖拽类
class DragAndDrop {
  private leftData: any[];// 左侧数据
  private dragItem: DragItem;// 拖拽元素

  constructor(leftData: any[]) {
    this.leftData = leftData;
    this.dragItem = new DragItem();
  }

  // 处理拖拽开始方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public handleDragStart(event: DragEvent, index: number, item?: any) :void {
    const dragStartData = new DragStartData(index, item);
    this.dragItem.dragStart(event, dragStartData.index, dragStartData.item);
  }

  // 处理拖拽过程中方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public handleDragOver(event: DragEvent, index: number, item?: any) :void {
    this.dragItem.dragOver(event, index, item);
  }

  // 处理拖拽进入方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public handleDragEnter(event: DragEvent, index: number, item?: any) :void {
    this.dragItem.dragEnter(event, index, item);
  }

  // 处理拖拽离开方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public handleDragDrop(event: DragEvent, index: number, item?: any) :void {
    this.dragItem.dragDrop(event, index, this.leftData, item);
  }

  // 处理拖拽结束方法
  /**
   * @param event 拖拽事件
   * @param index 拖拽元素索引
   * @param item 拖拽元素数据
   * @returns void
   */
  public handleDragEnd(event: DragEvent, index: number, item?: any) :void {
    this.dragItem.dragEnd(event, index, item);
  }
}

// 定义可拖拽数据
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
