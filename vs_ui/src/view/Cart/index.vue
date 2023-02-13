<template>
  <!-- 购物车列表 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(car,index) in cartList" :key="index">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="car.state"
              @change="updateChecked(car.id, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="car.goodsDetail.gs_img" />
            <div class="item-msg">
              {{ car.goodsDetail.gs_brand }} {{ car.goodsDetail.gs_text }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{
              car.goodsDetail.gs_price | filterPrice
            }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, car)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="car.number"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, car)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, car)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              (Math.floor(car.goodsDetail.gs_price * car.number * 100) / 100)
                | filterPrice
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="open(car.id)" style="">删除</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ isCheckNumber }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价 ：</em>
          <i class="summoney">{{ totalPrice | filterPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="toPay">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Cart",
  data() {
    return {
      cartList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取个人购物车数据
    async getData() {
      const result = await this.$API.car.reqGetCar();
      if (result.code == 200) {
        this.cartList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
    // 修改某个产品的状态
    async updateChecked(id, event) {
      let isChecked = event.target.checked ? "1" : "0";
      const result = await this.$API.car.reqUpdateCheckedById(id, isChecked);
      if (result.code == 200) {
        this.getData();
      }
    },
    // 修改一个产品的数量
    async handler(type, disNum, car) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = car.number > 1 ? -1 : 0;
          break;
        case "change":
          disNum =
            isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - car.number;
      }
      const result = await this.$API.car.reqUpdateShopCart(car.id, disNum);
      if (result.code == 200) {
        this.getData();
      } else {
        this.$message.error(result.message);
      }
    },
    // 删除商品
    open(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          const result = await this.$API.car.reqDeleteShoopCart(id);
          if (result.code == 200) {
            this.getData()
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message.error(result.message)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除选中的全部商品
    deleteAll() {
      this.$confirm("确定删除所有商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          const result = await this.$API.car.reqDeleteShoopCarts();
          if (result.code == 200) {
            this.getData()
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message.error(result.message)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 结算
    toPay(){
      this.$router.push('/pay')
    }
  },
  //计算属性
  computed: {
    // 全选判断
    isAllCheck() {
      return this.cartList.every((item) => item.state == 1);
    },
    // 总价
    totalPrice() {
      let sum = 0;
      this.cartList.forEach((item) => {
        if(item.state == 1) {
          sum += item.number * item.goodsDetail.gs_price;
        }
      });
      return sum;
    },
    // 选中商品件数
    isCheckNumber() {
      let sum = 0;
      this.cartList.forEach((item) => {
        sum += item.state;
      });
      return sum;
    },
  },
  // 过滤器
  filters: {
    filterPrice(num) {
      if (!/\./.test(num)) {
        return (num += ".00");
      }
      var arrayNum = String(num).split(".");
      if (arrayNum[1].length < 2) {
        return (num += "0");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 18%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 27%;
      }

      .cart-th3 {
        width: 17%;
      }

      .cart-th4 {
        width: 18%;
      }

      .cart-th5 {
        width: 12%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 5%;
        }
        .cart-list-con2 {
          width: 40%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 300px;
            margin: 0 10px;
            padding-top: 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 15%;
          padding-top: 25px;
        }
        .cart-list-con5 {
          width: 20%;
          padding-top: 20px;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            padding-top: 9px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }
          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            padding-top: 9px;
          }
        }
        .cart-list-con6 {
          padding-top: 25px;
          width: 12%;
          .sum {
            font-size: 16px;
          }
        }
        .cart-list-con7 {
          width: 8%;
          padding-top: 25px;
          a {
            color: #666;
            cursor: pointer;

            &:hover {
              color: #fe7a22;
            }
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      margin-top: 8px;
      span {
        vertical-align: middle;
      }
      input {
        vertical-align: middle;
      }
    }
    .option {
      padding: 10px;
      overflow: hidden;
      float: left;
      margin-top: 8px;
      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: #fe7a22;
        }
      }
    }
    .money-box {
      float: right;
      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
        margin-top: 13px;
      }
      .sumprice {
        width: 100px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        margin-top: 13px;
        .summoney {
          color: #c81623;
          font-size: 16px;
          vertical-align: bottom;
        }
      }
      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #c72b41;
          overflow: hidden;
        }
      }
    }
  }
}
</style>