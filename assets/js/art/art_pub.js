// 入口
$(function () {
  // 富文本
  initEditor();

  // 渲染下拉列表
  initCate();
  function initCate() {
    $.get("/my/article/cates", function (res) {
      console.log(res);
      if (res.status === 0) {
        var strHtml = template("cate", res);
        $('[name="cate_id"]').html(strHtml);
        layui.form.render();
      }
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $("#image");
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };
  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 点假的触发真的
  $("#chooseImage").click(function () {
    $("#file").click();
  });

  $("#file").change(function (e) {
    // console.log(e.target.files[0]);
    // 拿到用户选择的文件
    var file = e.target.files[0];
    //   根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 发布新文章
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    var state = "发布";
    $("#caogao").click(function (e) {
      state = "草稿";
    });
    var fd = new FormData($(this)[0]);
    fd.append("state", state);
    // console.log(fd); 空对象
    fd.forEach(function (v, k) {
      console.log(v, k);
    });

    $.post("/my/article/add", fd, function (res) {
      console.log(res);
    });
  });
});
