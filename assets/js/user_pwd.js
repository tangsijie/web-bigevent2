$(function(){
  let form=layui.form
  form.verify({
    pwd:[/^[\s]{6,12}$/,'密码必须6到12位，且不能为空'],
    samepwd:function(value){
      if(value===$('[name=oldpwd]').val()){
        return '新旧密码不能相同！'
      }
    },
    repwd:function(value){
      if(value!==$('[name=newpwd]').val()){
        return '俩次密码不一致！'
      }
    }
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'post',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layui.layer.mag('修改密码失败！')
        }
        layui.layer.msg('修改密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})