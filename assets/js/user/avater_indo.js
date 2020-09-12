$(".container > img").cropper({
  aspectRatio: 16 / 9,
  crop: function (data) {
    // 出来裁切后的图片数据.
  },
});

// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");

// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 16 / 9,
  // 指定预览区域
  preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);

// 文件上传
$("#btn-upload").click(function () {
  $("#file").click();
});

$("#file").change(function (e) {
  //   console.log(e.target.files[0]);
  var file = e.target.files[0];
  var newImgURL = URL.createObjectURL(file);
  //   console.log(newImgURL);

  $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", newImgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});
