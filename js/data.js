/**
 * TIỆM QUÀ NHÀ BUNNY — DATABASE & APPLICATION CONFIG
 * HỆ THỐNG QUÀ TẶNG LEN HANDMADE • THỂ THAO & MINECRAFT
 * 100% ẢNH THẬT • DỊCH VỤ TRAO TẬN TAY NGƯỜI THƯƠNG • CUSTOM THÊU TÊN ĐỘC BẢN
 */

const APP_CONFIG = {
    storeName: "Tiệm Quà Nhà Bunny",
    slogan: "Trao trọn tấm lòng",
    subSlogan: "Gói ghém yêu thương — Trao tận tay người thương — Thêu tên độc bản",
    logoPath: "images/logo_bunny.jpg",
    logoPng: "images/logo_bunny.png",
    mascotHead: "images/mascot_head.png",
    
    // HỆ THỐNG CỬA HÀNG & ĐIỂM HẸN TRAO QUÀ
    stores: [
        { city: "Hà Nội", address: "Khu vực THPT Cao Bá Quát & Đặng Xá, Gia Lâm", hours: "8h00 - 22h00" },
        { city: "Hà Nội", address: "Học viện Nông nghiệp Việt Nam (Trâu Quỳ, Gia Lâm)", hours: "8h00 - 22h00" },
        { city: "Hà Nội", address: "81 Bà Triệu, Hoàn Kiếm", hours: "9h00 - 22h00" },
        { city: "Hà Nội", address: "241 Chùa Bộc, Đống Đa", hours: "9h00 - 22h00" }
    ],

    // LIÊN HỆ & HOTLINE
    contact: {
        hotline: "0889 166 655",
        phone: "0889 166 655",
        zalo: "https://zalo.me/0889166655",
        tiktok: "@tiemquabunny",
        tiktokUrl: "https://www.tiktok.com/@bocfile",
        email: "support@tiemquabunny.vn",
        address: "Tiệm Quà Bunny • Trao tận tay người thương tại Hà Nội & Toàn Quốc"
    },

    // NGÂN HÀNG THANH TOÁN VIETQR TỰ ĐỘNG
    bank: {
        bankCode: "970416",
        bankName: "ACB - Ngân hàng TMCP Á Châu",
        accountNumber: "27820961",
        accountHolder: "TRINH DUC THINH"
    },

    // TÍCH HỢP TELEGRAM & GOOGLE SHEET ĐỒNG BỘ ĐƠN HÀNG
    telegramBot: {
        botToken: "8746965311:AAFDnkaagBryQPeN971tQm8iK2YsIXJM9-Y",
        chatId: "-5547409331",
        enabled: true
    },
    googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbyGShIU5mKyo5mDt0j28dg3bCKDrJewyqAwaBaOpJO8J2hCITzkAngKQSs4ZKrpKXWsXg/exec",

    // TÙY CHỌN DỊCH VỤ SHIP & TRAO TẬN TAY
    shippingModes: [
        { 
            id: "trao_tan_tay", 
            name: "🛵 Trao Tận Tay Người Thương (Bất ngờ + Thiệp sáp)", 
            price: 40000, 
            desc: "Trao tận tay kín đáo / bất ngờ tại cổng trường, lớp học, nhà riêng. Kèm thư niêm phong sáp đỏ và chụp ảnh xác nhận!" 
        },
        { 
            id: "express_2h", 
            name: "⚡ Giao Hỏa Tốc 2H Tại Khu Vực", 
            price: 45000, 
            desc: "Giao gấp trong 2 giờ, quà được bảo bọc chống sốc kỹ càng" 
        },
        { 
            id: "standard", 
            name: "📦 Giao Tiêu Chuẩn Toàn Quốc (1-3 ngày)", 
            price: 25000, 
            desc: "Đóng hộp 3 lớp an toàn, bảo vệ quà tặng nguyên vẹn chu đáo" 
        }
    ],

    // DỊCH VỤ CÁ NHÂN HÓA: THÊU TÊN & GẮN HÌNH BE BÉ
    customService: {
        id: "custom_embroider_charm",
        name: "Thêu Tên & Đính Hình Be Bé Theo Yêu Cầu",
        price: 25000,
        desc: "Thêu tên, chữ viết tắt, ngày kỷ niệm hoặc số áo + Đính kèm charm len mini xinh xắn theo yêu cầu",
        charms: [
            { id: "heart", label: "❤️ Trái tim đỏ be bé" },
            { id: "star", label: "⭐ Ngôi sao vàng mini" },
            { id: "flower", label: "🌸 Bông hoa cúc nhỏ" },
            { id: "clover", label: "🍀 Cỏ 4 lá may mắn" },
            { id: "ball", label: "⚽ Quả bóng mini" },
            { id: "pixel", label: "🟩 Khối pixel xanh" }
        ]
    }
};

