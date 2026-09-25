/**
 * TIỆM QUÀ NHÀ BUNNY — DATABASE & APPLICATION CONFIG
 * HỆ THỐNG ĐA TRANG (MULTI-PAGE SPA)
 * 100% DỮ LIỆU ĐỒNG BỘ • 100% ẢNH THẬT • 100% PHỤC VỤ TẠI HÀ NỘI
 */

const APP_CONFIG = {
    storeName: "Tiệm Quà Nhà Bunny",
    slogan: "Trao trọn tấm lòng",
    subSlogan: "Gói ghém yêu thương — Trao trọn tấm lòng — Gửi trọn niềm tin",
    logoPath: "images/logo_bunny.jpg",
    logoPng: "images/logo_bunny.png",
    mascotHead: "images/mascot_head.png",
    
    // HỆ THỐNG CỬA HÀNG TOÀN HÀ NỘI (CHỈ HÀ NỘI)
    stores: [
        { city: "Hà Nội", address: "81 Bà Triệu, P. Hàng Bài, Q. Hoàn Kiếm", hours: "9h00 - 22h00" },
        { city: "Hà Nội", address: "241 Chùa Bộc, P. Trung Tự, Q. Đống Đa", hours: "9h00 - 22h00" },
        { city: "Hà Nội", address: "157 Xuân Thủy, P. Dịch Vọng Hậu, Q. Cầu Giấy", hours: "9h00 - 22h00" },
        { city: "Hà Nội", address: "193 Phố Huế, P. Phố Huế, Q. Hai Bà Trưng", hours: "9h00 - 22h00" },
        { city: "Hà Nội", address: "60 Trần Phú, P. Mộ Lao, Q. Hà Đông", hours: "9h00 - 22h00" },
        { city: "Hà Nội", address: "104 Chùa Láng, P. Láng Thượng, Q. Đống Đa", hours: "9h00 - 22h00" }
    ],

    // LIÊN HỆ
    contact: {
        hotline: "0889 166 655",
        phone: "0889 166 655",
        zalo: "https://zalo.me/0889166655",
        tiktok: "@tiemquabunny",
        tiktokUrl: "https://www.tiktok.com/@bocfile",
        email: "support@bocfile.store",
        address: "Tiệm Quà Bunny • Giao hỏa tốc tại khu vực & Trao tận tay tại Hà Nội"
    },

    // NGÂN HÀNG THANH TOÁN VIETQR
    bank: {
        bankCode: "970416",
        bankName: "ACB - Ngân hàng TMCP Á Châu",
        accountNumber: "27384751",
        accountHolder: "DOAN QUANG TAN"
    },

    // TÍCH HỢP BẮN TELEGRAM
    telegramBot: {
        botToken: "",
        chatId: "",
        enabled: true
    },

    // TÙY CHỌN DỊCH VỤ SHIP (CHỈ TẠI HÀ NỘI)
    shippingModes: [
        { id: "standard", name: "Giao Tiêu Chuẩn Hà Nội (1-2 ngày)", price: 25000, desc: "Đóng gói hộp 3 lớp an toàn, bảo vệ quà chu đáo" },
        { id: "express_2h", name: "Giao Hỏa Tốc Tại Khu Vực", price: 45000, desc: "Giao nhanh chóng theo yêu cầu, bảo đảm quà tươi xinh nguyên vẹn" },
        { id: "hand_delivery", name: "Trao Tận Tay Người Nhận", price: 40000, desc: "Nâng niu gửi trọn yêu thương & bất ngờ chu đáo" },
        { id: "custom_request", name: "Custom Quà Theo Yêu Cầu", price: 35000, desc: "Tự do phối quà theo sở thích, tùy chọn nơ & phụ kiện riêng" }
    ]
};

// BANNERS CAROUSEL (TỰ ĐỘNG CHẠY • VĂN PHONG DỊU DÀNG HỢP VIBE CÁC NÀNG)
const CAROUSEL_BANNERS = [
    {
        id: "bn_snack_flowers",
        tag: "🍭 BỘ SƯU TẬP NGỌT NGÀO",
        badge: "🍬 Ngon & Xinh Xắn",
        title: "Bó Bánh Kẹo & Bó Hoa Len Xinh",
        subtitle: "Bó bánh kẹo ăn được thơm ngon, hoa hồng len móc tay tỉ mỉ & túi hoa mica trong veo siêu xinh",
        image: "images/products/bo_banh_keo_midnight_sweet.jpg",
        actionCategory: "snack_bouquets",
        btnText: "XEM BÓ BÁNH KẸO"
    },
    {
        id: "bn_combos",
        tag: "💖 COMBO CẢM XÚC ĐẶC BIỆT",
        badge: "✨ Bán Chạy Nhất",
        title: "Bó Bánh Kẹo Xanh Ocean Dream",
        subtitle: "Tone màu xanh pastel mơ màng • Bánh kẹo ăn được thơm ngon • Tặng kèm thiệp sáp vintage 0đ",
        image: "images/products/bo_banh_keo_ocean_dream.jpg",
        actionCategory: "snack_bouquets",
        btnText: "KHÁM PHÁ NGAY"
    },
    {
        id: "bn_tui_mica",
        tag: "✨ QUÀ TẶNG BÁN CHẠY",
        badge: "🌸 Đèn Led Lung Linh",
        title: "Túi Hoa Mica Phát Sáng Lung Linh",
        subtitle: "Thiết kế túi trong veo hiện đại kèm hoa nghệ thuật & đèn fairy lights ấm áp",
        image: "images/products/tui_hoa_mica_trongsuot.jpg",
        actionCategory: "flowers_handmade",
        btnText: "KHÁM PHÁ NGAY"
    }
];

// DANH MỤC THANH ĐIỀU HƯỚNG CỐT LÕI (5 MỤC CHUẨN XÁC THEO YÊU CẦU)
const GIFT_CATEGORIES = [
    { id: "home", name: "Trang Chủ", icon: "🏠", isHome: true },
    { id: "combos", name: "Combo", icon: "💖", isHot: true },
    { id: "flowers", name: "Hoa", icon: "💐", isHot: true },
    { id: "mini_gifts", name: "Quà Tặng Mini", icon: "✨" },
    { id: "diy", name: "Custom Hộp Quà", icon: "🎁" }
];

