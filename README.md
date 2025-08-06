Overview

An interactive bundle builder interface that allows users to:

1. Select products to create custom bundles

2. Track bundle progress with visual indicators

3. View dynamic discount calculations

4. Manage quantities of selected items

5. Responsive design for all device sizes

---

Features

Core Functionality:

🛍️ Product grid with 6 items (3 per row on desktop)

➕ "Add to Bundle" toggle buttons

📊 Progress tracker showing items selected (3 required for discount)

💰 Automatic 30% discount when 3+ items are added

🛒 "Add to Cart" button with state management

Enhanced Features

🔢 Quantity controls (+/-) for each product

❌ Remove items from bundle

✅ Visual feedback when adding to cart

📱 Fully responsive layout

🎨 Polished UI with smooth transitions

---

Technical Details

Technologies Used:

1. Frontend: HTML5, CSS3, JavaScript (ES6+)

2. No external dependencies (pure vanilla JS)

3. CSS Features: Flexbox, Grid, CSS Variables

4. Browser Compatibility: Chrome, Firefox, Safari, Edge

---  

Project Structure
text
bundle-builder/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Main application logic
└── assets/
    └── products/       # Product images
        ├── product1.jpg
        ├── product2.jpg
        └── ...

--- 

Setup Instructions

Clone the repository:

bash
```
git clone https://github.com/yourusername/bundle-builder.git
cd bundle-builder

```

Set up product images:

1. Place your product images in assets/products/

2. Name them product1.jpg through product6.jpg

Run the project:

Option 1: Open index.html directly in your browser

Option 2: Use VS Code with Live Server extension

Customization

Easy Modifications:

1. Change products: Edit the products array in script.js

2. Adjust discount: Modify the 0.3 value in discount calculation

3. Change colors: Update CSS variables in styles.css

css
:root {
  --primary-color: #2E294E;
  --secondary-color: #9055A2;
  --accent-color: #D499B9;
}
Advanced Customization

1. Add more products: Extend the products array and adjust grid CSS

2. Change bundle requirements: Update the "3" in progress calculations

3. Add animations: Enhance with CSS transitions


Created by: Suprabha Panigrahi

Last Updated: 06-Aug-2025

