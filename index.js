// RetailLift Web Application Logic

// ==========================================
// 1. DATA DEFINITIONS (Products & Charts)
// ==========================================

const PRODUCTS_DATA = [
    {
        id: "complete-installation",
        name: "RetailLift Complete Installation",
        desc: "All-inclusive turnkey deployment. Includes 16x AI dome cameras, local Edge Core server node, 4TB surveillance storage, complete cabling infrastructure, and certified technician calibration.",
        badge: "Turnkey Package",
        basePrice: 200000,
        baseSaaS: 0,
        illustrationType: "complete",
        options: [
            {
                name: "support-plan",
                label: "Service SLA Support",
                type: "select",
                choices: [
                    { name: "Standard business hours support", addPrice: 0, addSaaS: 0 },
                    { name: "Gold Plan (24/7 Phone SLA)", addPrice: 25000, addSaaS: 0 },
                    { name: "Platinum SLA (4-hour on-site response)", addPrice: 60000, addSaaS: 0 }
                ]
            }
        ]
    },
    {
        id: "complete-system",
        name: "RetailLift Complete Device",
        desc: "Pre-configured hardware package containing the NVR receiver box and 4x high-resolution AI dome cameras. Ready for direct self-installation.",
        badge: "Hardware Kit",
        basePrice: 65000,
        baseSaaS: 0,
        imageUrl: "assets/products/completedevices.png",
        options: [
            {
                name: "camera-count",
                label: "Camera Bundle",
                type: "select",
                choices: [
                    { name: "Basic: 3 AI Cameras Bundle", addPrice: 0, addSaaS: 0 },
                    { name: "Extended: 5 AI Cameras Bundle", addPrice: 20000, addSaaS: 0 },
                    { name: "Pro: 10 AI Cameras Bundle", addPrice: 70000, addSaaS: 0 }
                ]
            }
        ]
    },
    {
        id: "edge-core",
        name: "RetailLift Edge Core",
        desc: "AI local inference processing node. Decodes camera video feeds and triggers behavioral analysis notifications within 1.2 seconds.",
        badge: "Inference Server",
        basePrice: 32500,
        baseSaaS: 0,
        imageUrl: "assets/products/edge_core.jpg",
        options: [
            {
                name: "gpu-spec",
                label: "AI Inference Engine Tier",
                type: "select",
                choices: [
                    { name: "Standard (RTX 4060 Cores)", addPrice: 0, addSaaS: 0 },
                    { name: "Pro Engine (RTX 4070 Ti Cores)", addPrice: 18000, addSaaS: 0 },
                    { name: "Enterprise Dual-Server (RTX 4090)", addPrice: 120000, addSaaS: 0 }
                ]
            }
        ]
    },
    {
        id: "ai-camera",
        name: "RetailLift Dome Camera",
        desc: "Add-on high-definition surveillance camera. Transmits secure, encrypted 4K RTSP streams to your local RetailLift server node.",
        badge: "AI Camera",
        basePrice: 10000,
        baseSaaS: 0,
        imageUrl: "assets/products/f4a713f1-aa7b-4ead-943f-f53282bf52ef.jpg",
        options: [
            {
                name: "camera-style",
                label: "Camera Specification",
                type: "select",
                choices: [
                    { name: "Indoor Dome (Standard)", addPrice: 0, addSaaS: 0 },
                    { name: "Outdoor Rugged (IP67 Weatherproof)", addPrice: 2000, addSaaS: 0 },
                    { name: "Pan-Tilt-Zoom (PTZ / Speed Dome)", addPrice: 8000, addSaaS: 0 }
                ]
            }
        ]
    },
    {
        id: "edge-node",
        name: "RetailLift Storage HDD",
        desc: "Western Digital surveillance-tier hard drive upgrade for continuous, reliable security storage and local recording buffer playback.",
        badge: "Storage Drive",
        basePrice: 2000,
        baseSaaS: 0,
        imageUrl: "assets/products/f7c11ce5-ceb8-42ce-8c15-21ff3cb41ad6.jpg",
        options: [
            {
                name: "hdd-capacity",
                label: "Drive Capacity",
                type: "select",
                choices: [
                    { name: "1TB WD Blue HDD (Standard)", addPrice: 0, addSaaS: 0 },
                    { name: "2TB WD Purple (Surveillance)", addPrice: 3500, addSaaS: 0 },
                    { name: "4TB WD Purple (Surveillance)", addPrice: 8000, addSaaS: 0 }
                ]
            }
        ]
    },
    {
        id: "installation-service",
        name: "RetailLift Installation Service",
        desc: "Professional structural cabling, ceiling camera mounting, configuration, and calibration by certified local installers.",
        badge: "Professional Services",
        basePrice: 1500,
        baseSaaS: 0,
        imageUrl: "assets/products/installation_service_image.webp",
        options: [
            {
                name: "install-scope",
                label: "Installation Scope",
                type: "select",
                choices: [
                    { name: "Basic: Up to 3 Cameras", addPrice: 0, addSaaS: 0 },
                    { name: "Extended: Up to 5 Cameras", addPrice: 1000, addSaaS: 0 },
                    { name: "Pro: Up to 10 Cameras", addPrice: 3000, addSaaS: 0 }
                ]
            }
        ]
    }
];

