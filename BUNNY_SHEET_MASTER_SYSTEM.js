/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🐰 TIỆM QUÀ NHÀ BUNNY — HỆ THỐNG QUẢN LÝ GOOGLE SHEET THUẦN VIỆT 100%
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Toàn bộ tên hàm, menu, bảng tính, biến cấu hình và thông báo đều được Việt hóa 100%
 * giúp bạn nhìn vào là hiểu ngay, bấm chạy lệnh nào biết lệnh đó!
 * 
 * DANH SÁCH LỆNH CHẠY TRỰC TIẾP (Trong mục 'Chọn hàm chạy' trên Apps Script):
 *  1. KhoiTaoHeThongSheet            -> Tạo mới và định dạng đẹp 4 bảng tính
 *  2. BatDauLamDon_CheckIn           -> Bấm giờ bắt đầu làm đơn hàng
 *  3. HoanThanhDon_TinhCongGio       -> Chốt giờ, tự tính tiền công theo giờ & hoa hồng
 *  4. TinhLaiCongVaHoaHongToanBo     -> Cập nhật lại toàn bộ bảng khi đổi % cấu hình
 *  5. DoiSoatSaoKeNguyenVatLieu      -> Kiểm tra hóa đơn, đối chiếu tiền thực tế vs định mức
 *  6. GuiBaoCaoQuyetToanSangTelegram -> Bắn báo cáo tiền lương thợ và sale sang Telegram
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// CẤU HÌNH THÔNG TIN CHUNG
var CAU_HINH_BUNNY = {
  TOKEN_BOT_TELEGRAM: "8746965311:AAFDnkaagBryQPeN971tQm8iK2YsIXJM9-Y",
  ID_NHOM_TELEGRAM: "-5547409331",
  TAI_KHOAN_ACB: "27820961 (TRINH DUC THINH)",
  
  // TÊN 4 BẢNG TÍNH THUẦN VIỆT ĐẸP MẮT
  TEN_SHEET_CAU_HINH: "⚙️ Cấu Hình Hoa Hồng & Công Giờ",
  TEN_SHEET_TIEN_DO: "✂️ Tiến Độ & Chấm Công Thợ",
  TEN_SHEET_SAO_KE: "🧾 Sổ Quỹ & Sao Kê NVL",
  TEN_SHEET_QUYET_TOAN: "📊 Báo Cáo Quyết Toán Lương"
};

/**
 * TẠO MENU TIẾNG VIỆT RIÊNG CHO SHOP TRÊN THANH CÔNG CỤ GOOGLE SHEET
 */
