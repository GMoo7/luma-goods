# Luma Goods — E-commerce store (demo)

A fictional lifestyle store selling bags, watches, accessories, home goods and clothing. Built as a portfolio piece to show a complete shopping flow without a backend.

**Live demo:** https://gmoo7.github.io/luma-goods/

## Features
- **Home** — interactive hero (recolour the collection), categories, new arrivals, promo, best sellers, reviews
- **Shop** — live search, category filter, colour filter, price slider, in-stock and on-sale toggles, five sort orders, removable filter pills. Filters sync to the URL, so any result set is shareable.
- **Product page** — three-view gallery, colour variants that redraw the product image, size selection with validation, quantity, stock status, related products
- **Cart** — slide-out mini cart plus full cart page, quantity controls, free-shipping progress bar, promo code (`LUMA10`)
- **Checkout** — shipping and payment form with formatting, validation (including a Luhn card check), delivery options and an order confirmation

Use card `4242 4242 4242 4242` or the **Fill with test details** button. No payment is taken.

## Architecture
Vanilla JavaScript ES modules, no framework or build step:

| File | Role |
|---|---|
| `js/data.js` | Product catalogue, categories, colours |
| `js/cart.js` | Cart store — `localStorage` persistence, change events, cross-tab sync |
| `js/art.js` | Generates SVG product images so colour variants update the picture |
| `js/ui.js` | Shared header, footer, product cards, cart drawer, totals |
| `js/*.js` | One module per page |

_All products and reviews are fictional._
