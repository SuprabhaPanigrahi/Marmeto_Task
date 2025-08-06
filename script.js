document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: "Tie-Dye Lounge Set",
            price: 150.00,
            image: "./assets/products/product1.jpg"
        },
        {
            id: 2,
            title: "Sunburst Tracksuit",
            price: 150.00,
            image: "./assets/products/product2.jpg"
        },
        {
            id: 3,
            title: "Retro Red Streetwear",
            price: 150.00,
            image: "./assets/products/product3.jpg"
        },
        {
            id: 4,
            title: "Urban Sportwear Combo",
            price: 150.00,
            image: "./assets/products/product4.jpg"
        },
        {
            id: 5,
            title: "Oversized Knit & Coat",
            price: 150.00,
            image: "./assets/products/product5.jpg"
        },
        {
            id: 6,
            title: "Chic Monochrome Blazer",
            price: 150.00,
            image: "./assets/products/product6.jpg"
        }
    ];

    // State to track selected products with quantities
    let selectedProducts = [];

    // DOM elements
    const elements = {
        productsContainer: document.querySelector('.products-container'),
        productsList: document.querySelector('.products-list'),
        progressFill: document.querySelector('.progress-fill'),
        progressCount: document.querySelector('.progress-count'),
        discountAmount: document.querySelector('.discount-amount'),
        subtotalAmount: document.querySelector('.subtotal-amount'),
        addToCartBtn: document.querySelector('.add-to-cart'),
        emptyState: document.querySelector('.empty-state'),
        discountLine: document.querySelector('.discount-line'),
        bundleSidebar: document.querySelector('.bundle-sidebar'),
        productsGrid: document.querySelector('.products-grid')
    };

    // Initialize the app
    function init() {
        if (!elements.productsContainer || !elements.productsList) {
            console.error("Missing required elements");
            return;
        }

        renderProducts();
        updateSidebar();
        alignSidebarWithProducts();
        window.addEventListener('resize', alignSidebarWithProducts);
    }

    function alignSidebarWithProducts() {
        if (elements.bundleSidebar && elements.productsGrid) {
            elements.bundleSidebar.style.marginTop = `${elements.productsGrid.offsetTop}px`;
        }
    }

    // Render product cards
    function renderProducts() {
        elements.productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const existingProduct = selectedProducts.find(p => p.id === product.id);
            const quantity = existingProduct ? existingProduct.quantity : 0;
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-bundle ${quantity > 0 ? 'added' : ''}" data-id="${product.id}">
                        ${quantity > 0 ? `Added (${quantity}) ✓` : 'Add to Bundle'}
                    </button>
                </div>
            `;
            
            elements.productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.add-to-bundle').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const product = products.find(p => p.id === productId);
                addToBundle(product, this);
            });
        });
    }

    // Add product to bundle
    function addToBundle(product, button) {
        const existingIndex = selectedProducts.findIndex(p => p.id === product.id);
        
        if (existingIndex >= 0) {
            // Update quantity
            selectedProducts[existingIndex].quantity += 1;
        } else {
            // Add new product with quantity 1
            selectedProducts.push({
                ...product,
                quantity: 1
            });
        }
        
        updateButtonState(button, product.id);
        updateSidebar();
    }

    // Update button state
    function updateButtonState(button, productId) {
        const product = selectedProducts.find(p => p.id === productId);
        if (product) {
            button.classList.add('added');
            button.textContent = `Added (${product.quantity})`;
        } else {
            button.classList.remove('added');
            button.textContent = 'Add to Bundle';
        }
    }

    // Update sidebar with selected products and totals
    function updateSidebar() {
        const itemCount = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
        const progressPercentage = Math.min((itemCount / 3) * 100, 100);
        
        // Update progress bar
        elements.progressFill.style.width = `${progressPercentage}%`;
        elements.progressCount.textContent = `${itemCount}/3 products added`;
        
        // Update CTA button
        if (itemCount >= 3) {
            elements.addToCartBtn.textContent = 'Add Bundle to Cart';
            elements.addToCartBtn.disabled = false;
        } else {
            elements.addToCartBtn.textContent = `Add ${3-itemCount} Items to Proceed`;
            elements.addToCartBtn.disabled = true;
        }

        // Update products list
        if (selectedProducts.length > 0) {
            elements.emptyState.style.display = 'none';
            elements.productsList.innerHTML = '';
            
            selectedProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-thumbnail">
                    <div class="product-details">
                        <div class="product-item-title">${product.title}</div>
                        <div class="product-item-price">$${product.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${product.id}">-</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="quantity-btn plus" data-id="${product.id}">+</button>
                            <button class="remove-btn" data-id="${product.id}">×</button>
                        </div>
                    </div>
                `;
                elements.productsList.appendChild(productItem);
            });

            // Add event listeners for quantity controls
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    const isPlus = this.classList.contains('plus');
                    updateQuantity(productId, isPlus);
                });
            });

            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    removeProduct(productId);
                });
            });
        } else {
            elements.emptyState.style.display = 'block';
            elements.productsList.innerHTML = '<div class="empty-state">No products added yet</div>';
        }
        
        // Calculate totals
        const subtotal = selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const discount = itemCount >= 3 ? subtotal * 0.3 : 0;
        const total = subtotal - discount;
        
        // Update totals display
        elements.discountAmount.textContent = `-$${discount.toFixed(2)}`;
        elements.subtotalAmount.textContent = `$${total.toFixed(2)}`;
        
        // Toggle discount visibility
        if (elements.discountLine) {
            elements.discountLine.style.display = itemCount >= 3 ? 'flex' : 'none';
        }
    }

    // Update product quantity
    function updateQuantity(productId, isIncrease) {
        const index = selectedProducts.findIndex(p => p.id === productId);
        if (index >= 0) {
            if (isIncrease) {
                selectedProducts[index].quantity += 1;
            } else {
                if (selectedProducts[index].quantity > 1) {
                    selectedProducts[index].quantity -= 1;
                } else {
                    selectedProducts.splice(index, 1);
                }
            }
            updateSidebar();
            renderProducts();
        }
    }

    // Remove product completely
    function removeProduct(productId) {
        selectedProducts = selectedProducts.filter(p => p.id !== productId);
        updateSidebar();
        renderProducts(); 
    }

    // Add to cart button handler
    if (elements.addToCartBtn) {
        elements.addToCartBtn.addEventListener('click', () => {
            const itemCount = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
            if (itemCount >= 3) {
                // Change button to show success
                elements.addToCartBtn.textContent = '✓ Added to Cart';
                elements.addToCartBtn.classList.add('success');
                
                setTimeout(() => {
                    elements.addToCartBtn.textContent = 'Add 3 Items to Cart';
                    elements.addToCartBtn.classList.remove('success');
                }, 2000);
                
                console.log('Bundle added to cart:', selectedProducts);
            }
        });
    }

    // Initialize the app
    init();
});