function onOpen() {
  var giaoDien = SpreadsheetApp.getUi();
  giaoDien.createMenu("🐰 TIỆM QUÀ NHÀ BUNNY")
    .addItem("1. 🚀 Khởi tạo toàn bộ Hệ Thống Bảng", "KhoiTaoHeThongSheet")
    .addItem("2. ⏱️ Bắt đầu làm đơn (Bấm giờ Check-in)", "BatDauLamDon_CheckIn")
    .addItem("3. ✅ Hoàn thành đơn (Tính công giờ & Check-out)", "HoanThanhDon_TinhCongGio")
    .addItem("4. 🔄 Tính lại toàn bộ Tiền Công & Hoa Hồng", "TinhLaiCongVaHoaHongToanBo")
    .addItem("5. 🧾 Đối soát Sao Kê Tiền Mua Nguyên Vật Liệu", "DoiSoatSaoKeNguyenVatLieu")
    .addItem("6. 💬 Gửi Bảng Quyết Toán Lương sang Telegram", "GuiBaoCaoQuyetToanSangTelegram")
    .addToUi();
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 1. LỆNH: KHỞI TẠO TOÀN BỘ HỆ THỐNG BẢNG (KhoiTaoHeThongSheet)
 * ═══════════════════════════════════════════════════════════════
 */
function KhoiTaoHeThongSheet() {
  var fileSheet = SpreadsheetApp.getActiveSpreadsheet();

  // 1.1. SHEET CẤU HÌNH % HOA HỒNG & ĐƠN GIÁ GIỜ
  var sheetCauHinh = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH) || fileSheet.insertSheet(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH);
  sheetCauHinh.clear();
  var duLieuCauHinh = [
    ["⚙️ TÊN THAM SỐ CẤU HÌNH", "GIÁ TRỊ HIỆN TẠI", "ĐƠN VỊ", "HƯỚNG DẪN / Ý NGHĨA"],
    ["Đơn giá công 1 giờ làm việc", 30000, "VNĐ/giờ", "Tiền công trả cho thợ mỗi 1 giờ làm (30k/h tương đương 500đ/phút)"],
    ["Tỷ lệ tiền lãi sản xuất cho thợ", 0.30, "%", "Thợ được thưởng thêm 30% tính trên tổng: Gốc NVL + Tiền Công Giờ"],
    ["Tiền thưởng Sale cho đơn nhỏ (< 100k)", 5000, "VNĐ", "Tiền thưởng cứng cho CTV Sale chốt đơn nhỏ (ví dụ bông hồng 40k)"],
    ["Tỷ lệ hoa hồng Sale đơn vừa (100k - 200k)", 0.10, "%", "Hoa hồng 10% tính trên giá bán lẻ (ví dụ bó hoa 150k được 15k)"],
    ["Tỷ lệ hoa hồng Sale đơn VIP (> 200k)", 0.15, "%", "Hoa hồng 15% tính trên giá bán lẻ (ví dụ set thỏ 250k được 37.5k)"],
    ["Tiền gốc NVL định mức - Đơn nhỏ", 10000, "VNĐ", "Tiền vật tư mua bông hồng len lẻ"],
    ["Tiền gốc NVL định mức - Đơn vừa", 50000, "VNĐ", "Tiền bánh kẹo, que cắm, giấy gói bó hoa bánh kẹo"],
    ["Tiền gốc NVL định mức - Đơn VIP", 80000, "VNĐ", "Tiền len, hộp mica quai da, đèn led set thỏ công chúa"]
  ];
  sheetCauHinh.getRange(1, 1, duLieuCauHinh.length, 4).setValues(duLieuCauHinh);
  sheetCauHinh.getRange("A1:D1").setFontWeight("bold").setBackground("#ffe4e6").setFontColor("#9f1239").setHorizontalAlignment("center");
  sheetCauHinh.getRange("B2").setNumberFormat("#,##0");
  sheetCauHinh.getRange("B3").setNumberFormat("0%");
  sheetCauHinh.getRange("B4").setNumberFormat("#,##0");
  sheetCauHinh.getRange("B5:B6").setNumberFormat("0%");
  sheetCauHinh.getRange("B7:B9").setNumberFormat("#,##0");
  sheetCauHinh.setColumnWidth(1, 320);
  sheetCauHinh.setColumnWidth(2, 140);
  sheetCauHinh.setColumnWidth(3, 90);
  sheetCauHinh.setColumnWidth(4, 450);

  // 1.2. SHEET TIẾN ĐỘ & CHẤM CÔNG THỢ
  var sheetTienDo = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO) || fileSheet.insertSheet(CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO);
  sheetTienDo.clear();
  var tieuDeTienDo = [
    "Mã Đơn", "Ngày Nhận Đơn", "Tên Sản Phẩm", "Thợ Làm Hàng", "CTV Bán Hàng",
    "Hạn Giao Khách (Deadline)", "Bắt Đầu Làm ⏱️", "Hoàn Thành ✅", "Thời Gian Làm", "Số Giờ Làm",
    "Đơn Giá Giờ (VNĐ)", "Tiền Công Theo Giờ", "Đánh Giá Đúng Hạn", "Trạng Thái Tiến Độ",
    "Giá Bán Cho Khách", "Gốc NVL (VNĐ)", "Tiền Lãi Thợ (30%)", "TỔNG TRẢ THỢ", "THỢ ĐÚT TÚI LÃI",
    "Hoa Hồng Sale", "LÃI RÒNG CHỦ SHOP", "Ghi Chú Đơn Hàng"
  ];
  sheetTienDo.getRange(1, 1, 1, tieuDeTienDo.length).setValues([tieuDeTienDo])
    .setFontWeight("bold").setBackground("#fecdd3").setFontColor("#881337").setHorizontalAlignment("center");
  sheetTienDo.setFrozenRows(1);
  sheetTienDo.setFrozenColumns(4);

  // 3 Dòng mẫu đúng chuẩn 3 ví dụ thực tế của bạn
  var donMau = [
    [
      "BUNNY1082", "02/10/2026", "Bó hoa bánh kẹo Ocean Sweet", "Thợ Linh Len", "Sale Hương Mai",
      "02/10/2026 17:00", "02/10/2026 14:00", "02/10/2026 14:50", "50 phút", 0.83,
      30000, 25000, "Đúng hẹn ✅", "4. Hoàn thiện & QC",
      150000, 50000, 22500, 97500, 47500, 15000, 37500, "Giao trước cổng trường THPT Cao Bá Quát"
    ],
    [
      "BUNNY1085", "02/10/2026", "Set Quà Thỏ Công Chúa Len Hồng", "Thợ Mai Hoa", "Sale Phương Thảo",
      "02/10/2026 18:30", "02/10/2026 14:30", "02/10/2026 15:50", "1 giờ 20 phút", 1.33,
      30000, 40000, "Đúng hẹn ✅", "3. Đang gia công",
      250000, 80000, 36000, 156000, 76000, 37500, 56500, "Kèm thiệp sáp đỏ chúc mừng sinh nhật"
    ],
    [
      "BUNNY1087", "02/10/2026", "Bông hồng len lẻ Pastel kèm túi mica", "Thợ Linh Len", "Sale Tùng Dương",
      "02/10/2026 16:00", "02/10/2026 15:00", "02/10/2026 15:20", "20 phút", 0.33,
      30000, 10000, "Đúng hẹn ✅", "5. Đã giao Ship",
      40000, 10000, 6000, 26000, 16000, 5000, 9000, "Giao cho bạn nữ lớp 11A3"
    ]
  ];
  sheetTienDo.getRange(2, 1, donMau.length, tieuDeTienDo.length).setValues(donMau);
  dinhDangTienTe(sheetTienDo, "K2:L100");
  dinhDangTienTe(sheetTienDo, "O2:U100");
  sheetTienDo.getRange("J2:J100").setNumberFormat("0.00");

  var quyTacTrangThai = SpreadsheetApp.newDataValidation().requireValueInList([
    "1. Chờ tiếp nhận", "2. Chuẩn bị NVL", "3. Đang gia công",
    "4. Hoàn thiện & QC", "5. Đã giao Ship", "6. Đã quyết toán"
  ]).build();
  sheetTienDo.getRange("N2:N200").setDataValidation(quyTacTrangThai);

  // 1.3. SHEET SỔ QUỸ & SAO KÊ NVL
  var sheetSaoKe = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_SAO_KE) || fileSheet.insertSheet(CAU_HINH_BUNNY.TEN_SHEET_SAO_KE);
  sheetSaoKe.clear();
  var tieuDeSaoKe = [
    "Mã Khoản Chi", "Ngày Chi Tiền", "Mã Đơn Liên Quan", "Thợ Đi Mua",
    "Chi Tiết Vật Tư / NVL Mua", "Tiền Thực Tế Trên Bill (VNĐ)", "Hình Thức Thanh Toán",
    "Mã Giao Dịch / Số Sao Kê", "Link Ảnh Bill / Chứng Từ", "Định Mức Của Đơn", "Chênh Lệch (+/-)",
    "Trạng Thái Đối Soát", "Ghi Chú Kiểm Duyệt"
  ];
  sheetSaoKe.getRange(1, 1, 1, tieuDeSaoKe.length).setValues([tieuDeSaoKe])
    .setFontWeight("bold").setBackground("#fef3c7").setFontColor("#92400e").setHorizontalAlignment("center");
  sheetSaoKe.setFrozenRows(1);

  var mauSaoKe = [
    [
      "EXP-101", "02/10/2026", "BUNNY1082", "Thợ Linh Len",
      "Bánh kẹo Pocky + que cắm + ruy băng voan", 50000, "Chuyển khoản ACB (Có sao kê)",
      "FT2427820961-01", "https://drive.google.com/drive/folders/bunny_bill_1", 50000, 0,
      "✅ Đã khớp 100%", "Đã kiểm tra biến động số dư ACB"
    ],
    [
      "EXP-102", "02/10/2026", "BUNNY1085", "Thợ Mai Hoa",
      "Len cotton milk hồng phấn + hộp mica quai da + đèn led", 82000, "Chuyển khoản ACB (Có sao kê)",
      "FT2427820961-02", "https://drive.google.com/drive/folders/bunny_bill_2", 80000, 2000,
      "⚠️ Vượt định mức (+2k)", "Thợ mua thêm đèn led nhấp nháy, shop duyệt"
    ],
    [
      "EXP-103", "02/10/2026", "KHO-DỰ-TRỮ", "Thợ Linh Len",
      "10 cuộn len milk bò nhiều màu dự trữ tuần", 120000, "Chuyển khoản ACB (Có sao kê)",
      "FT2427820961-03", "", 0, 120000,
      "⏳ Chờ duyệt bill", "Cần thợ gửi ảnh chụp hóa đơn cửa hàng"
    ]
  ];
  sheetSaoKe.getRange(2, 1, mauSaoKe.length, tieuDeSaoKe.length).setValues(mauSaoKe);
  dinhDangTienTe(sheetSaoKe, "F2:F100");
  dinhDangTienTe(sheetSaoKe, "J2:K100");

  var quyTacSaoKe = SpreadsheetApp.newDataValidation().requireValueInList([
    "✅ Đã khớp 100%", "⏳ Chờ duyệt bill", "⚠️ Vượt định mức (+/-)"
  ]).build();
  sheetSaoKe.getRange("L2:L200").setDataValidation(quyTacSaoKe);

  // 1.4. SHEET BÁO CÁO QUYẾT TOÁN LƯƠNG
  var sheetQuyetToan = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_QUYET_TOAN) || fileSheet.insertSheet(CAU_HINH_BUNNY.TEN_SHEET_QUYET_TOAN);
  sheetQuyetToan.clear();
  var tieuDeQuyetToan = [
    "Họ Tên CTV", "Vai Trò", "Số Đơn Làm", "Tổng Giờ Làm (H)", "Hoàn Tiền Gốc NVL",
    "Tiền Công Theo Giờ", "Tiền Lãi Thợ (30%)", "TỔNG TIỀN THỰC NHẬN", "Trạng Thái Thanh Toán"
  ];
  sheetQuyetToan.getRange(1, 1, 1, tieuDeQuyetToan.length).setValues([tieuDeQuyetToan])
    .setFontWeight("bold").setBackground("#dcfce7").setFontColor("#166534").setHorizontalAlignment("center");
  sheetQuyetToan.setFrozenRows(1);

  TinhLaiCongVaHoaHongToanBo();
  DoiSoatSaoKeNguyenVatLieu();

  SpreadsheetApp.getActiveSpreadsheet().toast("Đã khởi tạo xong toàn bộ 4 bảng tính tiếng Việt cho Nhà Bunny!", "🐰 Thành Công", 5);
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 2. TỰ ĐỘNG BẤM GIỜ KHI ĐỔI TRẠNG THÁI (Trigger onEdit)
 * ═══════════════════════════════════════════════════════════════
 */