const CHART_DATA = {
    detections: {
        title: "Detections Over Time",
        subtitle: "Weekly real-time shoplifting events detected & prevented",
        yLabel: "Detections",
        values: [28, 41, 35, 52, 48, 67, 84],
        labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7"],
        suffix: " events"
    },
    shrinkage: {
        title: "Shrinkage Dollar Savings",
        subtitle: "Est. value of stolen merchandise recovered & prevented",
        yLabel: "Revenue Saved (PKR)",
        values: [580000, 890000, 780000, 1140000, 1080000, 1530000, 1900000],
        labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7"],
        prefix: "Rs. ",
        suffix: ""
    },
    accuracy: {
        title: "AI Model Accuracy Rate",
        subtitle: "Confidence score validations across active deployments",
        yLabel: "Inference Accuracy (%)",
        values: [86.2, 87.5, 88.7, 89.9, 90.5, 91.2, 92.0],
        labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7"],
        suffix: "%"
    }
};

// State Variables
let cart = [];
let activeChartTab = "detections";
let billingCycle = "monthly";

const SUBSCRIPTIONS_DATA = {
    basic: {
        id: "sub-basic",
        name: "RetailLift Basic Subscription",
        monthlyPrice: 25000,
        yearlyPrice: 250000,
        cameras: "Up to 3"
    },
    extended: {
        id: "sub-extended",
        name: "RetailLift Extended Subscription",
        monthlyPrice: 40000,
        yearlyPrice: 400000,
        cameras: "Up to 5"
    },
    pro: {
        id: "sub-pro",
        name: "RetailLift Pro Subscription",
        monthlyPrice: 65000,
        yearlyPrice: 650000,
        cameras: "Up to 10"
    }
};

// ==========================================
// 2. DOCUMENT READY & EVENT REGISTER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Header Scroll Trigger
    const headerEl = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            headerEl.classList.add("scrolled");
        } else {
            headerEl.classList.remove("scrolled");
        }
        highlightActiveSection();
    });

    // Mobile Navigation & Anchor Click Fixes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cart Sidebar Drawer Interactions
    const cartToggleBtn = document.getElementById("cart-toggle-btn");
    const cartCloseBtn = document.getElementById("cart-close-btn");
    const cartBackdrop = document.getElementById("cart-drawer-backdrop");
    const cartDrawer = document.getElementById("cart-drawer");

    const openCart = () => {
        cartDrawer.classList.add("open");
        cartBackdrop.classList.add("open");
    };

    const closeCart = () => {
        cartDrawer.classList.remove("open");
        cartBackdrop.classList.remove("open");
    };

    cartToggleBtn.addEventListener("click", openCart);
    cartCloseBtn.addEventListener("click", closeCart);
    cartBackdrop.addEventListener("click", closeCart);

    // Chart tab switches
    const tabDetections = document.getElementById("tab-detections");
    const tabShrinkage = document.getElementById("tab-shrinkage");
    const tabAccuracy = document.getElementById("tab-accuracy");

    const switchChart = (tabName, btnEl) => {
        document.querySelectorAll(".chart-tab-btn").forEach(btn => btn.classList.remove("active"));
        btnEl.classList.add("active");
        activeChartTab = tabName;
        renderChart();
    };

    tabDetections.addEventListener("click", (e) => switchChart("detections", e.target));
    tabShrinkage.addEventListener("click", (e) => switchChart("shrinkage", e.target));
    tabAccuracy.addEventListener("click", (e) => switchChart("accuracy", e.target));

    // Consultation contact form submit
    const contactForm = document.getElementById("consultation-form");
    contactForm.addEventListener("submit", handleContactSubmit);

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains("active");

            // Close all active items
            document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });

    // Checkout button
    const checkoutBtn = document.getElementById("cart-checkout-btn");
    const checkoutModal = document.getElementById("checkout-modal-overlay");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Cart Empty", "Please configure and add products first.", "warning");
            return;
        }
        closeCart();
        checkoutModal.classList.add("open");
    });

    modalCloseBtn.addEventListener("click", () => {
        checkoutModal.classList.remove("open");
        cart = [];
        updateCartUI();
    });

    // Billing Toggle Listener
    const billingToggleBtn = document.getElementById("billing-toggle-btn");
    if (billingToggleBtn) {
        billingToggleBtn.addEventListener("click", () => {
            const isYearly = billingToggleBtn.classList.toggle("yearly");
            billingCycle = isYearly ? "yearly" : "monthly";
            
            // Update labels active class
            document.getElementById("toggle-label-monthly").classList.toggle("active", !isYearly);
            document.getElementById("toggle-label-yearly").classList.toggle("active", isYearly);
            
            // Update price displays on cards
            updatePricingDisplay();
        });
    }

    // Select Plan Buttons Listener
    const selectPlanBtns = document.querySelectorAll(".btn-select-plan");
    selectPlanBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const planKey = e.currentTarget.getAttribute("data-plan");
            addSubscriptionToCart(planKey);
        });
    });

    // Initializations
    renderProducts();
    updateCartUI();
    renderChart();
    initCameraSimulator();
    initAlertLogsSim();
});

// Scroll Highlighting Nav Link active class
function highlightActiveSection() {
    const sections = ["dashboard", "results", "pricing", "products", "contact"];
    const scrollPos = window.scrollY + 200;

    sections.forEach(id => {
        const el = document.getElementById(id);
        const navLink = document.getElementById("nav-" + id);
        if (el && navLink) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove("active"));
                navLink.classList.add("active");
            }
        }
    });
}

