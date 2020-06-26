import {
  getSetting,
  chooseAddress,
  openSetting,
  showToast
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../libs/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  address:{},
  cart:[],
  allChecked:true,
  totalprice:0,
  totalnum:0
  },
  onShow() {
    //缓存中的数据
    
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart')||[];
     this.setData({address});
     this.setCart(cart);
   // this.setCart(cart);
  },

  async handleChooseAddress() {
    try{
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      // 2 判断 权限状态
      if(scopeAddress === false){
          // 先诱导用户打开授权页面
          await openSetting();
      }
      //4、调用获取收货地址的 api
      const res2 = await chooseAddress();
      //将获取到的 地址值存储到本地缓存中
      wx.setStorageSync('address', res2);
      console.log(res2)
     }catch(err){
         console.error(err)
     }
    } ,

    //商品选中
    handItemChange(e){
      const goods_id=e.currentTarget.dataset.id;
      //购物车数组
      let {cart}=this.data;
      //找到修改的对象
      let index=cart.findIndex(v=>v.goods_id===goods_id);
      cart[index].checked!=cart[index].checked;
      this.setCart(cart);
     
    }, 
    //设置购物车状态
  setCart(cart){
    
     let allChecked=true;
      let totalprice=0;
      let totalnum=0;
      cart.forEach(v=>{
        if(v.checked){
          totalprice+=v.num*v.goods_price;
        totalnum+=v.num;
        }
        else{
          allChecked=false;
        }
      })
      //判断是否为空
      allChecked=cart.length!=0?allChecked:false;
        this.setData({
          cart,
          totalprice,
          totalnum,
          allChecked
        });
        wx.setStorageSync('cart', cart);
  },

  //点击结算
  async handlePay(){
    //判断收货地址
    const {address}=this.data;
    if(!address.userName){
     await showToast({title:"还没有选择收货地址"});
     return ;
    }
    //判断是否选择商品
   
    //跳转到支付页页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
  },


 )

 