function onEdit(e) {
  if (!e) return;
  var sheetHienTai = e.range.getSheet();
  var tenSheet = sheetHienTai.getName();
  var dong = e.range.getRow();
  var cot = e.range.getColumn();

  // Nếu sửa số trong Sheet Cấu Hình -> Tính lại toàn bộ
  if (tenSheet === CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH) {
    TinhLaiCongVaHoaHongToanBo();
    return;
  }

  // Nếu sửa Trạng Thái ở Cột 14 (N) trong Sheet Tiến Độ Thợ
  if (tenSheet === CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO && dong > 1 && cot === 14) {
    var giaTriMoi = String(e.value).trim();
    var gioHienTai = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm");

    // Khi chuyển sang ĐANG GIA CÔNG -> Điền giờ Bắt đầu làm (Cột 7)
    if (giaTriMoi.indexOf("3. Đang gia công") >= 0) {
      var oBatDau = sheetHienTai.getRange(dong, 7);
      if (!oBatDau.getValue()) {
        oBatDau.setValue(gioHienTai);
        sheetHienTai.getRange(dong, 13).setValue("Đang làm ⏳");
      }
    }

    // Khi chuyển sang HOÀN THIỆN hoặc ĐÃ GIAO SHIP -> Điền giờ Hoàn thành (Cột 8) & Tính công
    if (giaTriMoi.indexOf("4. Hoàn thiện") >= 0 || giaTriMoi.indexOf("5. Đã giao Ship") >= 0) {
      var oHoanThanh = sheetHienTai.getRange(dong, 8);
      if (!oHoanThanh.getValue()) {
        oHoanThanh.setValue(gioHienTai);
      }
      TinhGioVaTienCongChoDong(sheetHienTai, dong);
    }
  }

  // Nếu sửa Đơn giá giờ (Cột 11) hoặc Gốc NVL (Cột 16) -> Tính lại dòng đó
  if (tenSheet === CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO && dong > 1 && (cot === 11 || cot === 16)) {
    TinhGioVaTienCongChoDong(sheetHienTai, dong);
  }
}

