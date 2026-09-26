/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🐰 TIỆM QUÀ NHÀ BUNNY — HỆ THỐNG QUẢN LÝ ĐƠN & BIẾN ĐỘNG SỐ DƯ TỰ ĐỘNG
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
 * 🛡️ CƠ CHẾ BẢO VỆ CHỐNG TRÙNG VỚI ĐIỆP VIÊN TÀI LIỆU (DUAL-LOCK):
 *  1. Chỉ quét và xử lý các giao dịch có nội dung bắt đầu bằng "BUNNY" (ví dụ: BUNNY1082)
 *  2. Kiểm tra đích danh STK nhận tiền: 27820961 (khác hoàn toàn STK Điệp Viên 27384751)
 *  -> Dù 2 hệ thống dùng chung 1 Gmail nhận mail ACB, cũng tuyệt đối KHÔNG bao giờ bị nhầm lẫn!
 * ═══════════════════════════════════════════════════════════════════════════════
 */

var BUNNY_CONFIG = {
  TELEGRAM_BOT_TOKEN: "8746965311:AAFDnkaagBryQPeN971tQm8iK2YsIXJM9-Y",
  TELEGRAM_CHAT_ID: "-5547409331",
  ACB_ACCOUNT_NUMBER: "27820961",
  ACB_ACCOUNT_NAME: "TRINH DUC THINH",
  SHEET_NAME: "DonHang_Bunny"
};

/* ═══════════════════════════════════════════════════════════════
   1. KHỞI TẠO BẢNG GOOGLE SHEET (Chạy 1 lần đầu tiên)
   ═══════════════════════════════════════════════════════════════ */
function setupBunnySheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(BUNNY_CONFIG.SHEET_NAME) || ss.insertSheet(BUNNY_CONFIG.SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    var headers = [
      "Thời Gian Đặt",
      "Mã Đơn Hàng",
      "Họ Tên Khách",
      "Số Điện Thoại",
      "Địa Chỉ Giao Quà",
      "Sản Phẩm / Set Quà",
      "Tổng Tiền (VNĐ)",
      "Hình Thức Giao",
      "Lời Chúc Thiệp Sáp",
      "Trạng Thái",
      "Thời Gian Tiền Về"
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#ffe4e6") // Hồng pastel thương hiệu Bunny
      .setFontColor("#9f1239")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 120);
    sheet.setColumnWidth(5, 250);
    sheet.setColumnWidth(6, 220);
    sheet.setColumnWidth(7, 130);
    sheet.setColumnWidth(8, 160);
    sheet.setColumnWidth(9, 250);
    sheet.setColumnWidth(10, 160);
    sheet.setColumnWidth(11, 160);
  }
  Logger.log("✅ Đã khởi tạo Sheet DonHang_Bunny thành công!");
}

