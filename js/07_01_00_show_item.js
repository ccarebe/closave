//--------------------------
var mydate = new Date();
mydate.getHours();
//--------------------------
var select = 1;
var sel_val = 0;
var pic_count = 9;
var pic_width = 0;
var Mpage = Math.floor(pic_count / 2);
var trans = 0;
var is_onsale = false;
// 網頁載入完成執行
$(document).ready(function () {
  btn_hover();
  $("#btn_box").click(function () {
    if (is_onsale == false) {
      is_onsale = true;
      $("#btn_box").css({
        "background-color": "#64BA67",
      });
      $("#btn_box .sale_btn img").attr(
        "src",
        "./image/icon/06_recycle_click.png"
      );
      $("#btn_box .btn_msg").toggleClass("text-white");
      $("#btn_box .btn_msg").text("LET'S GO GREEN !");
      toggleUp();
    } else {
      is_onsale = false;
      $("#btn_box").css({
        "background-color": "whitesmoke",
      });
      $("#btn_box .sale_btn img").attr("src", "./image/icon/06_recycle.png");
      $("#btn_box .btn_msg").toggleClass("text-white");
      $("#btn_box .btn_msg").text("HIT THE STORE SHELF");
      toggleDown();
    }
  });

  // -----------------------------slidebar相關 start------------------------------- //

  $("#div-select").empty();

  for (let i = 1; i <= pic_count; i++) {
    $("#div-select").append(
      `<div id='div${i}' class='addBorder'><img src='./image/v_img${i}.jpg'></div>`
    );

    $(`#div${i}`).on(
      "click",
      {
        num: i,
      },
      fnChange
    );
  }
  // 取得小圖的div寬度
  pic_width = $("#div1").outerWidth();
  // 判斷往左與右鈕是否出現
  iconShow();
  // 按下往左鈕執行fnPrev函式
  $("#btnPrev").on("click", fnPrev);
  // 按下往右鈕執行fnNext函式
  $("#btnNext").on("click", fnNext);
  //設定圖片輪播
  // var play = setInterval(fnNext(), 1000);
  $(`#div${select}`).addClass("showBorder");

  // -----------------------------slidebar相關 end------------------------------- //
});

// -----------------------------slidebar相關 start------------------------------- //

function fnChange(event) {
  console.log(event);
  let num = event.data.num;
  console.log("num: " + num);
  select = num;
  if (num >= 3) {
    sel_val = -(pic_width * (num - 2));
  } else {
    sel_val = 0;
  }

  $("#div-select").css({
    left: sel_val + "px",
  });
  fnChange1(select);
  iconShow();
}

function fnChange1(select) {
  let n = select;
  console.log("focusimage: " + n);
  $("#show").attr("src", `./image/v_img${n}.jpg`);
  $("#show").hide().fadeIn(1000);
  $(".addBorder").removeClass("showBorder");
  $(`#div${n}`).addClass("showBorder");
}

//翻頁箭頭顯示設定
function iconShow() {
  if (select <= 1) {
    $("#btnPrev").hide();
  } else if (select >= pic_count) {
    $("#btnNext").hide();
  } else {
    $("#btnPrev").show();
    $("#btnNext").show();
  }
}

//圖片區域翻頁設定
function fnPrev() {
  select--;
  if (select < 3) {
    $("#div-select").css({
      left: 0,
    });
  } else {
    sel_val += pic_width;
    $("#div-select").css({
      left: sel_val + "px",
    });
  }

  iconShow();
  fnChange1(select);
}

function fnNext() {
  select++;
  if (select >= 3) {
    sel_val -= pic_width;
    $("#div-select").css({
      left: sel_val + "px",
    });
  } else {
    $("#div-select").css({
      left: 0,
    });
  }
  iconShow();
  fnChange1(select);
}

// ----------------------------------------------------------- //

function btn_hover() {
  $("#btn_box").on({
    mouseover: function () {
      $("#btn_box").toggleClass("btn_box");
      $("#btn_box .btn_msg").toggleClass("d-none");
    },
    mouseout: function () {
      $("#btn_box").toggleClass("btn_box");
      $("#btn_box .btn_msg").toggleClass("d-none");
    },
  });
}

//
function toggleUp() {
  $("#modal").toggleClass("d-none");
  $("#modal .item_up").toggleClass("d-none");
}
function toggleDown() {
  $("#modal").toggleClass("d-none");
  $("#modal .item_down").toggleClass("d-none");
}
