var header_h;
var header_bgcolor, header_color;
var is_clickni1 = false;
var is_clickni2 = false;
var is_menushow = false;
var ni_length, show_link;
var bag_item;

$(document).ready(function () {
  // --------------------------------
  // --------------------------------
  header_control();
  // --------------------------------
  ni_length = $(".show_menu_nav ").length;
  for (j = 1; j <= ni_length; j++) {
    set_show_menu_link(j);
  }
  // --------------------------------

  // 點選shop以及explore時 對於showmenu的控制
  $("#show_menu #show_menu_left").click(function () {
    console.log("show_menu_left:click");
    is_clickni1 = false;
    is_clickni2 = false;
    is_menushow = false;
    close_all_menu();
    change_navbar();
  });
  $(".ni_1").on({
    click: function () {
      console.log("'SHOP' CLICK!");
      if (is_menushow == false) {
        is_clickni1 = true;
        is_menushow = true;
        show_menu(1);
        change_navbar();
      } else {
        if (is_clickni1 == true) {
          is_clickni1 = false;
          is_menushow = false;
          close_menu(1);
          change_navbar();
        } else {
          is_clickni1 = true;
          is_clickni2 = false;
          change_show_menu_link(1);
        }
      }
    },
  });
  $(".ni_2").on({
    click: function () {
      console.log("'explore' CLICK!");
      if (is_menushow == false) {
        is_clickni2 = true;
        is_menushow = true;
        show_menu(2);
        change_navbar();
      } else {
        if (is_clickni2 == true) {
          is_clickni2 = false;
          is_menushow = false;
          close_menu(2);
          change_navbar();
        } else {
          is_clickni2 = true;
          is_clickni1 = false;
          change_show_menu_link(2);
        }
      }
    },
  });

  // ---------------header下滑時消失，上滑時出現----------------- //
  $(function () {
    // show hide subnav depending on scroll direction
    var position = $(window).scrollTop();
    console.log(position);
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll > position) {
        //only piece that matters
        $("#header").stop(true, false).removeClass("up").addClass("down");
      } else {
        //only piece that matters
        $("#header").stop(true, false).removeClass("down").addClass("up");
      }
      position = scroll;
    });
  });

  // -------------------------購物車區塊----------------------- //
  set_bag();
  // --------------------購物車商品數量增減按鈕---------------- //
  bag_item = $(".b_item").length;
  console.log("bi:" + bag_item);
  for (i = 1; i <= bag_item; i++) {
    set_btn_amount(i);
  }
  // 06_02_checkout
  $("#o_discount").on({
    keyup: function () {
      check_discount(this);
    },
  });
  // 03_01_aboutus
  show_height = $("#main.aboutus .cover .intro").outerHeight();
  console.log("show_height" + show_height);
  $("#main video,#main .cover").height(show_height);

  //
  // set_aboutus_position();
  // $(window).resize(function () {
  //   set_aboutus_position();
  // });
  //
  $("#main.aboutus .link_box").addClass("shadow");
});

// ---------------------------------function區-------------------------------- //

