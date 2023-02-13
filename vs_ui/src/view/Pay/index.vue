<template>
<div class="trade">
    <div class="w clearFix">
        <h3 class="trade-header">填写并核对订单信息</h3>
        <div class="content">
            <!-- 收件人信息 -->
            <div class="order-info">
                <!-- 收件人信息 -->
                <h4>收件人信息</h4>
                <div class="recipient">
                    <div class="receive clearfix" v-for="(address,index) in address" :key="index">
                        <span class="name" :class="{cut:address.as_id == userInfo.id}" @click="updateInfo(address)">{{address.as_name}}</span>
                        <span class="address">{{address.as_address}}</span>
                        <span class="phone">{{address.as_phone}}</span>
                        <span class="update" v-show="address.as_id == userInfo.id" @click="dialogFormVisible = true">修改</span>
                    </div>
                </div>
                <!-- 修改收件人信息 -->
                <!-- :label-width="formLabelWidth" -->
                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                    <el-form :model="userInfo">
                        <el-form-item label="姓名" >
                        <el-input v-model="userInfo.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                        <el-input v-model="userInfo.address" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                        <el-input v-model="userInfo.phone" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false;getData()">取 消</el-button>
                        <el-button type="primary" @click="updateAddressInfo">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 商品清单 -->
                <h4>商品清单</h4>
                <div class="detail">
                    <ul class="list clearFix" v-for="(goods,index) in goodsList" :key="index">
                        <li class="img">
                            <img :src="goods.img">
                        </li>
                        <li class="text">
                            <p>
                                {{goods.name}}{{goods.text}}
                            </p>
                        </li>
                        <li class="price">
                            <h3>￥{{goods.price | filterPrice}}</h3>
                        </li>
                        <li class="number">X{{goods.number}}</li>
                    </ul>
                    <h4 class="total-price"><span>总价：<em>￥{{totalPrice | filterPrice}}</em></span></h4>
                </div>
                <h4>收件人信息</h4>
                <div class="total-order">
                    <ul>
                        <li>
                            姓名：{{userInfo.name}}
                        </li>
                        <li>
                            地址：{{userInfo.address}}
                        </li>
                        <li>
                            电话：{{userInfo.phone}}
                        </li>
                    </ul>
                </div>
                <h4 class="message">买家留言</h4>
                <textarea placeholder="建议留言前先与商家沟通确认" v-model="message"></textarea>
            </div>
            <div class="btn">
                <!-- <button @click="outerVisible = true">支付订单</button> -->
                <button @click="open()">支付订单</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'Pay',
    data(){
        return {
            // 留言
            message:'',
            address:{},
            userInfo:{
                name:'',
                address:'',
                phone:'',
                id:0,
            },
            goodsList:[],
            numPrice:'',
            dialogFormVisible: false,
            innerVisible:false,
            outerVisible:false
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(id){
            const result = await this.$API.pay.reqGetInfo();
            if(result.code == 200) {
                this.address = result.data.address;
                this.goodsList = result.data.goodsList;
                result.data.address.forEach(item => {
                    if(id != undefined) {
                        if(item.as_id == id) {
                            this.userInfo.address = item.as_address;
                            this.userInfo.name = item.as_name
                            this.userInfo.phone = item.as_phone
                            this.userInfo.id = id
                        }
                    }else {
                        if(item.as_state == 1) {
                            this.userInfo.address = item.as_address;
                            this.userInfo.name = item.as_name
                            this.userInfo.phone = item.as_phone
                            this.userInfo.id = item.as_id
                        }
                    }
                    
                });
            }else {
                this.$message.error("请求失败，请稍后重试！")
            }
        },
        // 选择地址
        updateInfo(item){
            this.userInfo.address = item.as_address;
            this.userInfo.name = item.as_name
            this.userInfo.phone = item.as_phone
            this.userInfo.id = item.as_id
        },
        // 修改地址信息
        async updateAddressInfo(){
            const id = this.userInfo.id;
            // 发送请求修改信息
            const result = await this.$API.pay.reqUpdateAddressInfo(this.userInfo);
            this.getData(id);
            // 关闭弹窗
            this.dialogFormVisible = false;
        },
        // 支付订单
        async open() {
            this.$alert(`<img src="http://vescow.pannifeng.top/payImg.png" style="width: 90px;height: 90px" />`, "请支付宝支付", {
                dangerouslyUseHTMLString: true,
                center: true,
                showCancelButton: true,
                cancelButtonText: "支付遇见问题",
                confirmButtonText: "已支付成功",
                showClose: false,
                beforeClose: async (type, instance, done) => {
                    if (type == "cancel") {
                        alert("请联系管理员");
                        done();
                    } else {
                        // 整理参数
                        const orderInfo = {
                            numPrice:this.numPrice,
                            name:this.userInfo.name,
                            address:this.userInfo.address,
                            phone:this.userInfo.phone,
                            message:this.message,
                            orderGoodsList: this.goodsList,
                        }
                        // 发送请求提交订单
                        const result = await this.$API.pay.reqInsertOrderInfo(orderInfo)
                        if(result.code == 200) {
                            done();
                            this.$router.push("/paysuccess");
                        }else {
                            this.$message.error("出错了，请稍后重试！")
                            done()
                        }
                        
                    }
                },
            });
        },
    },
    computed: {
        totalPrice() {
            let sum = 0;
            this.goodsList.forEach((item) => {
                sum += item.price * item.number;
            });
            this.numPrice = sum.toString();
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
}
</script>

<style lang="less" scoped>
.trade {
    margin-top: 30px;
    border-top: 2px solid #dddddd;
    padding-top: 50px;
    .w {
        width: 1200px;
        margin: 0 auto;
        

        .trade-header {
            margin-bottom: 20px;
            font-family: "宋体";
        }

        .content {
            border: 2px solid #e6e6e6;
            padding: 20px 30px;
            margin-bottom: 50px;

            .order-info {
                width: 100%;
                font-family: "宋体";

                h4 {
                    margin-top: 40px;
                    height: 40px;
                    line-height: 40px;
                    line-height: 50pxf;
                }

                .total-price {
                        font-size: 15px;
                        margin-top: 10px;

                        em {
                            color: red;
                            font-size: 17px;
                        }
                }


                // 收件人信息
                .recipient {
                    font-family: "微软雅黑";
                    padding: 0 25px;
                    border-bottom: 2px solid #e6e6e6;

                    
                    .receive {
                        margin-bottom: 20px;
                        span {
                            float: left;
                            height: 30px;
                            line-height: 30px;
                            font-size: 11px;
                        }

                        .name {
                            position: relative;
                            width: 110px;
                            text-align: center;
                            font-size: 12px;
                            font-weight: 600;
                            border: 1px solid #dddddd;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            cursor: pointer;

                            &:hover {
                                border: 1px solid #fe7a22;
                            }
                        }

                        .cut {
                            border: 1px solid #fe7a22;
                        }

                        .address {
                            width: 200px;
                            padding-left: 15px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .phone {
                            width: 90px;
                            padding-left: 7px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .update {
                            height: 25px;
                            line-height: 25px;
                            padding: 0 10px;
                            margin-top: 2px;
                            color: #fff;
                            cursor: pointer;
                            background-color: #878787;

                            &:hover {
                                background-color: #fe7a22;
                            }
                        }
                        
                    }  
                }

                // 商品清单
                .detail {
                    font-family: "微软雅黑";
                    padding: 0 25px;

                    .list {
                            margin-top: 15px;
                            padding: 20px 0;
                            height: 82px;
                            // border-top: 1px solid #e6e6e6;
                            border-bottom: 1px solid #e6e6e6;
                    
                            li {
                                line-height: 60px;

                                img {
                                    width: 82px;
                                    height: 82px;
                                }
                    
                                h3 {
                                    color: #e12228;
                                }
                            }

                            .img {
                                float: left;
                                width: 82px;
                                margin-right: 20px;
                            }

                            .text {
                                width: 450px;
                                float: left;
                                line-height: 30px;
                                margin-right: 140px;
                            }

                            .price {
                                width: 95px;
                                text-align: center;
                                float: left;
                                margin-right: 140px;
                            }
                            
                            .number {
                                float: left;
                            }
                        }
                }

                .total-order {
                    font-family: "微软雅黑";
                    padding: 0 25px;
                }

                .total-order {
                    li {
                        height: 30px;
                        line-height: 30px;
                    }
                }

                .message {
                    margin-top: 10px;
                }

                textarea {
                    width: 100%;
                    border-color: #e4e2e2;
                    line-height: 1.8;
                    outline: none;
                    resize: none;
                }
            }

            .btn {
               text-align: center;

               button {
                padding: 15px 45px;
                margin: 15px 0 10px;
                font: 18px "微软雅黑";
                font-weight: 700;
                border-radius: 0;
                background-color: #e1251b;
                border: 1px solid #e1251b;
                color: #fff;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                user-select: none;
                text-decoration: none;
               }
            }
        }
    }
}
</style>