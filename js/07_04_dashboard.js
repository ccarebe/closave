var header_bgcolor, header_color;
$(document).ready(function () {
  // --------------------------------
  // --------------------------------
  // --------------------------------

  // --------------------------------
  $("#item #show_clothing .main_item .show .show_item").addClass("shadow");
  // --------------------------------
  header_control();

  // --------------------------------
  set_show_menu_link();

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
  for (select_img = 1; select_img <= 6; select_img++) {
    show_left(select_img);
  }

  // --------------------------------
  $(".ni_shop").on({
    click: function () {
      console.log("'SHOP' CLICK!");
      show_menu();
      change_navbar();
    },
  });
  // ---------------------------------
  $(".wrapper>div").addClass("shadow");

  //
  var canvas = $("#pie");
  var ctx;
  try {
    ctx = canvas.get(0).getContext("2d");
  } catch (e) {
    console.log("We have encountered an error: " + e);
  }
  var lastend = 0;
  var data = [30, 30, 45, 60, 45, 150];
  var myTotal = 0;
  var myColor = [
    "#A1D6E2",
    "#99CCFF",
    "#52B2CF",
    "#6699CC",
    "#0094C6",
    "#003366",
  ];
  var labels = ["A", "B", "C", "D", "E", "F"];

  for (var e = 0; e < data.length; e++) {
    myTotal += data[e];
  }

  // make the chart 10 px smaller to fit on canvas
  var off = 10;
  var w = (canvas.width() - off) / 2;
  var h = (canvas.height() - off) / 2;
  for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = myColor[i];
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w, h);
    var len = (data[i] / myTotal) * 2 * Math.PI;
    var r = h - off / 2;
    ctx.arc(w, h, r, lastend, lastend + len, false);
    ctx.lineTo(w, h);
    ctx.fill();
    // ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var mid = lastend + len / 2;
    ctx.fillText(
      labels[i],
      w + Math.cos(mid) * (r / 2),
      h + Math.sin(mid) * (r / 2)
    );
    lastend += Math.PI * 2 * (data[i] / myTotal);
  }
});

// ********************** function區 ********************** //

// *控制 header navbar 的效果變化* //
function header_control() {
  header_bgcolor = $("#header").css("background-color");
  header_color = $("#header .nav-link,.navbar-brand").css("color");
  $("#header").on({
    mouseover: function () {
      console.log("'navbar' hovered!!");
      // 根據 show menu 是否存在來設定 navbar的 mouseover效果
      if ($("#show_menu").is(".show_menu") == true) {
        console.log("show_menu->mouseover");
        $("#header .nav-link,.navbar-brand").css({ color: "white" }); //show_menu狀態:修改header被 hover時的文字顏色
        $("#header").css({ "background-color": "black" }); //show_menu狀態:修改header被 hover時的背景顏色
      } else {
        $("#header .nav-link,.navbar-brand").css({ color: "black" }); //修改header被 hover時的文字顏色
        $("#header").css({ "background-color": "whitesmoke" }); //修改header被 hover時的背景顏色
      }
    },
    mouseout: function () {
      console.log("'navbar' out!");
      // 根據 show menu 是否存在來設定 navbar的 mouseout效果
      if ($("#show_menu").is(".show_menu") == true) {
        console.log("show_menu->mouseout");
        $("#header .nav-link,.navbar-brand").css({ color: "white" }); //show_menu狀態:修改header沒被 hover時的文字顏色
        $("#header").css({ "background-color": "black" }); //show_menu狀態:修改header沒被 hover時的背景顏色
      } else {
        $("#header .nav-link,.navbar-brand").css({ color: header_color }); //修改header沒被 hover時的文字顏色
        $("#header").css({
          "background-color": header_bgcolor,
        }); //修改header沒被 hover時的背景顏色
      }
    },
  });
}

// *控制 show menu 的展開* //
function show_menu() {
  if ($("#show_menu").is(".show_menu")) {
    // show menu已經展開
    $("#header").toggleClass("position-relative");
    $("#show_menu").addClass("show_menu_back");
    $("#show_menu_right").addClass("show_menu_right_back");
    $("#show_menu").toggleClass("show_menu");
    $("#show_menu_right").toggleClass("show_menu_right");
    $(".show_menu_nav").toggleClass("show_block");
    setTimeout(function () {
      $("#show_menu").addClass("show_none");
    }, 1000);
  } else {
    // show menu還沒有展開
    $("#header").toggleClass("position-relative");
    $("#show_menu").toggleClass("show_menu");
    $("#show_menu_right").toggleClass("show_menu_right");
    $("#show_menu").removeClass("show_menu_back");
    $("#show_menu_right").removeClass("show_menu_right_back");
    setTimeout(function () {
      $(".show_menu_nav").toggleClass("show_block");
    }, 600);
    $("#show_menu").removeClass("show_none");
  }
}

// *控制當 show menu 展開時 header navbar的排版變化* //
function change_navbar() {
  $(".header_logo").toggleClass("order-first  col-lg-6");
  $(".header_left").toggleClass("ms-lg-5 me-lg-5");
  $(".header_right").toggleClass("me-lg-5");
  $("#navbar_container").toggleClass("justify-content-around");
}

// *控制 show menu 中的連結 hover 效果* //
function set_show_menu_link() {
  var show_link = $(".show_menu_nav li a").length;
  console.log(show_link);
  let link_text = 0;
  for (i = 0; i < show_link; i++) {
    link_text = $(".show_menu_nav li a")[i].innerText.replace(" ", "").length;
    $(".show_menu_nav ul li:nth-child(" + (i + 1) + ")").append(
      "<style>.show_menu_nav ul li:nth-child(" +
        (i + 1) +
        "):hover::after{width:" +
        link_text * 3 +
        "%;height:2px}</style>"
    );
  }
}

//*控制 show menu 中的連結 hover時出現的對應圖片* //
function show_left(p) {
  console.log(p);
  $(".show_menu_nav ul li:nth-child(" + p + ")").on({
    mouseover: function () {
      console.log("link hover");
      $("#show_menu_left img").attr({
        src: "./image/v_img" + p + ".jpg",
      });
    },
    mouseout: function () {
      $("#show_menu_left img").attr({ src: "" });
    },
  });
  console.log(p + "end");
}
// ---------------------------------------------- //
//
function set_sidebar_link_icon() {
  $("#sidebar.dashboard .link ul li:nth-child(1) a").append(
    '<img src="./image/icon/00_homePage_white.png" alt="" />' +
      "<span>CLOTHING</span>"
  );
  $("#sidebar.dashboard .link ul li:nth-child(2) a").append(
    '<img src="./image/icon/01_onSale_white.png" alt="" />' +
      " <span>ON SALE</span>"
  );
  $("#sidebar.dashboard .link ul li:nth-child(3) a").append(
    '<img src="./image/icon/02_book_white.png" alt="" />' + "<span>LOOK</span>"
  );
  $("#sidebar.dashboard .link ul li:nth-child(4) a").append(
    '<img src="./image/icon/03_dashboard_white.png" alt="" />' +
      "<span>DASHBOARD</span>"
  );
}
//
function sidebar_link_hover(i) {
  let img_src = "";
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