// DATABASE TOÀN BỘ SẢN PHẨM THỰC TẾ (100% ẢNH THẬT, CÓ LOGO TIỆM QUÀ NHÀ BUNNY)
const PRODUCTS_DATABASE = [
    // --- 0. CÁC LOẠI VỎ HỘP CHO GÓC TỰ TAY GÓI QUÀ (CÓ ẢNH THẬT & LOGO BUNNY) ---
    {
        id: "GIFT-BOX-01",
        code: "BOX-SWEET-PINK",
        category: "gift_boxes",
        gender: "nu",
        name: "Hộp Sweet Pink Nơ Lụa",
        subtitle: "Hộp quà hồng pastel thắt nơ satin xinh xắn",
        price: 40000,
        originalPrice: 60000,
        rating: 5.0,
        reviewsCount: 156,
        image: "images/products/hop_qua_sweet_pink.jpg",
        badge: "🎀 Hộp Xinh",
        badgeColor: "bg-rose-500 text-white",
        stock: 50,
        description: "Chiếc hộp quà cứng cáp màu hồng pastel dịu dàng, thắt nơ lụa satin bồng bềnh và dán tem niêm phong logo Tiệm Quà Nhà Bunny.",
        itemsIncluded: [
            "Vỏ hộp quà cứng màu hồng pastel cao cấp nơ satin lụa",
            "Lớp rơm lót lụa mềm mại nâng niu món quà",
            "Dây đèn đom đóm lấp lánh khi mở hộp",
            "Bức thư tay niêm phong sáp đỏ phong cách cổ điển (0đ)"
        ]
    },
    {
        id: "GIFT-BOX-02",
        code: "BOX-ROYAL-GOLD",
        category: "gift_boxes",
        gender: "unisex",
        name: "Hộp Hoàng Gia Gold",
        subtitle: "Hộp quà trắng kem thắt nơ vàng kim sang trọng",
        price: 50000,
        originalPrice: 75000,
        rating: 5.0,
        reviewsCount: 128,
        image: "images/products/hop_qua_royal_cream.jpg",
        badge: "👑 Hộp Sang Xịn",
        badgeColor: "bg-rose-500 text-white",
        stock: 40,
        description: "Chiếc hộp cỡ lớn tone màu trắng kem vân da thanh lịch, thắt nơ ruy băng kép vàng ánh kim óng ả có tem logo Tiệm Quà Nhà Bunny.",
        itemsIncluded: [
            "Vỏ hộp quà cứng cỡ lớn màu trắng kem sang trọng",
            "Nơ ruy băng kép dệt sợi ánh kim hoàng gia",
            "Lớp rơm giấy cao cấp chống sốc nâng đỡ trọn vẹn quà tặng",
            "Bức thư tay niêm phong sáp đỏ cổ điển theo yêu cầu"
        ]
    },
    {
        id: "GIFT-BOX-03",
        code: "BOX-MICA-CLEAR",
        category: "gift_boxes",
        gender: "unisex",
        name: "Hộp Mica Trong Suốt",
        subtitle: "Hộp mica acrylic trong veo nơ lụa satin",
        price: 60000,
        originalPrice: 85000,
        rating: 5.0,
        reviewsCount: 184,
        image: "images/products/hop_qua_mica_trongsuot.jpg",
        badge: "✨ Hộp Mica",
        badgeColor: "bg-rose-500 text-white",
        stock: 35,
        description: "Mẫu hộp mica trong suốt acrylic siêu hot do Tiệm Quà Nhà Bunny thiết kế độc quyền, thắt nơ lụa satin hồng phấn bồng bềnh và dán tem niêm phong logo Bunny.",
        itemsIncluded: [
            "Hộp mica acrylic trong suốt cao cấp chống trầy xước",
            "Nơ lụa satin hồng pastel thắt tay mềm mại",
            "Dây đèn led fairy lights lấp lánh lung linh",
            "Thư tay niêm phong dấu sáp hồng Bunny"
        ]
    },

    // --- 1. BỘ COMBO / SET QUÀ TẶNG ĐÓNG GÓI SẴN (THỰC TẾ 100% TỪ ẢNH CHỤP) ---
    // STT 12: set 2 món (130k/box)
    {
        id: "COMBO-NAM-SPIDERMAN",
        code: "SET-2-MON-SPIDERMAN",
        category: "combo_love",
        gender: "nam",
        badge: "🏎️ Set 2 Món 130K",
        badgeColor: "bg-slate-900 text-white",
        name: "Set 2 Món: Spider-Man & Hoa Hồng",
        subtitle: "Móc treo Spider-Man len + Hoa hồng đỏ nhung túi mica quai da",
        price: 130000,
        originalPrice: 180000,
        rating: 5.0,
        reviewsCount: 286,
        image: "images/products/combo_nam_spiderman_rose.jpeg",
        imagesGallery: [
            "images/products/combo_nam_spiderman_rose.jpeg",
            "images/products/treoxe_spiderman_len.jpg",
            "images/products/hoa_hong_len_handmade.jpg"
        ],
        stock: 35,
        description: "Set quà đóng sẵn dành cho bạn trai: Túi xách mica quai da trắng thắt nơ sang xịn, gồm 1 Móc len Spider-Man treo gương ô tô/balo và 1 Bó hoa hồng nhung đỏ vĩnh cửu đan tay.",
        itemsIncluded: [
            "Túi xách mica acrylic trong suốt quai da trắng sang trọng",
            "1 Dây treo gương ô tô / balo Người Nhện Spider-Man len đan tay",
            "1 Bó hoa hồng len nhung đỏ vĩnh cửu nơ kem phong cách Hàn Quốc",
            "Lớp rơm giấy bảo vệ pastel êm ái",
            "Thư tay niêm phong dấu sáp gửi bạn trai nắn nót (0đ)"
        ],
        specifications: {
            "Phân loại": "Set 2 Món Đóng Sẵn",
            "Mục đích tặng": "Tặng bạn trai, người yêu nam, sinh nhật chàng, kỷ niệm ngày yêu",
            "Công dụng": "Treo gương chiếu hậu ô tô, treo balo hoặc trưng bày bàn làm việc",
            "Độ bền": "100% sợi len cotton cao cấp bền đẹp mãi mãi"
        }
    },
    // STT 11: set 3 món (250k/box)
    {
        id: "COMBO-NU-BUNNY-PRINCESS",
        code: "SET-3-MON-BUNNY-PRINCESS",
        category: "combo_love",
        gender: "nu",
        badge: "👑 Set 3 Món 250K",
        badgeColor: "bg-rose-500 text-white",
        name: "Set 3 Món: Thỏ Công Chúa & Tranh Hoa",
        subtitle: "Bé Thỏ Bunny dạ hội + Khung hoa đất sét 3D + Kẹp tóc cánh bướm",
        price: 250000,
        originalPrice: 320000,
        rating: 5.0,
        reviewsCount: 398,
        image: "images/products/combo_nu_bunny_princess_box.jpeg",
        imagesGallery: [
            "images/products/combo_nu_bunny_princess_box.jpeg",
            "images/products/tho_bunny_congchua_len.jpg",
            "images/products/khung_tranh_hoa_datset_3d.jpg",
            "images/products/keptoc_buom_kemnhung_hong.jpeg"
        ],
        stock: 25,
        description: "Set quà 3 món đóng sẵn trong hộp kraft lót lụa hồng: Bé Thỏ Bunny Len đầm dạ hội bồng bềnh viền ren trắng, Khung tranh hoa đất sét nổi 3D lồng kính và Kẹp tóc cánh bướm hoa kẽm nhung hồng.",
        itemsIncluded: [
            "Hộp quà kraft nắp gài lót lụa hồng satin cao cấp",
            "1 Bé Thỏ Bunny Len mặc đầm dạ hội đội mũ ren đeo kính vintage",
            "1 Khung tranh hoa đất sét nặn nổi 3D 'Happy Birthday' lồng kính",
            "1 Kẹp tóc cánh bướm hoa nhung kẽm thủ công mềm mại",
            "Thẻ tag thắt nơ lụa satin + Thiệp sáp viết tay"
        ],
        specifications: {
            "Phân loại": "Set 3 Món Đóng Sẵn",
            "Mục đích tặng": "Mừng sinh nhật bạn gái, kỷ niệm ngày yêu, quà 20/10, tỏ tình nàng thơ",
            "Linh vật": "Thỏ Bunny độc quyền chính hãng Nhà Bunny",
            "Bảo quản": "Lưu giữ kỷ niệm suốt nhiều năm không phai tàn"
        }
    },
    // STT 11: set 3 món (250k/box)
    {
        id: "COMBO-NU-TUANLOC-WINTER",
        code: "SET-3-MON-TUANLOC-WINTER",
        category: "combo_love",
        gender: "nu",
        badge: "❄️ Set 3 Món 250K",
        badgeColor: "bg-rose-600 text-white",
        name: "Set 3 Món: Tuần Lộc Len & Hoa Hồng",
        subtitle: "Tuần lộc len mũi đỏ đế xoay gỗ + Bó hoa hồng đỏ + Kẹp tóc bướm",
        price: 250000,
        originalPrice: 320000,
        rating: 5.0,
        reviewsCount: 345,
        image: "images/products/combo_nu_tuanloc_rose_box.jpeg",
        imagesGallery: [
            "images/products/combo_nu_tuanloc_rose_box.jpeg",
            "images/products/tuan_loc_len_de_go.jpg",
            "images/products/hoa_hong_len_handmade.jpg",
            "images/products/keptoc_buom_kemnhung_hong.jpeg"
        ],
        stock: 30,
        description: "Set quà 3 món mùa đông ấm áp: Hộp kraft thơm rơm gỗ, Chú tuần lộc len mũi đỏ khăn choàng xanh đứng trên đế gỗ tự nhiên, Bó hoa hồng nhung đỏ đan tay vĩnh cửu và Kẹp tóc cánh bướm hoa nhung kẽm.",
        itemsIncluded: [
            "Hộp quà kraft tự nhiên lót rơm gỗ chống sốc thơm nhẹ",
            "1 Chú tuần lộc len mũi đỏ đan tay đế gỗ tự nhiên",
            "1 Bó hoa hồng len nhung đỏ thắt nơ kem 'Made with love'",
            "Kẹp tóc cánh bướm hoa nhung kẽm hồng phấn tiểu thư",
            "Thiệp sáp niêm phong phong cách châu Âu cổ điển"
        ],
        specifications: {
            "Phân loại": "Set 3 Món Đóng Sẵn",
            "Mục đích tặng": "Mùa đông, lễ Giáng Sinh Noel, sinh nhật bạn gái, làm lành",
            "Chất liệu": "Len cotton tự nhiên, gỗ mộc và kẽm nhung cao cấp",
            "Giao hàng": "Giao hỏa tốc 2 giờ nội thành Hà Nội"
        }
    },
    // STT 10: box xe (200k/box - đồ riêng lẻ)
    {
        id: "PRD-LAMBO-LIBERTY",
        code: "BOX-XE-LAMBORGHINI",
        category: "mini_gifts",
        gender: "nam",
        badge: "🏎️ Box Xe 200K",
        badgeColor: "bg-slate-900 text-white",
        name: "Box Xe: Sa Bàn Lamborghini",
        subtitle: "Mô hình siêu xe trên bãi cỏ hoa anh đào & ghế đá công viên",
        price: 200000,
        originalPrice: 260000,
        rating: 5.0,
        reviewsCount: 312,
        image: "images/products/saban_sieuxe_lamborghini.webp",
        imagesGallery: ["images/products/saban_sieuxe_lamborghini.webp"],
        stock: 20,
        description: "Món quà tuyệt phẩm đánh trúng niềm đam mê tốc độ của phái mạnh: Sa bàn diorama mô phỏng góc công viên mùa xuân với 2 tán cây hoa anh đào rực rỡ, ghế đá tĩnh lặng và chiếc siêu xe thể thao Lamborghini màu đen tuyền độ bodykit cực chiến trong hộp mica trong suốt.",
        itemsIncluded: [
            "1 Sa bàn diorama hoàn thiện kích thước 20x12cm",
            "1 Mô hình siêu xe Lamborghini kim loại đen nhám chi tiết cao",
            "2 Cây hoa anh đào tán xòe hoa nở rực rỡ",
            "1 Ghế đá công viên thu nhỏ + thảm cỏ tự nhiên",
            "Hộp mica chống bụi bảo vệ sa bàn trong suốt"
        ],
        specifications: {
            "Phân loại": "Box Xe Hoàn Thiện",
            "Dành cho": "Bạn trai, nam giới mê xe, decor góc làm việc",
            "Tỷ lệ mô hình": "1:64 chi tiết sắc nét",
            "Chất liệu": "Khung acrylic, xe hợp kim diecast sơn tĩnh điện"
        }
    },

    // --- 2. BÓ HOA BÁNH KẸO (STT 8: hoa kẹo - 150k/bó) ---
    {
        id: "SNK-MIDNIGHT-RED",
        code: "SNK-POCKY-KITKAT-RED",
        category: "snack_bouquets",
        gender: "nam",
        badge: "🍭 Hoa Kẹo 150K",
        badgeColor: "bg-rose-600 text-white",
        name: "Hoa Kẹo: Midnight Sweet",
        subtitle: "Bó bánh kẹo cá tính phong cách đỏ đen hiện đại",
        price: 150000,
        originalPrice: 190000,
        rating: 5.0,
        reviewsCount: 342,
        image: "images/products/bo_banh_keo_midnight_sweet.jpg",
        imagesGallery: [
            "images/products/bo_banh_keo_midnight_sweet.jpg",
            "images/products/bo_banh_keo_ocean_dream.jpg",
            "images/products/hop_banh_keo_matcha_garden.jpg"
        ],
        stock: 45,
        description: "Bó hoa bánh kẹo Midnight Sweet mang tone màu Đỏ - Đen cá tính và quyến rũ. Tuyển chọn các loại bánh kẹo thơm ngon: Pocky Chocolate, KitKat thanh, bánh gấu Hello Panda và socola DARS Nhật Bản.",
        itemsIncluded: [
            "1 Hộp bánh que Pocky Chocolate giòn rụm",
            "2 Thanh socola KitKat vị truyền thống thơm béo",
            "1 Hộp socola DARS Milk Chocolate Nhật Bản",
            "1 Hộp bánh gấu Meiji Hello Panda nhân socola",
            "Giấy gói nhún đen xếp lớp + Nơ ruy băng kép"
        ],
        specifications: {
            "Phân loại": "Bó Hoa Kẹo",
            "Tone màu": "Đỏ nhung & Đen huyền bí",
            "Hạn dùng": "Bánh kẹo date mới tinh, tối thiểu 6 tháng"
        }
    },
    {
        id: "SNK-MATCHA-BOX",
        code: "SNK-BINGGRAE-PISTACHIO",
        category: "snack_bouquets",
        gender: "unisex",
        badge: "🥑 Hoa Kẹo 150K",
        badgeColor: "bg-emerald-600 text-white",
        name: "Hoa Kẹo: Matcha Garden",
        subtitle: "Bó hoa bánh kẹo tone xanh bơ dịu mát ngọt ngào",
        price: 150000,
        originalPrice: 190000,
        rating: 5.0,
        reviewsCount: 289,
        image: "images/products/hop_banh_keo_matcha_garden.jpg",
        imagesGallery: [
            "images/products/hop_banh_keo_matcha_garden.jpg",
            "images/products/bo_banh_keo_midnight_sweet.jpg"
        ],
        stock: 38,
        description: "Hộp quà bánh kẹo Matcha Garden tone xanh bơ dịu mát với sữa tươi dưa lưới Binggrae Hàn Quốc, bánh gấu Koala, socola DARS trà xanh và kẹo mút dưa hấu thanh mát.",
        itemsIncluded: [
            "Hộp cắm nghệ thuật phối voan nơ ruy băng xanh bơ",
            "1 Hộp sữa tươi dưa lưới Binggrae Melon Hàn Quốc",
            "1 Hộp bánh gấu Koala's March nhân socola",
            "1 Hộp socola DARS vị trà xanh Nhật Bản",
            "1 KitKat Matcha + Kẹo mút trái tim"
        ],
        specifications: {
            "Phân loại": "Hoa Kẹo Nghệ Thuật",
            "Tone màu": "Xanh bơ & Trắng sữa dịu mát",
            "Hạn dùng": "Chuẩn date mới nhất, an tâm thưởng thức"
        }
    },
    {
        id: "SNK-OCEAN-BLUE",
        code: "SNK-PEPERO-PILLOWS",
        category: "snack_bouquets",
        gender: "nam",
        badge: "🌊 Hoa Kẹo 150K",
        badgeColor: "bg-sky-500 text-white",
        name: "Hoa Kẹo: Ocean Dream",
        subtitle: "Bó bánh kẹo tone xanh mây trời thanh lịch dịu mát",
        price: 150000,
        originalPrice: 190000,
        rating: 4.9,
        reviewsCount: 315,
        image: "images/products/bo_banh_keo_ocean_dream.jpg",
        imagesGallery: [
            "images/products/bo_banh_keo_ocean_dream.jpg",
            "images/products/bo_banh_keo_midnight_sweet.jpg"
        ],
        stock: 40,
        description: "Lấy cảm hứng từ mây trời và đại dương, bó bánh kẹo Ocean Dream kết hợp giữa sắc xanh baby blue và trắng tinh khôi: bánh que Pepero hạnh nhân, bánh gối Pillows kem vani giòn tan.",
        itemsIncluded: [
            "1 Hộp bánh que Pepero hạnh nhân tuyết hảo hạng",
            "1 Gói bánh gối Oishi Pillows vị Cookies & Kem Vani",
            "1 Ly bánh que chấm kem socola thơm bùi",
            "Giấy gói xòe trắng viền voan xanh pastel + Nơ navy",
            "Thiệp chúc mừng viết tay cổ điển"
        ],
        specifications: {
            "Phân loại": "Bó Hoa Kẹo",
            "Tone màu": "Xanh baby pastel & Trắng sữa",
            "Kích thước": "Chiều cao 50cm, xòe rộng 35cm"
        }
    },

    // --- 3. HOA NGHỆ THUẬT & HOA LEN ---
    // STT 4: hoa len (40k/bông)
    {
        id: "FLW-CROCHET-ROSE",
        code: "FLW-HANDMADE-RED-ROSE",
        category: "flowers_handmade",
        gender: "nu",
        badge: "🧶 Hoa Len 40K",
        badgeColor: "bg-rose-600 text-white",
        name: "Hoa Len: Bông Hồng Đỏ Nhung",
        subtitle: "Đóa hoa hồng đỏ nhung đan tay vĩnh cửu không bao giờ tàn",
        price: 40000,
        originalPrice: 55000,
        rating: 5.0,
        reviewsCount: 528,
        image: "images/products/hoa_hong_len_handmade.jpg",
        imagesGallery: [
            "images/products/hoa_hong_len_handmade.jpg",
            "images/products/hoa_len_cupcake_mini.jpg"
        ],
        stock: 50,
        description: "Được móc bằng tay 100% từ những sợi len cotton mềm mại, từng cánh hoa hồng đỏ nhung bung nở kiêu sa bên tán lá xanh mướt, gói giấy mờ viền be Hàn Quốc thắt nơ lụa kem.",
        itemsIncluded: [
            "1 Bông hoa hồng đỏ nhung đan len thủ công kèm cành lá",
            "Giấy gói mờ viền be phong cách Hàn Quốc dịu dàng",
            "Nơ ruy băng lụa satin màu kem sang trọng",
            "Tag kraft dập chữ thủ công xinh xắn"
        ],
        specifications: {
            "Phân loại": "Hoa Len Đan Tay",
            "Chất liệu": "Sợi cotton loại 1 êm mịn, không xù lông",
            "Chiều dài": "35cm",
            "Độ bền": "Vĩnh viễn không phai tàn"
        }
    },
    // STT 4: hoa len (40k/bông)
    {
        id: "FLW-CUPCAKE-MINI",
        code: "FLW-CROCHET-CUPCAKE",
        category: "flowers_handmade",
        gender: "nu",
        badge: "🧁 Hoa Len 40K",
        badgeColor: "bg-pink-500 text-white",
        name: "Hoa Len: Bó Cupcake Mini",
        subtitle: "Đan len tí hon dáng cupcake để bàn học & làm móc khóa",
        price: 40000,
        originalPrice: 55000,
        rating: 4.9,
        reviewsCount: 380,
        image: "images/products/hoa_len_cupcake_mini.jpg",
        imagesGallery: [
            "images/products/hoa_len_cupcake_mini.jpg",
            "images/products/hoa_hong_len_handmade.jpg"
        ],
        stock: 60,
        description: "Chiếc bó hoa len tí hon dáng bánh cupcake siêu cưng được đan móc thủ công tỉ mỉ từng chi tiết, viền bèo ren len trắng kem bồng bềnh và nơ len hồng xinh xắn.",
        itemsIncluded: [
            "1 Bó hoa len cupcake mini đan thủ công",
            "Dây móc khóa kim loại mạ vàng đi kèm (tháo lắp linh hoạt)",
            "Hộp giấy kiếng bảo vệ + Túi quà mini Bunny"
        ],
        specifications: {
            "Phân loại": "Hoa Len Mini",
            "Kích thước": "Khoảng 9 x 7 cm",
            "Chất liệu": "Len sợi cotton cao cấp êm mịn"
        }
    },
    // STT 5: hoa thật (30k/bông)
    {
        id: "FLW-PASTEL-01",
        code: "FLW-SINGLE-PASTEL",
        category: "flowers_handmade",
        gender: "nu",
        badge: "🌸 Hoa Thật 30K",
        badgeColor: "bg-rose-400 text-white",
        name: "Hoa Thật: Bông Đơn Pastel",
        subtitle: "Bó hoa 1 bông tinh tế gói giấy lụa mờ phong cách Hàn Quốc",
        price: 30000,
        originalPrice: 45000,
        rating: 4.9,
        reviewsCount: 410,
        image: "images/products/hoa_don_pastel_1bong.jpg",
        imagesGallery: [
            "images/products/hoa_don_pastel_1bong.jpg",
            "images/products/hoa_hong_len_handmade.jpg"
        ],
        stock: 65,
        description: "Một bông hoa đồng tiền hồng san hô rực rỡ gói ghém trong giấy lụa mờ pastel trắng kem phong cách Hàn Quốc, đính kèm tag chữ và dây nơ thanh mảnh.",
        itemsIncluded: [
            "1 Bông hoa đơn nghệ thuật màu hồng san hô tinh tế",
            "Giấy gói lụa mờ 2 lớp chống thấm phong cách Hàn Quốc",
            "Tag chữ trang trí nơ lụa cao cấp",
            "Dây nơ sợi mảnh thanh lịch + Thiệp nhỏ viết tay"
        ],
        specifications: {
            "Phân loại": "Hoa Thật 1 Bông",
            "Chiều cao bó hoa": "Khoảng 38-40cm",
            "Phong cách": "Hàn Quốc nhẹ nhàng, thanh thoát"
        }
    },
    // STT 6: box hoa (90k/hộp)
    {
        id: "BOX-MICA-SUN",
        code: "BOX-MICA-GOLDEN-SUN",
        category: "flowers_handmade",
        gender: "nu",
        badge: "✨ Box Hoa 90K",
        badgeColor: "bg-rose-500 text-white",
        name: "Box Hoa: Mica Golden Sun",
        subtitle: "Hộp mica trong veo cao cấp kèm hoa vĩnh cửu tone vàng kem",
        price: 90000,
        originalPrice: 120000,
        rating: 5.0,
        reviewsCount: 462,
        image: "images/products/tui_hoa_mica_trongsuot.jpg",
        imagesGallery: [
            "images/products/tui_hoa_mica_trongsuot.jpg",
            "images/products/khung_tranh_hoa_datset_3d.jpg"
        ],
        stock: 30,
        description: "Chiếc hộp túi xách mica acrylic trong suốt dày dặn với thiết kế quai xách hiện đại, thắt nơ ruy băng trắng, bên trong là cụm hoa vĩnh cửu và hoa baby khô tone vàng kem ấm áp.",
        itemsIncluded: [
            "1 Hộp túi xách mica acrylic trong suốt cao cấp có quai xách",
            "Cụm hoa vĩnh cửu: hoa hồng sáp trắng, hoa baby khô, cỏ đuôi thỏ",
            "Dây nơ ruy băng lụa satin trắng sang trọng",
            "Thiệp viết tay Bunny phong cách cổ điển niêm phong sáp"
        ],
        specifications: {
            "Phân loại": "Box Hoa Vĩnh Cửu",
            "Kích thước hộp": "20 x 18 x 9 cm",
            "Thời gian lưu giữ": "Từ 3 - 5 năm không phai tàn"
        }
    },
    // STT 7: khung tranh hoa (60k/chiếc)
    {
        id: "FRAME-CLAY-3D",
        code: "FRAME-CLAY-BDAY-3D",
        category: "flowers_handmade",
        gender: "nu",
        badge: "🎨 Tranh Hoa 60K",
        badgeColor: "bg-pink-600 text-white",
        name: "Khung Tranh Hoa: Đất Sét 3D",
        subtitle: "Khung gỗ sâu lồng kính hoa đất sét nổi 3D kèm cánh bướm",
        price: 60000,
        originalPrice: 85000,
        rating: 5.0,
        reviewsCount: 395,
        image: "images/products/khung_tranh_hoa_datset_3d.jpg",
        imagesGallery: [
            "images/products/khung_tranh_hoa_datset_3d.jpg",
            "images/products/tui_hoa_mica_trongsuot.jpg"
        ],
        stock: 25,
        description: "Tác phẩm nghệ thuật độc bản được nặn từng cánh hoa đất sét mềm mại, hoa hồng pastel, cẩm tú cầu và cánh bướm 3D lấp lánh trong khung gỗ sâu lòng có kính bảo vệ.",
        itemsIncluded: [
            "1 Khung tranh gỗ tự nhiên sâu lòng có mặt kính bảo vệ",
            "Cụm hoa đất sét tạo hình nổi 3D thủ công đa sắc màu",
            "Cánh bướm 3D đính pha lê lấp lánh",
            "Bản thiệp chúc mừng sinh nhật vẽ tay nghệ thuật"
        ],
        specifications: {
            "Phân loại": "Khung Tranh Hoa 3D",
            "Kích thước khung": "23 x 18 x 4.5 cm",
            "Chất liệu": "Đất sét cao cấp giữ màu sắc bền lâu vĩnh viễn"
        }
    },

    // --- 4. GẤU LEN, KẸP TÓC & PHỤ KIỆN MINI ---
    // STT 9: kẹp tóc (70k/chiếc)
    {
        id: "PRD-KEPTOC-BUOM-NHUNG",
        code: "HAIR-BUTTERFLY-VELVET",
        category: "mini_gifts",
        gender: "nu",
        badge: "🦋 Kẹp Tóc 70K",
        badgeColor: "bg-pink-500 text-white",
        name: "Kẹp Tóc: Cánh Bướm Nhung Hồng",
        subtitle: "Cánh bướm nhung kẽm uốn lượn mềm mịn phối chùm hoa rủ",
        price: 70000,
        originalPrice: 95000,
        rating: 4.9,
        reviewsCount: 385,
        image: "images/products/keptoc_buom_kemnhung_hong.jpeg",
        imagesGallery: ["images/products/keptoc_buom_kemnhung_hong.jpeg"],
        stock: 60,
        description: "Kẹp tóc tạo hình cánh bướm nghệ thuật từ sợi kẽm nhung cao cấp mềm mịn như cánh hoa thật. Từng đường gân cánh bướm uốn lượn sống động, điểm xuyết chùm hoa nhung nhỏ và dây tua rua rủ.",
        itemsIncluded: [
            "1 Kẹp tóc cánh bướm hoa nhung kẽm thủ công",
            "Xương kẹp kim loại chống gỉ bám tóc chắc chắn",
            "Túi zip hồng pastel bảo quản"
        ],
        specifications: {
            "Phân loại": "Kẹp Tóc Handmade",
            "Kích thước": "Cánh bướm rộng 12cm, tua rua dài 14cm",
            "Chất liệu": "Kẽm nhung loại 1 siêu mềm mịn không rụng lông"
        }
    },
    // STT 3: gấu len lớn (150k/con)
    {
        id: "PRD-THO-BUNNY-PRINCESS",
        code: "PLUSH-BUNNY-PRINCESS-LEN",
        category: "mini_gifts",
        gender: "nu",
        badge: "👑 Gấu Len Lớn",
        badgeColor: "bg-rose-500 text-white",
        name: "Gấu Len Lớn: Thỏ Công Chúa",
        subtitle: "Đầm dạ hội ren bồng bềnh, mũ bonnet ren & kính tròn tri thức",
        price: 150000,
        originalPrice: 200000,
        rating: 5.0,
        reviewsCount: 520,
        image: "images/products/tho_bunny_congchua_len.jpg",
        imagesGallery: ["images/products/tho_bunny_congchua_len.jpg"],
        stock: 30,
        description: "Tác phẩm thủ công mang tính biểu tượng của Tiệm Quà Nhà Bunny: Bé thỏ Bunny đan len trắng muốt, khoác lên mình chiếc đầm dạ hội màu cam hồng viền ren bồng bềnh và chiếc mũ bonnet ren vintage.",
        itemsIncluded: [
            "1 Bé Thỏ Bunny Len đan tay tỉ mỉ độc quyền",
            "Đầm xòe ren tiểu thư + Mũ bonnet ren có dây thắt nơ",
            "Mắt kính tròn kim loại vintage",
            "Hộp mica trong suốt trưng bày cao cấp"
        ],
        specifications: {
            "Phân loại": "Gấu Len Lớn",
            "Chiều cao": "Khoảng 18cm",
            "Chất liệu": "100% sợi len cotton hữu cơ, ren lụa mềm"
        }
    },
    // STT 2: gấu len vừa (80k/con)
    {
        id: "PRD-TUANLOC-DE-GO",
        code: "DECOR-REINDEER-WOOD",
        category: "mini_gifts",
        gender: "nu",
        badge: "🦌 Gấu Len Vừa",
        badgeColor: "bg-amber-700 text-white",
        name: "Gấu Len Vừa: Tuần Lộc Mũi Đỏ",
        subtitle: "Đan len mũi đỏ tròn xoe, khăn xanh ấm áp trên đế gỗ tự nhiên",
        price: 80000,
        originalPrice: 110000,
        rating: 5.0,
        reviewsCount: 295,
        image: "images/products/tuan_loc_len_de_go.jpg",
        imagesGallery: ["images/products/tuan_loc_len_de_go.jpg"],
        stock: 35,
        description: "Chú tuần lộc nhỏ bằng len mang không khí Giáng Sinh và mùa đông ấm áp: Bộ lông len nâu mộc mạc, cặp sừng nhỏ xinh, chiếc mũi đỏ tròn xoe và chiếc khăn len xanh lá trên đế gỗ tròn tự nhiên.",
        itemsIncluded: [
            "1 Chú tuần lộc len đan tay thủ công nguyên con",
            "Đế đứng bằng gỗ tự nhiên cao cấp",
            "Hộp kraft quà tặng thắt nơ"
        ],
        specifications: {
            "Phân loại": "Gấu Len Vừa",
            "Chiều cao": "Khoảng 14cm",
            "Chất liệu": "Len sợi cotton tự nhiên, đế gỗ mộc"
        }
    },
    // STT 2: gấu len vừa (80k/con)
    {
        id: "PRD-TREOXE-SPIDERMAN",
        code: "KEY-SPIDERMAN-CROCHET",
        category: "mini_gifts",
        gender: "nam",
        badge: "🕷️ Gấu Len Vừa",
        badgeColor: "bg-rose-700 text-white",
        name: "Gấu Len Vừa: Spider-Man",
        subtitle: "Móc treo ô tô & balo Spider-Man len thủ công Marvel cá tính",
        price: 80000,
        originalPrice: 110000,
        rating: 5.0,
        reviewsCount: 428,
        image: "images/products/treoxe_spiderman_len.jpg",
        imagesGallery: ["images/products/treoxe_spiderman_len.jpg"],
        stock: 50,
        description: "Móc treo hình mặt nạ Người Nhện Spider-Man đan bằng len cotton cao cấp màu đen phối đỏ với đôi mắt trắng sắc nét, có dây treo điều chỉnh độ dài treo gương chiếu hậu ô tô hoặc balo.",
        itemsIncluded: [
            "1 Móc treo Spider-Man len đan tay thủ công",
            "Dây treo len cotton bền chắc điều chỉnh được độ dài",
            "Hộp kiếng mini bảo vệ quà xinh xắn"
        ],
        specifications: {
            "Phân loại": "Gấu Len Vừa",
            "Chất liệu": "Len cotton mềm mịn, không phai màu",
            "Công dụng": "Treo gương chiếu hậu ô tô, treo balo máy tính, chìa khóa"
        }
    },
    // STT 2: gấu len vừa (80k/con)
    {
        id: "PRD-SAU-LARVA-DEOKINH",
        code: "TROLL-LARVA-GLASSES",
        category: "mini_gifts",
        gender: "unisex",
        badge: "😂 Gấu Len Vừa",
        badgeColor: "bg-amber-600 text-white",
        name: "Gấu Len Vừa: Sâu Larva Kính Ngố",
        subtitle: "Ấu trùng vàng há hốc mồm cười toe toét đeo kính ngố xả stress",
        price: 80000,
        originalPrice: 110000,
        rating: 4.9,
        reviewsCount: 320,
        image: "images/products/len_sau_larva_deo_kinh.jpg",
        imagesGallery: ["images/products/len_sau_larva_deo_kinh.jpg"],
        stock: 35,
        description: "Chú sâu Larva vàng béo ú đeo cặp kính cận gọng đen, há to miệng với chiếc lưỡi đỏ lè cười hết nấc, đem lại tràng cười sảng khoái xả stress thi cử.",
        itemsIncluded: [
            "1 Chú sâu Larva vàng len đan tay nguyên khối",
            "Cặp kính cận gọng tròn tháo lắp được",
            "Hộp quà kraft vui nhộn kèm thiệp troll hài hước"
        ],
        specifications: {
            "Phân loại": "Gấu Len Vừa",
            "Chiều cao": "Khoảng 16cm",
            "Chất liệu": "Len sợi xù êm ái, nhồi bông gòn êm"
        }
    },
    // STT 2: gấu len vừa (80k/con)
    {
        id: "PRD-ZOOTOPIA-COUPLE",
        code: "COUPLE-ZOOTOPIA-JUDY-NICK",
        category: "mini_gifts",
        gender: "couple",
        badge: "🦊🐰 Gấu Len Vừa",
        badgeColor: "bg-rose-500 text-white",
        name: "Gấu Len Vừa: Cặp Đôi Zootopia",
        subtitle: "Cặp đôi Thỏ Judy Hopps & Cáo Nick Wilde đan len siêu cưng",
        price: 80000,
        originalPrice: 110000,
        rating: 5.0,
        reviewsCount: 468,
        image: "images/products/capdoi_zootopia_len.jpg",
        imagesGallery: ["images/products/capdoi_zootopia_len.jpg"],
        stock: 40,
        description: "Bộ đôi Thỏ cảnh sát Judy Hopps và Cáo Nick Wilde đan móc thủ công tỉ mỉ nằm gọn trong lòng bàn tay. Món quà tình yêu hoàn hảo: Nàng giữ Judy, Chàng giữ Nick.",
        itemsIncluded: [
            "1 Bé thú len Zootopia đan tay thủ công (hoặc cặp đôi)",
            "Dây móc khóa kim loại cao cấp",
            "Hộp quà mini lót rơm thắt nơ đỏ xinh xắn"
        ],
        specifications: {
            "Phân loại": "Gấu Len Vừa",
            "Kích thước": "Khoảng 8cm",
            "Ý nghĩa": "Tín vật tình yêu gắn kết bền chặt đôi lứa"
        }
    },
    // STT 1: gấu len bé (40k/con)
    {
        id: "PRD-TREOXE-BOXING",
        code: "KEY-BOXING-GLOVES",
        category: "mini_gifts",
        gender: "nam",
        badge: "🥊 Gấu Len Bé",
        badgeColor: "bg-slate-800 text-white",
        name: "Gấu Len Bé: Găng Boxing",
        subtitle: "Cặp găng tay đấm bốc len móc tay khỏe khoắn cho chàng",
        price: 40000,
        originalPrice: 60000,
        rating: 4.9,
        reviewsCount: 236,
        image: "images/products/treoxe_boxing_len.jpg",
        imagesGallery: ["images/products/treoxe_boxing_len.jpg"],
        stock: 40,
        description: "Cặp găng tay boxing len cotton màu đen - trắng mang phong cách thể thao, mạnh mẽ. Rất thích hợp làm món quà nhỏ cổ vũ tinh thần bạn trai tập gym, mê thể thao.",
        itemsIncluded: [
            "1 Cặp găng tay đấm bốc boxing len móc tay",
            "Dây treo đôi len trắng bện chắc chắn",
            "Túi zip bảo vệ chống bụi"
        ],
        specifications: {
            "Phân loại": "Gấu Len Bé",
            "Kích thước": "Mỗi găng tay khoảng 6cm",
            "Chất liệu": "Len sợi cotton bền bỉ, êm ái"
        }
    },
    // STT 1: gấu len bé (40k/con)
    {
        id: "PRD-LEN-POCHACCO-SPORT",
        code: "PLUSH-POCHACCO-BASEBALL",
        category: "mini_gifts",
        gender: "nam",
        badge: "⚾ Gấu Len Bé",
        badgeColor: "bg-sky-600 text-white",
        name: "Gấu Len Bé: Pochacco Bóng Chày",
        subtitle: "Bé len tròn xoe đội nón xanh, đeo túi chéo & gậy bóng chày",
        price: 40000,
        originalPrice: 60000,
        rating: 5.0,
        reviewsCount: 310,
        image: "images/products/len_pochacco_baseball.jpg",
        imagesGallery: ["images/products/len_pochacco_baseball.jpg"],
        stock: 35,
        description: "Chú bé len tròn xoe mũm mĩm với má hồng phúng phính, đội chiếc nón lưỡi trai xanh chữ P phong cách bóng chày, đeo túi chéo xinh xắn và cầm gậy bóng chày cùng trái bóng đỏ.",
        itemsIncluded: [
            "1 Bé thú len bóng chày Pochacco đan tay nguyên khối",
            "Phụ kiện: nón xanh, gậy bóng chày, bóng đỏ, túi chéo",
            "Đế đứng mini để bàn trang trí"
        ],
        specifications: {
            "Phân loại": "Gấu Len Bé",
            "Chiều cao": "Khoảng 10cm",
            "Chất liệu": "Len bông sữa cotton êm mịn an toàn"
        }
    }
];

