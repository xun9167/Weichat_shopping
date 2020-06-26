// pages/search/index.js
import{ request } from "../../request/index.js";
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({
  data: {
    goods:[],
    //取消按钮是否存在·
    isFocus:false,
    //输入框
    inpValue:""
  },
  TimeId:1,
  //输入框
  handleInput(e){
    //获取输入的值
    const {value}=e.detail;
    //检验合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return ;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.Time);
    this.TimeId=setTimeout(()=>{
        this.qsearch(value);
    },1000)
   
    //发送请求
  },
  //发送请求的函数
   async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods:res
    })

  },
  //点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[],
    })
  }
})