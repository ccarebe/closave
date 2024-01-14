// item add 相關變數
var currentStep = 1;
var customSelectLength,
  customSelect,
  selectBtn,
  selectedValue,
  optionsList,
  optionsText;
// item edit 相關變數
var categoryLength;
// look add 相關變數
var singleitemLength = 1;
$(document).ready(function () {
  set_form_btn();
  // --------------------------------
  set_sidebar_link_icon();
  // --------------上傳物品圖片------------------
  // 主圖
  $("#mainInput").change(function () {
    console.log(this);
    $("#main_imgs").html(""); // 清除預覽
    readURL1(this);
  });
  // 附圖
  $("#subInput").change(function () {
    console.log(this);
    $("#sub_imgs").html(""); // 清除預覽
    readURL2(this);
  });
  // --------------上傳搭配圖片------------------
  // 主圖
  $("#mainLookInput").change(function () {
    console.log(this);
    $("#main_imgs").html(""); // 清除預覽
    readURL1(this);
  });
  // 附圖
  $("#subLookInput").change(function () {
    console.log(this);
    $("#sub_imgs").html(""); // 清除預覽
    readURL3(this);
  });

  // --------------------------------
  for (sidebar_link = 1; sidebar_link <= 4; sidebar_link++) {
    sidebar_link_hover(sidebar_link);
  }
  // --------------------------------
  $(".ni_shop").on({
    click: function () {
      console.log("'SHOP' CLICK!");
      show_menu();
      change_navbar();
    },
  });

  //設定側邊攔陰影樣式
  $(".active").addClass("shadow");

  // -------------------------------item add------------------------------------- //
  //設定表單填寫區塊
  show_content();

  $(".next_btn").click(function () {
    if ($("#mainInput").val() == "") {
      alert("Please upload your main image.");
    } else {
      currentStep++;
      show_content();
    }
  });

  $(".pre_btn").click(function () {
    currentStep--;
    show_content();
  });

  //下拉式選單
  customSelectLength = $(`.custom-select`).length;
  for (i = 0; i < customSelectLength; i++) {
    click_select_btn(i);
    console.log("i:" + i);
  }

  //防止ENTER鍵送出表單
  $("form").on("keyup keypress", function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });

  // -------------------------------item edit------------------------------------- //
  // 物品類別、子類別選擇連動
  edit_sub_category($("#i_category").val());
  $("#i_category").change(function () {
    edit_sub_category($("#i_category").val());
  });
  // -------------------------------look add------------------------------------- //

  // 新增單品
  $(".add_btn").click(function () {
    add_btn_click();
  });
  // 物品類別、子類別選擇連動
  set_singleItem(singleitemLength);

  // -------------------------------look edit------------------------------------- //
  show_look_item(5);
});