/**
 * TÍNH SỐ PHÚT/GIỜ LÀM VIỆC & TÍNH TIỀN CÔNG THỰC TẾ CHO 1 ĐƠN HÀNG
 */
function TinhGioVaTienCongChoDong(sheet, dong) {
  var hanGiao = sheet.getRange(dong, 6).getValue();   // Cột 6: Deadline
  var gioBatDau = sheet.getRange(dong, 7).getValue();  // Cột 7: Bắt đầu
  var gioKetThuc = sheet.getRange(dong, 8).getValue(); // Cột 8: Hoàn thành

  if (gioBatDau && gioKetThuc) {
    var dateBatDau = chuyenDoiNgayThang(gioBatDau);
    var dateKetThuc = chuyenDoiNgayThang(gioKetThuc);

    if (dateBatDau && dateKetThuc) {
      var soMiliGiay = dateKetThuc.getTime() - dateBatDau.getTime();
      var soPhut = Math.max(1, Math.round(soMiliGiay / (1000 * 60))); // Số phút làm việc thực tế
      var soGioQuyDoi = parseFloat((soPhut / 60).toFixed(2));        // Số giờ làm (dạng thập phân, ví dụ 1.5 giờ)

      var chuoiHienThi = "";
      if (soPhut < 60) {
        chuoiHienThi = soPhut + " phút";
      } else {
        var h = Math.floor(soPhut / 60);
        var m = soPhut % 60;
        chuoiHienThi = h + " giờ " + (m > 0 ? (m + " phút") : "");
      }
      sheet.getRange(dong, 9).setValue(chuoiHienThi); // Cột 9: Thời gian hiển thị
      sheet.getRange(dong, 10).setValue(soGioQuyDoi); // Cột 10: Số giờ quy đổi

      // Đơn giá giờ (Cột 11)
      var donGiaGio = Number(sheet.getRange(dong, 11).getValue());
      if (donGiaGio <= 0) {
        donGiaGio = layDonGiaGioMacDinh();
        sheet.getRange(dong, 11).setValue(donGiaGio);
      }

      // TÍNH TIỀN CÔNG THEO GIỜ THỰC TẾ (Cột 12)
      // Công = Số phút x (Đơn giá giờ / 60), làm tròn hàng nghìn
      var tienCong = Math.round((soPhut * (donGiaGio / 60)) / 1000) * 1000;
      sheet.getRange(dong, 12).setValue(tienCong);

      // Đánh giá hạn giao so với Deadline (Cột 13)
      if (hanGiao) {
        var dateHanGiao = chuyenDoiNgayThang(hanGiao);
        if (dateHanGiao) {
          if (dateKetThuc.getTime() <= dateHanGiao.getTime()) {
            sheet.getRange(dong, 13).setValue("Đúng hẹn ✅").setBackground("#dcfce7").setFontColor("#166534").setFontWeight("bold");
          } else {
            var trePhut = Math.round((dateKetThuc.getTime() - dateHanGiao.getTime()) / (1000 * 60));
            sheet.getRange(dong, 13).setValue("Trễ " + trePhut + "p ⚠️").setBackground("#fee2e2").setFontColor("#991b1b").setFontWeight("bold");
          }
        }
      }

      // Cập nhật các cột tiền còn lại
      TinhTienChiTietChoDong(sheet, dong);
    }
  }
}

