$(function(){
  $('#login').on('click',function(){
    $('.login').hide()
    $('.register').show()
  })
  $('#register').on('click',function(){
    $('.login').show()
    $('.register').hide()
  })
  // 自定义密码规则
  var form=layui.form
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    repass:function(value){
      let pass=$(".register [name=password]").val()
      if(pass!==value){
        return "俩次密码不一致"
      }
    }
  })

//layer弹出信息，例似console.log的效果，只不过他会在页面显示
let layer=layui.layer
  $('#reg').on('submit',function(){
    // e.preventDefault()
    console.log(11);
    console.dir($('#reg [name=username]').val());
    $.post('/api/reguser',{username:$('#reg [name=username]').val(),password:$('#reg [name=password]').val()},function(res){
      if(res.status!==0){
        // return console.dir(res.message)
        return layer.msg(res.message)
      }
      // console.dir('成功注册');
      layer.msg('注册成功，请先登录！')
      $('.register').click()
    })
  })

  // 登录表单提交
  $('#log').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'post',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功的token存到localstorage
        localStorage.setItem('token',res.token)
        location.href='/index.html'
      }
    })
  })
})