// BANNERS CAROUSEL
const CAROUSEL_BANNERS = [
    {
        id: "bn_sports",
        tag: "⚽ BỘ SƯU TẬP THỂ THAO & ĐAM MÊ",
        badge: "🔥 Hot Trend TikTok",
        title: "Đồ Len Thể Thao Handmade Độc Bản",
        subtitle: "Sa bàn sân bóng, cúp vàng World Cup, áo đấu jersey, vợt cầu lông & bóng chuyền len êm ái",
        image: "images/products/sport_cup_fifa_worldcup.jpg",
        actionCategory: "sports_crochet",
        btnText: "KHÁM PHÁ NGAY"
    },
    {
        id: "bn_minecraft",
        tag: "🎮 THẾ GIỚI MINECRAFT PIXEL LEN",
        badge: "✨ Dành Cho Game Thủ",
        title: "Bộ Sưu Tập Minecraft Pixel Đan Len",
        subtitle: "Kiếm kim cương Diamond Sword, Khối TNT len, Quái vật Creeper, Ong vàng & Iron Golem siêu ngầu",
        image: "images/products/mc_kiem_kim_cuong.jpg",
        actionCategory: "minecraft_crochet",
        btnText: "XEM BỘ MINECRAFT"
    },
    {
        id: "bn_traotantay",
        tag: "🛵 DỊCH VỤ ĐẶC BIỆT",
        badge: "💖 Trao Tận Tay Người Thương",
        title: "Trao Tận Tay Người Thương • Thêu Tên Riêng",
        subtitle: "Biệt đội Bunny trao quà bất ngờ tận tay crush/người yêu kèm thiệp sáp đỏ & thêu tên kỷ niệm độc nhất",
        image: "images/products/sport_ao_dau_jersey.jpg",
        actionCategory: "custom_gift",
        btnText: "ĐẶT QUÀ NGAY"
    }
];

// DANH MỤC THANH ĐIỀU HƯỚNG CỐT LÕI
const GIFT_CATEGORIES = [
    { id: "home", name: "Trang Chủ", icon: "🏠", isHome: true },
    { id: "sports_crochet", name: "Len Thể Thao", icon: "⚽", isHot: true },
    { id: "minecraft_crochet", name: "Len Minecraft", icon: "🎮", isHot: true },
    { id: "keychain_mini", name: "Móc Khóa Len", icon: "🔑" },
    { id: "custom_gift", name: "Thêu Tên & Custom", icon: "🧵", isHot: true }
];

