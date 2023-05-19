<script lang="ts" setup>
import { reactive } from 'vue';
// import {Plus} from '@element-plus/icons-vue';
import {CirclePlusFilled, RemoveFilled} from '@element-plus/icons-vue';

// 商品数据
const productData = [
  { name: '鼠标', price: 100, describe: '这是一个鼠标', },
  { name: '键盘', price: 200, describe: '这是一个键盘', },
  { name: '耳机', price: 300, describe: '这是一个耳机', },
  { name: '显示屏', price: 400, describe: '这是一个显示屏', }
];

// 商品数据类型
class ProductData {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
// 创建商品类
class commodityType {
  // 属性
  data: ProductData;
  choose: number;
  // 构造函数
  constructor(data: ProductData) {
    this.data = data;
    this.choose = 0;
  }
  // 获取总价
  getTotalPrice() {
    return this.data.price * this.choose;
  }
  // 是否选中了此件商品
  isChoose() {
    return this.choose > 0;
  }
  // 增加商品数量
  increase() {
    this.choose++;
  }
  // 减少商品数量
  reduce() {
    if (this.choose > 0) {
      this.choose--;
    }
    return
  }
}

// 创建购物车方法类
class ShoppingCartMethod {

  allGoods: commodityType[];// 所有商品

  upToAmount: number;// 起送金额

  deliveryFee: number;// 配送费

  // 构造函数
  constructor() {
    let allGoods = new Array();
    productData.map((item) => {
      allGoods.push(new commodityType(item));
    });
    Object.defineProperty(this, 'allGoods', {
      configurable: false,
      enumerable: false,
    })
    this.allGoods = allGoods;
    this.upToAmount = 30;
    this.deliveryFee = 5;
  }

  // 获取购物车总价
  getTotalPrice() {
    let totalPrice = 0;
    this.allGoods.map((item) => {
      totalPrice += item.getTotalPrice();
    });
    return totalPrice;
  }

  // 获取购物车商品数量
  getTotalNumber() {
    let totalNumber = 0;
    this.allGoods.map((item) => {
      totalNumber += item.choose;
    });
    return totalNumber;
  }

  // 增加某件商品数量
  increase(index: number) {
    this.allGoods[index].increase();
  }

  // 减少某件商品数量
  reduce(index: number) {
    this.allGoods[index].reduce();
  }

  // 判断购物车是否有商品
  isEmpty() {
    return this.getTotalNumber() > 0;
  }

  // 判断购物车是否满足起送金额
  isUpToAmount() {
    return this.getTotalPrice() >= this.upToAmount;
  }
}
const cart = new ShoppingCartMethod();

const cartData = reactive(cart) as ShoppingCartMethod;

const ProductDataRef = reactive(productData);
console.log(cartData);

const button = (item: number, type: string) => {
  switch (type) {
    case 'getTotalPrice':
      // 购物车总价
      console.log(cartData.getTotalPrice());
      break;
    case 'getTotalNumber':
      // 购物车商品数量
      console.log(cartData.getTotalNumber());
      break;
    case 'increase':
      // 增加某件商品数量
      cartData.increase(item);
      break;
    case 'reduce':
      // 减少某件商品数量
      cartData.reduce(item);
      break;
    case 'isEmpty':
      // 判断购物车是否有商品
      console.log(cartData.isEmpty());
      break;
    case 'isUpToAmount':
      // 判断购物车是否满足起送金额
      console.log(cartData.isUpToAmount());
      break;
    case 'isChoose':
      // 判断某件商品是否选中
      console.log(cartData.allGoods[item].isChoose());
      break;
    // 获取某件商品数量
    case 'getChoose':
      console.log(cartData.allGoods[item].choose);
      break;
    default:
      break;
  }
}

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

console.log(someValue, strLength);


</script>

<template>
  <div class="shopping-cart">
    <el-row>
      <el-col :span="16">
        <h1>Shopping Cart</h1>
        <div class="commodity-item" v-for="(item, index) in ProductDataRef" :key="index">
          <div class="commodity-info title">
            <span class="name">{{ item.name }}&nbsp;&nbsp;&nbsp;</span>
            <span class="describe">{{ item.describe }}&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div class="prise-button">
    
            <div class="price">
              <span>价格：￥{{ item.price }}&nbsp;&nbsp;&nbsp;</span>
            </div>
    
            <div class="commodity-button">
              <div class="icon-button" v-if="cartData.allGoods[index].choose > 0" @click="button(index, 'reduce')">
                <RemoveFilled size="80" color="rgb(242, 85, 54)"></RemoveFilled>
              </div>
              <span>{{ cartData.allGoods[index].choose ? cartData.allGoods[index].choose : 0 }}</span>
              <div class="icon-button" @click="button(index, 'increase')">
                <CirclePlusFilled size="80" color="gold"></CirclePlusFilled>
              </div>
            </div>
          </div>
        </div>
        <!-- <p>商品数量：{{ cartData.getTotalNumber() }}</p> -->
        <el-row class="buttom-box">
          <el-col :span="6">
            <el-text class="text">起送金额：{{ cartData.upToAmount }}</el-text>
          </el-col>
          <el-col :span="6">
            <el-text class="text">配送费：{{ cartData.deliveryFee }}</el-text>
          </el-col>
          <el-col :span="6">
            <el-text class="text">总价：{{ cartData.getTotalPrice() }}</el-text>
          </el-col>
          <el-col :span="6">
            <el-button>去结算</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.shopping-cart {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  .commodity-item {
    display: flex;
    margin: 5px 0;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    .commodity-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .title {
      .name{
        font-size: 20px;
        font-weight: bold;
      }
      .describe{
        color: rgb(133, 133, 133);
      }
    }
    .prise-button{
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      .price {
        // font-size: 20px;
        color: rgb(242, 85, 54);
        font-weight: bold;
      }
      .commodity-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          margin: 0 10px;
        }
        .icon-button{
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .buttom-box{
    :deep(.el-col-6){
      display: flex;
      justify-content: center;
    }
    .text{
      margin-top: 10px;
      height: 100%;
    }
  }
}
</style>