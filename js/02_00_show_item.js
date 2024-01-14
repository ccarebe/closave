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
var is_collect = false;
var p_amount = 0;
// 網頁載入完成執行
$(document).ready(function () {
  // ----------
  // header_control();
  // ----------
  //popover
  $('[data-toggle="popover"]').popover();
  // 數量增加
  $(".amount_box .amount_input .ab_btnr").on({
    click: function () {
      p_amount = $("input[name='p_amount']").val();
      console.log("+click");
      add_amount(p_amount);
    },
  });
  // 數量減少
  $(".amount_box .amount_input .ab_btnl").on({
    click: function () {
      p_amount = $("input[name='p_amount']").val();
      console.log("-click");
      min_amount(p_amount);
    },
  });
  // 收藏
  $(".btn_box .bb_wish").on({
    click: function () {
      if (is_collect == false) {
        is_collect = true;
        $(".btn_box .bb_wish img").attr(
          "src",
          "./image/icon/05_wishlist_click.png"
        );
      } else {
        is_collect = false;
        $(".btn_box .bb_wish img").attr({
          src: "./image/icon/05_wishlist.png",
        });
      }
    },
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

function add_amount(i) {
  i++;
  $("input[name='p_amount']").val(i);
}
function min_amount(i) {
  i--;
  // 判斷是否有超出小範圍
  i = i < 1 ? 1 : i;

  $("input[name='p_amount']").val(i);
}

// ----------------------------------------------------------- //

// function header_control() {
//   $("#header").on({
//     mouseover: function () {
//       console.log("'navbar' hovered!!");
//       // 根據 show menu 是否存在來設定 navbar的 mouseover效果
//       if ($("#show_menu").is(".show_menu") == true) {
//         console.log("show_menu->mouseover");
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "transparent" });
//       } else {
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "black" });
//       }
//     },
//     mouseout: function () {
//       console.log("'navbar' out!");
//       // 根據 show menu 是否存在來設定 navbar的 mouseout效果
//       if ($("#show_menu").is(".show_menu") == true) {
//         console.log("show_menu->mouseout");
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "transparent" });
//       } else {
//         $("#header .nav-link,.navbar-brand").css({ color: "black" });
//         $("#header").css({ "background-color": "white" });
//       }
//     },
//   });
// }
