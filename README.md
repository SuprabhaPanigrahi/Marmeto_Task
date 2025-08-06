Overview

An interactive bundle builder interface that allows users to:

Select products to create custom bundles

Track bundle progress with visual indicators

View dynamic discount calculations

Manage quantities of selected items

Responsive design for all device sizes

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

Frontend: HTML5, CSS3, JavaScript (ES6+)

No external dependencies (pure vanilla JS)

CSS Features: Flexbox, Grid, CSS Variables

Browser Compatibility: Chrome, Firefox, Safari, Edge

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

Place your product images in assets/products/

Name them product1.jpg through product6.jpg

Run the project:

Option 1: Open index.html directly in your browser

Option 2: Use VS Code with Live Server extension

Customization

Easy Modifications:

Change products: Edit the products array in script.js

Adjust discount: Modify the 0.3 value in discount calculation

Change colors: Update CSS variables in styles.css

css
:root {
  --primary-color: #2E294E;
  --secondary-color: #9055A2;
  --accent-color: #D499B9;
}
Advanced Customization

Add more products: Extend the products array and adjust grid CSS

Change bundle requirements: Update the "3" in progress calculations

Add animations: Enhance with CSS transitions


Created by: Suprabha Panigrahi
Last Updated: 06-Aug-2025

