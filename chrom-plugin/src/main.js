console.log('content_scripts: main.js loaded');

/**
 * 显示网络图片的内存大小
 * @param {*} src 
 * @returns 
 */
function getByte(src){
  return fetch(src).then(function(res){
      return res.blob()
    }).then(function(data){
      return (data.size/(1024)).toFixed(2)+'kB'
    })
}

/**
* 基于dom的title属性来设置显示图片信息
* @param {*} el 
* @param {number} byte zijie
*/
function showInfo(el,byte){
  var html=`真实尺寸:${el.naturalWidth}*${el.naturalHeight}\n显示尺寸:${el.width}*${el.height}\n存储大小:${byte}`;
  el.title=html
}

/**
* 在document上代理mouseover事件
*/
document.addEventListener('mouseover',function(e){
  //移动到图片元素上时、则显示信息
  if(e.target.tagName=='IMG'){
      getByte(e.target.src).then(byte=>{
          showInfo(e.target,byte)
      })
  }
},true)

/**
 * 在document上代理dragend事件
 */
document.addEventListener('dragend',async function(e){
  if(e.target.tagName=='IMG'){
      //发生消息，从content_scripts发送到扩展页面
      await chrome.runtime.sendMessage({type:'down',data:e.target.src});
  }
})

/**
 * 百度首页
 * 1. 添加时间，监听点击事件
 */


clearContentRight();
appendContentRight('answer ready...');
// 监听百度首页搜索按钮
// 添加点击事件
document.querySelector('.s_btn_wr').addEventListener('click', (e) => {
  console.log('点击百度首页搜索按钮');
  clearContentRight();
});

// 监听input标签的change事件
document.querySelector("#kw").addEventListener('input', (e) => {
  console.log('监听input标签的change事件');
  appendContentRight(e.target.value);
});

function clearContentRight() {
  document.querySelector("#content_right").innerHTML = '';
}

function appendContentRight(content) {
  document.querySelector("#content_right").innerHTML = content;
}

