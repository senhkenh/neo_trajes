// Products data
const products = [
    { id: 1, name: "Neo Classic Black", price: 189, image: "images/neo01.png", category: "elegant", description: "Elegancia atemporal en negro profundo. Diseño clásico para el hombre sofisticado." },
    { id: 2, name: "Neo Minimal White", price: 165, image: "images/neo02.png", category: "casual", description: "Pureza minimalista en blanco inmaculado. Simplicidad que habla por sí sola." },
    { id: 3, name: "Neo Luxury Noir", price: 225, image: "images/neo03.png", category: "premium", description: "Lujo absoluto en tonos noir. La máxima expresión de sofisticación masculina." },
    { id: 4, name: "Neo Urban Grey", price: 175, image: "images/neo04.png", category: "casual", description: "Gris urbano para el hombre moderno. Versatilidad y estilo en perfecta armonía." },
    { id: 5, name: "Neo Elite Charcoal", price: 195, image: "images/neo05.png", category: "elegant", description: "Carbón elegante para ocasiones especiales. Distinción en cada detalle." },
    { id: 6, name: "Neo Sport Mono", price: 155, image: "images/neo06.png", category: "casual", description: "Monocromático deportivo para actividades acuáticas. Funcionalidad premium." },
    { id: 7, name: "Neo Platinum Edition", price: 250, image: "images/neo07.png", category: "premium", description: "Edición platino de colección limitada. Exclusividad redefinida." },
    { id: 8, name: "Neo Modern Slate", price: 170, image: "images/neo08.png", category: "casual", description: "Pizarra moderna para el surfista urbano. Contemporáneo y audaz." },
    { id: 9, name: "Neo Signature Black", price: 285, image: "images/neo09.png", category: "premium", description: "Negro insignia de la marca. La pieza más codiciada de la colección." },
    { id: 10, name: "Neo Comfort Ash", price: 145, image: "images/neo10.png", category: "casual", description: "Ceniza confortable para días relajados. Comodidad sin comprometer el estilo." },
    { id: 11, name: "Neo Executive Onyx", price: 275, image: "images/neo11.png", category: "premium", description: "Ónix ejecutivo para el líder nato. Poder y elegancia en una sola pieza." },
    { id: 12, name: "Neo Classic Pearl", price: 190, image: "images/neo12.png", category: "elegant", description: "Perla clásica de refinamiento absoluto. Elegancia que trasciende el tiempo." },
    { id: 13, name: "Neo Trend Graphite", price: 160, image: "images/neo13.png", category: "casual", description: "Grafito tendencia para el vanguardista. Moda y funcionalidad unidas." },
    { id: 14, name: "Neo Gala Obsidian", price: 210, image: "images/neo14.png", category: "elegant", description: "Obsidiana de gala para eventos exclusivos. Sofisticación en estado puro." },
    { id: 15, name: "Neo Premium Steel", price: 235, image: "images/neo15.png", category: "premium", description: "Acero premium con acabados únicos. Resistencia y estilo en perfecta fusión." },
    { id: 16, name: "Neo Comfort Ivory", price: 150, image: "images/neo16.png", category: "casual", description: "Marfil confortable para días perfectos. Serenidad y comodidad suprema." },
    { id: 17, name: "Neo Ocean Titanium", price: 240, image: "images/neo17.png", category: "premium", description: "Titanio oceánico de diseño insignia. Innovación y lujo sin límites." },
    { id: 18, name: "Neo Versatile Stone", price: 165, image: "images/neo18.png", category: "casual", description: "Piedra versátil para cualquier ocasión. Adaptabilidad y estilo garantizados." },
    { id: 19, name: "Neo Master Ebony", price: 300, image: "images/neo19.png", category: "premium", description: "Ébano maestro, la obra cumbre. Perfección artesanal en su máxima expresión." }
];

// Global state
let cart = [];
let currentFilter = 'all';
let selectedSize = 'M';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartUI();
});

// Load products
function loadProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            loadProducts(currentFilter);
        });
    });

    // Size selector
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        });
    });

    // Contact form
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('¡Mensaje enviado! Te contactaremos pronto.');
        this.reset();
    });

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Tu carrito está vacío');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (confirm(`¿Proceder con el pago de $${total}?`)) {
            cart = [];
            updateCartUI();
            toggleCart();
            showNotification('¡Compra realizada con éxito!');
        }
    });

    // Add to cart from modal
    document.getElementById('addToCartBtn').addEventListener('click', function() {
        const productId = parseInt(this.dataset.productId);
        addToCart(productId);
    });
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `$${product.price}`;
    document.getElementById('addToCartBtn').dataset.productId = productId;
    
    document.getElementById('productModal').classList.add('open');
    document.getElementById('overlay').classList.add('open');
}

// Close modal
function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.productId === productId && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            quantity: 1
        });
    }

    updateCartUI();
    closeModal();
    showNotification(`${product.name} agregado al carrito`);
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    showNotification('Producto eliminado del carrito');
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Update cart UI
function updateCartUI() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.querySelector('.cart-count').textContent = count;
    document.getElementById('cartTotal').textContent = total;
    
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gray-500);">Tu carrito está vacío</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-details">Talla: ${item.size} • Cantidad: ${item.quantity}</div>
                    <div class="cart-item-details">$${item.price * item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

// Smooth scroll
function scrollTo(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #000000, #333333);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 4000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close overlays on click
document.getElementById('overlay').addEventListener('click', function() {
    closeModal();
    document.getElementById('cartSidebar').classList.remove('open');
    this.classList.remove('open');
});

// Smooth scroll for navigation
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