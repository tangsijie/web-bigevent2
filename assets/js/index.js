$(function(){

userinfo()
let layer=layui.layer
// 退出功能
$('.btnlogout').click(function(){
  layer.confirm('是否退出登录！', {icon: 3, title:'提示'}, function(index){
    //do something
    //  清除token
    localStorage.removeItem('token')
    location.href='/login.html'
    layer.close(index);
   
  });
})
})
//获取用户信息
function userinfo(){
  $.ajax({
    method:'get',
    url:'/my/userinfo',
    // headers:{Authorization:localStorage.getItem('token')||''},
    success:function(res){
      // console.log(res);
      if(res.status!==0){
        return layui.layer.msg('登录失败！')
      }
      // 调用头像函数
      headers(res.data)
    },
    // 可以写在ajaxApi.js里面
    // 不论成功还是失败，最终都会调用complete函数
    complete:function(res){
      if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        // 强制清空token
        localStorage.removeItem('token')
        // 强制跳转登录页面
        location.href='/login.html'
      }
    }
  })
}
function headers(user){
  // 获取用户名称
  let name=user.nickname||user.username
  $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
  // 按需渲染用户的头像
  if(user.user_pic!==null){
    // 渲染图片
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.touxiangimg').hide()
  }else{
    // 渲染文本头像
    $('.layui-nav-img').hide()
    let first=name[0].toUpperCase()
    $('.touxiangimg').html(first).show()
  }
}