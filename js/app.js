
// ============================================================================
// HOT SEARCH DROPDOWN CONTROLLER
// ============================================================================
function openHotSearchDropdown() {
    const dd = document.getElementById("hotSearchDropdown");
    if (dd) dd.classList.remove("hidden");
}

function closeHotSearchDropdown() {
    const dd = document.getElementById("hotSearchDropdown");
    if (dd) dd.classList.add("hidden");
}

function selectHotSearch(keyword) {
    const input = document.getElementById("globalSearchInput");
    if (input) input.value = keyword;
    closeHotSearchDropdown();
    quickFilterKeyword(keyword);
}

function quickFilterByGender(gender) {
    closeHotSearchDropdown();
    state.selectedCategory = "all";
    state.genderFilter = gender;
    navigateTo("category", "all");
    setCategoryGenderFilter(gender);
}

// Close dropdown on click outside
document.addEventListener("click", function(e) {
    const container = document.getElementById("searchContainerBox");
    const dd = document.getElementById("hotSearchDropdown");
    if (container && dd && !container.contains(e.target)) {
        dd.classList.add("hidden");
    }
});

// SAFE CONFETTI HELPER (KHÔNG BAO GIỜ BỊ LỖI NẾU CDN CHẬM HOẶC OFFLINE)
function safeConfetti(options = {}) {
    if (typeof confetti === "function") {
        try {
            confetti(options);
        } catch (e) {
            console.warn("Confetti effect note:", e);
        }
    }
}

// GLOBAL APPLICATION STATE
const state = {
    currentView: "home",
    selectedCategory: "all",
    genderFilter: "all",
    selectedProduct: null,
    cart: loadCartFromStorage(),
    currentCheckoutItem: null,
    
    // CAROUSEL STATE
    carousel: {
        currentSlide: 0,
        intervalId: null
    },

    // DIY STUDIO STATE (GÓC TỰ TAY GÓI QUÀ)
    diy: {
        boxId: "GIFT-BOX-01",
        boxName: "Hộp Sweet Pink Nơ Lụa (Cỡ Vừa)",
        boxPrice: 95000,
        boxImage: "images/products/hop_qua_sweet_pink.jpg",
        selectedItems: ["SNK-MIDNIGHT-RED", "FLW-CROCHET-ROSE"],
        letterText: "",
        shippingMode: "standard",
        shippingPrice: 25000,
        totalCost: 0
    }
};

// ============================================================================
// KHỞI CHẠY KHI DOM SẴN SÀNG
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    renderMainCategoryNav();
    initCarousel();
    renderHomeSections();
    updateCartBadge();
    
    // Khởi tạo router theo hash URL nếu có
    handleUrlHash();
    window.addEventListener("hashchange", handleUrlHash);
}

// ============================================================================
// 1. ROUTER ĐIỀU HƯỚNG ĐA TRANG (MULTI-PAGE SPA ROUTER)
// ============================================================================
// ============================================================================
// 1. ROUTER ĐIỀU HƯỚNG ĐA TRANG (MULTI-PAGE SPA ROUTER)
// ============================================================================
function navigateTo(viewName, params = null) {
    state.currentView = viewName;

    // Ẩn tất cả các view
    document.querySelectorAll(".app-view").forEach(v => v.classList.add("hidden"));

    // Hiển thị view mong muốn
    const viewMap = {
        home: "viewHome",
        product_detail: "viewProductDetail",
        category: "viewCategory",
        diy: "viewDiyStudio",
        stores: "viewStores",
        about: "viewAbout"
    };

    const targetId = viewMap[viewName] || "viewHome";
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Xử lý logic riêng cho từng view
    if (viewName === "home") {
        state.selectedCategory = "home";
        renderHomeSections();
    } else if (viewName === "product_detail" && params) {
        renderProductDetail(params);
    } else if (viewName === "category") {
        state.selectedCategory = params || state.selectedCategory || "all";
        renderCategoryPage(state.selectedCategory);
    } else if (viewName === "diy") {
        renderDiyStudio();
    } else if (viewName === "stores") {
        renderStoresPage();
    }

    // Cập nhật trạng thái active dịu dàng cho menu
    renderMainCategoryNav();
}

function handleUrlHash() {
    const hash = window.location.hash.replace("#", "");
    if (!hash || hash === "home") {
        navigateTo("home");
    } else if (hash.startsWith("product/")) {
        const productId = hash.replace("product/", "");
        navigateTo("product_detail", productId);
    } else if (hash.startsWith("category/")) {
        const parts = hash.replace("category/", "").split("/");
        const catId = parts[0] || "all";
        const gender = parts[1] || "all";
        state.genderFilter = gender;
        navigateTo("category", catId);
        if (gender !== "all") {
            setCategoryGenderFilter(gender);
        }
    } else if (hash === "diy") {
        if (state.currentView !== "diy") navigateTo("diy");
    } else if (hash === "stores") {
        if (state.currentView !== "stores") navigateTo("stores");
    } else if (hash === "about") {
        if (state.currentView !== "about") navigateTo("about");
    }
}

// ============================================================================
// 2. HEADER NAVIGATION & SEARCH (DỊU DÀNG, MỊN MÀNG & SANG TRỌNG)
// ============================================================================
function renderMainCategoryNav() {
    const container = document.getElementById("mainCategoryNav");
    if (!container || typeof GIFT_CATEGORIES === "undefined") return;

    container.innerHTML = GIFT_CATEGORIES.map(cat => {
        const isActive = (cat.id === "home" && state.currentView === "home") ||
                         (cat.id === "diy" && state.currentView === "diy") ||
                         (state.currentView === "category" && state.selectedCategory === cat.id);

        return `
        <button onclick="handleNavClick('${cat.id}')" 
                class="nav-tab-item relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 select-none cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    isActive 
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-300/50 font-black' 
                        : 'bg-white/90 text-slate-700 hover:text-rose-600 hover:bg-rose-50 border border-rose-100 shadow-2xs'
                }">
            <span class="text-xs sm:text-sm">${cat.icon}</span>
            <span>${cat.name}</span>
            ${cat.isHot && !isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-pulse"></span>' : ''}
        </button>
        `;
    }).join("");
}

function handleNavClick(catId) {
    if (catId === "home") {
        window.location.hash = "home";
        navigateTo("home");
    } else if (catId === "diy") {
        window.location.hash = "diy";
        navigateTo("diy");
    } else {
        filterByCategory(catId);
    }
}

function handleBannerClick(action) {
    if (action === "diy") {
        window.location.hash = "diy";
        navigateTo("diy");
    } else {
        filterByCategory(action);
    }
}

