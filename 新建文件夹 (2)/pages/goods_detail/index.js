import{ request } from "../../request/index.js";
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({
  data: {
      goodsObj:{},
      //商品是否被收藏
      isCollect:false
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    const {goods_id}=options; 
    this.getGoodsDetail(goods_id);
  },
 async getGoodsDetail(goods_id){
      const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
      this.GoodsInfo=goodsObj;
         //从缓存中获取商品收藏数据
      let collect=wx.getStorageSync('collect') || [];
      //判断当前商品是否被收藏
       let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          //iphone 兼容性 webq
          goods_introduce:goodsObj.goods_introduce.replace(/\.webq/g,'.jpg'),
          pics:goodsObj.pics
        },
        isCollect
      })
  },
  handlePrevewImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
     wx-wx.previewImage({
       current,
       urls,
     })
  },
  //点击加入购物车
  handleCartAdd(){
     //1缓存数组
     let cart=wx.getStorageSync('cart')||[];
     //2判断是否以存在
     let index=cart.findIndex(v=>goods_id==this.GoodsInfo.goods_id);
     if(index===-1){
       //不存在
       this.GoodsInfo.num=1;
       this.GoodsInfo.checked=true;
       cart.push(this.GoodsInfo);
     }
     else{
        //存在
        cart[index].num++;
     }
     //添加会缓存
     wx.setStorageSync('cart', cart);
     //弹窗
     wx.showToast({
       title: '加入成功',
       icon:'success',
       mask:true
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})