import{ request } from "../../request/index.js";
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //left_mune
    leftMenuList:[],
    //right
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //滚动标志
    scrollTop:0
  }, 
 Cates:[],
  onLoad: function(options){
    //获取本地存储
    const Cates=wx-wx.getStorageSync("cates");
    if(!Cates){
       this.getCates();
    }
   else{
      if(Date.now-Cates.time>1000*60){
        this.getCates();
      }
      else{
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        //右侧赋值
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
   }
  },

  //获取分类数据
  async getCates() {
    /*
    request({
      url:"/categories"
    })
    .then(res => {
      this.Cates=res.data.message;
      //把数据存入本地
      wx-wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
      //左侧赋值
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //右侧赋值
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })*/
    const res=await request({url:"/categories"});
    this.Cates=res;
      //把数据存入本地
      wx-wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
      //左侧赋值
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //右侧赋值
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单点击事件
  handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      let rightContent=this.Cates[index].children;
      this.setData({
        currentIndex:index,
        rightContent,
        //设置右侧内容重新回滚
        scrollTop:0
      })
      

  }
})