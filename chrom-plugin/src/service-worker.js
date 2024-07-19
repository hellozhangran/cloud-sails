function download(url){
  var options={
      url:url
  }
  chrome.downloads.download(options)
}
//接收消息处理器
chrome.runtime.onMessage.addListener(function(message, sender,sendResponse) {
if (message.type == 'down') {
      //调用下载方法
  download(message.data)
}
});
