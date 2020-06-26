import{ request } from "../../request/index.js";
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ] ,
    goodsList:[]
  },
  totalPages:1,
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  onLoad: function (options) {
      this.QueryParams.cid=options.cid||"";
      this.QueryParams.query=options.query||"";
      this.getGoodsList();
  },
  //获取商品列表数据
   async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭微信下拉窗口
    wx-wx.stopPullDownRefresh();
  },
  //标题点击事件
  handletabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //页面上滑
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有下一页
      wx-wx.showToast({
        title: '没有下一页数据了',
      })
    }else{
        this.QueryParams.pagenum++;
        this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    //1.重置数组
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }
})