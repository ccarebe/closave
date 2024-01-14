$(document).ready(function () {
  // 05_03_shipping/payment
  $('input:radio[name="payment"]').click(function () {
    pay_method = $('input:radio[name="payment"]:checked').val();
    if (pay_method == "2") {
      console.log("radio checked:" + pay_method);
      $(".credit_box").addClass("d-none");
    } else {
      $(".credit_box").removeClass("d-none");
    }
  });
  $('input:radio[name="b_addr"]').click(function () {
    bill_add = $('input:radio[name="b_addr"]:checked').val();
    if (bill_add == "2") {
      console.log("radio checked:" + bill_add);
      $(".add_box").removeClass("d-none");
    } else {
      $(".add_box").addClass("d-none");
    }
  });
  //   select
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
    $(`#b_city`).append(`<option value="${i + 1}">${val}</option>`);
    $(`#m_city`).append(`<option value="${i + 1}">${val}</option>`);
  });
});
