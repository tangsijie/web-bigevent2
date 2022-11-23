// 注意：每次调用$.get()、$.post()、$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 发起真正的Ajax之前，统一拼接请求的跟路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  // console.dir(options.url)
  if (options.url.indexOf('/my')!==-1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' }
  }
})