// *控制 header navbar 的效果變化* //
function header_control() {
  header_bgcolor = $("#header").css("background-color");
  header_color = $("#header .nav-link,.navbar-brand").css("color");
  $("#header").on({
    mouseover: function () {
      // console.log("'navbar' hovered!!");
      // 根據 show menu 是否存在來設定 navbar的 mouseover效果
      if ($("#show_menu").is(".show_menu") == true) {
        // console.log("show_menu->mouseover");
        $("#header .nav-link,.navbar-brand").css({ color: "white" });
        $("#header").css({ "background-color": "transparent" });
      } else {
        $("#header .nav-link,.navbar-brand").css({ color: "black" });
        $("#header").css({ "background-color": "white" });
      }
    },
    mouseout: function () {
      // console.log("'navbar' out!");
      // 根據 show menu 是否存在來設定 navbar的 mouseout效果
      if ($("#show_menu").is(".show_menu") == true) {
        // console.log("show_menu->mouseout");
        $("#header .nav-link,.navbar-brand").css({ color: "white" });
        $("#header").css({ "background-color": "transparent" });
      } else {
        $("#header .nav-link,.navbar-brand").css({ color: header_color });
        $("#header").css({ "background-color": header_bgcolor });
      }
    },
  });
}
// *控制 show menu 的展開* //
function show_menu(i) {
  // show menu還沒有展開
  $("#show_menu").toggleClass("show_menu");
  $("#show_menu_right").toggleClass("show_menu_right");
  $("#show_menu").removeClass("show_menu_back");
  $("#show_menu_right").removeClass("show_menu_right_back");
  setTimeout(function () {
    $(`.show_menu_nav${i}`).toggleClass("d-none");
  }, 600);
  $("#show_menu").removeClass("show_none");
}
function close_all_menu() {
  console.log("close1");
  // show menu已經展開
  $("#show_menu").addClass("show_menu_back");
  $("#show_menu_right").addClass("show_menu_right_back");
  $("#show_menu").toggleClass("show_menu");
  $("#show_menu_right").toggleClass("show_menu_right");
  $("#show_menu_right .show_menu_nav1").addClass("d-none");
  $("#show_menu_right .show_menu_nav2").addClass("d-none");
  setTimeout(function () {
    $("#show_menu").addClass("show_none");
  }, 1000);
  //
  $("#header .nav-link,.navbar-brand").css({ color: header_color });
  $("#header").css({ "background-color": header_bgcolor });
}
function close_menu(i) {
  console.log("close2");
  // show menu已經展開
  $("#show_menu").addClass("show_menu_back");
  $("#show_menu_right").addClass("show_menu_right_back");
  $("#show_menu").toggleClass("show_menu");
  $("#show_menu_right").toggleClass("show_menu_right");
  $(`.show_menu_nav${i}`).toggleClass("d-none");
  setTimeout(function () {
    $("#show_menu").addClass("show_none");
  }, 1000);
  //
  $("#header .nav-link,.navbar-brand").css({ color: header_color });
  $("#header").css({ "background-color": header_bgcolor });
}
function change_show_menu_link(i) {
  $(`.show_menu_nav`).toggleClass("d-none");
}
// *控制當 show menu 展開時 header navbar的排版變化* //
function change_navbar() {
  $(".header_logo").toggleClass("order-first  col-lg-6");
  $(".header_left").toggleClass("ms-lg-5 me-lg-5");
  $(".header_right").toggleClass("me-lg-5");
  $("#navbar_container").toggleClass("justify-content-around");
}
// *控制 show menu 中的連結 hover 效果* //
function set_show_menu_link(j) {
  show_link = $(`.show_menu_nav${j} li a`).length;
  console.log("show_link" + show_link);
  for (img = 1; img <= show_link; img++) {
    console.log("show_left");
    show_left(img);
  }
  //
  for (i = 0; i < show_link; i++) {
    console.log($(`.show_menu_nav${j} ul li:eq(${i})`).text());
    $(`.show_menu_nav${j} ul li:eq(${i})`).append(
      `<style>.show_menu_nav${j} ul li:nth-of-type(${
        i + 1
      }):hover::after{width:100%;height:2px;}</style>`
    );
  }
}
// *控制 show menu 中的連結 hover時所顯示的圖片* //
function show_left(p) {
  console.log(p);
  $(`.show_menu_nav ul li:nth-of-type(${p})`).on({
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

// ---------------------------購物車區塊增加------------------------- //
function set_bag() {
  $("body").append(
    `<!-- 購物車 Offcanvas (畫布) -->
    <div class="offcanvas offcanvas-end" id="demo">
      <div class="offcanvas-header">
        <span class="offcanvas-title fs-3">Shopping Bag</span>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <!-- 未登入時畫面 -->
      <div id="show_login" class="offcanvas-body p-4 d-none">
        <div class="fs-5 d-flex flex-column">
          <span class=""> Already have an account? </span>
          <span
            ><u
              ><a href="05_00_account.html" class="text-white"
                >Sign in here</a
              ></u
            ></span
          >
        </div>
      </div>
      <!-- 已登入後畫面 -->
      <div
        id="show_bag"
        class="offcanvas-body d-flex flex-column justify-content-between"
      >
        <div id="bag_top">
          <!-- bag_item_list -->
          <div id="bag_item1" class="b_item d-flex">
            <div class="bag_img col-4">
              <img src="./image/item/remove_bg/00_bottom_02_00.png" alt="" />
            </div>
            <div
              class="bag_detail d-flex flex-column justify-content-between col-8 px-4"
            >
              <div class="d-flex flex-column">
                <span id="p_name">Lorem ipsum dolor</span>
                <span id="p_size" class="s_text">s</span>
                <span id="p_color" class="s_text">black</span>
                <span class="text-uppercase s_text"
                  >nt$ <span id="p_price">699</span></span
                >
              </div>
              <!-- amount btn -->
              <div
                class="amount_box d-flex align-items-center justify-content-between"
              >
                <div class="amount_btn btn_minus">&#8722;</div>
                <span class="p_amount">1</span>
                <div class="amount_btn btn_add">&#43;</div>
              </div>
              <!-- remove -->
              <span class="remove_btn"><u>remove</u></span>
            </div>
          </div>
          <!-- bag_item_list -->
          <div id="bag_item2" class="b_item d-flex">
            <div class="bag_img col-4">
              <img src="./image/item/remove_bg/00_bottom_01_00.png" alt="" />
            </div>
            <div
              class="bag_detail d-flex flex-column justify-content-between col-8 px-4"
            >
              <div class="d-flex flex-column">
                <span id="p_name">Lorem ipsum dolor</span>
                <span id="p_size" class="s_text">s</span>
                <span id="p_color" class="s_text">black</span>
                <span class="text-uppercase s_text"
                  >nt$ <span id="p_price">699</span></span
                >
              </div>
              <!-- amount btn -->
              <div
                class="amount_box d-flex align-items-center justify-content-between"
              >
                <div class="amount_btn btn_minus">&#8722;</div>
                <span class="p_amount">1</span>
                <div class="amount_btn btn_add">&#43;</div>
              </div>
              <!-- remove -->
              <span class="remove_btn"><u>remove</u></span>
            </div>
          </div>
          <!-- bag_item_list -->
          <div id="bag_item3" class="b_item d-flex">
            <div class="bag_img col-4">
              <img src="./image/item/remove_bg/00_bottom_01_00.png" alt="" />
            </div>
            <div
              class="bag_detail d-flex flex-column justify-content-between col-8 px-4"
            >
              <div class="d-flex flex-column">
                <span id="p_name">Lorem ipsum dolor</span>
                <span id="p_size" class="s_text">s</span>
                <span id="p_color" class="s_text">black</span>
                <span class="text-uppercase s_text"
                  >nt$ <span id="p_price">699</span></span
                >
              </div>
              <!-- amount btn -->
              <div
                class="amount_box d-flex align-items-center justify-content-between"
              >
                <div class="amount_btn btn_minus">&#8722;</div>
                <span class="p_amount">1</span>
                <div class="amount_btn btn_add">&#43;</div>
              </div>
              <!-- remove -->
              <span class="remove_btn"><u>remove</u></span>
            </div>
          </div>
          <!-- bag_item_list -->
          <div id="bag_item4" class="b_item d-flex">
            <div class="bag_img col-4">
              <img src="./image/item/remove_bg/00_bottom_01_00.png" alt="" />
            </div>
            <div
              class="bag_detail d-flex flex-column justify-content-between col-8 px-4"
            >
              <div class="d-flex flex-column">
                <span id="p_name">Lorem ipsum dolor</span>
                <span id="p_size" class="s_text">s</span>
                <span id="p_color" class="s_text">black</span>
                <span class="text-uppercase s_text"
                  >nt$ <span id="p_price">699</span></span
                >
              </div>
              <!-- amount btn -->
              <div
                class="amount_box d-flex align-items-center justify-content-between"
              >
                <div class="amount_btn btn_minus">&#8722;</div>
                <span class="p_amount">1</span>
                <div class="amount_btn btn_add">&#43;</div>
              </div>
              <!-- remove -->
              <span class="remove_btn"><u>remove</u></span>
            </div>
          </div>
        </div>
        <div id="bag_bottom" class="d-flex flex-column">
          <span class="fs-4"
            >subtotal <span id="bi_total">(20 items)</span></span
          >
          <span class="text-uppercase fs-5"
            >nt$ <span id="sub_total">3,500</span></span
          >
          <a href="06_02_checkout.html">
            <button
              id="bag_btn"
              type="button"
              class="b_btn w-100 mt-3 text-uppercase"
            >
              checkout now
            </button>
          </a>
        </div>
      </div>
    </div>`
  );
}
// ---------------------------購物車商品數量增減按鈕------------------------- //
function set_btn_amount(i) {
  $(`#bag_item${i} .btn_minus`).click(function () {
    bag_min(i);
  });
  $(`#bag_item${i} .btn_add`).click(function () {
    bag_add(i);
  });
}
function bag_min(i) {
  console.log("bag_min" + i);
  if ($(`#bag_item${i} .p_amount`).text() == 1) {
    $(`#bag_item${i} .p_amount`).text(1);
  } else {
    $(`#bag_item${i} .p_amount`).text(
      Number($(`#bag_item${i} .p_amount`).text()) - 1
    );
  }
}
function bag_add(i) {
  if ($(`#bag_item${i} .p_amount`).text() == 10) {
    // 最大庫存數
    $(`#bag_item${i} .p_amount`).text(10);
  } else {
    $(`#bag_item${i} .p_amount`).text(
      Number($(`#bag_item${i} .p_amount`).text()) + 1
    );
  }
}
//
function check_discount(obj) {
  console.log("keyup" + $(obj).val());
  if ($(obj).val().length > 0) {
    $("#btn_discount").prop({
      disabled: false,
    });
  } else {
    $("#btn_discount").prop({
      disabled: true,
    });
  }
}

//03_01_about us
function set_aboutus_position() {
  header_h = $("#header").outerHeight();
  $("#main.aboutus .cover .show_box").css({
    height: `calc(100% - ${header_h}px)`,
    "margin-top": `${header_h}px`,
  });
}
