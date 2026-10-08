/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🐰 TIỆM QUÀ NHÀ BUNNY — HỆ THỐNG QUẢN LÝ ĐƠN, BIẾN ĐỘNG SỐ DƯ TỰ ĐỘNG,
 *    TIẾN ĐỘ CTV LÀM HÀNG & SỔ QUỸ SAO KÊ NGUYÊN VẬT LIỆU (NVL)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Bot: Tiệm Bunny Auto Pay (@bunny_pay_bot)
 * Token: 8746965311:AAFDnkaagBryQPeN971tQm8iK2YsIXJM9-Y
 * Nhóm Telegram nhận tin (Chat ID): -5547409331
 * 
 * Tài khoản nhận tiền:
 *  - Ngân hàng: ACB (Ngân hàng Á Châu)
 *  - Số tài khoản: 27820961
 *  - Chủ tài khoản: TRINH DUC THINH
 * 
 * 🛡️ HỆ THỐNG 3 BẢNG GOOGLE SHEET LIÊN KẾT TỰ ĐỘNG:
 *  1. Sheet "DonHang_Bunny": Nhận đơn trực tiếp từ Web khi khách đặt hàng.
 *  2. Sheet "TienDo_Tho_LamHang": Tự động đẩy việc cho CTV Làm Hàng khi tiền về ACB,
 *     tự động áp dụng công thức chia hoa hồng 3 bên (Thợ, Sale, Chủ Shop).
 *  3. Sheet "SaoKe_NguyenVatLieu": Quản lý dòng tiền mua NVL, đối soát ảnh bill / sao kê ngân hàng.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

var BUNNY_CONFIG = {
  TELEGRAM_BOT_TOKEN: "8746965311:AAFDnkaagBryQPeN971tQm8iK2YsIXJM9-Y",
  TELEGRAM_CHAT_ID: "-5547409331",
  ACB_ACCOUNT_NUMBER: "27820961",
  ACB_ACCOUNT_NAME: "TRINH DUC THINH",
  SHEET_ORDERS: "DonHang_Bunny",
  SHEET_PRODUCTION: "TienDo_Tho_LamHang",
  SHEET_EXPENSES: "SaoKe_NguyenVatLieu"
};

/* ═══════════════════════════════════════════════════════════════
   1. KHỞI TẠO TẤT CẢ 3 BẢNG GOOGLE SHEET (Chạy 1 lần duy nhất)
   ═══════════════════════════════════════════════════════════════ */
function setupAllBunnySheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1.1. Sheet Đơn Hàng Từ Web
  var sOrders = ss.getSheetByName(BUNNY_CONFIG.SHEET_ORDERS) || ss.insertSheet(BUNNY_CONFIG.SHEET_ORDERS);
  if (sOrders.getLastRow() === 0) {
    var headers1 = [
      "Thời Gian Đặt", "Mã Đơn Hàng", "Họ Tên Khách", "Số Điện Thoại",
      "Địa Chỉ Giao Quà", "Sản Phẩm / Set Quà", "Tổng Tiền (VNĐ)",
      "Hình Thức Giao", "Lời Chúc Thiệp Sáp", "Trạng Thái", "Thời Gian Tiền Về"
    ];
    sOrders.getRange(1, 1, 1, headers1.length).setValues([headers1])
      .setFontWeight("bold").setBackground("#ffe4e6").setFontColor("#9f1239").setHorizontalAlignment("center");
    sOrders.setFrozenRows(1);
  }

  // 1.2. Sheet Tiến Độ Làm Hàng & Hoa Hồng CTV
  var sProd = ss.getSheetByName(BUNNY_CONFIG.SHEET_PRODUCTION) || ss.insertSheet(BUNNY_CONFIG.SHEET_PRODUCTION);
  if (sProd.getLastRow() === 0) {
    var headers2 = [
      "Mã Đơn Hàng", "Ngày Giao Việc", "Sản Phẩm", "CTV Làm Hàng (Thợ)",
      "CTV Bán Hàng (Sale)", "Giá Bán Khách (VNĐ)", "Gốc NVL (VNĐ)",
      "Công Thợ (VNĐ)", "Lãi Thợ (30%)", "Tổng Trả Thợ", "Thợ Đút Túi",
      "Hoa Hồng Sale", "Lãi Ròng Chủ Shop", "Tiến Độ Làm", "Ghi Chú / Hạn Giao"
    ];
    sProd.getRange(1, 1, 1, headers2.length).setValues([headers2])
      .setFontWeight("bold").setBackground("#fecdd3").setFontColor("#881337").setHorizontalAlignment("center");
    sProd.setFrozenRows(1);
  }

  // 1.3. Sheet Sổ Quỹ & Sao Kê Nguyên Vật Liệu (NVL)
  var sExp = ss.getSheetByName(BUNNY_CONFIG.SHEET_EXPENSES) || ss.insertSheet(BUNNY_CONFIG.SHEET_EXPENSES);
  if (sExp.getLastRow() === 0) {
    var headers3 = [
      "Mã Khoản Chi", "Ngày Chi", "Mã Đơn Liên Quan", "Thợ Chi Tiền",
      "Chi Tiết Vật Tư / NVL", "Số Tiền Thực Tế", "Hình Thức Chi",
      "Mã GD / Số Tham Chiếu", "Link Ảnh Bill / Sao Kê", "Trạng Thái Đối Soát", "Ghi Chú Kiểm Duyệt"
    ];
    sExp.getRange(1, 1, 1, headers3.length).setValues([headers3])
      .setFontWeight("bold").setBackground("#fef3c7").setFontColor("#92400e").setHorizontalAlignment("center");
    sExp.setFrozenRows(1);
  }

  Logger.log("✅ Đã khởi tạo trọn bộ 3 Sheet quản lý Nhà Bunny thành công!");
}