/**
 * TÍNH TIỀN LÃI THỢ, TỔNG TRẢ THỢ, HOA HỒNG SALE VÀ LÃI CHỦ SHOP
 */
function TinhTienChiTietChoDong(sheet, dong) {
  var giaKhachMua = Number(sheet.getRange(dong, 15).getValue()) || 0; // Cột 15: Giá khách mua
  var gocNVL = Number(sheet.getRange(dong, 16).getValue()) || 0;       // Cột 16: Gốc NVL
  var tienCongGio = Number(sheet.getRange(dong, 12).getValue()) || 0;  // Cột 12: Tiền công giờ

  var tyLeLaiTho = layTyLeLaiTho(); // 30%

  var vonSanXuat = gocNVL + tienCongGio;
  var tienLaiTho = Math.round(vonSanXuat * tyLeLaiTho); // 30% x (NVL + Công theo giờ)
  var tongTraTho = gocNVL + tienCongGio + tienLaiTho;   // Tổng trả thợ
  var thoDutTui = tienCongGio + tienLaiTho;             // Thợ thực tế bỏ túi

  // Hoa hồng Sale (Cột 20)
  var hoaHongSale = 0;
  if (giaKhachMua < 100000) {
    hoaHongSale = layHoaHongSaleDonNho();
  } else if (giaKhachMua >= 200000) {
    hoaHongSale = Math.round(giaKhachMua * layTyLeSaleDonVIP());
  } else {
    hoaHongSale = Math.round(giaKhachMua * layTyLeSaleDonTrungBinh());
  }

  // Lãi ròng chủ shop cất túi (Cột 21)
  var laiRongShop = giaKhachMua - tongTraTho - hoaHongSale;

  sheet.getRange(dong, 17).setValue(tienLaiTho);  // Cột 17: Lãi thợ 30%
  sheet.getRange(dong, 18).setValue(tongTraTho);  // Cột 18: Tổng trả thợ
  sheet.getRange(dong, 19).setValue(thoDutTui);   // Cột 19: Thợ đút túi
  sheet.getRange(dong, 20).setValue(hoaHongSale); // Cột 20: Hoa hồng Sale
  sheet.getRange(dong, 21).setValue(laiRongShop); // Cột 21: Lãi ròng Shop
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 3. LỆNH: TÍNH LẠI CÔNG & HOA HỒNG TOÀN BỘ (TinhLaiCongVaHoaHongToanBo)
 * ═══════════════════════════════════════════════════════════════
 */
function TinhLaiCongVaHoaHongToanBo() {
  var fileSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetTienDo = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO);
  if (!sheetTienDo) return;

  var dongCuoi = sheetTienDo.getLastRow();
  if (dongCuoi <= 1) return;

  var donGiaGio = layDonGiaGioMacDinh();
  var tyLeLaiTho = layTyLeLaiTho();
  var saleDonNho = layHoaHongSaleDonNho();
  var saleTrungBinh = layTyLeSaleDonTrungBinh();
  var saleVIP = layTyLeSaleDonVIP();

  var duLieu = sheetTienDo.getRange(2, 1, dongCuoi - 1, 22).getValues();

  for (var r = 0; r < duLieu.length; r++) {
    var soGioLam = Number(duLieu[r][9]) || 0; // Cột 10: Số giờ làm
    var giaGioDongNay = Number(duLieu[r][10]) || donGiaGio; // Cột 11: Đơn giá giờ
    duLieu[r][10] = giaGioDongNay;

    var tienCong = 0;
    if (soGioLam > 0) {
      tienCong = Math.round((soGioLam * giaGioDongNay) / 1000) * 1000;
    } else {
      tienCong = Number(duLieu[r][11]) || 0;
    }
    duLieu[r][11] = tienCong; // Cột 12: Tiền công theo giờ

    var giaKhachMua = Number(duLieu[r][14]) || 0; // Cột 15: Giá khách mua
    var gocNVL = Number(duLieu[r][15]) || 0;       // Cột 16: Gốc NVL

    var von = gocNVL + tienCong;
    var laiTho = Math.round(von * tyLeLaiTho);
    var tongTraTho = gocNVL + tienCong + laiTho;
    var thoDutTui = tienCong + laiTho;

    var hoaHongSale = 0;
    if (giaKhachMua < 100000) {
      hoaHongSale = saleDonNho;
    } else if (giaKhachMua >= 200000) {
      hoaHongSale = Math.round(giaKhachMua * saleVIP);
    } else {
      hoaHongSale = Math.round(giaKhachMua * saleTrungBinh);
    }

    var laiRongShop = giaKhachMua - tongTraTho - hoaHongSale;

    duLieu[r][16] = laiTho;
    duLieu[r][17] = tongTraTho;
    duLieu[r][18] = thoDutTui;
    duLieu[r][19] = hoaHongSale;
    duLieu[r][20] = laiRongShop;
  }

  sheetTienDo.getRange(2, 1, duLieu.length, 22).setValues(duLieu);
  dinhDangTienTe(sheetTienDo, "K2:L" + (duLieu.length + 1));
  dinhDangTienTe(sheetTienDo, "O2:U" + (duLieu.length + 1));
  CapNhatBangBaoCaoQuyetToan();

  SpreadsheetApp.getActiveSpreadsheet().toast("Đã tính toán lại toàn bộ tiền công giờ và hoa hồng!", "🐰 Thành Công", 3);
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 4. LỆNH: ĐỐI SOÁT SAO KÊ NGUYÊN VẬT LIỆU (DoiSoatSaoKeNguyenVatLieu)
 * ═══════════════════════════════════════════════════════════════
 */
function DoiSoatSaoKeNguyenVatLieu() {
  var fileSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetTienDo = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO);
  var sheetSaoKe = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_SAO_KE);
  if (!sheetTienDo || !sheetSaoKe || sheetSaoKe.getLastRow() <= 1) return;

  var duLieuTienDo = sheetTienDo.getRange(2, 1, sheetTienDo.getLastRow() - 1, 16).getValues();
  var banDoDinhMuc = {};
  for (var w = 0; w < duLieuTienDo.length; w++) {
    var maDon = String(duLieuTienDo[w][0]).trim().toUpperCase();
    var dinhMuc = Number(duLieuTienDo[w][15]) || 0; // Cột 16: Gốc NVL định mức
    banDoDinhMuc[maDon] = dinhMuc;
  }

  var duLieuSaoKe = sheetSaoKe.getRange(2, 1, sheetSaoKe.getLastRow() - 1, 13).getValues();
  for (var e = 0; e < duLieuSaoKe.length; e++) {
    var maDonLienQuan = String(duLieuSaoKe[e][2]).trim().toUpperCase();
    var tienThucChi = Number(duLieuSaoKe[e][5]) || 0; // Cột 6: Tiền thực tế trên bill

    var dinhMucDon = banDoDinhMuc[maDonLienQuan] || 0;
    var chenhLech = tienThucChi - dinhMucDon;

    duLieuSaoKe[e][9] = dinhMucDon; // Cột 10: Định mức
    duLieuSaoKe[e][10] = chenhLech;  // Cột 11: Chênh lệch

    if (chenhLech === 0 && tienThucChi > 0) {
      duLieuSaoKe[e][11] = "✅ Đã khớp 100%";
    } else if (chenhLech > 0 && dinhMucDon > 0) {
      duLieuSaoKe[e][11] = "⚠️ Vượt định mức (+" + chenhLech.toLocaleString("vi-VN") + "đ)";
    }
  }

  sheetSaoKe.getRange(2, 1, duLieuSaoKe.length, 13).setValues(duLieuSaoKe);
  dinhDangTienTe(sheetSaoKe, "F2:F" + (duLieuSaoKe.length + 1));
  dinhDangTienTe(sheetSaoKe, "J2:K" + (duLieuSaoKe.length + 1));
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 5. CẬP NHẬT BẢNG TỔNG HỢP QUYẾT TOÁN LƯƠNG
 * ═══════════════════════════════════════════════════════════════
 */