const SAMPLE_LETTERS = [
    {
        id: "LTR-TO-TINH-01",
        category: "to_tinh",
        title: "Tỏ Tình Lãng Mạn — 'Thế Giới Của Tớ Dịu Dàng Khi Có Cậu'",
        content: `Gửi cậu,\n\nCó những điều nếu hôm nay tớ không can đảm nói ra, tớ sợ mình sẽ hối tiếc rất lâu. Giữa hàng triệu người ngoài kia, tớ cảm thấy may mắn vô cùng vì đã gặp được cậu.\n\nCậu xuất hiện và làm những ngày bình thường của tớ trở nên lấp lánh hơn. Cho tớ một cơ hội được chăm sóc, che chở và đồng hành cùng cậu trên chặng đường phía trước nhé? ❤️`
    },
    {
        id: "LTR-XIN-LOI-01",
        category: "xin_loi",
        title: "Xin Lỗi Người Yêu — 'Anh Sai Rồi, Đừng Giận Anh Nữa Nhé'",
        content: `Em yêu à,\n\nAnh biết mấy hôm nay anh đã làm em buồn và thất vọng nhiều. Nhìn em im lặng và lạnh lùng, lòng anh khó chịu và ân hận vô cùng. Anh không tìm lý do để bao biện, anh chỉ muốn nhận tất cả lỗi lầm về mình.\n\nChiếc hộp quà này gửi tới em cùng hộp bánh kẹo ngọt ngào và những tấm thẻ miễn tội. Em hãy phạt anh bằng bất cứ cách nào em muốn, nhưng đừng giận anh nữa nhé! 🥺❤️`
    },
    {
        id: "LTR-BDAY-01",
        category: "sinh_nhat",
        title: "Chúc Mừng Sinh Nhật — 'Rực Rỡ Như Ánh Ban Mai'",
        content: `Chúc mừng sinh nhật người đặc biệt nhất!\n\nChúc cậu một tuổi mới ngập tràn nụ cười, nhiều niềm vui và luôn giữ được sự lạc quan, rạng rỡ. Bức tranh hoa đất sét này mong sẽ luôn nhắc nhở cậu rằng: cậu luôn xứng đáng với những điều tốt đẹp nhất trần đời! 🎂✨`
    },
    {
        id: "LTR-KY-NIEM-01",
        category: "ky_niem",
        title: "Kỷ Niệm Ngày Yêu — 'Cảm Ơn Vì Đã Cùng Nhau Đi Qua'",
        content: `Cảm ơn em vì đã đến bên anh, cùng anh chia sẻ từng khoảnh khắc buồn vui trong cuộc sống. Mỗi ngày trôi qua có em là một ngày tuyệt vời. Chúc cho tình yêu của chúng ta sẽ luôn tươi mới và bền chặt như những đóa hoa vĩnh cửu này! 💖`
    }
];

