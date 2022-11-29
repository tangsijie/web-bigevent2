$(function () {
  let layer = layui.layer
  let form = layui.form
  article()
  // 获取文章分类列表
  function article() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res);
        let htmlStr = template('template', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  let index = null
  // 添加类别按钮
  $('#add').on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $('.add-article').html()
    })
  })


  // 类别添加按钮弹出的框架的表单提交功能
  $('body').on('submit', '#add-form', function (e) {
    e.preventDefault()
    // console.log('on');
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加图书失败！')
        }
        article()
        layer.msg('添加图书成功！')
        layer.close(index)
      }
    })
  })

  let indexEdit = null
  // 修改弹出层
  $('tbody').on('click', '.btnEdit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '修改文章分类',
      content: $('.Edit-article').html()
    })


    let id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
      method: 'get',
      url: '/my/article/cates/' + id,
      success: function (res) {
        // console.log(res);
        form.val('Edit-form', res.data)
        article()
      }
    })

  })

  // 修改数据
  $('body').on('submit', '#Edit-form', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新数据失败！')
        }
        layer.msg('更新数据成功！')
        layer.close(indexEdit)
        article()
      }
    })
  })

  // 删除数据
  $('tbody').on('click', '.btndelet', function () {
    let id = $(this).attr('data-id')
    console.log(id);
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败！')
          }
          layer.msg('删除成功！')
          layer.close(index)
          article()
        }
      })

    })

  })

  
})