# Meena Residency Puja Coupon Calculator

A modern, mobile-friendly web app to calculate total coupon prices for Durga Puja meals, including subsidy logic, Veg/Non-Veg options, and optional takeaway packing.

## Features
- **Dynamic Meal Grid:** Select Veg/Non-Veg coupons for each meal across all Puja days.
- **Subsidy Logic:** Subsidy applies per meal (max 4 coupons per meal, Non-Veg gets priority).
- **Optional Takeaway Packing:** Add takeaway packs (₹40 each) with a stepper control.
- **Modern UI:** Responsive, touch-friendly, with light/dark mode toggle and color-coded Veg/Non-Veg.
- **Instant Price Breakdown:** See a detailed table of all charges, including subsidy splits and takeaway.
- **Clear All:** Reset all selections with one click.

## Usage
1. **Open `index.html` in your browser.**
2. Use the grid to enter coupon counts for each meal (Veg/Non-Veg).
3. (Optional) Add takeaway packs using the stepper below the grid.
4. View the total and detailed price breakdown instantly.
5. Use the theme toggle (🌙/☀️) for dark or light mode.
6. Click "Clear All" to reset everything.

## Tech Stack
- HTML5, CSS3 (with CSS variables, grid, flexbox, media queries)
- Vanilla JavaScript (ES6+)
- No dependencies, no build step, works offline

## Customization
- To change meal prices or subsidy logic, edit the `mealData` array in `script.js`.
- To adjust takeaway price, change the `TAKEAWAY_PRICE` constant in `script.js`.


## License
MIT