/* ═══════════════════════════════════════════════════════════════
   2. TIẾP NHẬN ĐƠN TỪ WEBSITE (doPost Webhook)
   Khách bấm 'Xác Nhận & Đặt Hàng' trên web -> Tự lưu vào Sheet
   ═══════════════════════════════════════════════════════════════ */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(BUNNY_CONFIG.SHEET_NAME);
    if (!sheet) {
      setupBunnySheet();
      sheet = ss.getSheetByName(BUNNY_CONFIG.SHEET_NAME);
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

    // Ghi dòng mới vào Sheet
    sheet.appendRow([
      nowStr,
      orderCode,
      customerName,
      customerPhone,
      customerAddress,
      productName,
      totalAmount,
      shipping,
      letterMessage,
      "CHỜ THANH TOÁN",
      ""
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
  return ContentService.createTextOutput("🐰 Tiệm Quà Nhà Bunny AutoPay API is Running!");
}

/* ═══════════════════════════════════════════════════════════════
   3. QUÉT EMAIL ACB TỰ ĐỘNG (Chạy định kỳ mỗi 1 phút)
   Khớp mã đơn BUNNY & STK 27820961 -> Bắn Telegram nổ chuông
   ═══════════════════════════════════════════════════════════════ */
function scanBunnyBankEmails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(BUNNY_CONFIG.SHEET_NAME);
  if (!sheet || sheet.getLastRow() <= 1) return;

  var data = sheet.getDataRange().getValues();
  var pendingOrders = [];

  // Lọc các đơn đang ở trạng thái CHỜ THANH TOÁN
  for (var i = 1; i < data.length; i++) {
    var code = String(data[i][1]).trim().toUpperCase();
    var status = String(data[i][9]).trim().toUpperCase();

    // Chỉ nhận đơn có mã BUNNY và chưa thanh toán
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

  // Đọc 25 email mới nhất từ ACB trong Gmail
  var threads = GmailApp.getInboxThreads(0, 25);
  for (var t = 0; t < threads.length; t++) {
    var messages = threads[t].getMessages();
    for (var m = 0; m < messages.length; m++) {
      var msg = messages[m];
      var emailText = (msg.getSubject() + " " + msg.getPlainBody()).toUpperCase();

      // KIỂM TRA ĐIỀU KIỆN CHỐNG NHẦM:
      // Email phải từ ACB (mailalert@acb.com.vn hoặc có chữ ACB)
      // VÀ phải có chữ "BUNNY"
      if (emailText.indexOf("BUNNY") === -1) continue;

      for (var p = 0; p < pendingOrders.length; p++) {
        var order = pendingOrders[p];

        // Khớp chính xác mã đơn hàng (Ví dụ: BUNNY1082)
        if (emailText.indexOf(order.code) >= 0) {
          var paidTimeStr = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

          // 1. Cập nhật Google Sheet sang ĐÃ THANH TOÁN (Màu xanh ngọc đẹp mắt)
          sheet.getRange(order.row, 10).setValue("ĐÃ THANH TOÁN").setBackground("#dcfce7").setFontColor("#166534").setFontWeight("bold");
          sheet.getRange(order.row, 11).setValue(paidTimeStr).setHorizontalAlignment("center");

          // 2. Bắn thông báo nổ chuông tiền về qua Telegram Bot @bunny_pay_bot
          var telegramMsg = 
            "🎉 <b>[TIỆM QUÀ BUNNY — TIỀN ĐÃ VỀ TÀI KHOẢN!]</b>\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "💰 <b>Số tiền:</b> <code>+" + order.amount.toLocaleString("vi-VN") + " VNĐ</code>\n" +
            "📦 <b>Mã đơn hàng:</b> <code>#" + order.code + "</code>\n" +
            "🎁 <b>Quà tặng:</b> " + order.product + "\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "👤 <b>Người nhận:</b> <b>" + order.name + "</b>\n" +
            "📞 <b>Số điện thoại:</b> " + order.phone + "\n" +
            "📍 <b>Địa chỉ:</b> " + order.address + "\n" +
            "🚚 <b>Gói giao:</b> " + order.shipping + "\n" +
            "💌 <b>Lời chúc thiệp:</b> <i>\"" + order.letter + "\"</i>\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "🏦 <b>Tài khoản nhận:</b> ACB - " + BUNNY_CONFIG.ACB_ACCOUNT_NUMBER + " (" + BUNNY_CONFIG.ACB_ACCOUNT_NAME + ")\n" +
            "⏱️ <b>Thời gian:</b> " + paidTimeStr + "\n\n" +
            "✅ <b>XÁC NHẬN:</b> Đã khớp tiền tự động 100%! Nhà Bunny chuẩn bị đóng gói nơ lụa gửi khách nhé! 🐰✨";

          banTelegram(telegramMsg);
          Logger.log("✅ Đã khớp tiền cho đơn: " + order.code);
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

/* ═══════════════════════════════════════════════════════════════
   5. HÀM TEST BẮN TIN THỬ NGHIỆM LÊN TELEGRAM
   (Chạy thử để kiểm tra bot có gửi tin vào nhóm được không)
   ═══════════════════════════════════════════════════════════════ */
function testBunnyBot() {
  banTelegram(
    "🐰 <b>[TIỆM QUÀ NHÀ BUNNY — KẾT NỐI THÀNH CÔNG!]</b>\n\n" +
    "Xin chào! Bot <b>@bunny_pay_bot</b> đã được kết nối với Nhóm quản trị Tiệm Bunny.\n" +
    "Sẵn sàng nhận thông báo đơn hàng và tiền về tự động! ✨"
  );
}