// DATABASE 12 SẢN PHẨM LEN HANDMADE CHUẨN XÁC 100% TỪ HÌNH ẢNH CUNG CẤP
const PRODUCTS_DATABASE = [
    // ═════════════════════════════════════════════════════════════════════════
    // NHÓM 1: BỘ SƯU TẬP LEN THỂ THAO & ĐAM MÊ (SPORTS CROCHET)
    // ═════════════════════════════════════════════════════════════════════════
    {
        id: "SPORT-STADIUM-01",
        code: "SPORT-STADIUM",
        category: "sports_crochet",
        gender: "unisex",
        name: "Set Sa Bàn Sân Thể Thao Mini Len (Khung Thành & Rổ Bóng Rổ)",
        subtitle: "Mô hình sa bàn đan len mini cực xinh gồm khung thành, rổ bóng rổ, giày len, bóng đá & bóng rổ",
        price: 195000,
        originalPrice: 250000,
        rating: 5.0,
        reviewsCount: 168,
        image: "images/products/sport_san_bong_mini.jpg",
        badge: "🏆 Siêu Phẩm Decor",
        badgeColor: "bg-emerald-500 text-white",
        stock: 35,
        description: "Set mô hình sa bàn thể thao mini đan len handmade tỉ mỉ từng chi tiết: cột rổ bóng rổ với lưới len trắng cam, khung thành bóng đá mini, quả bóng đá và bóng rổ len êm ái, kèm đôi giày thể thao và bàn gỗ decor. Thích hợp trang trí bàn học, bàn làm việc hoặc làm quà tặng cho bạn trai/crush mê thể thao!",
        itemsIncluded: [
            "01 Cột rổ bóng rổ mini đan len tỉ mỉ kèm lưới trắng",
            "01 Khung thành bóng đá len mini viền cam lưới trắng",
            "01 Quả bóng rổ mini đan len & 01 Quả bóng đá len",
            "01 Đôi giày thể thao len mini & Bàn tròn decor gỗ xinh xắn",
            "Dây cờ tam giác trang trí sắc màu thanh xuân",
            "Bức thư tay niêm phong sáp đỏ vintage theo yêu cầu (0đ)",
            "Hỗ trợ dịch vụ thêu tên & đính hình be bé độc bản"
        ],
        specifications: {
            "Chất liệu": "Len milk cotton 100% mềm mịn, đế vững chắc",
            "Kích thước": "Khoảng 15cm x 12cm x 12cm (Set mini)",
            "Độ hoàn thiện": "Móc tay thủ công 100%, đường kim sắc sảo",
            "Công dụng": "Decor bàn học, góc làm việc, quà sinh nhật bạn trai mê thể thao"
        }
    },
    {
        id: "SPORT-BADMINTON-02",
        code: "SPORT-BADMINTON",
        category: "sports_crochet",
        tags: ["keychain_mini"],
        gender: "unisex",
        name: "Móc Khóa Cặp Đôi Vợt Cầu Lông & Quả Cầu Len",
        subtitle: "Cặp móc khóa len đan tay tỉ mỉ gồm vợt cầu lông xanh pastel & quả cầu len bồng bềnh",
        price: 75000,
        originalPrice: 95000,
        rating: 5.0,
        reviewsCount: 215,
        image: "images/products/sport_vot_cau_long.jpg",
        badge: "🏸 Cặp Đôi Thể Thao",
        badgeColor: "bg-sky-500 text-white",
        stock: 60,
        description: "Móc khóa cặp đôi thể thao hot trend: gồm chiếc vợt cầu lông đan len xanh pastel viền lưới trắng và quả cầu lông len bồng bềnh xinh xắn. Móc vào balo, túi xách hoặc chùm chìa khóa đôi cùng người thương cực kỳ ngọt ngào và năng động!",
        itemsIncluded: [
            "01 Chiếc vợt cầu lông mini đan len pastel đan lưới",
            "01 Quả cầu lông len viền ren xanh trắng đáng yêu",
            "Móc khóa kim loại không rỉ cao cấp kèm chuông nhỏ",
            "Bọc túi bóng kính nơ thắt sẵn sàng làm quà tặng",
            "Tặng kèm thiệp viết tay sáp niêm phong (0đ)"
        ],
        specifications: {
            "Chất liệu": "Len cotton sợi nhỏ cao cấp không xù lông",
            "Chiều dài vợt": "Khoảng 9cm",
            "Chiều dài cầu": "Khoảng 5cm",
            "Phụ kiện": "Khoen móc kim loại chắc chắn"
        }
    },
    {
        id: "SPORT-JERSEY-03",
        code: "SPORT-JERSEY",
        category: "sports_crochet",
        tags: ["keychain_mini", "custom_gift"],
        gender: "unisex",
        name: "Móc Khóa Áo Đấu Thể Thao Len (Jersey Số 5 & Số 10)",
        subtitle: "Móc khóa áo đấu thể thao móc len số 5 & 10 (Haikyuu / Bóng đá) - Hỗ trợ thêu số & tên riêng",
        price: 65000,
        originalPrice: 85000,
        rating: 5.0,
        reviewsCount: 340,
        image: "images/products/sport_ao_dau_jersey.jpg",
        badge: "👕 Thêu Tên Theo Yêu Cầu",
        badgeColor: "bg-rose-500 text-white",
        stock: 80,
        description: "Chiếc áo đấu thể thao móc len siêu phong cách: có sẵn phiên bản áo đỏ số 5 đanh thép và áo đen viền cam số 10 huyền thoại (phong cách anime bóng chuyền Haikyuu / bóng đá). Đặc biệt: Bunny nhận thêu tên người thương, ngày sinh nhật hoặc đổi số áo may mắn theo yêu cầu!",
        itemsIncluded: [
            "01 Móc khóa áo đấu len thể thao theo màu & số chọn",
            "Khoen móc tròn kim loại cao cấp kèm xích nối",
            "Miễn phí tùy chọn số áo (nếu có yêu cầu)",
            "Thư tay niêm sáp vintage ghi lời chúc ngọt ngào (0đ)"
        ],
        specifications: {
            "Kích thước áo": "Khoảng 6cm x 6.5cm",
            "Chất liệu": "Len dệt kim cao cấp, giữ phom áo phẳng phiu",
            "Tùy biến": "Hỗ trợ thêu tên/chữ viết tắt lên lưng áo"
        }
    },
    {
        id: "SPORT-VOLLEY-04",
        code: "SPORT-VOLLEY",
        category: "sports_crochet",
        gender: "unisex",
        name: "Quả Bóng Chuyền Len Handmade Cầm Tay",
        subtitle: "Quả bóng chuyền đan len phối 3 màu xanh - vàng cam - trắng êm ái, bóp xả stress cực êm",
        price: 110000,
        originalPrice: 140000,
        rating: 5.0,
        reviewsCount: 142,
        image: "images/products/sport_bong_chuyen_len.jpg",
        badge: "🏐 Êm Ái Xả Stress",
        badgeColor: "bg-amber-500 text-white",
        stock: 30,
        description: "Quả bóng chuyền handmade đan tay với hoa văn 3 màu xanh dương, vàng cam và trắng kem chuẩn phom bóng thi đấu chuyên nghiệp. Bên trong nhồi bông gòn gòn tinh khiết, êm ái vô cùng khi ôm hoặc cầm bóp xả stress sau những giờ học căng thẳng!",
        itemsIncluded: [
            "01 Quả bóng chuyền len đan tay 100% bông gòn êm",
            "Túi đựng bóng len quai xách xinh xắn",
            "Thư tay sáp niêm phong phong cách cổ điển (0đ)"
        ],
        specifications: {
            "Đường kính": "Khoảng 12 - 14cm (vừa vặn 2 bàn tay)",
            "Chất liệu ruột": "Bông gòn bi nhân tạo chống xẹp",
            "Vỏ ngoài": "Len cotton đan khít, màu sắc tươi sáng"
        }
    },
    {
        id: "SPORT-MEDAL-05",
        code: "SPORT-MEDAL",
        category: "sports_crochet",
        gender: "unisex",
        name: "Huy Chương Vàng Len Vô Địch Số 1 Kèm Dải Ruy Băng",
        subtitle: "Món quà động viên tinh thần độc đáo - Trao tặng Nhà Vô Địch Số 1 trong lòng em/anh",
        price: 79000,
        originalPrice: 99000,
        rating: 5.0,
        reviewsCount: 198,
        image: "images/products/sport_huy_chuong_vang.jpg",
        badge: "🥇 Vô Địch Trong Lòng Em",
        badgeColor: "bg-yellow-500 text-slate-900",
        stock: 50,
        description: "Chiếc huy chương vàng len thủ công thêu nổi chữ số '1', kèm dải ruy băng len 3 sọc đỏ - trắng - xanh dương kiêu hãnh. Món quà ý nghĩa nhất để tặng bạn trai sau trận bóng trường, tặng bạn bè dịp thi cử hoặc trao tặng 'Người yêu số 1 trần đời'!",
        itemsIncluded: [
            "01 Huy chương vàng len thêu số 1 nổi 3D",
            "01 Dải ruy băng len đeo cổ 3 màu sắc nét",
            "Thư tay niêm phong sáp đỏ chúc mừng chiến thắng (0đ)"
        ],
        specifications: {
            "Đường kính huy chương": "Khoảng 7.5cm",
            "Chiều dài dây đeo": "Khoảng 35cm",
            "Chất liệu": "Len sợi cotton cao cấp vàng ánh óng ả"
        }
    },
    {
        id: "SPORT-WORLDCUP-06",
        code: "SPORT-WORLDCUP",
        category: "sports_crochet",
        tags: ["keychain_mini"],
        gender: "unisex",
        name: "Móc Khóa Cúp Vàng FIFA World Cup Len Thêu Chữ",
        subtitle: "Mô hình cúp vàng danh giá thế giới móc len vàng óng, đế xanh thêu FIFA WORLD CUP",
        price: 89000,
        originalPrice: 115000,
        rating: 5.0,
        reviewsCount: 280,
        image: "images/products/sport_cup_fifa_worldcup.jpg",
        badge: "🏆 Cúp Vàng World Cup",
        badgeColor: "bg-amber-600 text-white",
        stock: 45,
        description: "Mô hình chiếc Cúp Vàng FIFA World Cup huyền thoại phiên bản đan len thủ công tinh xảo từng đường uốn lượn. Phần chân đế xanh lá thêu chữ nổi 'FIFA WORLD CUP'. Món quà chạm đúng đam mê bóng đá của mọi chàng trai, bảo đảm chàng nhận được sẽ chụp khoe khắp mạng xã hội!",
        itemsIncluded: [
            "01 Móc khóa cúp vàng FIFA World Cup len cao cấp",
            "Khoen khóa xích mạ bạc chắc chắn",
            "Hộp quà trong suốt thắt nơ nỉ sang trọng",
            "Bức thư tay niêm sáp vintage gửi gắm tâm tình (0đ)"
        ],
        specifications: {
            "Chiều cao cúp": "Khoảng 11 - 12cm",
            "Màu sắc": "Vàng hoàng gia phối đế xanh ngọc lục bảo",
            "Chất liệu": "Len dệt tạo hình 3D đứng dáng vững vàng"
        }
    },

    // ═════════════════════════════════════════════════════════════════════════
    // NHÓM 2: BỘ SƯU TẬP MINECRAFT PIXEL LEN HANDMADE
    // ═════════════════════════════════════════════════════════════════════════
    {
        id: "MC-BEE-01",
        code: "MC-BEE",
        category: "minecraft_crochet",
        tags: ["keychain_mini"],
        gender: "unisex",
        name: "Móc Khóa Chú Ong Vàng Minecraft Len (Pixel Bee)",
        subtitle: "Chú ong vàng sọc nâu pixel mắt xanh, cánh trắng có móc khóa đeo balo siêu đáng yêu",
        price: 85000,
        originalPrice: 105000,
        rating: 5.0,
        reviewsCount: 310,
        image: "images/products/mc_chu_ong_len.jpg",
        badge: "🐝 Cute Siêu Cấp",
        badgeColor: "bg-yellow-400 text-slate-900",
        stock: 65,
        description: "Chú Ong Minecraft len hình khối lập phương đặc trưng, lông len bông xù êm ái với sọc vàng nâu, đôi cánh trắng muốt và cặp mắt pixel xanh dương cưng xỉu. Phía trên có gắn dây móc khóa treo cặp, balo hoặc góc bàn học siêu độc lạ!",
        itemsIncluded: [
            "01 Chú ong vàng Minecraft len khối vuông 3D",
            "Dây móc khóa silicon cao cấp tiện dụng",
            "Thư tay sáp đỏ chúc mừng ngọt ngào (0đ)"
        ],
        specifications: {
            "Kích thước": "Khoảng 6cm x 6cm x 7cm",
            "Chất liệu": "Len nhung đan bông xù mềm mại như mây",
            "Trọng lượng": "50g siêu nhẹ, đeo balo không lo nặng"
        }
    },
    {
        id: "MC-PIG-02",
        code: "MC-PIG",
        category: "minecraft_crochet",
        gender: "unisex",
        name: "Mô Hình Chú Heo Hồng Minecraft Len Siêu Cute",
        subtitle: "Chú heo khối vuông màu hồng pastel phong cách pixel Minecraft, êm ái để bàn học",
        price: 105000,
        originalPrice: 135000,
        rating: 5.0,
        reviewsCount: 175,
        image: "images/products/mc_chu_heo_hong.jpg",
        badge: "🐷 Heo Hồng Pixel",
        badgeColor: "bg-pink-400 text-white",
        stock: 40,
        description: "Chú Heo Minecraft đan len khối hộp vuông màu hồng pastel với 4 chân ngắn củn vững chãi, chiếc mũi hếch pixel ngộ nghĩnh và đôi mắt to tròn. Món quà khiến các bạn nữ và bạn trai mê game đổ gục ngay từ cái nhìn đầu tiên!",
        itemsIncluded: [
            "01 Chú heo Minecraft len hồng nguyên khối",
            "Hộp quà kèm rơm lót lụa mềm mại",
            "Bức thư tay niêm phong sáp phong cách hoàng gia (0đ)"
        ],
        specifications: {
            "Kích thước": "Khoảng 10cm x 8cm x 11cm",
            "Chất liệu": "Len len sợi to ấm áp, bông gòn bi đàn hồi",
            "Tạo hình": "Đứng vững trên mọi mặt phẳng bàn học"
        }
    },
    {
        id: "MC-CREEPER-03",
        code: "MC-CREEPER",
        category: "minecraft_crochet",
        gender: "unisex",
        name: "Mô Hình Quái Vật Creeper Xanh Lá Minecraft Len",
        subtitle: "Chú Creeper xanh lá pixel huyền thoại, biểu tượng không thể thiếu của thế giới Minecraft",
        price: 125000,
        originalPrice: 155000,
        rating: 5.0,
        reviewsCount: 290,
        image: "images/products/mc_creeper_xanh.jpg",
        badge: "💥 Creeper Huyền Thoại",
        badgeColor: "bg-green-600 text-white",
        stock: 50,
        description: "Creeper — Sinh vật biểu tượng số 1 làm nên tên tuổi của game Minecraft! Phiên bản len handmade đan khối vuông xanh lá với khuôn mặt 'buồn ngủ' ngơ ngác cực kỳ hài hước. Không bao giờ phát nổ, chỉ mang đến niềm vui bùng nổ cho người nhận!",
        itemsIncluded: [
            "01 Mô hình Creeper len xanh lá 4 chân đứng dáng",
            "Thẻ bài game Minecraft mini kỷ niệm",
            "Thư tay niêm sáp cổ điển theo yêu cầu (0đ)"
        ],
        specifications: {
            "Chiều cao": "Khoảng 15 - 16cm",
            "Màu sắc": "Xanh lá rêu pixel đan xen",
            "Đặc điểm": "Đứng vững chãi, không xẹp lún"
        }
    },
    {
        id: "MC-GOLEM-04",
        code: "MC-GOLEM",
        category: "minecraft_crochet",
        gender: "unisex",
        name: "Gấu Bông Len Vệ Binh Iron Golem Minecraft",
        subtitle: "Mô hình gấu bông len Iron Golem to lớn bảo vệ dân làng, phối hoa văn dây leo rêu xanh cực ngầu",
        price: 185000,
        originalPrice: 240000,
        rating: 5.0,
        reviewsCount: 160,
        image: "images/products/mc_iron_golem.jpg",
        badge: "🤖 Vệ Binh Bảo Vệ Bạn",
        badgeColor: "bg-slate-700 text-white",
        stock: 25,
        description: "Vệ Binh Người Sắt Iron Golem — Kẻ bảo vệ trung thành nhất của dân làng Minecraft! Tượng trưng cho thông điệp 'Anh/Tớ sẽ luôn ở đây bảo vệ cậu'. Mô hình len cỡ lớn với đôi tay vạm vỡ đan chi tiết hoa văn dây leo xanh, chiếc mũi dài và đôi mắt đỏ kiên định.",
        itemsIncluded: [
            "01 Gấu bông len Iron Golem Minecraft cỡ lớn",
            "Túi quà quai xách nơ đỏ sang trọng",
            "Bức thư tay niêm phong sáp đỏ gửi gắm yêu thương (0đ)"
        ],
        specifications: {
            "Chiều cao": "Khoảng 20 - 22cm (Cỡ lớn nhất bộ sưu tập)",
            "Chất liệu": "Len len sợi xám trắng cao cấp thêu họa tiết dây leo",
            "Ý nghĩa": "Lời hứa che chở, bảo vệ người thương mãi mãi"
        }
    },
    {
        id: "MC-SWORD-05",
        code: "MC-SWORD",
        category: "minecraft_crochet",
        tags: ["keychain_mini", "custom_gift"],
        gender: "unisex",
        name: "Móc Khóa Kiếm Kim Cương Diamond Sword Len",
        subtitle: "Thanh kiếm kim cương pixel màu xanh ngọc viền đen, vũ khí huyền thoại bảo vệ người thương",
        price: 75000,
        originalPrice: 95000,
        rating: 5.0,
        reviewsCount: 420,
        image: "images/products/mc_kiem_kim_cuong.jpg",
        badge: "⚔️ Kiếm Kim Cương",
        badgeColor: "bg-cyan-500 text-white",
        stock: 85,
        description: "Thanh Kiếm Kim Cương Diamond Sword huyền thoại trong Minecraft được chuyển thể thành móc khóa len pixel màu xanh ngọc viền đen sắc nét. Món phụ kiện đeo cặp sách, chìa khóa xe khiến bất cứ ai nhìn thấy cũng phải trầm trồ khen ngợi!",
        itemsIncluded: [
            "01 Móc khóa thanh kiếm kim cương pixel len",
            "Khoen móc xích kim loại mạ bạc bền bỉ",
            "Bọc quà thắt nơ xinh xắn kèm thiệp sáp (0đ)"
        ],
        specifications: {
            "Chiều dài kiếm": "Khoảng 12cm",
            "Màu sắc": "Xanh ngọc Diamond viền đen pixel",
            "Phom dáng": "Có lớp lót cứng cáp bên trong giữ dáng thẳng thớm"
        }
    },
    {
        id: "MC-TNT-06",
        code: "MC-TNT",
        category: "minecraft_crochet",
        gender: "unisex",
        name: "Khối Thuốc Nổ TNT Minecraft Len Thêu Chữ Nổi Bật",
        subtitle: "Khối TNT pixel đỏ trắng thêu chữ TNT, món quà bùng nổ tình cảm cực hài hước và độc lạ",
        price: 135000,
        originalPrice: 175000,
        rating: 5.0,
        reviewsCount: 185,
        image: "images/products/mc_khoi_tnt_len.jpg",
        badge: "🧨 Bùng Nổ Yêu Thương",
        badgeColor: "bg-red-600 text-white",
        stock: 35,
        description: "Khối thuốc nổ TNT trong Minecraft phiên bản len siêu êm ái! Thiết kế khối hộp vuông phối đỏ viền trắng, thêu nổi 3 chữ cái 'TNT' màu đen sắc sảo. Tặng kèm thông điệp: 'Tình cảm tớ dành cho cậu bùng nổ như khối TNT này vậy!'",
        itemsIncluded: [
            "01 Khối thuốc nổ TNT len hộp vuông đa năng",
            "Đóng gói hộp quà nơ lụa thắt sẵn",
            "Thư tay sáp niêm phong vintage (0đ)"
        ],
        specifications: {
            "Kích thước": "Khoảng 10cm x 10cm x 10cm",
            "Chất liệu": "Len dệt len nhung dày dặn, nhồi bông gòn êm ái",
            "Đa năng": "Làm gối ôm nhỏ để bàn, đồ chơi xả stress hoặc decor phòng"
        }
    }
];

