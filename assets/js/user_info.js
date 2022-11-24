$(function(){
  let form=layui.form
  let layer=layui.layer
  form.verify({
    nickname:function(value){
      if(value.length>6){
        return '昵称长度在1~6个字符之间'
      }
    }
  })

inituserinfo()


  // 获取用户的基本信息
  function inituserinfo(){
    $.ajax({
      method:'get',
      url:'/my/userinfo',
      success:function(res){
        if(res.status!==0){
          return layer.msg('获取用户信息失败！')
        }
        
        // 快速为表单赋值
        form.val('userData',res.data)
      }
    })
  }

  // 重置
  $('#btnreset').on('click',function(e){
    e.preventDefault()
    inituserinfo()
  })

  // 提交修改
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'post',
      url:'/my/userinfo',
      // 获取表单的值serialize
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('更新数据失败！')
        }
        layer.msg('更新数据成功！')
        // 获取父级的函数
        window.parent.userinfo()
      }
    })
  })
})