var header_h = 0;
var add_item = 0;
var member_link = 0;

$("document").ready(function () {
  header_h = $("#header").outerHeight();
  // 設置main區塊位置
  if ($("#header").css("position") == "fixed") {
    console.log("fixed");
    $("#main").css({
      position: "relative",
      top: `${header_h}px`,
    });
  }
  // 設置main區塊高度
  $("#main").css({
    height: `calc(100vh - ${header_h}px)`,
  });
  //
  $("#login .link2register").click(function () {
    $(".m_right form").addClass("d-none");
    $("#register").removeClass("d-none");
  });
  $("#login .link2recover").click(function () {
    $(".m_right form").addClass("d-none");
    $("#recover").removeClass("d-none");
  });
  //
  $(".link2login").click(function () {
    $(".m_right form").addClass("d-none");
    $(".m_right form#login").removeClass("d-none");
  });
  // 05_02_member
  $(".bday_box .icon_box").click(function () {
    $(".info_msg").toggleClass("d-none");
  });
  //初始值設定

  $("#main.member .m_left .link.active").addClass("shadow-sm");

  //
  member_link = $("#main.member .m_left #link_box1 .link").length;
  console.log("member_link:" + member_link);
  for (i = 1; i <= member_link; i++) {
    set_member_show(i);
  }

  // --------------------新增資料到城市的select中--------------------- //
  var array = [
    "Keelung",
    "Taipei",
    "Taoyuan",
    "Hsinchu",
    "Miaoli",
    "Taichung",
    "Changhua",
    "Yunlin",
    "Nantou",
    "Chiayi",
    "Tainan",
    "Kaohsiung",
    "Pingtung",
    "Yilan",
    "Hualien",
    "Taitung",
  ];
  //利用each遍歷array中的值並將每個值新增到li中
  $.each(array, function (i, val) {
    $(`.city`).append(`<option value="${i + 1}">${val}</option>`);
  });

  // -----------my address區新增地址------------- //
  add_item = $("#show2 .accordion .accordion-item").length;
  $("#new_add").click(function () {
    add_new_address();
  });
});

// -----------------------function區--------------------------- //
//
function set_member_show(i) {
  $(`#main.member .m_left #link_box1 #link${i}`).click(function () {
    $(`#main.member .m_left #link_box1 .link`).removeClass("active");
    $(`#main.member .m_left #link_box1 .link`).removeClass("shadow-sm");
    $(`#main.member .m_left #link_box1 #link${i}`).addClass("active");
    $("#main.member .m_left  #link_box1.link.active").addClass("shadow-sm");
    show_member(i);
  });
}
function show_member(i) {
  $(`#main.member .m_right .show_div`).addClass("d-none");
  $(`#main.member .m_right #show${i}`).removeClass("d-none");
}
//
function add_new_address() {
  console.log("add:" + add_item);
  add_item++;
  $(`#show2 .accordion`).append(`<!-- add${add_item} -->
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#address${add_item}"
        aria-expanded="false"
        aria-controls="address${add_item}"
      >
        <i class="bx bx-home-smile"></i>　name${add_item} - city${add_item}
      </button>
    </h2>
    <div
      id="address${add_item}"
      class="accordion-collapse collapse"
      data-bs-parent="#my_address"
    >
      <div class="accordion-body">
        <form action="">
          <!-- name -->
          <div class="d-flex justify-content-between">
            <!-- first name -->
            <div class="form_item col pe-2">
              <label for="add${add_item}_f_name">first name</label>
              <input
                type="text"
                id="add${add_item}_f_name"
                name="add${add_item}_f_name"
                class="text-capitalize"
              />
            </div>
            <!-- last name -->
            <div class="form_item col ps-2">
              <label for="l_name">last name</label>
              <input
                type="text"
                id="l_name"
                name="l_name"
                class="text-capitalize"         
              />
            </div>
          </div>
          <!-- city/dist -->
          <div class="d-flex justify-content-between">
            <!-- city -->
            <div class="form_item col pe-2">
              <label for="add${add_item}_city">City</label>
              <select class="form-select city" id="add${add_item}_city">
                <option selected>-----</option>
              </select>
            </div>
            <!-- district -->
            <div class="form_item col ps-2">
              <label for="add${add_item}_dist">District</label>
              <select class="form-select dist" id="add${add_item}_dist">
                <option selected>-----</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <!-- address -->
          <div class="form_item">
            <label for="add${add_item}_add">Address</label>
            <input type="text" id="add${add_item}_add" name="add${add_item}_add" />
          </div>
          <!-- phone -->
          <div class="form_item">
            <label for="add${add_item}_phone">Recipient Phone Number</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                >+886</span
              >
              <input
                type="text"
                type="text"
                id="add${add_item}_phone"
                name="add${add_item}_phone"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <!-- button:sumit -->
          <div class="button_box">
            <button type="button" class="f_btn text-capitalize">
              remove
            </button>
            <button type="submit" class="f_btn text-capitalize">
              save change
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>`);
}