// CẢM NHẬN KHÁCH HÀNG (FEEDBACK THỰC TẾ VỀ ĐỒ LEN THỂ THAO & MINECRAFT)
const CUSTOMER_REVIEWS = [
    {
        id: "REV-01",
        name: "Đức Anh (THPT Cao Bá Quát, Gia Lâm)",
        avatar: "images/logo_bunny.jpg",
        tag: "Tặng Bạn Trai Mê Bóng Đá",
        comboUsed: "Móc Khóa Cúp Vàng World Cup & Áo Số 10",
        rating: 5,
        time: "Hôm qua",
        content: "Bạn gái mình tặng chiếc cúp World Cup len và áo đấu thêu tên mình số 10 đúng hôm đá giải trường. Cúp vàng móc tay tỉ mỉ nhìn chiến dã man! Shipper Bunny giao đúng giờ tan học cổng trường rất kín đáo."
    },
    {
        id: "REV-02",
        name: "Thu Trang (Đặng Xá, Gia Lâm)",
        avatar: "images/logo_bunny.jpg",
        tag: "Quà Sinh Nhật Bạn Mê Game",
        comboUsed: "Móc Khóa Kiếm Kim Cương & Chú Ong Minecraft",
        rating: 5,
        time: "2 ngày trước",
        content: "Thanh kiếm kim cương và chú ong Minecraft bông xù cưng xỉu luôn! Bạn mình là fan cứng Minecraft mở hộp ra hét lên vì thích. Dịch vụ thêu tên chữ viết tắt lên kiếm rất sắc nét."
    },
    {
        id: "REV-03",
        name: "Minh Quân (Học Viện Nông Nghiệp VNUA)",
        avatar: "images/logo_bunny.jpg",
        tag: "Trao Tận Tay Người Thương",
        comboUsed: "Huy Chương Vàng Số 1 & Quả Bóng Chuyền Len",
        rating: 5,
        time: "Tuần trước",
        content: "Chọn dịch vụ Trao Tận Tay Người Thương của Bunny lúc 11h30 tan học, bạn gái mình bất ngờ suýt khóc. Quả bóng chuyền len êm ái kèm thư niêm sáp viết tay quá đỗi ngọt ngào!"
    },
    {
        id: "REV-04",
        name: "Mai Linh (Cổ Bi, Gia Lâm)",
        avatar: "images/logo_bunny.jpg",
        tag: "Quái Vật Đáng Yêu",
        comboUsed: "Mô Hình Creeper Xanh & Khối TNT Len",
        rating: 5,
        time: "3 ngày trước",
        content: "Set Creeper xanh với hộp thuốc nổ TNT len bùng nổ tình cảm nhìn vừa ngầu vừa hài hước. Len đan chắc tay, không bị xẹp xù. 10/10 điểm cho Tiệm Quà Nhà Bunny!"
    }
];