// ==========================================
// 3. PRODUCT CATALOG RENDERING & LOGIC
// ==========================================

function renderProducts() {
    const container = document.getElementById("product-list-grid");
    container.innerHTML = "";

    PRODUCTS_DATA.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.id = `product-card-${product.id}`;

        // Options dropdown selectors HTML
        let optionsHTML = "";
        if (product.options && product.options.length > 0) {
            optionsHTML = `<div class="product-configurator-box">`;
            product.options.forEach(opt => {
                optionsHTML += `
                    <div class="config-option-row">
                        <label class="config-label" for="opt-${product.id}-${opt.name}">
                            <span>${opt.label}</span>
                            <span class="config-label-value" id="val-${product.id}-${opt.name}">Standard</span>
                        </label>
                        <select class="config-select" id="opt-${product.id}-${opt.name}" data-prodid="${product.id}" data-optname="${opt.name}">
                            ${opt.choices.map((choice, idx) => `
                                <option value="${idx}">${choice.name}</option>
                            `).join("")}
                        </select>
                    </div>
                `;
            });
            optionsHTML += `</div>`;
        }

        // Product structure
        const imageElementHTML = product.imageUrl
            ? `<img class="product-image-el" src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.35)); transition: var(--transition-smooth);">`
            : `<canvas class="product-canvas-illustration" id="canvas-ill-${product.id}"></canvas>`;

        card.innerHTML = `
            <div class="product-image-wrapper">
                <span class="product-badge">${product.badge}</span>
                ${imageElementHTML}
            </div>
            <div class="product-info-panel">
                <div class="product-header-group">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price" id="price-${product.id}">Rs. 0.00</div>
                </div>
                <p class="product-desc">${product.desc}</p>
                ${optionsHTML}
                <button class="btn-add-to-cart" data-prodid="${product.id}">
                    <i class="fa-solid fa-plus"></i> Add to System
                </button>
            </div>
        `;

        container.appendChild(card);
        if (product.illustrationType) {
            drawProductIllustration(product.id, product.illustrationType);
        }

        // Bind event listeners for custom options changes
        if (product.options) {
            product.options.forEach(opt => {
                const selectEl = document.getElementById(`opt-${product.id}-${opt.name}`);
                selectEl.addEventListener("change", () => {
                    updateProductPriceDisplay(product.id);
                });
            });
        }

        // Bind Add to Cart action
        const addBtn = card.querySelector(".btn-add-to-cart");
        addBtn.addEventListener("click", () => {
            addProductToCart(product.id);
        });

        // Initialize price display
        updateProductPriceDisplay(product.id);
    });
}

// Calculate configured price based on choices
function calculateConfiguredPrice(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    let price = product.basePrice;
    let saas = product.baseSaaS;
    let selectedOptionsText = [];

    if (product.options) {
        product.options.forEach(opt => {
            const selectEl = document.getElementById(`opt-${product.id}-${opt.name}`);
            const selectedIndex = parseInt(selectEl.value);
            const choice = opt.choices[selectedIndex];
            price += choice.addPrice;
            saas += choice.addSaaS;
            selectedOptionsText.push(`${opt.label}: ${choice.name}`);

            // Update selected option text indicator
            const valIndicator = document.getElementById(`val-${product.id}-${opt.name}`);
            if (valIndicator) {
                // Shorten name if it contains specifications
                valIndicator.textContent = choice.name.split(" (")[0];
            }
        });
    }

    return { price, saas, selectedOptionsText };
}

function updateProductPriceDisplay(productId) {
    const { price, saas } = calculateConfiguredPrice(productId);
    const priceDisplay = document.getElementById(`price-${productId}`);

    if (price > 0 && saas > 0) {
        priceDisplay.innerHTML = `Rs. ${price.toLocaleString()} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">+ Rs. ${saas}/mo</span>`;
    } else if (price > 0) {
        priceDisplay.textContent = `Rs. ${price.toLocaleString()}`;
    } else {
        priceDisplay.textContent = `Rs. ${saas}/mo`;
    }
}

