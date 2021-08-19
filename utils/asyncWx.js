
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
      wx.chooseAddress({
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err);
        }
      });
    })
  }
/*
promise 形式的 showModal
参数 @param {object} param0 
*/
  export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
      wx.showModal({
        title: '提示',
        content: content,
        // 判断num是否为1 放到 函数外面做 在页面js文件里面的函数 handleItemNumEdit
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });        
    
    })
  }

  export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
      wx.showToast({
        title: title,
        icon: 'none',
       
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })      
    
    })
  }
  /*
  promise 形式的login
  不用传参数 为了拿到code 进而拿到 token*/
  export const login=()=>{
    return new Promise((resolve,reject)=>{
     wx.login({
       timeout:10000,
       success: (result) => {
         resolve(result)
       },
       fail: (err) => {
         reject(err);
       }
     });
       
    
    })
  }
/**
 * promise 形式的支付
 * @param {object} pay  支付所必要的参数
 * @returns 
 */
  // export const requestPayment=(pay)=>{
  //   return new Promise((resolve,reject)=>{
  //   wx.requestPayment({
  //    ...pay,
  //     success: (result)=>{
  //       resolve(result)
  //     },
  //     fail: (err)=>{
  //       reject(err)
  //     },
  //     complete: ()=>{}
  //   });
       
    
  //   })
  // }