var header_color;
$(document).ready(function () {
  //
  // 跳轉頁面至物品資訊
  $("#item  .main_item .show .show_item").click(function () {
    window.location.href = "07_01_00_clothing_show_item.html";
  });
  //
  $("#item #show_clothing .main_item .show .show_item").addClass("shadow");

  // --------------------------------
  set_sidebar_link_icon();

  // --------------------------------
  var look_count = $("#item #show_look .show .show_item").length;
  for (i = 1; i <= look_count; i++) {
    show_main_look_icon(i);
  }
  // --------------------------------
  for (sidebar_link = 1; sidebar_link <= 4; sidebar_link++) {
    sidebar_link_hover(sidebar_link);
  }
  $(".active").addClass("shadow");

  // --------------------------------
});

// ********************** function區 ********************** //

// ---------------------------------------------- //
//
function set_sidebar_link_icon() {
  $("#sidebar .link ul li:nth-child(1) a").append(
    '<img src="./image/icon/00_homePage_black.png" alt="" />' +
      "<span>CLOTHING</span>"
  );
  $("#sidebar .link ul li:nth-child(2) a").append(
    '<img src="./image/icon/01_onSale_black.png" alt="" />' +
      " <span>ON SALE</span>"
  );
  $("#sidebar .link ul li:nth-child(3) a").append(
    '<img src="./image/icon/02_book_black.png" alt="" />' + "<span>LOOK</span>"
  );
  $("#sidebar .link ul li:nth-child(4) a").append(
    '<img src="./image/icon/03_dashboard_black.png" alt="" />' +
      "<span>DASHBOARD</span>"
  );
}
//
function sidebar_link_hover(i) {
  let img_src = "";
  $("#sidebar .link li:nth-child(" + i + ") a").on({
    mouseover: function () {
      $("#sidebar .link li:nth-child(" + i + ") a").addClass("bg-black  ");
      $("#sidebar .link li:nth-child(" + i + ") a").addClass("text-white");
      switch (i) {
        case 1:
          img_src = "./image/icon/00_homePage_white.png";
          break;
        case 2:
          img_src = "./image/icon/01_onSale_white.png";
          break;
        case 3:
          img_src = "./image/icon/02_book_white.png";
          break;
        case 4:
          img_src = "./image/icon/03_dashboard_white.png";
          break;
      }
      $("#sidebar .link li:nth-child(" + i + ") a img").attr("src", img_src);
    },
    mouseout: function () {
      $("#sidebar .link li:nth-child(" + i + ") a").removeClass("bg-black  ");
      $("#sidebar .link li:nth-child(" + i + ") a").removeClass("text-white");
      switch (i) {
        case 1:
          img_src = "./image/icon/00_homePage_black.png";
          break;
        case 2:
          img_src = "./image/icon/01_onSale_black.png";
          break;
        case 3:
          img_src = "./image/icon/02_book_black.png";
          break;
        case 4:
          img_src = "./image/icon/03_dashboard_black.png";
          break;
      }
      $("#sidebar .link li:nth-child(" + i + ") a img").attr("src", img_src);
    },
  });
  //
  $("#sidebar.dashboard .link li:nth-child(" + i + ") a").on({
    mouseover: function () {
      $("#sidebar .link li:nth-child(" + i + ") a").addClass("bg-white");
      $("#sidebar .link li:nth-child(" + i + ") a").addClass("text-black");
      switch (i) {
        case 1:
          img_src = "./image/icon/00_homePage_black.png";
          break;
        case 2:
          img_src = "./image/icon/01_onSale_black.png";
          break;
        case 3:
          img_src = "./image/icon/02_book_black.png";
          break;
        case 4:
          img_src = "./image/icon/03_dashboard_black.png";
          break;
      }
      $("#sidebar .link li:nth-child(" + i + ") a img").attr("src", img_src);
    },
    mouseout: function () {
      $("#sidebar .link li:nth-child(" + i + ") a").removeClass("bg-white");
      $("#sidebar .link li:nth-child(" + i + ") a").removeClass("text-black");
      switch (i) {
        case 1:
          img_src = "./image/icon/00_homePage_white.png";
          break;
        case 2:
          img_src = "./image/icon/01_onSale_white.png";
          break;
        case 3:
          img_src = "./image/icon/02_book_white.png";
          break;
        case 4:
          img_src = "./image/icon/03_dashboard_white.png";
          break;
      }
      $("#sidebar .link li:nth-child(" + i + ") a img").attr("src", img_src);
    },
  });
}
// ------------------------------------------------------ //
function show_main_look_icon(i) {
  $(
    "#item #show_look .show .show_item:nth-child(" + i + ") .look_pic_cover"
  ).on({
    mouseover: function () {
      $(
        "#item #show_look .show .show_item:nth-child(" +
          i +
          ") .look_pic_cover .edit_icon"
      ).toggleClass("d-none");
    },
    mouseout: function () {
      $(
        "#item #show_look .show .show_item:nth-child(" +
          i +
          ") .look_pic_cover .edit_icon"
      ).toggleClass("d-none");
    },
  });
}