/* ═══════════════════════════════════════════════════════════════
   2. TIẾP NHẬN ĐƠN TỪ WEB (doPost Webhook)
   ═══════════════════════════════════════════════════════════════ */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(BUNNY_CONFIG.SHEET_ORDERS);
    if (!sheet) {
      setupAllBunnySheets();
      sheet = ss.getSheetByName(BUNNY_CONFIG.SHEET_ORDERS);
    }

    var orderCode = String(data.orderCode || ("BUNNY" + Math.floor(1000 + Math.random() * 9000))).toUpperCase();
    var nowStr = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var customerName = (data.customer && data.customer.name) || "Khách yêu Bunny";
    var customerPhone = (data.customer && data.customer.phone) || "";
    var customerAddress = (data.customer && data.customer.address) || "";
    var productName = data.productName || "Set Quà Tặng";
    var totalAmount = Number(data.totalAmount) || 0;
    var shipping = data.shipping || "Giao tiêu chuẩn";
    var letterMessage = data.letterMessage || "Không có ghi chú thiệp";

    sheet.appendRow([
      nowStr, orderCode, customerName, customerPhone, customerAddress,
      productName, totalAmount, shipping, letterMessage, "CHỜ THANH TOÁN", ""
    ]);

    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 10).setBackground("#fef9c3").setFontColor("#854d0e").setFontWeight("bold");

    return ContentService.createTextOutput(JSON.stringify({ status: "success", orderCode: orderCode }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("🐰 Tiệm Quà Nhà Bunny AutoPay & CTV Master API is Running!");
}

/* ═══════════════════════════════════════════════════════════════
   3. QUÉT EMAIL ACB TỰ ĐỘNG & TỰ ĐỘNG HẠCH TOÁN HOA HỒNG CTV
   ═══════════════════════════════════════════════════════════════ */
function scanBunnyBankEmails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sOrders = ss.getSheetByName(BUNNY_CONFIG.SHEET_ORDERS);
  var sProd = ss.getSheetByName(BUNNY_CONFIG.SHEET_PRODUCTION);
  if (!sOrders || sOrders.getLastRow() <= 1) return;

  var data = sOrders.getDataRange().getValues();
  var pendingOrders = [];

  for (var i = 1; i < data.length; i++) {
    var code = String(data[i][1]).trim().toUpperCase();
    var status = String(data[i][9]).trim().toUpperCase();

    if (code.indexOf("BUNNY") >= 0 && status !== "ĐÃ THANH TOÁN" && status !== "PAID_SUCCESS") {
      pendingOrders.push({
        row: i + 1,
        time: String(data[i][0]),
        code: code,
        name: String(data[i][2]),
        phone: String(data[i][3]),
        address: String(data[i][4]),
        product: String(data[i][5]),
        amount: Number(data[i][6]) || 0,
        shipping: String(data[i][7]),
        letter: String(data[i][8])
      });
    }
  }

  if (pendingOrders.length === 0) return;

  var threads = GmailApp.getInboxThreads(0, 25);
  for (var t = 0; t < threads.length; t++) {
    var messages = threads[t].getMessages();
    for (var m = 0; m < messages.length; m++) {
      var msg = messages[m];
      var emailText = (msg.getSubject() + " " + msg.getPlainBody()).toUpperCase();

      if (emailText.indexOf("BUNNY") === -1) continue;

      for (var p = 0; p < pendingOrders.length; p++) {
        var order = pendingOrders[p];

        if (emailText.indexOf(order.code) >= 0) {
          var paidTimeStr = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

          // 1. Cập nhật Sheet DonHang_Bunny -> ĐÃ THANH TOÁN
          sOrders.getRange(order.row, 10).setValue("ĐÃ THANH TOÁN").setBackground("#dcfce7").setFontColor("#166534").setFontWeight("bold");
          sOrders.getRange(order.row, 11).setValue(paidTimeStr).setHorizontalAlignment("center");

          // 2. Tự động tính toán chi phí & hoa hồng theo định mức
          var price = order.amount;
          var nvl = 50000;
          var labor = 25000;
          var saleBonus = Math.round(price * 0.10);

          if (price < 100000) {
            // Đơn bé (Ví dụ: Bông hồng 40k)
            nvl = 10000;
            labor = 10000;
            saleBonus = 5000;
          } else if (price >= 200000) {
            // Đơn VIP (Ví dụ: Thỏ công chúa 250k)
            nvl = 80000;
            labor = 40000;
            saleBonus = Math.round(price * 0.15);
          }

          var costBase = nvl + labor;
          var bonusWorker = Math.round(costBase * 0.30); // Lãi sản xuất 30%
          var workerTotal = nvl + labor + bonusWorker;
          var workerPocket = labor + bonusWorker; // Thợ đút túi
          var shopProfit = price - workerTotal - saleBonus;

          // 3. Đẩy đơn tự động sang Sheet Tiến Độ Làm Hàng (TienDo_Tho_LamHang)
          if (sProd) {
            sProd.appendRow([
              order.code,
              paidTimeStr,
              order.product,
              "Chờ phân công thợ", // CTV làm hàng
              "CTV Sale Hệ Thống",  // CTV bán hàng
              price,
              nvl,
              labor,
              bonusWorker,
              workerTotal,
              workerPocket,
              saleBonus,
              shopProfit,
              "1. Chờ tiếp nhận",
              order.letter ? ("Thiệp: " + order.letter) : ""
            ]);
            var prodLastRow = sProd.getLastRow();
            sProd.getRange(prodLastRow, 14).setBackground("#fef9c3").setFontColor("#854d0e").setFontWeight("bold");
          }

          // 4. Bắn Telegram thông báo full chi tiết hoa hồng
          var telegramMsg = 
            "🎉 <b>[TIỆM QUÀ BUNNY — TIỀN VỀ & PHÂN BỔ HOA HỒNG!]</b>\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "💰 <b>Khách thanh toán:</b> <code>+" + price.toLocaleString("vi-VN") + " VNĐ</code>\n" +
            "📦 <b>Mã đơn hàng:</b> <code>#" + order.code + "</code>\n" +
            "🎁 <b>Quà tặng:</b> " + order.product + "\n" +
            "👤 <b>Khách nhận:</b> " + order.name + " (" + order.phone + ")\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "📐 <b>HẠCH TOÁN TỰ ĐỘNG 3 BÊN:</b>\n" +
            "✂️ <b>Trả Thợ (Tổng):</b> <code>" + workerTotal.toLocaleString("vi-VN") + "đ</code> (Thợ đút túi lãi: <b>" + workerPocket.toLocaleString("vi-VN") + "đ</b>)\n" +
            "   <i>• Gốc NVL: " + nvl.toLocaleString("vi-VN") + "đ | Công: " + labor.toLocaleString("vi-VN") + "đ | Lãi 30%: " + bonusWorker.toLocaleString("vi-VN") + "đ</i>\n" +
            "🎯 <b>Hoa hồng Sale:</b> <code>" + saleBonus.toLocaleString("vi-VN") + "đ</code>\n" +
            "🏆 <b>LÃI RÒNG CHỦ SHOP CẤT TÚI:</b> <code>+" + shopProfit.toLocaleString("vi-VN") + " VNĐ</code>\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "⏱️ <b>Thời gian:</b> " + paidTimeStr + "\n" +
            "✅ <i>Đã đẩy đơn sang Bảng Quản Lý CTV & Sổ Quỹ NVL!</i> 🐰✨";

          banTelegram(telegramMsg);
          Logger.log("✅ Đã xử lý & hạch toán xong cho đơn: " + order.code);
          return;
        }
      }
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   4. GỬI TIN NHẮN TELEGRAM QUA API
   ═══════════════════════════════════════════════════════════════ */
function banTelegram(htmlText) {
  try {
    var url = "https://api.telegram.org/bot" + BUNNY_CONFIG.TELEGRAM_BOT_TOKEN + "/sendMessage";
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: BUNNY_CONFIG.TELEGRAM_CHAT_ID,
        text: htmlText,
        parse_mode: "HTML"
      }),
      muteHttpExceptions: true
    });
  } catch (e) {
    Logger.log("Lỗi gửi Telegram: " + e.toString());
  }
}
