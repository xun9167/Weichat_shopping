// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品/商家投诉",
        isActive:false
      },
    ] ,
    //被选中的图片
    chooseImage:[],
    //文本域的内容
    textVal:""
  },
//外网数组
  UpLoadImgs:[],

  handletabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //点击+号选择图片
  handleChooseImage(){  
    //内置API
    wx-wx.chooseImage({
      complete: (res) => {},
      //数量
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result) => {
        this.setData({
          chooseImage:[...this.data.chooseImage,...result.tempFilePaths]
        })
      },
    })
  },
  hanleRemoveImage(e){
    const {index}=e.currentTarget.dataset;
    //获取data图片数组
    let {chooseImage}=this.data;
    //删除元素
    chooseImage.splice(index,1);
    this.setData({
      chooseImage
    })
  },
  //文本域输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  handleFormSubmit(){
    //文本域内容
    const {textVal,chooseImage}=this.data;
    //合法性
    if(!textVal.trim()){
      //不合法
      wx-wx.showToast({
        title: '输入不合法',
        image: 'image',
        mask: true,
      })
      return ;
    }
    //准备上传图片
   /* chooseImage.forEach((v,i)=>{
      wx-wx.uploadFile({
      filePath: 'v',
      name: 'file',
      url: 'https://images.ac.cn/Home/Index/UploadAction/',
      header: header,
      success: (result) => {
        console.log(result);
      },
    })
    })*/
    this.setData({
      textVal:"",
      chooseImage:[]
    })
    wx.navigateBack({
      delta:1
    })
  }
})