function goToDiySection(targetElementId) {
    window.location.hash = "diy";
    navigateTo("diy");
    if (targetElementId) {
        setTimeout(() => {
            const el = document.getElementById(targetElementId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 200);
    }
}

function scrollToCombos(type) {
    if (state.currentView !== "home") {
        navigateTo("home");
    }
    setTimeout(() => {
        const el = document.getElementById("homeCombosGrid");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, 120);
}

function filterByCategory(catId) {
    if (catId === "diy") {
        window.location.hash = "diy";
        navigateTo("diy");
        return;
    }
    state.selectedCategory = catId;
    window.location.hash = `category/${catId}`;
    navigateTo("category", catId);
}

function handleGlobalSearch(e) {
    if (e.key === "Enter") {
        triggerSearch();
    }
}

function triggerSearch() {
    const keyword = document.getElementById("globalSearchInput")?.value.trim();
    if (keyword) {
        quickFilterKeyword(keyword);
    }
}

function quickFilterKeyword(keyword) {
    state.searchKeyword = keyword.toLowerCase();
    state.selectedCategory = "all";
    navigateTo("category", "all");
    
    // Lọc theo từ khóa
    const grid = document.getElementById("categoryListingGrid");
    const title = document.getElementById("catPageTitle");
    if (title) title.textContent = `Kết quả tìm kiếm cho "${keyword}"`;

    if (grid) {
        const matches = PRODUCTS_DATABASE.filter(p => 
            p.name.toLowerCase().includes(keyword.toLowerCase()) || 
            (p.subtitle && p.subtitle.toLowerCase().includes(keyword.toLowerCase())) ||
            (p.badge && p.badge.toLowerCase().includes(keyword.toLowerCase()))
        );
        renderProductGridItems(grid, matches);
    }
}

// ============================================================================
// 3. BANNER CAROUSEL SLIDER (CHẠY TỰ ĐỘNG MƯỢT MÀ • CHU KỲ 3.5S)
// ============================================================================
function initCarousel() {
    const container = document.getElementById("carouselSlidesContainer");
    const dotsContainer = document.getElementById("carouselDots");
    if (!container || !dotsContainer || typeof CAROUSEL_BANNERS === "undefined") return;

    container.innerHTML = CAROUSEL_BANNERS.map((b, idx) => `
        <div class="carousel-slide absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer ${idx === 0 ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'}" onclick="handleBannerClick('${b.actionCategory}')">
            <!-- Ảnh Full Bleed Tràn Kín Khung Hình Chữ Nhật -->
            <img src="${b.image}" alt="${b.title}" class="absolute inset-0 w-full h-full object-cover">

            <!-- Lớp phủ Gradient Tương Phản Tinh Tế (Đậm bên trái để chữ to sắc nét, trong veo bên phải để khoe ảnh) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent sm:bg-gradient-to-r sm:from-black/80 sm:via-black/40 sm:to-transparent/15 flex flex-col justify-end sm:justify-center p-5 sm:p-10 lg:p-14 text-white select-none z-10">
                <div class="max-w-xl space-y-2 sm:space-y-3.5">
                    <div class="flex items-center gap-2">
                        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                            ${b.tag || '💖 DÀNH CHO NÀNG'}
                        </span>
                        <span class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-xs text-white text-[11px] font-bold border border-white/30">
                            ${b.badge || '✨ Độc Quyền'}
                        </span>
                    </div>

                    <!-- CHỮ TO NỔI BẬT ĐẬP VÀO MẮT -->
                    <h3 class="text-xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-xl">
                        ${b.title}
                    </h3>

                    <p class="text-xs sm:text-sm lg:text-base text-rose-100/90 font-medium line-clamp-2 max-w-lg drop-shadow">
                        ${b.subtitle}
                    </p>

                    <div class="pt-1.5 sm:pt-3">
                        <span class="inline-flex items-center gap-2 px-4 sm:px-7 py-2 sm:py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs sm:text-sm lg:text-base shadow-xl hover:shadow-2xl transition uppercase tracking-wider">
                            <span>${b.btnText || 'KHÁM PHÁ NGAY'}</span>
                            <i class="fa-solid fa-arrow-right text-[10px] sm:text-xs"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    dotsContainer.innerHTML = CAROUSEL_BANNERS.map((_, idx) => `
        <button onclick="goToSlide(${idx})" aria-label="Slide ${idx + 1}" class="h-2 sm:h-2.5 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-rose-500 w-7 sm:w-8 shadow-md' : 'bg-white/60 w-2 sm:w-2.5 hover:bg-white'}"></button>
    `).join("");

    // Pause on hover, resume on mouse leave
    const carouselWrapper = container.parentElement;
    if (carouselWrapper) {
        carouselWrapper.addEventListener("mouseenter", () => {
            if (state.carousel.intervalId) clearInterval(state.carousel.intervalId);
        });
        carouselWrapper.addEventListener("mouseleave", () => {
            startCarouselInterval();
        });
    }

    startCarouselInterval();
}

function startCarouselInterval() {
    if (state.carousel.intervalId) clearInterval(state.carousel.intervalId);
    state.carousel.intervalId = setInterval(() => {
        nextSlide();
    }, 3500);
}

function nextSlide() {
    const total = CAROUSEL_BANNERS.length;
    goToSlide((state.carousel.currentSlide + 1) % total);
}

function prevSlide() {
    const total = CAROUSEL_BANNERS.length;
    goToSlide((state.carousel.currentSlide - 1 + total) % total);
}

function goToSlide(slideIdx) {
    state.carousel.currentSlide = slideIdx;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.getElementById("carouselDots")?.children;

    slides.forEach((s, idx) => {
        if (idx === slideIdx) {
            s.classList.remove("opacity-0", "scale-105", "z-0", "pointer-events-none");
            s.classList.add("opacity-100", "scale-100", "z-10");
        } else {
            s.classList.remove("opacity-100", "scale-100", "z-10");
            s.classList.add("opacity-0", "scale-105", "z-0", "pointer-events-none");
        }
    });

    if (dots) {
        Array.from(dots).forEach((d, idx) => {
            if (idx === slideIdx) {
                d.className = "h-2 sm:h-2.5 rounded-full bg-rose-500 w-7 sm:w-8 transition-all duration-300 shadow-md";
            } else {
                d.className = "h-2 sm:h-2.5 rounded-full bg-white/60 w-2 sm:w-2.5 hover:bg-white transition-all duration-300";
            }
        });
    }

    // Reset interval timer khi người dùng bấm thủ công
    if (state.carousel.intervalId) {
        clearInterval(state.carousel.intervalId);
        state.carousel.intervalId = setInterval(() => {
            nextSlide();
        }, 3500);
    }
}

// ============================================================================
// 4. TRANG CHỦ (HOME SECTIONS RENDERER)
// ============================================================================
function renderHomeSections() {
    renderHomeCombos();
    renderHomeSnackBouquets();
    renderHomeHandmadeFlowers();
}

function renderHomeSnackBouquets() {
    const container = document.getElementById("homeSnackBouquetsGrid");
    if (!container) return;
    const items = PRODUCTS_DATABASE.filter(p => p.category === "snack_bouquets");
    renderProductGridItems(container, items);
}

function renderHomeHandmadeFlowers() {
    const container = document.getElementById("homeHandmadeFlowersGrid");
    if (!container) return;
    const items = PRODUCTS_DATABASE.filter(p => p.category === "flowers_handmade");
    renderProductGridItems(container, items);
}

function renderHomeCombos() {
    const container = document.getElementById("homeCombosGrid");
    if (!container) return;

    const combos = PRODUCTS_DATABASE.filter(p => p.category === "combo_love");
    container.innerHTML = combos.map(combo => `
        <article class="relative aspect-square rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-rose-100 hover:border-rose-400 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group select-none" onclick="viewProduct('${combo.id}')">
            <!-- Full-bleed Image -->
            <img src="${combo.image}" alt="${combo.name}" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out">

            <!-- Badges top -->
            <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-black uppercase shadow-md backdrop-blur-md ${combo.badgeColor || 'bg-rose-500 text-white'}">
                ${combo.badge}
            </span>
            <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white/95 text-rose-500 backdrop-blur-md shadow-xs flex items-center gap-1">
                <i class="fa-solid fa-star text-[10px]"></i> 5.0 (${combo.reviewsCount})
            </span>

            <!-- TIÊU ĐỀ NẰM NGAY TRONG ẢNH ĐƯỢC PHỦ NHẸ LÊN (NGẮN GỌN TRỌNG TÂM, KHÔNG CHỮ MIÊU TẢ BÉ) -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-14 pb-3.5 px-4 text-white flex flex-col justify-end">
                <h3 class="font-black text-sm sm:text-base text-white leading-snug group-hover:text-rose-200 transition line-clamp-2 drop-shadow-md">
                    ${combo.name}
                </h3>
            </div>
        </article>
    `).join("");
}

function renderProductGridItems(container, items) {
    if (!container) return;
    container.innerHTML = items.map(item => `
        <article class="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border-2 border-rose-100/90 hover:border-rose-400 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group select-none" onclick="viewProduct('${item.id}')">
            <!-- Full-bleed Image -->
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out">
            
            <!-- Badges top -->
            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-md backdrop-blur-md ${item.badgeColor || 'bg-rose-500/90 text-white'}">
                ${item.badge || 'Quà Hot'}
            </span>
            <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-rose-500 backdrop-blur-md shadow-sm flex items-center gap-1">
                <i class="fa-solid fa-star text-[9px]"></i> ${(item.rating || 5.0).toFixed(1)}
            </span>

            <!-- TIÊU ĐỀ NẰM NGAY TRONG ẢNH ĐƯỢC PHỦ NHẸ LÊN (NGẮN GỌN TRỌNG TÂM, KHÔNG CHỮ MIÊU TẢ BÉ) -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-3 sm:px-3.5 text-white flex flex-col justify-end">
                <h4 class="font-black text-xs sm:text-sm text-white leading-snug group-hover:text-rose-200 transition line-clamp-2 drop-shadow-md">
                    ${item.name}
                </h4>
            </div>
        </article>
    `).join("");
}

// ============================================================================
// 5. TRANG CHI TIẾT SẢN PHẨM RIÊNG BIỆT (PRODUCT DETAIL VIEW)
// ============================================================================
function viewProduct(productId) {
    window.location.hash = `product/${productId}`;
    navigateTo("product_detail", productId);
}

function renderProductDetail(productId) {
    const container = document.getElementById("productDetailContent");
    if (!container || typeof PRODUCTS_DATABASE === "undefined") return;

    const product = PRODUCTS_DATABASE.find(p => p.id === productId) || PRODUCTS_DATABASE[0];
    state.selectedProduct = product;

    const galleryImages = product.imagesGallery || [product.image];

    container.innerHTML = `
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
            <button onclick="navigateTo('home')" class="hover:text-rose-600 flex items-center gap-1">
                <i class="fa-solid fa-house"></i> Trang chủ
            </button>
            <span>/</span>
            <button onclick="filterByCategory('${product.category}')" class="hover:text-rose-600">
                ${getCategoryName(product.category)}
            </button>
            <span>/</span>
            <span class="text-rose-600 font-extrabold truncate max-w-xs">${product.name}</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border-2 border-rose-100 shadow-xl mb-12">
            
            <!-- Left: Image Gallery (5 Cols) -->
            <div class="lg:col-span-5 space-y-4">
                <div class="relative w-full aspect-square rounded-3xl bg-gradient-to-tr from-rose-50 to-pink-50 border border-rose-100 overflow-hidden shadow-md group">
                    <img id="detailMainImg" src="${galleryImages[0]}" alt="${product.name}" class="w-full h-full object-cover transition-all duration-300">
                </div>

                <!-- Thumbnails Gallery -->
                <div class="flex items-center gap-3 overflow-x-auto pb-2">
                    ${galleryImages.map((img, idx) => `
                        <button onclick="switchDetailImg('${img}', this)" class="w-16 h-16 rounded-2xl border-2 ${idx === 0 ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'} p-1 flex-shrink-0 transition overflow-hidden">
                            <img src="${img}" class="w-full h-full object-contain" alt="Thumb">
                        </button>
                    `).join("")}
                </div>
            </div>

            <!-- Right: Product Info & Actions (7 Cols) -->
            <div class="lg:col-span-7 space-y-5">
                
                <!-- Badge & Stock -->
                <div class="flex items-center justify-between gap-2">
                    <span class="px-3 py-1 rounded-full text-xs font-black uppercase ${product.badgeColor || 'bg-rose-100 text-rose-700'}">
                        ${product.badge || 'Sản phẩm mới'}
                    </span>
                    <span class="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Còn ${product.stock || 50} hộp sẵn sàng ship
                    </span>
                </div>

                <!-- Title & Rating -->
                <div>
                    <h1 class="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                        ${product.name}
                    </h1>
                    <div class="flex items-center gap-3 mt-2 text-xs">
                        <span class="text-rose-500 font-bold flex items-center gap-1">
                            ★ ${(product.rating || 5.0).toFixed(1)}
                        </span>
                        <span class="text-slate-300">|</span>
                        <span class="text-slate-500 font-medium">${product.reviewsCount || 100} đánh giá</span>
                        <span class="text-slate-300">|</span>
                        <span class="text-rose-600 font-bold">Mã: ${product.code}</span>
                    </div>
                </div>

                <!-- Price Box -->
                <div class="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-baseline gap-3">
                    <div class="text-3xl font-black text-rose-600">
                        ${product.price.toLocaleString('vi-VN')}đ
                    </div>
                    ${product.originalPrice ? `
                        <div class="text-sm text-slate-400 line-through">
                            ${product.originalPrice.toLocaleString('vi-VN')}đ
                        </div>
                        <span class="px-2 py-0.5 bg-rose-500 text-white font-bold text-[10px] rounded-md">
                            TIẾT KIỆM ${Math.round((1 - product.price/product.originalPrice)*100)}%
                        </span>
                    ` : ''}
                </div>

                <!-- Short Description -->
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    ${product.description}
                </p>

                <!-- Dịch Vụ Đi Kèm Miễn Phí -->
                <div class="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold">
                    <div class="flex items-center gap-2">
                        <span class="text-rose-500">💌</span>
                        <span>Viết thiệp tay sáp niêm phong (0đ)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-rose-500">🚚</span>
                        <span>Giao hỏa tốc tại khu vực</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-rose-500">🎀</span>
                        <span>Đóng gói hộp quà nơ lụa chu đáo</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-rose-500">🎁</span>
                        <span>Trao tận tay người nhận trọn vẹn</span>
                    </div>
                </div>

                <!-- Quantity & Action Buttons -->
                <div class="pt-3 border-t border-rose-100 flex flex-wrap items-center gap-4">
                    <div class="flex items-center border-2 border-rose-200 rounded-2xl bg-white p-1">
                        <button onclick="adjustDetailQty(-1)" class="w-10 h-10 rounded-xl hover:bg-rose-50 font-black text-slate-700 text-base">-</button>
                        <input type="text" id="detailQtyInput" value="1" readonly class="w-12 text-center font-black text-slate-900 text-sm outline-none">
                        <button onclick="adjustDetailQty(1)" class="w-10 h-10 rounded-xl hover:bg-rose-50 font-black text-slate-700 text-base">+</button>
                    </div>

                    <button onclick="addToCartFromDetail('${product.id}')" class="h-12 px-6 bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300 font-extrabold text-xs rounded-2xl transition uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-cart-plus text-base"></i>
                        <span>THÊM VÀO GIỎ</span>
                    </button>

                    <button onclick="openProductCheckoutModal('${product.id}')" class="flex-1 h-12 px-8 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-rose-400/30 transition transform hover:scale-105 uppercase tracking-wider cursor-pointer">
                        MUA NGAY (VIETQR)
                    </button>
                </div>

            </div>

        </div>

        <!-- Specifications & Items Breakdown Tabs -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-100 shadow-sm space-y-6">
            <h3 class="text-xl font-black text-slate-900 border-b-2 border-rose-100 pb-3 flex items-center gap-2">
                <span>📦</span> <span>Chi Tiết Món Quà Trong Hộp</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Items list -->
                <div class="space-y-3">
                    <h4 class="font-extrabold text-xs uppercase tracking-wider text-rose-600">Thành phần set quà:</h4>
                    <div class="space-y-2 text-xs text-slate-700">
                        ${(product.itemsIncluded || []).map(item => `
                            <div class="flex items-start gap-2.5 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                                <span class="text-rose-500 font-bold">✓</span>
                                <span>${item}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Specifications -->
                <div class="space-y-3">
                    <h4 class="font-extrabold text-xs uppercase tracking-wider text-rose-600">Thông số kỹ thuật:</h4>
                    <div class="space-y-2 text-xs">
                        ${Object.entries(product.specifications || {}).map(([key, val]) => `
                            <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                                <span class="font-bold text-slate-600">${key}:</span>
                                <span class="font-extrabold text-slate-900">${val}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function switchDetailImg(src, btn) {
    const mainImg = document.getElementById("detailMainImg");
    if (mainImg) mainImg.src = src;

    if (btn && btn.parentElement) {
        Array.from(btn.parentElement.children).forEach(b => {
            b.className = "w-16 h-16 rounded-2xl border-2 border-slate-200 bg-white p-1 flex-shrink-0 transition overflow-hidden";
        });
        btn.className = "w-16 h-16 rounded-2xl border-2 border-rose-500 bg-rose-50 p-1 flex-shrink-0 transition overflow-hidden";
    }
}

function adjustDetailQty(delta) {
    const input = document.getElementById("detailQtyInput");
    if (!input) return;
    let qty = parseInt(input.value || "1", 10) + delta;
    if (qty < 1) qty = 1;
    input.value = qty;
}

function addToCartFromDetail(productId) {
    const qty = parseInt(document.getElementById("detailQtyInput")?.value || "1", 10);
    const product = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(i => i.id === productId);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + qty;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            subtitle: product.subtitle || '',
            price: product.price,
            image: product.image,
            quantity: qty
        });
    }

    saveCartToStorage();
    safeConfetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    showToast(`Đã thêm ${qty} hộp "${product.name}" vào giỏ quà!`, "success");
    toggleCartDrawer();
}

function getCategoryName(catId) {
    const nameMap = {
        home: "Trang Chủ",
        combos: "Bộ Sưu Tập Combo Quà Tặng",
        combo_love: "Combo Cảm Xúc Tình Yêu & Sinh Nhật",
        flowers: "Hoa Len Đan Tay & Hoa Nghệ Thuật",
        flowers_handmade: "Hoa Len Đan Tay & Hoa Nghệ Thuật",
        mini_gifts: "Bộ Sưu Tập Quà Tặng Mini Xinh",
        snack_bouquets: "Bó Bánh Kẹo Ăn Được Ngọt Ngào",
        diy: "Custom Hộp Quà Theo Cảm Xúc",
        gift_boxes: "Vỏ Hộp Quà Nơ Lụa & Túi Mica",
        theme_2010: "Set Quà 20/10 — Nàng Thơ & Tặng Mẹ",
        theme_2011: "Set Quà 20/11 — Tri Ân Thầy Cô Giáo",
        stationery_cards: "Phụ Kiện Xinh Xắn & Hoa Độc Bản",
        all: "Toàn Bộ Quà Tặng Nhà Bunny"
    };
    if (nameMap[catId]) return nameMap[catId];
    const cat = GIFT_CATEGORIES.find(c => c.id === catId);
    return cat ? cat.name : "Danh Mục Quà Tặng";
}

// ============================================================================
// 6. TRANG DANH MỤC SẢN PHẨM (CATEGORY LISTING VIEW)
// ============================================================================
function renderCategoryPage(catId, genderFilter) {
    const grid = document.getElementById("categoryListingGrid");
    const breadcrumb = document.getElementById("catBreadcrumbTitle");
    const title = document.getElementById("catPageTitle");
    const subtitle = document.getElementById("catPageSubtitle");

    if (!grid) return;

    if (catId === "diy") {
        navigateTo("diy");
        return;
    }

    if (genderFilter !== undefined) {
        state.genderFilter = genderFilter;
    }
    const currentGender = state.genderFilter || "all";

    const catName = getCategoryName(catId);
    if (breadcrumb) breadcrumb.textContent = catName;
    if (title) title.textContent = catName;

    let items = [...PRODUCTS_DATABASE];
    if (catId === "combos") {
        items = items.filter(p => p.category === "combo_love");
        if (subtitle) subtitle.textContent = "Các combo phối sẵn bánh kẹo, hoa len vĩnh cửu & bộ quà tặng bạn trai, bạn gái trọn vẹn nhất";
    } else if (catId === "flowers") {
        items = items.filter(p => p.category === "flowers_handmade" || p.category === "snack_bouquets");
        if (subtitle) subtitle.textContent = "Bó hoa bánh kẹo ăn được, hoa hồng len móc tay tỉ mỉ và túi hoa mica trong suốt không tàn";
    } else if (catId === "mini_gifts") {
        items = items.filter(p => p.category === "mini_gifts");
        if (subtitle) subtitle.textContent = "Sa bàn siêu xe, móc treo Spider-Man, thú len công chúa, găng tay boxing & kẹp bướm nhung";
    } else if (catId === "theme_2010") {
        items = items.filter(p => p.category === "combo_love" || p.category === "flowers_handmade");
        if (title) title.textContent = "Bộ Sưu Tập Quà Tặng 20/10 (Nàng Thơ, Tặng Mẹ)";
        if (subtitle) subtitle.textContent = "Gói trọn nâng niu với hoa hồng len vĩnh cửu, túi mica trong veo và combo tỏ tình ngọt ngào";
    } else if (catId === "theme_2011") {
        items = items.filter(p => p.category === "flowers_handmade" || p.id === "FRAME-CLAY-3D" || p.id === "BOX-MICA-SUN");
        if (title) title.textContent = "Bộ Sưu Tập Quà Tặng 20/11 (Tri Ân Thầy Cô)";
        if (subtitle) subtitle.textContent = "Tri ân công ơn dạy dỗ với khung hoa đất sét 3D trang trọng và thiệp sáp niêm phong thủ công";
    } else if (catId === "stationery_cards") {
        items = items.filter(p => p.category === "flowers_handmade" || p.category === "gift_boxes" || p.category === "mini_gifts");
        if (title) title.textContent = "Phụ Kiện, Hoa Nghệ Thuật & Quà Mini";
    } else if (catId && catId !== "all") {
        items = items.filter(p => p.category === catId);
    }

    // Lọc theo Giới tính (Quà Cho Nam / Quà Cho Nữ / Quà Cặp Đôi / Troll Bạn Thân)
    if (currentGender === "nam") {
        items = items.filter(p => p.gender === "nam" || p.gender === "unisex");
        if (title) title.textContent = `${catName} — Dành Cho Nam / Bạn Trai`;
        if (subtitle) subtitle.textContent = "Tuyển chọn quà tặng nam tính, siêu xe Lamborghini, Spider-Man Marvel, boxing thể thao & tone màu mạnh mẽ";
    } else if (currentGender === "nu") {
        items = items.filter(p => p.gender === "nu");
        if (title) title.textContent = `${catName} — Dành Cho Nữ / Nàng Thơ`;
        if (subtitle) subtitle.textContent = "Tuyển chọn quà tặng công chúa dịu dàng, hoa hồng len vĩnh cửu, kẹp bướm nhung & quà ngọt ngào";
    } else if (currentGender === "couple") {
        items = items.filter(p => p.gender === "couple" || p.category === "combo_love");
        if (title) title.textContent = `${catName} — Quà Tặng Cặp Đôi & Tình Yêu`;
        if (subtitle) subtitle.textContent = "Tín vật tình yêu gắn kết bền chặt đôi lứa và các combo dỗ dành ngọt ngào";
    } else if (currentGender === "unisex") {
        items = items.filter(p => p.gender === "unisex");
        if (title) title.textContent = `${catName} — Quà Độc Lạ / Troll Bạn Thân`;
        if (subtitle) subtitle.textContent = "Những món quà hài hước, giải trí xả stress đem lại tiếng cười sảng khoái";
    }

    // Cập nhật giao diện nút filter giới tính
    updateGenderFilterButtons(currentGender);

    // Sắp xếp
    const sortVal = document.getElementById("catSortSelect")?.value;
    if (sortVal === "price_asc") {
        items.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price_desc") {
        items.sort((a, b) => b.price - a.price);
    } else if (sortVal === "rating") {
        items.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    renderProductGridItems(grid, items);
}

function setCategoryGenderFilter(gender) {
    state.genderFilter = gender;
    renderCategoryPage(state.selectedCategory || "all", gender);
}

function updateGenderFilterButtons(activeGender) {
    const buttons = ['all', 'nu', 'nam', 'couple', 'unisex'];
    buttons.forEach(g => {
        const btn = document.getElementById(`genderBtn_${g}`);
        if (!btn) return;
        if (g === activeGender) {
            btn.className = "px-4 py-2 rounded-2xl text-xs font-black transition cursor-pointer bg-rose-500 text-white shadow-xs whitespace-nowrap";
        } else {
            btn.className = "px-4 py-2 rounded-2xl text-xs font-black transition cursor-pointer bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 whitespace-nowrap";
        }
    });
}

function sortCategoryProducts() {
    renderCategoryPage(state.selectedCategory || "all");
}

// ============================================================================
// 7. GÓC TỰ TAY GÓI QUÀ (TỰ CHỌN VỎ HỘP CÓ ẢNH & THUMBNAIL MÓN QUÀ THỰC TẾ)
// ============================================================================
function openDiyDropdown() {
    const dd = document.getElementById("diyGiftItemsDropdown");
    const chevron = document.getElementById("diyDropdownChevron");
    const toggleText = document.getElementById("diyDropdownToggleText");
    if (dd) dd.classList.remove("hidden");
    if (chevron) chevron.classList.add("rotate-180");
    if (toggleText) toggleText.textContent = "Thu gọn";
    renderDiyGiftItems();
}

function closeDiyDropdown() {
    const dd = document.getElementById("diyGiftItemsDropdown");
    const chevron = document.getElementById("diyDropdownChevron");
    const toggleText = document.getElementById("diyDropdownToggleText");
    if (dd) dd.classList.add("hidden");
    if (chevron) chevron.classList.remove("rotate-180");
    if (toggleText) toggleText.textContent = "Chọn món lẻ";
}

function toggleDiyDropdown() {
    const dd = document.getElementById("diyGiftItemsDropdown");
    if (dd && dd.classList.contains("hidden")) {
        openDiyDropdown();
    } else {
        closeDiyDropdown();
    }
}

// Đóng dropdown tìm quà riêng lẻ khi click ra ngoài
document.addEventListener("click", function(e) {
    const container = document.getElementById("diySearchContainer");
    const dd = document.getElementById("diyGiftItemsDropdown");
    if (container && dd && !container.contains(e.target)) {
        closeDiyDropdown();
    }
});

function handleDiySearchInput(query) {
    if (!state.diy) state.diy = {};
    state.diy.searchQuery = (query || "").trim().toLowerCase();
    const clearBtn = document.getElementById("clearDiySearchBtn");
    if (clearBtn) {
        if (state.diy.searchQuery) clearBtn.classList.remove("hidden");
        else clearBtn.classList.add("hidden");
    }
    openDiyDropdown();
    renderDiyGiftItems();
}

function clearDiySearch() {
    const input = document.getElementById("diyItemSearchInput");
    if (input) input.value = "";
    if (state.diy) state.diy.searchQuery = "";
    const clearBtn = document.getElementById("clearDiySearchBtn");
    if (clearBtn) clearBtn.classList.add("hidden");
    renderDiyGiftItems();
}

function setDiyFilterTab(tab) {
    if (!state.diy) state.diy = {};
    state.diy.filterTab = tab;
    // Update tab styles
    document.querySelectorAll(".diy-filter-tab-btn").forEach(btn => {
        const btnTab = btn.getAttribute("data-tab");
        if (btnTab === tab) {
            btn.className = "diy-filter-tab-btn px-3 py-1.5 rounded-xl text-xs font-black bg-rose-500 text-white shadow-xs transition cursor-pointer";
        } else {
            btn.className = "diy-filter-tab-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-slate-700 hover:bg-rose-100 hover:text-rose-600 border border-rose-200 transition cursor-pointer";
        }
    });
    renderDiyGiftItems();
}

function renderDiyStudio() {
    renderDiyBoxes();
    renderDiyGiftItems();
    renderDiyCombos();
    updateDiyStudioSummary();
}

function renderDiyBoxes() {
    const boxGrid = document.getElementById("diyBoxPickerGrid");
    if (!boxGrid) return;
    const giftBoxes = PRODUCTS_DATABASE.filter(p => p.id.startsWith("GIFT-BOX-"));
    boxGrid.innerHTML = giftBoxes.map(box => {
        const isSelected = state.diy.boxId === box.id;
        return `
        <div onclick="selectDiyBox('${box.id}')" 
             class="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-0.5 select-none ${
                 isSelected 
                     ? 'border-rose-500 ring-4 ring-rose-400/40 shadow-md' 
                     : 'border-slate-200 hover:border-rose-300'
             }">
            <!-- Full-bleed Ảnh vỏ hộp có sẵn tem logo Bunny -->
            <img src="${box.image}" alt="${box.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase shadow-xs ${box.badgeColor || 'bg-rose-500 text-white'}">
                ${box.badge || '🎀 Hộp Xinh'}
            </span>
            ${isSelected ? `
                <div class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shadow-md z-10">
                    <i class="fa-solid fa-check"></i>
                </div>
            ` : ''}

            <!-- TIÊU ĐỀ NẰM NGAY TRONG ẢNH ĐƯỢC PHỦ NHẸ LÊN (NGẮN GỌN TRỌNG TÂM, KHÔNG CHỮ MIÊU TẢ BÉ) -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-12 pb-3 px-3.5 text-white flex flex-col justify-end">
                <h4 class="font-black text-xs sm:text-sm text-white group-hover:text-rose-200 transition truncate drop-shadow-md">${box.name}</h4>
            </div>
        </div>
        `;
    }).join("");
}

function renderDiyGiftItems() {
    const itemsGrid = document.getElementById("diyGiftItemsGrid");
    const countBadge = document.getElementById("diySelectedItemsCountBadge");
    const searchStatus = document.getElementById("diySearchStatus");
    if (!itemsGrid) return;

    if (!state.diy) state.diy = {};
    const query = state.diy.searchQuery || "";
    const activeTab = state.diy.filterTab || "all";

    // Danh sách toàn bộ sản phẩm trong toàn hệ thống có thể gắp vào hộp (trừ vỏ hộp và combo đóng gói sẵn)
    let selectableItems = PRODUCTS_DATABASE.filter(p => !p.id.startsWith("GIFT-BOX-") && !p.id.startsWith("COMBO-"));

    // Lọc theo Tab
    if (activeTab === "flowers") {
        selectableItems = selectableItems.filter(p => p.category === "flowers_handmade");
    } else if (activeTab === "snacks") {
        selectableItems = selectableItems.filter(p => p.category === "snack_bouquets");
    } else if (activeTab === "mini") {
        selectableItems = selectableItems.filter(p => p.category === "mini_gifts");
    }

    // Lọc theo Search Query (khi người dùng gõ tìm kiếm)
    if (query) {
        selectableItems = selectableItems.filter(item => 
            item.name.toLowerCase().includes(query) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
            (item.badge && item.badge.toLowerCase().includes(query)) ||
            (item.description && item.description.toLowerCase().includes(query))
        );
    }

    if (searchStatus) {
        if (query) {
            searchStatus.textContent = `Tìm thấy ${selectableItems.length} món quà khớp với "${query}"`;
            searchStatus.classList.remove("hidden");
        } else {
            searchStatus.textContent = `Toàn hệ thống có ${selectableItems.length} món quà có thể gắp vào hộp`;
            searchStatus.classList.remove("hidden");
        }
    }

    if (countBadge) {
        countBadge.textContent = `Đã chọn: ${state.diy.selectedItems.length} món`;
    }

    if (selectableItems.length === 0) {
        itemsGrid.innerHTML = `
            <div class="col-span-full py-8 text-center bg-rose-50/40 rounded-2xl border border-rose-100">
                <span class="text-3xl block mb-2">🔍</span>
                <p class="text-xs font-bold text-slate-700">Không tìm thấy món quà phù hợp với từ khóa "${query}"</p>
                <button onclick="clearDiySearch()" class="mt-2.5 px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg transition cursor-pointer">
                    Xem tất cả vật phẩm
                </button>
            </div>
        `;
        return;
    }

    itemsGrid.innerHTML = selectableItems.map(item => {
        const isChecked = state.diy.selectedItems.includes(item.id);
        return `
        <div onclick="toggleDiyItem('${item.id}')" 
             class="relative p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none group hover:shadow-sm ${
                 isChecked 
                     ? 'border-rose-400 bg-rose-50/70 shadow-xs' 
                     : 'border-slate-200 bg-white hover:border-rose-200'
             }">
            <!-- Ảnh thumbnail vuông bo tròn sắc nét -->
            <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0 border border-rose-100">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>

            <!-- Chi tiết tên và giá -->
            <div class="flex-1 min-w-0">
                <h4 class="font-extrabold text-xs text-slate-900 truncate group-hover:text-rose-600 transition">${item.name}</h4>
                <p class="text-[10.5px] text-slate-500 truncate mt-0.5">${item.subtitle || ''}</p>
                <div class="text-xs font-black text-rose-600 mt-1">
                    +${item.price.toLocaleString('vi-VN')}đ
                </div>
            </div>

            <!-- Nút chọn trạng thái -->
            <div class="flex-shrink-0">
                <span class="pointer-events-none inline-block px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    isChecked 
                        ? 'bg-rose-500 text-white shadow-xs' 
                        : 'bg-rose-50 text-rose-600 border border-rose-200 group-hover:bg-rose-500 group-hover:text-white'
                }">
                    ${isChecked ? '✓ Đã chọn' : '+ Thêm'}
                </span>
            </div>
        </div>
        `;
    }).join("");
}

function renderDiyCombos() {
    const container = document.getElementById("diyCombosGrid");
    if (!container) return;

    const combos = PRODUCTS_DATABASE.filter(p => p.category === "combo_love");
    container.innerHTML = combos.map(combo => {
        const isChecked = state.diy.selectedItems.includes(combo.id);
        return `
        <div onclick="toggleDiyItem('${combo.id}')"
             class="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group select-none ${
                 isChecked 
                     ? 'border-rose-500 ring-4 ring-rose-400/40 shadow-lg' 
                     : 'border-rose-100 hover:border-rose-300 shadow-xs'
             }">
            <!-- Full-bleed Ảnh combo khung ghép thật -->
            <img src="${combo.image}" alt="${combo.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-2.5 left-2.5 px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-xs ${combo.badgeColor || 'bg-rose-500 text-white'}">
                ${combo.badge || '💖 Combo Tình Yêu'}
            </span>
            <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-rose-500 backdrop-blur-md shadow-xs flex items-center gap-1">
                <i class="fa-solid fa-star text-[9px]"></i> 5.0 (${combo.reviewsCount})
            </span>
            ${isChecked ? `
                <div class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-md z-10">
                    <i class="fa-solid fa-check"></i>
                </div>
            ` : ''}

            <!-- TIÊU ĐỀ NẰM NGAY TRONG ẢNH ĐƯỢC PHỦ NHẸ LÊN (NGẮN GỌN TRỌNG TÂM, KHÔNG CHỮ MIÊU TẢ BÉ) -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-14 pb-3.5 px-4 text-white flex flex-col justify-end">
                <h4 class="font-black text-sm sm:text-base text-white group-hover:text-rose-200 transition leading-snug drop-shadow-md line-clamp-2">
                    ${combo.name}
                </h4>
            </div>
        </div>
        `;
    }).join("");
}

function selectDiyBox(boxId) {
    const box = PRODUCTS_DATABASE.find(p => p.id === boxId);
    if (!box) return;

    state.diy.boxId = box.id;
    state.diy.boxName = box.name;
    state.diy.boxPrice = box.price;
    state.diy.boxImage = box.image;

    const label = document.getElementById("diySelectedBoxLabel");
    if (label) {
        label.textContent = `Đang chọn: ${box.name}`;
    }

    renderDiyStudio();
}

// Giữ lại alias để tương thích ngược
function setDiyStudioBox(id, name, price) {
    selectDiyBox(id);
}

function toggleDiyItem(itemId) {
    const idx = state.diy.selectedItems.indexOf(itemId);
    const prod = PRODUCTS_DATABASE.find(p => p.id === itemId);
    if (idx > -1) {
        state.diy.selectedItems.splice(idx, 1);
        if (prod) showToast(`Đã bỏ "${prod.name}" khỏi hộp`, "info");
    } else {
        state.diy.selectedItems.push(itemId);
        if (prod) showToast(`Đã thêm "${prod.name}" vào hộp quà! 💖`, "success");
    }
    renderDiyStudio();
}

// Giữ lại alias để tương thích ngược
function toggleDiyStudioItem(id) {
    toggleDiyItem(id);
}

function removeDiyItemFromPreview(itemId) {
    const idx = state.diy.selectedItems.indexOf(itemId);
    if (idx > -1) {
        state.diy.selectedItems.splice(idx, 1);
        renderDiyStudio();
    }
}

function updateDiyStudioSummary() {
    const currentBox = PRODUCTS_DATABASE.find(p => p.id === state.diy.boxId) || {
        name: "Hộp Sweet Pink Nơ Lụa (Cỡ Vừa)",
        price: 95000,
        image: "images/products/hop_qua_sweet_pink.jpg"
    };

    // 1. Cập nhật preview hình ảnh vỏ hộp
    const previewImg = document.getElementById("diyBoxPreviewImage");
    const previewName = document.getElementById("diyBoxPreviewName");
    const previewPrice = document.getElementById("diyBoxPreviewPrice");
    if (previewImg) previewImg.src = currentBox.image;
    if (previewName) previewName.textContent = currentBox.name;
    if (previewPrice) previewPrice.textContent = currentBox.price.toLocaleString('vi-VN') + "đ";

    // 2. Render danh sách các món quà trong hộp preview
    const previewList = document.getElementById("diyBoxPreviewList");
    let itemsTotal = 0;
    const itemRows = [];

    state.diy.selectedItems.forEach(itemId => {
        const prod = PRODUCTS_DATABASE.find(p => p.id === itemId);
        if (prod) {
            itemsTotal += prod.price;
            itemRows.push(`
                <div class="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div class="flex items-center gap-2 min-w-0">
                        <img src="${prod.image}" alt="${prod.name}" class="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-rose-100">
                        <span class="truncate text-slate-800 font-semibold">${prod.name}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="font-black text-rose-600 text-xs">${prod.price.toLocaleString('vi-VN')}đ</span>
                        <button onclick="removeDiyItemFromPreview('${prod.id}')" class="text-slate-400 hover:text-rose-600 transition p-1" title="Bỏ món này">
                            <i class="fa-solid fa-xmark text-xs"></i>
                        </button>
                    </div>
                </div>
            `);
        }
    });

    if (itemRows.length === 0) {
        if (previewList) {
            previewList.innerHTML = `
                <div class="text-center py-4 text-slate-400 text-xs italic">
                    Chưa có món quà nào trong hộp.<br>Hãy bấm "+ Thêm" ở Bước 2 nhé!
                </div>
            `;
        }
    } else {
        if (previewList) previewList.innerHTML = itemRows.join("");
    }

    // 3. Cập nhật badge số lượng
    const countBadge = document.getElementById("diySelectedItemsCountBadge");
    const previewCountText = document.getElementById("diyPreviewItemsCountText");
    const countText = `${state.diy.selectedItems.length} món`;
    if (countBadge) countBadge.textContent = `Đã chọn: ${countText}`;
    if (previewCountText) previewCountText.textContent = countText;

    // 4. Phí giao hàng tại Hà Nội
    const shippingSelect = document.getElementById("diyShippingSelect");
    let shipFee = 25000;
    if (shippingSelect) {
        const opt = shippingSelect.options[shippingSelect.selectedIndex];
        shipFee = parseInt(opt?.getAttribute("data-price") || "25000", 10);
    }
    state.diy.shippingPrice = shipFee;

    const shippingFeeDisplay = document.getElementById("diyPreviewShippingFee");
    if (shippingFeeDisplay) {
        shippingFeeDisplay.textContent = shipFee.toLocaleString('vi-VN') + "đ";
    }

    // 5. Tổng chi phí
    const grandTotal = currentBox.price + itemsTotal + shipFee;
    state.diy.totalCost = grandTotal;

    const totalDisplay = document.getElementById("diyTotalPriceDisplay");
    if (totalDisplay) {
        totalDisplay.textContent = grandTotal.toLocaleString('vi-VN') + "đ";
    }
}

function loadRandomLetterIntoDiy() {
    if (typeof SAMPLE_LETTERS === "undefined" || SAMPLE_LETTERS.length === 0) return;
    const randomIdx = Math.floor(Math.random() * SAMPLE_LETTERS.length);
    const letter = SAMPLE_LETTERS[randomIdx];
    const textarea = document.getElementById("diyLetterMessage");
    if (textarea) {
        textarea.value = letter.content;
        showToast(`Đã nạp lời chúc: "${letter.title}"`, "success");
    }
}

function addDiyBoxToCart() {
    if (state.diy.selectedItems.length === 0) {
        alert("Bạn hãy chọn ít nhất 1 món quà để đặt vào bên trong hộp nhé!");
        return;
    }

    const currentBox = PRODUCTS_DATABASE.find(p => p.id === state.diy.boxId) || {
        name: "Hộp Sweet Pink Nơ Lụa (Cỡ Vừa)",
        price: 95000,
        image: "images/products/hop_qua_sweet_pink.jpg"
    };

    const selectedProds = state.diy.selectedItems.map(id => PRODUCTS_DATABASE.find(p => p.id === id)).filter(Boolean);
    const letterContent = document.getElementById("diyLetterMessage")?.value.trim() || "";

    const customDiyBoxItem = {
        id: "DIY-BOX-" + Date.now(),
        name: `Hộp Quà Tự Phối (${currentBox.name})`,
        subtitle: `${selectedProds.length} món quà: ${selectedProds.slice(0, 2).map(p => p.name).join(", ")}${selectedProds.length > 2 ? '...' : ''} + Thiệp sáp`,
        price: state.diy.totalCost - (state.diy.shippingPrice || 25000), // Giá sản phẩm (chưa tính ship)
        image: currentBox.image,
        quantity: 1,
        isDiy: true,
        boxDetails: {
            boxName: currentBox.name,
            items: selectedProds.map(p => ({ id: p.id, name: p.name, price: p.price })),
            letterMessage: letterContent,
            shippingFee: state.diy.shippingPrice || 25000
        }
    };

    state.cart.push(customDiyBoxItem);
    saveCartToStorage();
    updateCartBadge();

    // Hiệu ứng ăn mừng
    safeConfetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    showToast("Đã thêm Hộp Quà Tự Phối vào Giỏ Quà! 💖", "success");
    toggleCartDrawer();
}

// Alias để tương thích
function addDiyStudioToCart() {
    addDiyBoxToCart();
}

// ============================================================================
// 8. HỆ THỐNG CỬA HÀNG (STORES VIEW)
// ============================================================================
function renderStoresPage() {
    const container = document.getElementById("storesListContainer");
    if (!container || !APP_CONFIG.stores) return;

    container.innerHTML = APP_CONFIG.stores.map((s, idx) => `
        <div class="bg-white rounded-3xl p-6 border-2 border-rose-100 hover:border-rose-400 shadow-sm hover:shadow-xl transition-all space-y-3">
            <div class="flex items-center justify-between">
                <span class="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-black uppercase">
                    Chi nhánh ${idx + 1}
                </span>
                <span class="text-xs font-bold text-rose-500">${s.city}</span>
            </div>
            <h4 class="font-extrabold text-base text-slate-900">${s.address}</h4>
            <div class="text-xs text-slate-500 space-y-1">
                <div>⏱️ Giờ mở cửa: <strong>${s.hours}</strong> (T2 - CN)</div>
                <div>📞 Hotline: <strong>0889 166 655</strong></div>
            </div>
            <a href="https://zalo.me/0889166655" target="_blank" class="block w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-center font-bold text-xs rounded-xl border border-rose-200 transition">
                Chỉ đường & Đặt giữ quà
            </a>
        </div>
    `).join("");
}

// ============================================================================
// 9. GIỎ HÀNG & THANH TOÁN VIETQR
// ============================================================================
function loadCartFromStorage() {
    try {
        const s = localStorage.getItem("bunny_cart");
        return s ? JSON.parse(s) : [];
    } catch (e) {
        return [];
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem("bunny_cart", JSON.stringify(state.cart));
    } catch (e) {}
    updateCartBadge();
}

function updateCartBadge() {
    const b = document.getElementById("cartCountBadge");
    if (!b) return;
    const count = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    b.textContent = count;
}

function toggleCartDrawer(forceOpen = null) {
    const drawer = document.getElementById("cartDrawer");
    const content = document.getElementById("cartDrawerContent");
    if (!drawer) return;

    const isCurrentlyClosed = drawer.classList.contains("hidden");
    const shouldOpen = forceOpen !== null ? forceOpen : isCurrentlyClosed;

    if (shouldOpen) {
        drawer.classList.remove("hidden");
        setTimeout(() => {
            drawer.classList.remove("opacity-0");
            if (content) content.classList.remove("translate-x-full");
        }, 20);
        renderCartDrawer();
    } else {
        drawer.classList.add("opacity-0");
        if (content) content.classList.add("translate-x-full");
        setTimeout(() => {
            drawer.classList.add("hidden");
        }, 300);
    }
}

function renderCartDrawer() {
    const container = document.getElementById("cartItemsContainer") || document.getElementById("cartDrawerItemsList");
    const totalEl = document.getElementById("cartSubtotalDisplay") || document.getElementById("cartDrawerTotal");
    updateCartBadge();
    if (!container) return;

    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="py-14 text-center text-slate-500 space-y-2">
                <div class="text-5xl">🐰</div>
                <div class="font-extrabold text-sm text-slate-700">Giỏ quà đang trống!</div>
                <div class="text-xs text-slate-400">Hãy chọn set quà hoặc tự tay gói hộp quà xinh nhé.</div>
            </div>
        `;
        if (totalEl) totalEl.textContent = "0đ";
        return;
    }

    let grandTotal = 0;
    container.innerHTML = state.cart.map((item, idx) => {
        const itemTotal = item.price * (item.quantity || 1);
        grandTotal += itemTotal;
        return `
        <div class="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between gap-3 shadow-2xs">
            <div class="w-14 h-14 rounded-xl bg-white border border-rose-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src="${item.image || 'images/logo_bunny.jpg'}" class="w-full h-full object-cover rounded-lg" alt="${item.name}">
            </div>
            <div class="flex-1 min-w-0 space-y-0.5">
                <h4 class="font-extrabold text-xs text-slate-900 truncate">${item.name}</h4>
                <p class="text-[10.5px] text-slate-500 line-clamp-1">${item.subtitle || ''}</p>
                <div class="font-black text-xs text-rose-600">${item.price.toLocaleString('vi-VN')}đ</div>
            </div>
            <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                <button onclick="removeCartItem(${idx})" class="text-slate-400 hover:text-rose-600 text-xs p-1 transition" title="Xóa">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
                <div class="flex items-center border border-rose-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                    <button onclick="changeCartQty(${idx}, -1)" class="w-6 h-6 text-xs font-bold text-slate-600 hover:bg-rose-50">-</button>
                    <span class="w-6 text-center text-xs font-black text-slate-800">${item.quantity || 1}</span>
                    <button onclick="changeCartQty(${idx}, 1)" class="w-6 h-6 text-xs font-bold text-slate-600 hover:bg-rose-50">+</button>
                </div>
            </div>
        </div>
        `;
    }).join("");

    if (totalEl) totalEl.textContent = grandTotal.toLocaleString('vi-VN') + "đ";
}

function changeCartQty(idx, delta) {
    if (!state.cart[idx]) return;
    const newQty = (state.cart[idx].quantity || 1) + delta;
    if (newQty <= 0) {
        removeCartItem(idx);
    } else {
        state.cart[idx].quantity = newQty;
        saveCartToStorage();
        renderCartDrawer();
    }
}

function removeCartItem(idx) {
    state.cart.splice(idx, 1);
    saveCartToStorage();
    renderCartDrawer();
}


// ============================================================================
// VIETQR CHECKOUT & ORDER AUTOMATION
// ============================================================================
function openProductCheckoutModal(productId) {
    const product = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!product) return;

    const qty = parseInt(document.getElementById("detailQtyInput")?.value || "1", 10);
    const itemTotal = product.price * qty;

    state.currentCheckoutItem = {
        id: product.id,
        name: qty > 1 ? `${product.name} (x${qty})` : product.name,
        subtitle: product.subtitle || "Kèm thiệp sáp niêm phong",
        price: itemTotal,
        unitPrice: product.price,
        quantity: qty,
        image: product.image
    };

    renderCheckoutModalData();
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
}

function openCartCheckoutModal() {
    if (state.cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const total = state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    state.currentCheckoutItem = {
        id: "CART_BUNDLE",
        name: `Đơn Hàng Gồm ${state.cart.length} Món Quà`,
        subtitle: state.cart.map(i => i.name).join(", "),
        price: total,
        quantity: state.cart.length,
        image: state.cart[0]?.image || "images/logo_bunny.jpg"
    };

    renderCheckoutModalData();
    toggleCartDrawer();
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}

function renderCheckoutModalData() {
    if (!state.currentCheckoutItem) return;

    const item = state.currentCheckoutItem;
    const titleEl = document.getElementById("modalCheckoutProdTitle");
    const subEl = document.getElementById("modalCheckoutProdSub");
    const priceEl = document.getElementById("modalCheckoutProdPrice");
    const imgEl = document.getElementById("modalCheckoutProdImg");

    if (titleEl) titleEl.textContent = item.name;
    if (subEl) subEl.textContent = item.subtitle;
    if (priceEl) priceEl.textContent = item.price.toLocaleString('vi-VN') + "đ";
    if (imgEl) imgEl.src = item.image;

    recalculateModalTotal();
}

function recalculateModalTotal() {
    if (!state.currentCheckoutItem) return;

    const select = document.getElementById("orderShippingSelect");
    const shipFee = select ? parseInt(select.value, 10) : 25000;
    const basePrice = state.currentCheckoutItem.price;
    const finalAmount = basePrice + shipFee;

    state.currentCheckoutItem.finalAmount = finalAmount;
    state.currentCheckoutItem.shipFee = shipFee;

    // Display total
    const totalEl = document.getElementById("orderTotalAmountDisplay");
    if (totalEl) totalEl.textContent = finalAmount.toLocaleString('vi-VN') + "đ";

    // Generate Order Code & Memo
    const orderCode = "BUNNY" + Math.floor(1000 + Math.random() * 9000);
    state.currentCheckoutItem.orderCode = orderCode;

    const memoEl = document.getElementById("orderTransferMemo");
    if (memoEl) memoEl.textContent = orderCode;

    // Generate VietQR URL
    const bankCode = (APP_CONFIG.bank && APP_CONFIG.bank.bankCode) || "970416";
    const accountNo = (APP_CONFIG.bank && APP_CONFIG.bank.accountNumber) || "27820961";
    const accountName = encodeURIComponent((APP_CONFIG.bank && APP_CONFIG.bank.accountHolder) || "TRINH DUC THINH");
    const memo = encodeURIComponent(orderCode);
    const qrUrl = `https://api.vietqr.io/image/${bankCode}-${accountNo}-compact2.jpg?amount=${finalAmount}&addInfo=${memo}&accountName=${accountName}`;

    const qrImg = document.getElementById("vietQrImgDisplay");
    if (qrImg) {
        qrImg.src = qrUrl;
    }
}

function handleQrLoadError(img) {
    // If VietQR API has network issue, show SVG QR or fallback placeholder
    img.src = `https://quickchart.io/qr?text=ACB-27820961-TRINH_DUC_THINH&size=200`;
}

function copyText(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(msg || "Đã copy vào bộ nhớ tạm!", "success");
    }).catch(() => {
        prompt("Copy thủ công:", text);
    });
}

function copyTransferMemo() {
    const memo = document.getElementById("orderTransferMemo")?.textContent || "BUNNY8888";
    copyText(memo, `Đã copy nội dung: ${memo}`);
}

function submitOrderAndNotifyTelegram() {
    const name = document.getElementById("orderCustomerName")?.value.trim();
    const phone = document.getElementById("orderCustomerPhone")?.value.trim();
    const address = document.getElementById("orderCustomerAddress")?.value.trim();
    const letter = document.getElementById("orderLetterMessage")?.value.trim();
    const shippingSelect = document.getElementById("orderShippingSelect");
    const shippingName = shippingSelect ? shippingSelect.options[shippingSelect.selectedIndex].text : "Giao tiêu chuẩn";

    if (!name || !phone) {
        alert("Vui lòng điền Họ tên và Số điện thoại nhận quà để Bunny phục vụ chu đáo nhé!");
        return;
    }

    const orderData = {
        orderCode: state.currentCheckoutItem?.orderCode || ("BUNNY" + Math.floor(1000 + Math.random() * 9000)),
        productName: state.currentCheckoutItem?.name || "Set Quà Bunny",
        totalAmount: state.currentCheckoutItem?.finalAmount || 475000,
        customer: { name, phone, address },
        letterMessage: letter || "Không có yêu cầu viết thiệp",
        shipping: shippingName,
        createdAt: new Date().toISOString()
    };

    saveOrderToStorage(orderData);
    notifyTelegramBot(orderData);
    sendOrderToGoogleSheet(orderData);

    safeConfetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    closeCheckoutModal();

    alert(`🎉 ĐẶT QUÀ & XÁC NHẬN THÀNH CÔNG!

🐰 Mã Đơn: ${orderData.orderCode}
💰 Tổng thanh toán: ${orderData.totalAmount.toLocaleString('vi-VN')}đ

Nhà Bunny đã tiếp nhận đơn hàng và đang đóng gói hộp quà nơ lụa + viết thiệp sáp cho bạn! Nhân viên sẽ gọi điện/Zalo tới ${phone} trong 5 phút để xác nhận.`);
}

function sendOrderToGoogleSheet(order) {
    const webhookUrl = APP_CONFIG.googleSheetWebhookUrl;
    if (!webhookUrl || webhookUrl.trim() === "") return;

    fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    }).catch(err => console.warn("Google Sheet sync error:", err));
}


function saveOrderToStorage(order) {
    try {
        const orders = JSON.parse(localStorage.getItem("bunny_orders") || "[]");
        orders.unshift(order);
        localStorage.setItem("bunny_orders", JSON.stringify(orders));
    } catch (e) {}
}

function notifyTelegramBot(order) {
    const bot = APP_CONFIG.telegramBot;
    if (!bot || !bot.enabled || !bot.botToken || !bot.chatId) {
        console.log("Telegram not configured. Order:", order);
        return;
    }

    try {
        const customerName = order.customer?.name || "Khách yêu Bunny";
        const customerPhone = order.customer?.phone || "Chưa có SĐT";
        const customerAddress = order.customer?.address || "Hà Nội";

        const text = `
🐰 <b>[TIỆM QUÀ NHÀ BUNNY] ĐƠN ĐẶT QUÀ MỚI!</b>

📦 <b>Mã Đơn:</b> <code>${order.orderCode}</code>
🎁 <b>Sản phẩm:</b> ${order.productName}
💰 <b>Tổng tiền:</b> <b>${order.totalAmount.toLocaleString('vi-VN')} VNĐ</b>

👤 <b>Khách nhận:</b> ${customerName} (${customerPhone})
📍 <b>Địa chỉ ship:</b> ${customerAddress}
🚚 <b>Hình thức giao:</b> ${order.shipping || 'Giao tiêu chuẩn Hà Nội'}
💌 <b>Lời chúc thiệp:</b> <i>"${order.letterMessage || 'Không có yêu cầu viết thiệp'}"</i>
⏱️ <b>Thời gian đặt:</b> ${new Date().toLocaleString('vi-VN')}
        `.trim();

        fetch(`https://api.telegram.org/bot${bot.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: bot.chatId,
                text: text,
                parse_mode: 'HTML'
            })
        }).catch(err => console.warn("Telegram notification send error:", err));
    } catch (e) {
        console.warn("Telegram notification error:", e);
    }
}

function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 left-6 z-50 bg-white border-2 border-rose-300 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 text-xs font-bold text-slate-800 animate-fadeIn";
    toast.innerHTML = `<span>🐰</span> <span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// ============================================================================
// QUIZ & NHÂN VIÊN TƯ VẤN TÌNH CẢM CONTROLLER
// ============================================================================
const QUIZ_OPTIONS = [
    { 
        id: "opt_lover",
        label: "Người yêu / Bạn gái (Lãng mạn, ngọt ngào)", 
        icon: "🌸", 
        target: "COMBO-NU-BUNNY-PRINCESS",
        keywords: ["#Set3Món250K", "#ThỏCôngChúa", "#TranhHoa3D", "#NàngThơ"],
        whyChoose: "Set 3 món trọn vẹn trong hộp lụa hồng: Bé Thỏ Bunny quý tộc đầm dạ hội, Khung tranh hoa đất sét 3D lồng kính và Kẹp tóc cánh bướm hoa nhung kẽm.",
        solvesProblem: "Giải quyết triệt để nỗi lo tặng quà thiếu ấn tượng; set quà đầy đặn, sang trọng lưu giữ kỷ niệm nhiều năm không phai tàn."
    },
    { 
        id: "opt_apology",
        label: "Người yêu đang dỗi / Cần xin lỗi gấp", 
        icon: "🩹", 
        target: "COMBO-NU-TUANLOC-WINTER",
        keywords: ["#SưởiẤmTráiTim", "#TuầnLộcLen", "#HoaHồngĐỏ", "#HếtGiậnNgay"],
        whyChoose: "Set 3 món ấm áp: Chú tuần lộc len mũi đỏ đế gỗ mộc, đóa hoa hồng nhung đỏ đan tay và kẹp tóc cánh bướm nhung làm tan chảy mọi sự giận hờn.",
        solvesProblem: "Gỡ rối hoàn toàn thế bế tắc chiến tranh lạnh bằng món quà ấm áp và tâm thư xin lỗi chân thành được niêm phong sáp đỏ."
    },
    { 
        id: "opt_crush",
        label: "Crush / Thầm thương (Cần tỏ tình 99.8%)", 
        icon: "💌", 
        target: "COMBO-NU-BUNNY-PRINCESS",
        keywords: ["#TỏTìnhThànhCông", "#GhiĐiểmTuyệtĐối", "#DịuDàngTinhTế", "#KhôngGâyÁpLực"],
        whyChoose: "Tone màu hồng pastel nhẹ nhàng chuẩn gu các nàng thơ, vừa ngọt ngào vừa lịch thiệp, không quá phô trương nhưng đong đầy sự quan tâm tỉ mỉ.",
        solvesProblem: "Xóa tan nỗi sợ bị crush từ chối hoặc ngại ngùng khó xử. Món quà mang lại cảm giác an toàn, ấm áp và lời nhắn gửi tinh tế giúp crush dễ dàng mở lòng đồng ý."
    },
    { 
        id: "opt_anniversary",
        label: "Tặng Bạn Trai / Kỷ niệm người yêu nam", 
        icon: "🏎️", 
        target: "COMBO-NAM-SPIDERMAN",
        keywords: ["#Set2Món130K", "#SpiderManLen", "#HoaHồngĐỏ", "#TúiMicaQuaiDa"],
        whyChoose: "Túi mica quai da trắng sang xịn, móc len Spider-Man treo xe/balo và hoa hồng len nhung đỏ gửi tới người hùng trong lòng bạn.",
        solvesProblem: "Không còn khó khăn khi tìm quà cho nam giới vừa nam tính, vừa lãng mạn lại có tính ứng dụng cao mỗi ngày."
    },
    { 
        id: "opt_bday",
        label: "Sinh nhật bạn thân / Đam mê tốc độ", 
        icon: "🎂", 
        target: "PRD-LAMBO-LIBERTY",
        keywords: ["#BoxXe200K", "#SaBànLamborghini", "#DioramaHoaAnhĐào", "#DecorBàn"],
        whyChoose: "Box xe sa bàn Lamborghini Liberty Walk cực chiến trên bãi cỏ hoa anh đào và ghế đá công viên lồng hộp mica trong suốt.",
        solvesProblem: "Món quà độc lạ, bất ngờ khiến người nhận trầm trồ thích thú, decor bàn làm việc hay taplo ô tô cực ngầu."
    },
    { 
        id: "opt_teacher_mom",
        label: "Mẹ / Thầy Cô Giáo (Hoa nghệ thuật trang trọng)", 
        icon: "🌷", 
        target: "FRAME-CLAY-3D",
        keywords: ["#TriÂnKínhYêu", "#TrangTrọngThanhLịch", "#NghệThuậtThủCông", "#LưuNiệmTrọnĐời"],
        whyChoose: "Tác phẩm hoa đất sét đắp nổi 3D trong khung gỗ tự nhiên sâu lòng sang trọng, mang nét đẹp nhã nhặn, thanh lịch và trường tồn với thời gian.",
        solvesProblem: "Giải quyết khó khăn khi chọn quà cho người lớn tuổi / thầy cô giáo đòi hỏi sự chỉn chu, trang nhã, không phù phiếm nhưng vẫn đầy ắp lòng biết ơn và sự kính trọng."
    }
];

function openQuizModal() {
    const modal = document.getElementById("quizModal");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    renderQuizStep();
}

function closeQuizModal() {
    const modal = document.getElementById("quizModal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

function renderQuizStep() {
    const body = document.getElementById("quizQuestionBody");
    if (!body) return;

    body.innerHTML = `
        <div class="space-y-3">
            <h4 class="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-xs">1</span>
                Bạn đang tìm kiếm set quà cho ai & trong hoàn cảnh nào?
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                ${QUIZ_OPTIONS.map((opt) => `
                    <button onclick="handleQuizAnswer('${opt.target}', '${opt.id}')" 
                            class="p-3.5 rounded-2xl border-2 border-rose-100 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-100/50 text-left transition-all duration-200 flex items-center gap-3 group cursor-pointer shadow-xs">
                        <span class="text-2xl group-hover:scale-125 transition-transform flex-shrink-0">${opt.icon}</span>
                        <div class="flex-1 min-w-0">
                            <span class="text-xs font-bold text-slate-800 group-hover:text-rose-600 leading-snug block">${opt.label}</span>
                        </div>
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

function handleQuizAnswer(targetProductId, optionId) {
    const opt = QUIZ_OPTIONS.find(o => o.id === optionId) || QUIZ_OPTIONS.find(o => o.target === targetProductId) || QUIZ_OPTIONS[0];
    const product = PRODUCTS_DATABASE.find(p => p.id === targetProductId) || PRODUCTS_DATABASE[0];
    const body = document.getElementById("quizQuestionBody");
    if (!body || !product) return;

    body.innerHTML = `
        <div class="space-y-4 animate-fadeIn">
            <!-- Header Result -->
            <div class="text-center space-y-1 pb-2 border-b border-rose-100">
                <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center text-2xl shadow-inner">
                    💌
                </div>
                <span class="inline-block text-[10px] font-black uppercase text-rose-600 tracking-wider bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200 mt-1">
                    KẾT QUẢ TƯ VẤN CẢM XÚC TỪ BUNNY
                </span>
                <h4 class="text-base sm:text-lg font-black text-slate-900 mt-1">Gợi Ý Giải Pháp Quà Tặng Tối Ưu Nhất</h4>
                <p class="text-xs text-slate-500">Hoàn cảnh: <b class="text-rose-600 font-bold">${opt.label}</b></p>
            </div>

            <!-- KEYWORDS LIST -->
            <div class="space-y-1.5">
                <div class="text-[11px] font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🏷️</span> <span>Từ Khóa Nổi Bật (Key Words):</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                    ${(opt.keywords || []).map(kw => `
                        <span class="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-black shadow-2xs">
                            ${kw}
                        </span>
                    `).join("")}
                </div>
            </div>

            <!-- WHY CHOOSE & SOLVES PROBLEM BOXES -->
            <div class="grid grid-cols-1 gap-2.5 text-xs text-left">
                <!-- Vì sao chọn gói quà này -->
                <div class="p-3 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1">
                    <div class="font-black text-rose-700 flex items-center gap-1.5 text-[11.5px]">
                        <span>💡</span> <span>VÌ SAO BẠN NÊN CHỌN GÓI QUÀ NÀY?</span>
                    </div>
                    <p class="text-slate-700 text-[11.5px] leading-relaxed">
                        ${opt.whyChoose}
                    </p>
                </div>

                <!-- Giải quyết vấn đề gì -->
                <div class="p-3 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-1">
                    <div class="font-black text-pink-700 flex items-center gap-1.5 text-[11.5px]">
                        <span>🎯</span> <span>GIẢI QUYẾT TRIỆT ĐỂ VẤN ĐỀ GÌ?</span>
                    </div>
                    <p class="text-slate-700 text-[11.5px] leading-relaxed">
                        ${opt.solvesProblem}
                    </p>
                </div>
            </div>

            <!-- Product Card Preview -->
            <div class="p-3 bg-white border-2 border-rose-300 rounded-2xl flex items-center gap-3.5 text-left shadow-sm">
                <img src="${product.image}" alt="${product.name}" class="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl shadow-xs flex-shrink-0 border border-rose-100">
                <div class="flex-1 min-w-0">
                    <span class="px-2 py-0.5 bg-rose-500 text-white text-[9.5px] font-black rounded-full">${product.badge || 'Gợi Ý Số 1'}</span>
                    <h5 class="text-xs sm:text-sm font-black text-slate-900 truncate mt-1">${product.name}</h5>
                    <p class="text-[11px] text-slate-500 truncate mt-0.5">${product.subtitle || ''}</p>
                    <div class="text-xs font-black text-rose-600 mt-1">
                        ${product.price.toLocaleString('vi-VN')} đ
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2.5 pt-1">
                <button onclick="closeQuizModal(); viewProduct('${product.id}')" 
                        class="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5">
                    <span>👉 Xem Chi Tiết & Đặt Hàng Ngay</span>
                </button>
                <button onclick="renderQuizStep()" 
                        class="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer">
                    Chọn lại
                </button>
            </div>
        </div>
    `;
}

// ALIAS ĐẢM BẢO TƯƠNG THÍCH MỌI LỜI GỌI
window.viewProductDetail = viewProduct;
window.handleBannerClick = handleBannerClick;
window.goToDiySection = goToDiySection;
window.openDiyDropdown = openDiyDropdown;
window.closeDiyDropdown = closeDiyDropdown;
window.toggleDiyDropdown = toggleDiyDropdown;
window.renderDiyCombos = renderDiyCombos;

