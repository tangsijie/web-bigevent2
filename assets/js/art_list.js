$(function () {
  let layer = layui.layer
  let form = layui.form
  let laypage = layui.laypage
  // 定义一个美化时间的函数
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())

    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 补零操作
  function padZero(n) {
    return n > 9 ? n : '0' + n

  }
  // 定义一个查询的参数对象，将来请求数据的时候需要将请求参数对象提交到服务器

  let q = {
    pagenum: 1,    // 页码值，默认请求第一页的数据
    pagesize: 2,   //每页显示几条数据，默认每页显示2条
    cate_id: '',   //文章分类的Id
    state: ''       //文章的发布状态
  }
  inittable()
  initcate()
  // 文章列表
  function inittable() {
    $.ajax({
      method: 'get',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取数据失败！')
        }
        layer.msg('获取数据成功！')
        let tablrStr=template('table',res)
        $('tbody').html(tablrStr)
        // 渲染分页方法
        renderPage(res.total)
      }
    })
  }

  function initcate() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败！')
        }
        let htmlstr = template('selectname', res)
        // console.log(htmlstr);
        $('[name=cate_id]').html(htmlstr)
        // 通过layui重新渲染表单数据
        form.render()
      }
    })
  }

  $('#form').on('submit', function (e) {
    e.preventDefault()
    // 获取数据
    let cate_id = $('[name=cate_id]').val()
    let state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    inittable()
  })

  // 渲染分页方法
  function renderPage(total) {

    laypage.render({
      elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 6, 8, 10],
      curr: q.pagenum,
      // 当分页被切换时触发
      jump: function (obj, first) {
        //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.curr);
        // console.log(first);//布尔值
        q.pagenum = obj.curr
        // 把最新的数据赋值到q，重新渲染表格
        q.pagesize = obj.limits
        if (!first) {
          //do something
          inittable()
        }
      }
    })
  }

  // 删除文章
  $('tbody').on('click', '.btndelet', function () {
    let len=$('.btndelet').length
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
          if(len==1){
            q.pagenum=q.pagenum===1?1:q.pagenum-1
          }
          inittable()
        }
      })
      layer.close(index)
    })

  })
})