function CapNhatBangBaoCaoQuyetToan() {
  var fileSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetTienDo = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO);
  var sheetQuyetToan = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_QUYET_TOAN);
  if (!sheetTienDo || !sheetQuyetToan || sheetTienDo.getLastRow() <= 1) return;

  var duLieu = sheetTienDo.getRange(2, 1, sheetTienDo.getLastRow() - 1, 22).getValues();
  var tongKet = {};

  for (var i = 0; i < duLieu.length; i++) {
    var tenTho = String(duLieu[i][3]).trim();
    var tenSale = String(duLieu[i][4]).trim();
    var gioLam = Number(duLieu[i][9]) || 0;
    var tienCong = Number(duLieu[i][11]) || 0;
    var gocNVL = Number(duLieu[i][15]) || 0;
    var tienLai = Number(duLieu[i][16]) || 0;
    var tongTraTho = Number(duLieu[i][17]) || 0;
    var hoaHongSale = Number(duLieu[i][19]) || 0;

    if (tenTho && tenTho !== "Chờ phân công thợ") {
      if (!tongKet[tenTho]) {
        tongKet[tenTho] = { vaiTro: "Thợ Làm Hàng", soDon: 0, gioLam: 0, nvl: 0, cong: 0, lai: 0, tongNhan: 0 };
      }
      tongKet[tenTho].soDon += 1;
      tongKet[tenTho].gioLam += gioLam;
      tongKet[tenTho].nvl += gocNVL;
      tongKet[tenTho].cong += tienCong;
      tongKet[tenTho].lai += tienLai;
      tongKet[tenTho].tongNhan += tongTraTho;
    }

    if (tenSale && tenSale !== "Không qua Sale") {
      var keySale = tenSale + " (Sale)";
      if (!tongKet[keySale]) {
        tongKet[keySale] = { vaiTro: "CTV Bán Hàng (Sale)", soDon: 0, gioLam: 0, nvl: 0, cong: 0, lai: 0, tongNhan: 0 };
      }
      tongKet[keySale].soDon += 1;
      tongKet[keySale].tongNhan += hoaHongSale;
    }
  }

  var cacDongQuyetToan = [];
  for (var ten in tongKet) {
    var item = tongKet[ten];
    cacDongQuyetToan.push([
      ten, item.vaiTro, item.soDon, parseFloat(item.gioLam.toFixed(2)),
      item.nvl, item.cong, item.lai, item.tongNhan, "Chưa chuyển khoản"
    ]);
  }

  sheetQuyetToan.getRange(2, 1, sheetQuyetToan.getLastRow(), 9).clearContent();
  if (cacDongQuyetToan.length > 0) {
    sheetQuyetToan.getRange(2, 1, cacDongQuyetToan.length, 9).setValues(cacDongQuyetToan);
    dinhDangTienTe(sheetQuyetToan, "E2:H" + (cacDongQuyetToan.length + 1));
  }
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 6. LỆNH: GỬI BÁO CÁO SANG TELEGRAM (GuiBaoCaoQuyetToanSangTelegram)
 * ═══════════════════════════════════════════════════════════════
 */