// Vector Product Graphics drawn on individual HTML Canvas elements
function drawProductIllustration(id, type) {
    const canvas = document.getElementById(`canvas-ill-${id}`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = 300);
    const h = (canvas.height = 150);

    ctx.clearRect(0, 0, w, h);

    if (type === "complete") {
        // Draw computer server hub
        ctx.fillStyle = "rgba(30, 58, 138, 0.4)";
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(40, 45, 100, 60, 6);
        ctx.fill();
        ctx.stroke();

        // Server neon stripes
        ctx.strokeStyle = "#00d2ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(55, 60); ctx.lineTo(125, 60);
        ctx.moveTo(55, 75); ctx.lineTo(125, 75);
        ctx.stroke();

        ctx.fillStyle = "#00d2ff";
        ctx.beginPath();
        ctx.arc(60, 90, 4, 0, Math.PI * 2);
        ctx.arc(80, 90, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw camera next to server
        ctx.fillStyle = "rgba(10, 27, 61, 0.8)";
        ctx.strokeStyle = "#00f2fe";
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.arc(210, 75, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#020816";
        ctx.beginPath();
        ctx.arc(210, 75, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#00d2ff";
        ctx.beginPath();
        ctx.arc(214, 71, 3, 0, Math.PI * 2);
        ctx.fill();

        // Connection link line
        ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(140, 75);
        ctx.lineTo(185, 75);
        ctx.stroke();
        ctx.setLineDash([]);
    } else if (type === "camera") {
        // Draw dome camera icon
        const cx = w / 2;
        const cy = h / 2;

        ctx.fillStyle = "rgba(10, 27, 61, 0.6)";
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 35, 0, Math.PI, true);
        ctx.lineTo(cx - 35, cy);
        ctx.fill();
        ctx.stroke();

        // Base plate
        ctx.fillStyle = "#102652";
        ctx.beginPath();
        ctx.roundRect(cx - 45, cy - 8, 90, 10, 3);
        ctx.fill();
        ctx.stroke();

        // Camera lens inside dome
        ctx.fillStyle = "rgba(0, 210, 255, 0.2)";
        ctx.strokeStyle = "#00f2fe";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy - 2, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Lens iris
        ctx.fillStyle = "#020816";
        ctx.beginPath();
        ctx.arc(cx, cy - 2, 9, 0, Math.PI * 2);
        ctx.fill();

        // Lens reflection node
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(cx + 3, cy - 5, 2.5, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "server") {
        // Draw server tower nodes
        ctx.fillStyle = "rgba(10, 27, 61, 0.6)";
        ctx.strokeStyle = "#4facfe";
        ctx.lineWidth = 2;

        // Draw multiple stack boxes
        const boxH = 18;
        const boxW = 120;
        const startX = w / 2 - boxW / 2;

        for (let i = 0; i < 3; i++) {
            const startY = 35 + i * (boxH + 8);
            ctx.beginPath();
            ctx.roundRect(startX, startY, boxW, boxH, 4);
            ctx.fill();
            ctx.stroke();

            // Neon indicators
            ctx.fillStyle = i === 0 ? "#10b981" : "#00d2ff";
            ctx.beginPath();
            ctx.arc(startX + 15, startY + boxH / 2, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(startX + 32, startY + boxH / 2);
            ctx.lineTo(startX + 95, startY + boxH / 2);
            ctx.stroke();
        }
    } else if (type === "cloud") {
        // Draw cloud server sync icon
        const cx = w / 2;
        const cy = h / 2;

        ctx.fillStyle = "rgba(10, 27, 61, 0.5)";
        ctx.strokeStyle = "#00f2fe";
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.arc(cx - 20, cy + 10, 18, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(cx, cy - 12, 24, Math.PI * 1, Math.PI * 2);
        ctx.arc(cx + 25, cy + 8, 20, Math.PI * 1.5, Math.PI * 0.5);
        ctx.lineTo(cx - 20, cy + 28);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw uploading arrow
        ctx.strokeStyle = "#4facfe";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 18);
        ctx.lineTo(cx, cy - 4);
        ctx.moveTo(cx - 6, cy + 4);
        ctx.lineTo(cx, cy - 4);
        ctx.lineTo(cx + 6, cy + 4);
        ctx.stroke();
    }
}

// ==========================================
// 4. CART OPERATIONS
// ==========================================

function addProductToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    const { price, saas, selectedOptionsText } = calculateConfiguredPrice(productId);

    // Check if matching configuration already exists in cart to merge quantities
    const configString = selectedOptionsText.join(" | ");
    const existingIndex = cart.findIndex(item => item.productId === productId && item.configuration === configString);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
        showToast("Configuration Updated", `Increased quantity of ${product.name} in cart.`);
    } else {
        cart.push({
            id: `${productId}-${Date.now()}`,
            productId: productId,
            name: product.name,
            price: price,
            monthlyFee: saas,
            configuration: configString,
            quantity: 1
        });
        showToast("Added to Cart", `${product.name} has been added to your system quote.`);
    }

    updateCartUI();

    // Auto-slide open the cart side drawer
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-drawer-backdrop").classList.add("open");
}

function updateCartUI() {
    const countBadge = document.getElementById("cart-item-count");
    const itemsListContainer = document.getElementById("cart-items-list");
    const subtotalLabel = document.getElementById("cart-subtotal");
    const saasLabel = document.getElementById("cart-saas");
    const totalLabel = document.getElementById("cart-total-quote");

    // Total Count
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    countBadge.textContent = totalItems;

    if (cart.length === 0) {
        itemsListContainer.innerHTML = `<p class="cart-empty-msg">Your configuration cart is empty. Add customizable products below to build your quote.</p>`;
        subtotalLabel.textContent = "Rs. 0";
        saasLabel.textContent = "Rs. 0/mo";
        totalLabel.textContent = "Rs. 0";
        return;
    }

    itemsListContainer.innerHTML = "";
    let subtotal = 0;
    let saasTotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        saasTotal += item.monthlyFee * item.quantity;

        const cartItemHTML = document.createElement("div");
        cartItemHTML.className = "cart-item";
        cartItemHTML.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-config">${item.configuration || "Standard Specs"}</div>
                <div class="cart-item-price">
                    Rs. ${item.price.toLocaleString()} 
                    ${item.monthlyFee > 0 ? `<span style="font-size: 0.75rem; color: var(--text-muted);">+ Rs. ${item.monthlyFee}/mo</span>` : ""}
                </div>
                <div class="cart-item-actions">
                    ${item.productId.startsWith("sub-") 
                        ? `<span style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; padding: 0.25rem 0.6rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px;">Subscription Plan</span>`
                        : `
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="adjustCartQty('${item.id}', -1)">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="adjustCartQty('${item.id}', 1)">+</button>
                        </div>
                        `
                    }
                    <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">
                        <i class="fa-solid fa-trash-can"></i> Remove
                    </button>
                </div>
            </div>
        `;
        itemsListContainer.appendChild(cartItemHTML);
    });

    subtotalLabel.textContent = `Rs. ${subtotal.toLocaleString()}`;
    saasLabel.textContent = `Rs. ${saasTotal.toLocaleString()}/mo`;

    // First year estimate calculation (Subtotal + 12 months SaaS)
    const quoteFirstYearVal = subtotal + (saasTotal * 12);
    totalLabel.innerHTML = `Rs. ${quoteFirstYearVal.toLocaleString()} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(First Year Est.)</span>`;
}

// Global functions for inline HTML actions
window.adjustCartQty = function (itemId, amount) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== itemId);
    }
    updateCartUI();
};

window.removeCartItem = function (itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCartUI();
    showToast("Removed from Cart", "Item configuration was removed.", "warning");
};

// ==========================================
// 5. INTERACTIVE PERFORMANCE GRAPH (SVG)
// ==========================================

function renderChart() {
    const chart = CHART_DATA[activeChartTab];
    const svg = document.getElementById("svg-chart");
    const chartLine = document.getElementById("chart-line");
    const chartArea = document.getElementById("chart-area");
    const dotsGroup = document.getElementById("chart-dots");
    const labelsGroup = document.getElementById("chart-labels");
    const gridGroup = document.getElementById("chart-grid");

    // Update texts
    document.getElementById("chart-main-title").textContent = chart.title;
    document.getElementById("chart-sub-title").textContent = chart.subtitle;

    dotsGroup.innerHTML = "";
    labelsGroup.innerHTML = "";
    gridGroup.innerHTML = "";

    // Sizing
    const width = 600;
    const height = 300;
    const paddingX = 50;
    const paddingY = 40;

    const dataPoints = chart.values;
    const minVal = 0;
    const maxVal = Math.max(...dataPoints) * 1.15; // padding top

    // Mapping helper
    const getX = (index) => paddingX + (index * (width - paddingX * 2) / (dataPoints.length - 1));
    const getY = (val) => height - paddingY - (val * (height - paddingY * 2) / maxVal);

    // Draw horizontal grid lines (5 rows)
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
        const gridVal = maxVal * (i / steps);
        const yCoord = getY(gridVal);

        // Grid line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", paddingX);
        line.setAttribute("y1", yCoord);
        line.setAttribute("x2", width - paddingX);
        line.setAttribute("y2", yCoord);
        line.setAttribute("class", "chart-grid-line");
        gridGroup.appendChild(line);

        // Y-axis text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", paddingX - 10);
        text.setAttribute("y", yCoord + 4);
        text.setAttribute("text-anchor", "end");
        text.setAttribute("class", "chart-axis-text");

        let labelValue = Math.round(gridVal);
        if (chart.prefix) labelValue = chart.prefix + labelValue;
        if (chart.suffix && activeChartTab === "accuracy") labelValue = gridVal.toFixed(1) + chart.suffix;
        else if (chart.suffix) labelValue = labelValue + chart.suffix;

        text.textContent = labelValue;
        gridGroup.appendChild(text);
    }

    // Build path coordinates string
    let pathD = "";
    let areaD = `M ${getX(0)} ${height - paddingY} `;

    dataPoints.forEach((val, idx) => {
        const x = getX(idx);
        const y = getY(val);

        if (idx === 0) {
            pathD += `M ${x} ${y} `;
        } else {
            pathD += `L ${x} ${y} `;
        }

        areaD += `L ${x} ${y} `;

        // Draw dot
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("class", "chart-dot");
        dotsGroup.appendChild(circle);

        // Event for tooltips
        circle.addEventListener("mouseenter", (e) => {
            const tooltip = document.getElementById("chart-tooltip");
            let displayVal = val;
            if (chart.prefix) displayVal = chart.prefix + displayVal;
            if (chart.suffix) displayVal = displayVal + chart.suffix;

            tooltip.innerHTML = `<strong>${chart.labels[idx]}</strong>: ${displayVal}`;
            tooltip.style.opacity = 1;

            // Positioning tooltip
            const rect = svg.getBoundingClientRect();
            const dotX = (x / width) * rect.width;
            const dotY = (y / height) * rect.height;
            tooltip.style.left = `${dotX}px`;
            tooltip.style.top = `${dotY - 45}px`;
        });

        circle.addEventListener("mouseleave", () => {
            document.getElementById("chart-tooltip").style.opacity = 0;
        });

        // X-axis label
        const xText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xText.setAttribute("x", x);
        xText.setAttribute("y", height - paddingY + 20);
        xText.setAttribute("text-anchor", "middle");
        xText.setAttribute("class", "chart-axis-text");
        xText.textContent = chart.labels[idx];
        labelsGroup.appendChild(xText);
    });

    areaD += `L ${getX(dataPoints.length - 1)} ${height - paddingY} Z`;

    // Apply paths with stroke animations
    chartLine.setAttribute("d", pathD);
    chartArea.setAttribute("d", areaD);

    // Trigger stroke-dashoffset animation
    const pathLength = chartLine.getTotalLength();
    chartLine.style.strokeDasharray = pathLength;
    chartLine.style.strokeDashoffset = pathLength;

    // Trigger transition reflow
    chartLine.getBoundingClientRect();
    chartLine.style.strokeDashoffset = "0";
}

// ==========================================
// 6. LIVE CAMERA FEED SIMULATOR
// ==========================================

function initCameraSimulator() {
    const canvas = document.getElementById("feed-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set fixed coordinates size for simplicity
    canvas.width = 640;
    canvas.height = 360;

    // Simulation States
    // 0: Normal shoppers browsing
    // 1: Lingering suspicious shopper
    // 2: Concealment alert action
    // 3: Dispatch notification / recovery
    let currentState = 0;
    let timer = 0;

    // Simulated shopper objects
    const shoppers = [
        { id: 104, x: 120, y: 180, targetX: 200, targetY: 190, speed: 0.8, name: "SHOPPER #104", status: "NORMAL", width: 45, height: 110, confidence: 95 },
        { id: 118, x: 420, y: 150, targetX: 380, targetY: 220, speed: 0.6, name: "SHOPPER #118", status: "NORMAL", width: 40, height: 100, confidence: 92 },
        { id: 502, x: 260, y: 220, targetX: 280, targetY: 230, speed: 0.4, name: "SHOPPER #502", status: "NORMAL", width: 48, height: 120, confidence: 98 }
    ];

    const alertsHistory = [];

    function updateSimulation() {
        timer += 16.7; // Approx 60fps increments

        // Time ticker update in UI
        const now = new Date();
        document.getElementById("sim-time").textContent = now.toTimeString().split(" ")[0];

        // State Machine timer checks
        if (currentState === 0 && timer > 6000) {
            // Shopper 502 starts lingering suspiciously
            currentState = 1;
            shoppers[2].status = "SUSPICIOUS";
            shoppers[2].targetX = 265;
            shoppers[2].targetY = 240;
            shoppers[2].speed = 0.1; // pacing

            document.getElementById("sim-status-dot").className = "status-dot";
            document.getElementById("sim-status-dot").style.backgroundColor = "var(--accent-warning)";
            document.getElementById("sim-status-dot").style.boxShadow = "0 0 8px var(--accent-warning)";
            document.getElementById("sim-status-text").textContent = "LIVE FEED: SUSPICIOUS BEHAVIOR PATTERN DETECTED";

            document.getElementById("hud-status-text").textContent = "CAMERA NODE L19: CAUTION";
            document.getElementById("hud-status-text").style.color = "var(--accent-warning)";
            document.getElementById("hud-sub-text").textContent = "SUSPICIOUS PACING AT ISLE 3 COLD RACK";

            timer = 0;
        } else if (currentState === 1 && timer > 5000) {
            // Shopper 502 commits concealment action!
            currentState = 2;
            shoppers[2].status = "CONCEALMENT_ALERT";

            document.getElementById("sim-status-dot").style.backgroundColor = "var(--accent-alert)";
            document.getElementById("sim-status-dot").style.boxShadow = "0 0 8px var(--accent-alert-glow)";
            document.getElementById("sim-status-text").textContent = "LIVE FEED: SECURITY THREAT - ACTIVE CONCEALMENT";

            document.getElementById("hud-status-text").textContent = "CAMERA NODE L19: INTERCEPT ALERT";
            document.getElementById("hud-status-text").style.color = "var(--accent-alert)";
            document.getElementById("hud-sub-text").textContent = "ALERT FORWARDED TO ASSIGNED STAFF EARPIECE";

            // Push alert to history stream
            dispatchLiveAlert(502, "AI-CONCEALMENT", "Camera 4 - Active Jacket Concealment", "High");

            timer = 0;
        } else if (currentState === 2 && timer > 6000) {
            // Staff alerts dispatched, state resets back to normal
            currentState = 3;
            shoppers[2].status = "NORMAL";
            shoppers[2].targetX = 100; // leaves screen
            shoppers[2].targetY = 320;
            shoppers[2].speed = 1.8;

            document.getElementById("sim-status-dot").className = "status-dot active-normal";
            document.getElementById("sim-status-text").textContent = "LIVE FEED: SYSTEM CORE ONLINE";

            document.getElementById("hud-status-text").textContent = "CAMERA NODE L19: ONLINE";
            document.getElementById("hud-status-text").style.color = "var(--brand-glow)";
            document.getElementById("hud-sub-text").textContent = "AI ACTIVE (ACC: 92% | P: 90% | R: 89% | F1: 89%)";

            timer = 0;
        } else if (currentState === 3 && timer > 5000) {
            // Reset to normal
            currentState = 0;
            // Respawn shopper 502 at right screen boundary
            shoppers[2].x = 550;
            shoppers[2].y = 200;
            shoppers[2].targetX = 260;
            shoppers[2].targetY = 220;
            shoppers[2].speed = 0.5;
            timer = 0;
        }

        // Draw Simulation Frame
        ctx.fillStyle = "#020816";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw wireframe/isometric shelves
        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 1.5;

        // Shelf 1 (Left Aisle)
        ctx.fillStyle = "rgba(10, 27, 61, 0.3)";
        ctx.beginPath();
        ctx.moveTo(30, 80); ctx.lineTo(160, 80); ctx.lineTo(160, 240); ctx.lineTo(30, 240);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Shelf 2 (Right Aisle)
        ctx.beginPath();
        ctx.moveTo(480, 80); ctx.lineTo(610, 80); ctx.lineTo(610, 240); ctx.lineTo(480, 240);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Draw camera field limits (lines emitting from top center)
        ctx.strokeStyle = "rgba(0, 210, 255, 0.05)";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(0, canvas.height);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

        // Update and draw shopper bounding boxes
        shoppers.forEach(shop => {
            // Move shoppers
            const dx = shop.targetX - shop.x;
            const dy = shop.targetY - shop.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 5) {
                shop.x += (dx / dist) * shop.speed;
                shop.y += (dy / dist) * shop.speed;
            } else if (currentState === 0) {
                // Assign new random targets to keep them active
                shop.targetX = 50 + Math.random() * (canvas.width - 100);
                shop.targetY = 120 + Math.random() * (canvas.height - 180);
            }

            // Draw shopper box
            let boxColor = "rgba(16, 185, 129, 0.8)"; // Green
            let labelText = `${shop.name} [NORMAL: ${shop.confidence}%]`;

            if (shop.status === "SUSPICIOUS") {
                boxColor = "rgba(245, 158, 11, 0.9)"; // Orange
                labelText = `${shop.name} [CAUTION: LINGERING]`;
            } else if (shop.status === "CONCEALMENT_ALERT") {
                boxColor = "rgba(239, 68, 68, 1)"; // Red
                labelText = `ALERT: jacket concealment detected (98.4%)`;
            }

            // Render bounding rectangle
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = shop.status === "CONCEALMENT_ALERT" ? 3 : 1.5;
            ctx.beginPath();
            ctx.rect(shop.x - shop.width / 2, shop.y - shop.height, shop.width, shop.height);
            ctx.stroke();

            // Render skeleton wireframe overlay (looks very AI!)
            ctx.strokeStyle = shop.status === "CONCEALMENT_ALERT" ? "rgba(239, 68, 68, 0.4)" : "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 1;
            const cx = shop.x;
            const cy = shop.y - shop.height;
            // Draw skeleton lines
            ctx.beginPath();
            ctx.arc(cx, cy + 12, 6, 0, Math.PI * 2); // Head
            ctx.moveTo(cx, cy + 18); ctx.lineTo(cx, cy + 60); // Spine
            ctx.moveTo(cx - 15, cy + 30); ctx.lineTo(cx + 15, cy + 30); // Shoulders
            ctx.moveTo(cx - 15, cy + 30); ctx.lineTo(cx - 10, cy + 55); // Left arm
            ctx.moveTo(cx + 15, cy + 30); ctx.lineTo(cx + 10, cy + 55); // Right arm
            ctx.moveTo(cx, cy + 60); ctx.lineTo(cx - 12, cy + 95); // Left leg
            ctx.moveTo(cx, cy + 60); ctx.lineTo(cx + 12, cy + 95); // Right leg
            ctx.stroke();

            // Bounding box text label background
            ctx.fillStyle = boxColor;
            ctx.fillRect(shop.x - shop.width / 2, shop.y - shop.height - 18, shop.width + 10, 18);

            // Label text
            ctx.fillStyle = "#ffffff";
            ctx.font = "8px monospace";
            ctx.fillText(labelText, shop.x - shop.width / 2 + 4, shop.y - shop.height - 6);
        });

        // Loop animation
        requestAnimationFrame(updateSimulation);
    }

    requestAnimationFrame(updateSimulation);
}

// ==========================================
// 7. ALERT STREAM SYSTEM & INITIAL LOGS
// ==========================================

function initAlertLogsSim() {
    const listEl = document.getElementById("history-alert-list");
    listEl.innerHTML = "";

    // Pre-populate with recent security logs
    const mockLogs = [
        { id: 98, code: "AI-LINGER", msg: "Aisle 2 - Suspicious repeated lingering", conf: "Medium (78%)", time: "8 mins ago", confClass: "conf-medium" },
        { id: 97, code: "AI-SWIPE", msg: "Electronics - Handbag concealment attempt", conf: "High (94%)", time: "22 mins ago", confClass: "conf-high" },
        { id: 96, code: "AI-PASSIVE", msg: "Entrance - Normal entry traffic flow", conf: "Resolved (99%)", time: "1 hour ago", confClass: "conf-low" }
    ];

    mockLogs.forEach(log => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML = `
            <div class="history-details">
                <div class="history-event">${log.msg}</div>
                <div class="history-meta">NODE_ID: L-09 // AUTH_CODE: ${log.code} // ${log.time}</div>
            </div>
            <div class="history-confidence ${log.confClass}">${log.conf}</div>
        `;
        listEl.appendChild(item);
    });
}

function dispatchLiveAlert(shopperId, code, msg, confLevel) {
    const listEl = document.getElementById("history-alert-list");
    const item = document.createElement("div");
    item.className = "history-item";

    // Style variables depending on confidence
    let confClass = "conf-high";
    let confLabel = "High (98%)";
    if (confLevel === "Medium") {
        confClass = "conf-medium";
        confLabel = "Medium (85%)";
    }

    item.innerHTML = `
        <div class="history-details">
            <div class="history-event">${msg}</div>
            <div class="history-meta">NODE_ID: L19 // AUTH_CODE: ${code} // Just Now</div>
        </div>
        <div class="history-confidence ${confClass}">${confLabel}</div>
    `;

    // Slide insertion animation
    item.style.opacity = 0;
    item.style.transform = "translateX(-20px)";
    listEl.insertBefore(item, listEl.firstChild);

    // Reflow
    item.getBoundingClientRect();

    item.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    item.style.opacity = 1;
    item.style.transform = "translateX(0)";

    // Prune logs if list gets too long (max 5)
    if (listEl.children.length > 5) {
        listEl.removeChild(listEl.lastChild);
    }
}

// ==========================================
// 8. FORMS VALIDATION & UTILITIES
// ==========================================

function handleContactSubmit(e) {
    e.preventDefault();

    const nameEl = document.getElementById("contact-name");
    const emailEl = document.getElementById("contact-email");
    const messageEl = document.getElementById("contact-message");

    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const errorMessage = document.getElementById("error-message");

    let isValid = true;

    // Reset errors
    errorName.style.display = "none";
    errorEmail.style.display = "none";
    errorMessage.style.display = "none";

    // Validate Name
    if (!nameEl.value.trim()) {
        errorName.style.display = "block";
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim() || !emailRegex.test(emailEl.value)) {
        errorEmail.style.display = "block";
        isValid = false;
    }

    // Validate Message
    if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
        errorMessage.textContent = "Please enter at least 10 characters detailing your request.";
        errorMessage.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        // Success submit mock
        showToast("Consultation Sent", "Thank you! A system engineer will contact you shortly.", "success");
        contactForm.reset();

        // Reset floating label states
        document.querySelectorAll(".form-group input, .form-group textarea").forEach(field => {
            field.blur();
        });
    }
}

function showToast(title, body, type = "success") {
    const toast = document.getElementById("toast-notification");
    document.getElementById("toast-title").textContent = title;
    document.getElementById("toast-body").textContent = body;

    const iconEl = toast.querySelector(".toast-icon i");
    if (type === "warning") {
        toast.style.borderLeftColor = "var(--accent-warning)";
        iconEl.className = "fa-solid fa-triangle-exclamation";
        iconEl.style.color = "var(--accent-warning)";
    } else {
        toast.style.borderLeftColor = "var(--accent-success)";
        iconEl.className = "fa-solid fa-circle-check";
        iconEl.style.color = "var(--accent-success)";
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// Subscription Pricing helper functions
function updatePricingDisplay() {
    const basicMain = document.getElementById("basic-main-price");
    const basicAlt = document.getElementById("basic-alt-price");
    const extendedMain = document.getElementById("extended-main-price");
    const extendedAlt = document.getElementById("extended-alt-price");
    const proMain = document.getElementById("pro-main-price");
    const proAlt = document.getElementById("pro-alt-price");

    if (billingCycle === "monthly") {
        if (basicMain) basicMain.innerHTML = `<span class="currency">PKR</span> <span class="amount">25,000</span> <span class="period">/month</span>`;
        if (basicAlt) basicAlt.textContent = `PKR 250,000 /year (save PKR 50,000)`;
        
        if (extendedMain) extendedMain.innerHTML = `<span class="currency">PKR</span> <span class="amount">40,000</span> <span class="period">/month</span>`;
        if (extendedAlt) extendedAlt.textContent = `PKR 400,000 /year (save PKR 80,000)`;
        
        if (proMain) proMain.innerHTML = `<span class="currency">PKR</span> <span class="amount">65,000</span> <span class="period">/month</span>`;
        if (proAlt) proAlt.textContent = `PKR 650,000 /year (save PKR 130,000)`;
    } else {
        if (basicMain) basicMain.innerHTML = `<span class="currency">PKR</span> <span class="amount">250,000</span> <span class="period">/year</span>`;
        if (basicAlt) basicAlt.textContent = `PKR 25,000 /month (save PKR 50,000 on yearly billing)`;
        
        if (extendedMain) extendedMain.innerHTML = `<span class="currency">PKR</span> <span class="amount">400,000</span> <span class="period">/year</span>`;
        if (extendedAlt) extendedAlt.textContent = `PKR 40,000 /month (save PKR 80,000 on yearly billing)`;
        
        if (proMain) proMain.innerHTML = `<span class="currency">PKR</span> <span class="amount">650,000</span> <span class="period">/year</span>`;
        if (proAlt) proAlt.textContent = `PKR 65,000 /month (save PKR 130,000 on yearly billing)`;
    }
}

function addSubscriptionToCart(planKey) {
    const plan = SUBSCRIPTIONS_DATA[planKey];
    if (!plan) return;

    let price = 0;
    let monthlyFee = 0;
    let configuration = "";

    if (billingCycle === "monthly") {
        price = 0;
        monthlyFee = plan.monthlyPrice;
        configuration = `Billing Cycle: Monthly (${plan.cameras} cameras)`;
    } else {
        price = plan.yearlyPrice;
        monthlyFee = 0;
        configuration = `Billing Cycle: Yearly (${plan.cameras} cameras)`;
    }

    // Filter out existing subscription plan from cart (only one subscription is active at a time)
    const hadSubscription = cart.some(item => item.productId.startsWith("sub-"));
    cart = cart.filter(item => !item.productId.startsWith("sub-"));

    // Add new subscription
    cart.push({
        id: `${plan.id}-${Date.now()}`,
        productId: plan.id,
        name: plan.name,
        price: price,
        monthlyFee: monthlyFee,
        configuration: configuration,
        quantity: 1
    });

    if (hadSubscription) {
        showToast("Subscription Updated", `Your quote has been updated to ${plan.name} (${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}).`);
    } else {
        showToast("Added to Cart", `${plan.name} has been added to your system quote.`);
    }

    updateCartUI();

    // Auto-slide open the cart side drawer
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-drawer-backdrop").classList.add("open");
}