// ********************** function區 ********************** //

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
}
// 設定按鈕與標題顏色效果(hover時變換顏色)
function set_form_btn() {
  $("#item .form_btn button.btn1").on({
    mouseover: function () {
      $("#item .form_btn button.btn1").css({ "background-color": "#2a878f" });
      $("#title").css({ "background-color": "#2a878f" });
    },
    mouseout: function () {
      $("#item .form_btn button.btn1").css({ "background-color": "#6c9089" });
      $("#title").css({ "background-color": "#6c9089" });
    },
  });
}
// 主圖上傳
function readURL1(input) {
  var file_length = input.files.length;
  if (input.files && file_length == 1) {
    for (var i = 0; i < file_length; i++) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = $(
          `<img class='object-fit-cover' width='100%' height='100%'>`
        ).attr("src", e.target.result);
        $("#main_imgs").append(img);
      };
      reader.readAsDataURL(input.files[i]);
    }
  } else {
    alert("最多只能上傳1張照片!");
    var noPictures = $("<p>請重新選擇上傳檔案 !!</p>");
    $("#main_imgs").append(noPictures);
  }
}
// 附圖上傳
function readURL2(input) {
  var file_length = input.files.length;
  if (input.files && file_length >= 0 && file_length <= 8) {
    // var img_size = 100 / 3;
    for (var i = 0; i < file_length; i++) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = $(
          `<img class='object-fit-cover' width='25%' height='50%'>`
        ).attr("src", e.target.result);
        $("#sub_imgs").append(img);
      };
      reader.readAsDataURL(input.files[i]);
    }
  } else {
    alert("最多只能上傳8張照片!");
    var noPictures = $("<p>請重新選擇上傳檔案 !!</p>");
    $("#sub_imgs").append(noPictures);
  }
}
// 搭配單品附圖上傳
function readURL3(input) {
  var file_length = input.files.length;
  if (input.files && file_length >= 0 && file_length <= 6) {
    var img_size = 100 / 6;
    for (var i = 0; i < file_length; i++) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = $(
          `<img class='object-fit-cover' width='100%' height='${img_size}%'>`
        ).attr("src", e.target.result);
        $("#sub_imgs").append(img);
      };
      reader.readAsDataURL(input.files[i]);
    }
  } else {
    alert("最多只能上傳6張照片!");
    var noPictures = $("<p>請重新選擇上傳檔案 !!</p>");
    $("#sub_imgs").append(noPictures);
  }
}
// -------------------------------item add------------------------------------- //
// 表單填寫區塊顯示設定:STEP1,STEP2
function show_content() {
  $(".tabcontent").css("display", "none");
  $("#step" + currentStep).css("display", "block");
}
// 執行"下拉式選單"被點選時的動作
function click_select_btn(i) {
  $(`.custom-select:eq(${i}) .select-button`).click(function () {
    console.log(i + "click");
    if (i == 0) {
      $(`.custom-select:eq(1) .select-button`).attr("disabled", true);
      $(`.custom-select:eq(1)`).removeClass("active");
    }
    select(i);
  });
}
// 計算下拉式選單被點選時的參數設定
function select(i) {
  customSelect = $(`.custom-select:eq(${i})`);
  selectBtn = $(`.custom-select:eq(${i}) .select-button`);
  selectedValue = $(`.custom-select:eq(${i}) .selected-value`);
  optionsList = $(`.custom-select:eq(${i}) .select-dropdown li`);
  customSelect.toggleClass("active");
  selectBtn.attr(
    "aria-expanded",
    selectBtn.attr("aria-expanded") === "true" ? "false" : "true"
  );
  console.log("ol" + optionsList.length);
  for (j = 0; j < optionsList.length; j++) {
    click_select_btn_li(i, j);
  }
}
// 執行"下拉式選單中項目"被選取時的動作
function click_select_btn_li(i, j) {
  if (i == 0) {
    console.log("i==0");
    $(`.custom-select:eq(${i}) .select-dropdown li:eq(${j}) label`).click(
      function () {
        console.log("i:" + i + "j:" + j + "click");
        optionsText = $(
          `.custom-select:eq(${i}) .select-dropdown li:eq(${j}) label`
        ).text();
        selectedValue.text(optionsText);
        $(`.custom-select:eq(1) .selected-value`).text(`select`);
        $(`.custom-select:eq(1) .select-button`).removeAttr("disabled");
        customSelect.removeClass("active");
        set_sub_category(optionsText);
      }
    );
  } else {
    console.log("i!=0");
    $(`.custom-select:eq(${i}) .select-dropdown li:eq(${j}) label`).click(
      function () {
        console.log("i:" + i + "j:" + j + "click");
        optionsText = $(
          `.custom-select:eq(${i}) .select-dropdown li:eq(${j}) label`
        ).text();
        selectedValue.text(optionsText);
        customSelect.removeClass("active");
        set_sub_category(optionsText);
      }
    );
  }
}
// 設定子選單的內容
function set_sub_category(value) {
  switch (value) {
    case "tops":
      $("#i_sub_class ul li").remove();
      var array = [
        "T-shirt",
        "Blouse",
        "Polo shirt",
        "Sweater",
        "Hoodie",
        "Crop top",
        "Knit top",
        "Cardigan",
        "Tank top",
        "others",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_sub_class ul").append(`<li role="option">
        <input
          type="radio"
          id="t${i}"
          name="i_subcategory"
          value="t${i}"
        />
        <label for="t${i}"><i class="bx"></i>${val}</label>
      </li>`);
      });
      break;
    case "bottoms":
      $("#i_sub_class ul li").remove();
      var array = [
        "trousers",
        "pants",
        "jeans",
        "leggings",
        "shorts",
        "maxi skirt",
        "mini skirt",
        "knit skirt",
        "leather skirt",
        "denim skirt",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_sub_class ul").append(`<li role="option">
          <input
            type="radio"
            id="b${i}"
            name="i_subcategory"
            value="b${i}"
          />
          <label for="b${i}"><i class="bx"></i>${val}</label>
        </li>`);
      });
      break;
    case "outers":
      $("#i_sub_class ul li").remove();
      var array = ["coat", "jacket", "blazer", "vest"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_sub_class ul").append(`<li role="option">
            <input
              type="radio"
              id="o${i}"
              name="i_subcategory"
              value="o${i}"
            />
            <label for="o${i}"><i class="bx"></i>${val}</label>
          </li>`);
      });
      break;
    case "dresses/sets":
      $("#i_sub_class ul li").remove();
      var array = ["mini dress", "midi dress", "maxi dress", "sets"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_sub_class ul").append(`<li role="option">
              <input
                type="radio"
                id="ds${i}"
                name="i_subcategory"
                value="ds${i}"
              />
              <label for="ds${i}"><i class="bx"></i>${val}</label>
            </li>`);
      });
      break;
    case "bags/shoes":
      $("#i_sub_class ul li").remove();
      var array = [
        "tote bag",
        "hand bag",
        "shoulder bag",
        "crossbody bag",
        "backpack",
        "wallet",
        "athletic shoes",
        "casual shoes",
        "boots",
        "high heels",
        "sandals",
        "slippers",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_sub_class ul").append(`<li role="option">
                <input
                  type="radio"
                  id="bs${i}"
                  name="i_subcategory"
                  value="bs${i}"
                />
                <label for="bs${i}"><i class="bx"></i>${val}</label>
              </li>`);
      });
      break;
    case "accessories":
      $("#i_sub_class ul li").remove();
      var array = [
        "necklace",
        "bracelet",
        "ring",
        "earrings",
        "anklet",
        "hat",
        "scarf",
        "gloves",
        "belts",
        "eyewear",
        "watch",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_sub_class ul").append(`<li role="option">
                <input
                  type="radio"
                  id="acc${i}"
                  name="i_subcategory"
                  value="acc${i}"
                />
                <label for="acc${i}"><i class="bx"></i>${val}</label>
              </li>`);
      });
      break;
  }
}
// -------------------------------item edit------------------------------------- //
// 設定子選單的內容
function edit_sub_category(value) {
  switch (value) {
    case "tops":
      $("#i_subcategory option").remove();
      var array = [
        "T-shirt",
        "Blouse",
        "Polo shirt",
        "Sweater",
        "Hoodie",
        "Crop top",
        "Knit top",
        "Cardigan",
        "Tank top",
        "others",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_subcategory").append(`<option value="t${i}">${val}</option>`);
      });
      break;
    case "bottoms":
      $("#i_subcategory option").remove();
      var array = [
        "trousers",
        "pants",
        "jeans",
        "leggings",
        "shorts",
        "maxi skirt",
        "mini skirt",
        "knit skirt",
        "leather skirt",
        "denim skirt",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_subcategory").append(`<option value="b${i}">${val}</option>`);
      });
      break;
    case "outerwears":
      $("#i_subcategory option").remove();
      var array = ["coat", "jacket", "blazer", "vest"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_subcategory").append(`<option value="o${i}">${val}</option>`);
      });
      break;
    case "dresses/sets":
      $("#i_subcategory option").remove();
      var array = ["mini dress", "midi dress", "maxi dress", "sets"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_subcategory").append(`<option value="ds${i}">${val}</option>`);
      });
      break;
    case "bags/shoes":
      $("#i_subcategory option").remove();
      var array = [
        "tote bag",
        "hand bag",
        "shoulder bag",
        "crossbody bag",
        "backpack",
        "wallet",
        "athletic shoes",
        "casual shoes",
        "boots",
        "high heels",
        "sandals",
        "slippers",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_subcategory").append(`<option value="bs${i}">${val}</option>`);
      });
      break;
    case "acc":
      $("#i_subcategory option").remove();
      var array = [
        "necklace",
        "bracelet",
        "ring",
        "earrings",
        "anklet",
        "hat",
        "scarf",
        "gloves",
        "belts",
        "eyewear",
        "watch",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $("#i_subcategory").append(`<option value="acc${i}">${val}</option>`);
      });
      break;
  }
}
// -------------------------------look add------------------------------------- //
// 新增單品資訊相關設定
function add_btn_click() {
  $(`#singleitem${singleitemLength} td:last-child()`).remove();
  singleitemLength++;
  if (singleitemLength > 6) {
    alert("最多只能新增6個單品!");
  } else {
    msg = `<!-- 單品${singleitemLength} -->
    <tr id="singleitem${singleitemLength}">
      <!-- 單品類別選擇 -->
      <td>ITEM:</td>
      <td>
        <select name="look_item_${singleitemLength}_cat" id="look_item_${singleitemLength}_cat">
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwears">Outerwears</option>
          <option value="dresses/sets">Dresses/Sets</option>
          <option value="bags/shoes">Bags/Shoes</option>
          <option value="acc">Accessories</option>
        </select>
      </td>
      <!-- 單品子類別 -->
      <td>
        <select
          name="look_item_${singleitemLength}_subcat"
          id="look_item_${singleitemLength}_subcat"
        ></select>
      </td>
      <!-- 單品 -->
      <td>
        <select name="look_item_${singleitemLength}" id="look_item_${singleitemLength}"></select>
      </td>
      <td>
        <span class="add_btn">
          <i class="bx bx-plus"></i>
        </span>
      </td>
    </tr>`;
    $(".t1 tbody").append(msg);
    set_singleItem(singleitemLength);

    $(".add_btn").click(function () {
      add_btn_click();
    });
  }
}
// 傳送設定子選單參數
function set_singleItem(i) {
  set_look_sub_category(i, $(`#look_item_${i}_cat`).val());
  $(`#look_item_${i}_cat`).change(function () {
    set_look_sub_category(i, $(`#look_item_${i}_cat`).val());
  });
}
// 設定子選單的內容
function set_look_sub_category(index, value) {
  switch (value) {
    case "tops":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "T-shirt",
        "Blouse",
        "Polo shirt",
        "Sweater",
        "Hoodie",
        "Crop top",
        "Knit top",
        "Cardigan",
        "Tank top",
        "others",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="t${i}">${val}</option>`
        );
      });
      break;
    case "bottoms":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "trousers",
        "pants",
        "jeans",
        "leggings",
        "shorts",
        "maxi skirt",
        "mini skirt",
        "knit skirt",
        "leather skirt",
        "denim skirt",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="b${i}">${val}</option>`
        );
      });
      break;
    case "outerwears":
      $(`#look_item_${index}_subcat option`).remove();
      var array = ["coat", "jacket", "blazer", "vest"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="o${i}">${val}</option>`
        );
      });
      break;
    case "dresses/sets":
      $(`#look_item_${index}_subcat option`).remove();
      var array = ["mini dress", "midi dress", "maxi dress", "sets"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="ds${i}">${val}</option>`
        );
      });
      break;
    case "bags/shoes":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "tote bag",
        "hand bag",
        "shoulder bag",
        "crossbody bag",
        "backpack",
        "wallet",
        "athletic shoes",
        "casual shoes",
        "boots",
        "high heels",
        "sandals",
        "slippers",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="bs${i}">${val}</option>`
        );
      });
      break;
    case "acc":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "necklace",
        "bracelet",
        "ring",
        "earrings",
        "anklet",
        "hat",
        "scarf",
        "gloves",
        "belts",
        "eyewear",
        "watch",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="acc${i}">${val}</option>`
        );
      });
      break;
  }
}
// -------------------------------look edit------------------------------------- //
// 建立選單列
function show_look_item(amount) {
  let msg;
  for (i = 1; i <= amount; i++) {
    msg = `<!-- 單品1 -->
  <tr id="singleitem${i}">
    <!-- 單品類別選擇 -->
    <td>ITEM:</td>
    <td>
      <select name="look_item_${i}_cat" id="look_item_${i}_cat">
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="outerwears">Outerwears</option>
        <option value="dresses/sets">Dresses/Sets</option>
        <option value="bags/shoes">Bags/Shoes</option>
        <option value="acc">Accessories</option>
      </select>
    </td>
    <!-- 單品子類別 -->
    <td>
      <select
        name="look_item_${i}_subcat"
        id="look_item_${i}_subcat"
      ></select>
    </td>
    <!-- 單品 -->
    <td>
      <select name="look_item_${i}" id="look_item_${i}"></select>
    </td>
    
  </tr>`;
    $(`.look_edit.t1`).append(msg);
    set_edit_singleItem(i);
  }
}
// 傳送設定子選單參數
function set_edit_singleItem(i) {
  set_look_edit_sub_category(i, $(`#look_item_${i}_cat`).val());
  $(`#look_item_${i}_cat`).change(function () {
    set_look_edit_sub_category(i, $(`#look_item_${i}_cat`).val());
  });
}
// 設定子選單的內容
function set_look_edit_sub_category(index, value) {
  switch (value) {
    case "tops":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "T-shirt",
        "Blouse",
        "Polo shirt",
        "Sweater",
        "Hoodie",
        "Crop top",
        "Knit top",
        "Cardigan",
        "Tank top",
        "others",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="t${i}">${val}</option>`
        );
      });
      break;
    case "bottoms":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "trousers",
        "pants",
        "jeans",
        "leggings",
        "shorts",
        "maxi skirt",
        "mini skirt",
        "knit skirt",
        "leather skirt",
        "denim skirt",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="b${i}">${val}</option>`
        );
      });
      break;
    case "outerwears":
      $(`#look_item_${index}_subcat option`).remove();
      var array = ["coat", "jacket", "blazer", "vest"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="o${i}">${val}</option>`
        );
      });
      break;
    case "dresses/sets":
      $(`#look_item_${index}_subcat option`).remove();
      var array = ["mini dress", "midi dress", "maxi dress", "sets"];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="ds${i}">${val}</option>`
        );
      });
      break;
    case "bags/shoes":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "tote bag",
        "hand bag",
        "shoulder bag",
        "crossbody bag",
        "backpack",
        "wallet",
        "athletic shoes",
        "casual shoes",
        "boots",
        "high heels",
        "sandals",
        "slippers",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="bs${i}">${val}</option>`
        );
      });
      break;
    case "acc":
      $(`#look_item_${index}_subcat option`).remove();
      var array = [
        "necklace",
        "bracelet",
        "ring",
        "earrings",
        "anklet",
        "hat",
        "scarf",
        "gloves",
        "belts",
        "eyewear",
        "watch",
      ];
      //利用each遍歷array中的值並將每個值新增到li中
      $.each(array, function (i, val) {
        $(`#look_item_${index}_subcat`).append(
          `<option value="acc${i}">${val}</option>`
        );
      });
      break;
  }
}
