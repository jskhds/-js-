
   let ajaxTimes = 0;
export const request =(params)=>{
    // 封装公共的header
    let  header = {...params.header};
    if(params.url.includes("/my?")){
        // 拼接header 带上 token
        header["Authorization"] = wx.getStorageSync("token");
          
    }
    // 显示加载中效果
    ajaxTimes++;    
    wx.showLoading({
        title: "加载中",
        mask: true
    });
      
    // 定义公共的接口url
    
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            //把params的参数都解构出来
            ...params,
            header:header,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    // 关闭加载图标
                    wx.hideLoading();
                }
               
            }
        
        });
          
    })
}