function GuiBaoCaoQuyetToanSangTelegram() {
  CapNhatBangBaoCaoQuyetToan();
  var fileSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetQuyetToan = fileSheet.getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_QUYET_TOAN);
  if (!sheetQuyetToan || sheetQuyetToan.getLastRow() <= 1) {
    SpreadsheetApp.getUi().alert("Chưa có dữ liệu quyết toán để gửi!");
    return;
  }

  var duLieu = sheetQuyetToan.getRange(2, 1, sheetQuyetToan.getLastRow() - 1, 9).getValues();
  var tinNhan = "📊 <b>[TIỆM QUÀ BUNNY — BẢNG QUYẾT TOÁN CÔNG THEO GIỜ]</b>\n" +
                "━━━━━━━━━━━━━━━━━━━━\n";

  var tongTienChi = 0;
  for (var i = 0; i < duLieu.length; i++) {
    var ten = duLieu[i][0];
    var vaiTro = duLieu[i][1];
    var soDon = duLieu[i][2];
    var soGio = duLieu[i][3];
    var tongTien = Number(duLieu[i][7]) || 0;
    tongTienChi += tongTien;

    tinNhan += "👤 <b>" + ten + "</b> (" + vaiTro + ")\n" +
               "   • Số đơn: " + soDon + " đơn" + (soGio > 0 ? (" | Giờ làm: <b>" + soGio + " giờ</b>\n") : "\n") +
               "   • Thực nhận: <code>" + tongTien.toLocaleString("vi-VN") + " VNĐ</code>\n\n";
  }

  tinNhan += "━━━━━━━━━━━━━━━━━━━━\n" +
             "💰 <b>TỔNG TIỀN PHẢI CHI ĐỢT NÀY:</b> <code>" + tongTienChi.toLocaleString("vi-VN") + " VNĐ</code>\n" +
             "🐰 <i>Chủ shop vào duyệt và chuyển khoản cho thợ và sale nhé!</i> ✨";

  try {
    var url = "https://api.telegram.org/bot" + CAU_HINH_BUNNY.TOKEN_BOT_TELEGRAM + "/sendMessage";
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: CAU_HINH_BUNNY.ID_NHOM_TELEGRAM,
        text: tinNhan,
        parse_mode: "HTML"
      }),
      muteHttpExceptions: true
    });
    SpreadsheetApp.getActiveSpreadsheet().toast("Đã gửi báo cáo quyết toán lương sang Telegram!", "🐰 Đã Gửi", 5);
  } catch (loi) {
    SpreadsheetApp.getUi().alert("Lỗi gửi Telegram: " + loi.toString());
  }
}

