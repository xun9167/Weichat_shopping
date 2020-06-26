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
  totalprice:0,
  totalnum:0
  },
  onShow() {
    //缓存中的数据
    
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[];
    //过滤cart
     cart=cart.filter(v=>v.checked);
     this.setData({address});
     let totalprice=0;
     let totalnum=0;
     cart.forEach(v=>{
         totalprice+=v.num*v.goods_price;
       totalnum+=v.num;
     })

       this.setData({
         cart,
         totalprice,
         totalnum,
         address
       });
       wx.setStorageSync('cart', cart);
   
  },
  
  },
 )

 