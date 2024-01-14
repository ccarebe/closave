var product_amount = 0;
var is_collect;
var dis_look, si_div;
$(document).ready(function () {
  header_control();
  // --------------------
  $(".show_item .wish_icon").hide();
  // --------------------
  $(".show_item .si_cover").click(function () {
    $(location).attr("href", "02_00_shop_item.html");
  });
  // -------------------
  product_amount = $(" .show_item").length;
  console.log(product_amount);
  for (i = 1; i <= product_amount; i++) {
    product_hover(i);
    product_collect(i);
  }
  //
  is_collect = new Array(product_amount).fill("false");
  console.log(is_collect);

  // ---------------------discover look page------------------- //
  // 單品區塊加上陰影
  $("#discover_look .look_div .look_cover .si_box .si_div").addClass("shadow");
  dis_look = $("#discover_look .look_div").length;
  console.log("dislook:" + dis_look);
  for (i = 1; i <= dis_look; i++) {
    show_look_si(i);
    set_si_cover(i);
  }
  //
  $("#discover_look .look_div .look_cover .si_box .si_div").click(function () {
    window.location.href = "02_00_shop_item.html";
  });
  // --------------------------------
  $("#look_item ,#footer").css({
    top: $("#header").outerHeight(),
    position: "relative",
  });
});

//
// function header_control() {
//   $("#header").on({
//     mouseover: function () {
//       // console.log("'navbar' hovered!!");
//       // 根據 show menu 是否存在來設定 navbar的 mouseover效果
//       if ($("#show_menu").is(".show_menu") == true) {
//         // console.log("show_menu->mouseover");
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
//         // console.log("show_menu->mouseout");
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "transparent" });
//       } else {
//         $("#header .nav-link,.navbar-brand").css({ color: "black" });
//         $("#header").css({ "background-color": "white" });
//       }
//     },
//   });
//   //
//   $("#header.h_discover_look").on({
//     mouseover: function () {
//       // 根據 show menu 是否存在來設定 navbar的 mouseover效果
//       if ($("#show_menu").is(".show_menu") == true) {
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "transparent" });
//       } else {
//         $("#header .nav-link,.navbar-brand").css({ color: "black" });
//         $("#header").css({ "background-color": "white" });
//       }
//     },
//     mouseout: function () {
//       // 根據 show menu 是否存在來設定 navbar的 mouseout效果
//       if ($("#show_menu").is(".show_menu") == true) {
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "transparent" });
//       } else {
//         $("#header .nav-link,.navbar-brand").css({ color: "white" });
//         $("#header").css({ "background-color": "#2c231d" });
//       }
//     },
//   });
// }
// hover到圖片出現的效果
function product_hover(i) {
  $(" .show_item:nth-child(" + i + ")").on({
    mouseover: function () {
      $(" .show_item:nth-child(" + i + ") .si_label").toggleClass("color_none");
      $(" .show_item:nth-child(" + i + ") .si_pic").toggleClass("height_fill");
      $(" .show_item:nth-child(" + i + ") .si_cover").toggleClass("bg_show");
      $(".show_item:nth-child(" + i + ") .wish_icon").show();
    },
    mouseout: function () {
      $(" .show_item:nth-child(" + i + ") .si_label").toggleClass("color_none");
      $(" .show_item:nth-child(" + i + ") .si_pic").toggleClass("height_fill");
      $(" .show_item:nth-child(" + i + ") .si_cover").toggleClass("bg_show");
      if (is_collect[i - 1] == true) {
        $(".show_item:nth-child(" + i + ") .wish_icon").show();
      } else {
        $(".show_item:nth-child(" + i + ") .wish_icon").hide();
      }
    },
  });
}
//加入收藏效果變換
function product_collect(i) {
  $(".show_item:nth-child(" + i + ") .si_cover .wish_icon").click(function (
    event
  ) {
    if (is_collect[i - 1] == false) {
      is_collect[i - 1] = true;
      $(".show_item:nth-child(" + i + ") .si_cover .wish_icon img").attr({
        src: "./image/icon/05_wishlist_click.png",
      });
    } else {
      is_collect[i - 1] = false;
      $(".show_item:nth-child(" + i + ") .si_cover .wish_icon img").attr({
        src: "./image/icon/05_wishlist_gray.png",
      });
    }
    event.stopPropagation();
  });
}
// ---------------------discover look page------------------- //
function show_look_si(i) {
  $(`#discover_look .look_div.look${i} .look_cover`).on({
    mouseover: function () {
      si_div = $(`#discover_look .look_div.look${i} .look_cover>div`);
      si_div.toggleClass("d-none");
      si_div.addClass("si_show");
    },
    mouseout: function () {
      si_div.toggleClass("d-none");
      si_div.removeClass("si_show");
    },
  });
}
//
function set_si_cover(i) {
  console.log(`look${i}:` + $(`.look${i} .look_cover .si_box .si_div`).length);
  si_div_length = $(`.look${i} .look_cover .si_box .si_div`).length;
  for (j = 1; j <= si_div_length; j++) {
    show_si_cover(i, j);
  }
}
function show_si_cover(i, j) {
  let addhtml;
  addhtml = `<a href="#">
  <div class="si_cover w-100 h-100">
    <div class="before_h">
      <span class="onsale_text">on sale</span>
    </div>
    <div class="after_h">
      <!-- 品牌名 -->
      <span class="d-block sm_text">brand${j}</span>
      <!-- 商品名 -->
      <span class="d-block">look${i}item${j}name</span>
      <!-- 價格 -->
      <span class="d-block">look${i}item${j}price</span>
      <div class="span">
        <span>shop now → </span>
      </div>
    </div>
  </div>
</a>`;
  $(`#look_item .look${i} .look_cover .si_box .si_div:nth-child(${j})`).append(
    addhtml
  );
}
