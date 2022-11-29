let layer=layui.layer
let form=layui.form

inintSelect()
// 初始化富文本编辑器
initEditor()

// 加载文章分类效果
function inintSelect(){
  $.ajax({
    method:'get',
    url:'/my/article/cates',
    success:function(res){
      if(res.status!==0){
        return layer.msg('操作失败！')
      }
      layer.msg('操作成功！')
      let htmlStr=template('select',res)
      // console.log(htmlStr);
      $('[name=cate_id]').html(htmlStr)
      form.render()
    }
  })
}

 // 1. 初始化图片裁剪器
 var $image = $('#image')
  
 // 2. 裁剪选项
 var options = {
   aspectRatio: 400 / 280,
   preview: '.img-preview'
 }
 
 // 3. 初始化裁剪区域
 $image.cropper(options)


//  选择图片
$('#chooseimg').on('click',function(){
  $('#coverfile').click()
})


$('#coverfile').on('change',function(e){
  let files=e.target.files
  if(files.length===0){
    return layer.msg('获取图片失败！')
  }
  let newImgURL = URL.createObjectURL(files[0])
  $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
})

let art_state='已发布'

// 点击草稿按钮
$('#caogao').on('click',function(){
  art_state='草稿'
})

// 表单提交
$('#form').on('submit',function(e){
  e.preventDefault()
  // 基于表单快速建立一个formDate对象
  let fd=new FormData($(this)[0])
  fd.append('state',art_state)
  $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       
    // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob)
    publisharticle(fd)
  })
})

function publisharticle(fd){
  $.ajax({
    method:'post',
    url:'/my/article/add',
    data:fd,
    contentType:false,
    processData:false,
    success:function(res){
      if(res.status!==0){
        return layer.msg('发表文章失败！')
      }
      layer.msg('发表文章成功！')
      location.href='/article/art_list.html'
    }
  })
}