/**
 * ═══════════════════════════════════════════════════════════════
 * CÁC LỆNH BẤM GIỜ NHANH TỪ MENU (Check-in & Check-out)
 * ═══════════════════════════════════════════════════════════════
 */
function BatDauLamDon_CheckIn() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getName() !== CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO) {
    SpreadsheetApp.getUi().alert("Vui lòng mở đúng bảng: " + CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO);
    return;
  }
  var dong = sheet.getActiveCell().getRow();
  if (dong <= 1) return;

  var gioHienTai = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm");
  sheet.getRange(dong, 7).setValue(gioHienTai); // Cột 7: Bắt đầu
  sheet.getRange(dong, 14).setValue("3. Đang gia công");
  sheet.getRange(dong, 13).setValue("Đang làm ⏳");
  SpreadsheetApp.getActiveSpreadsheet().toast("Đã BẮT ĐẦU bấm giờ làm đơn dòng " + dong, "⏱️ Check-in", 3);
}

function HoanThanhDon_TinhCongGio() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getName() !== CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO) {
    SpreadsheetApp.getUi().alert("Vui lòng mở đúng bảng: " + CAU_HINH_BUNNY.TEN_SHEET_TIEN_DO);
    return;
  }
  var dong = sheet.getActiveCell().getRow();
  if (dong <= 1) return;

  var gioHienTai = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm");
  sheet.getRange(dong, 8).setValue(gioHienTai); // Cột 8: Hoàn thành
  sheet.getRange(dong, 14).setValue("4. Hoàn thiện & QC");
  TinhGioVaTienCongChoDong(sheet, dong);
  SpreadsheetApp.getActiveSpreadsheet().toast("Đã chốt giờ HOÀN THÀNH & Tính tiền công theo giờ xong!", "✅ Check-out", 3);
}

// CÁC HÀM PHỤ ĐỌC GIÁ TRỊ TỪ BẢNG CẤU HÌNH
function layDonGiaGioMacDinh() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH);
    return Number(sheet.getRange("B2").getValue()) || 30000;
  } catch (e) { return 30000; }
}

function layTyLeLaiTho() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH);
    return Number(sheet.getRange("B3").getValue()) || 0.30;
  } catch (e) { return 0.30; }
}

function layHoaHongSaleDonNho() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH);
    return Number(sheet.getRange("B4").getValue()) || 5000;
  } catch (e) { return 5000; }
}

function layTyLeSaleDonTrungBinh() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH);
    return Number(sheet.getRange("B5").getValue()) || 0.10;
  } catch (e) { return 0.10; }
}

function layTyLeSaleDonVIP() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CAU_HINH_BUNNY.TEN_SHEET_CAU_HINH);
    return Number(sheet.getRange("B6").getValue()) || 0.15;
  } catch (e) { return 0.15; }
}

function chuyenDoiNgayThang(chuoi) {
  try {
    if (chuoi instanceof Date) return chuoi;
    var phan = String(chuoi).trim().split(" ");
    if (phan.length < 2) return null;
    var pNgay = phan[0].split("/");
    var pGio = phan[1].split(":");
    return new Date(Number(pNgay[2]), Number(pNgay[1]) - 1, Number(pNgay[0]), Number(pGio[0]), Number(pGio[1]));
  } catch (e) { return null; }
}

function dinhDangTienTe(sheet, vungA1) {
  try {
    sheet.getRange(vungA1).setNumberFormat("#,##0\"đ\"").setHorizontalAlignment("right");
  } catch (e) {}
}
