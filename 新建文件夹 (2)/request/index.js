//发送次数
let ajaxTimes=0;
export const request=(params)=>{
  //判断url中是否带有字符串/my/
  let header={...params.header};
  if(params.url.includes("/my/")){
    //拼接head
    header["Authorization"]=wx-wx.getStorageSync("token");

  }

  ajaxTimes++;
  //显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask:true,
  });
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
        ...params,
        header:header,
        url:baseUrl+params.url,
        success:(result)=>{
          resolve(result.data.message);
        },
        fail:(err)=>{
          reject(err);
        },
        complete:()=>{
          ajaxTimes--;
          if(ajaxTimes===0){
            wx-wx.hideLoading();
          }
          //关闭图标
          
        }
    });
  })
}