// CẢM NHẬN CỦA KHÁCH YÊU
const CUSTOMER_REVIEWS = [
    {
        id: "REV-01",
        name: "Hoàng Minh (Cầu Giấy, Hà Nội)",
        avatar: "images/logo_bunny.jpg",
        tag: "Tặng Bạn Trai Bất Ngờ",
        comboUsed: "Set 2 Món: Spider-Man & Hoa Hồng",
        rating: 5,
        time: "Hôm qua",
        content: "Mình đặt set 2 món Spider-Man và hoa hồng len tặng bạn trai nhân dịp kỷ niệm. Bạn ấy thích mê chiếc móc treo gương ô tô Người Nhện! Giao hỏa tốc đúng giờ, đóng gói túi mica quai da cực sang chảnh."
    },
    {
        id: "REV-02",
        name: "Quốc Tuấn (Đống Đa, Hà Nội)",
        avatar: "images/logo_bunny.jpg",
        tag: "Tặng Bạn Gái Nàng Thơ",
        comboUsed: "Set 3 Món: Thỏ Công Chúa & Tranh Hoa",
        rating: 5,
        time: "2 ngày trước",
        content: "Hộp quà Thỏ Công Chúa đầm dạ hội và tranh hoa đất sét 3D quá xuất sắc! Bạn gái mình mở ra khen nức nở vì độ tinh xảo của đồ len và khung tranh. Rất đáng tiền!"
    },
    {
        id: "REV-03",
        name: "Thanh Trúc (Hoàn Kiếm, Hà Nội)",
        avatar: "images/logo_bunny.jpg",
        tag: "Quà Tặng Bạn Trai",
        comboUsed: "Box Xe: Sa Bàn Lamborghini",
        rating: 5,
        time: "Tuần trước",
        content: "Sa bàn siêu xe Lamborghini Liberty Walk với hàng cây anh đào và ghế đá để bàn làm việc nhìn chiến dã man! Bạn trai mình mê xe nhận được set này thích đến mất ngủ."
    },
    {
        id: "REV-04",
        name: "Mai Linh (Hai Bà Trưng, Hà Nội)",
        avatar: "images/logo_bunny.jpg",
        tag: "Ấm Áp Mùa Đông",
        comboUsed: "Set 3 Món: Tuần Lộc Len & Hoa Hồng",
        rating: 5,
        time: "3 ngày trước",
        content: "Chú tuần lộc len mũi đỏ đế xoay gỗ mộc phối cùng hoa hồng len và kẹp bướm nhung nhìn cưng xỉu. Không khí Giáng Sinh ngập tràn, dịch vụ viết thiệp sáp rất chỉn chu."
    }
];
