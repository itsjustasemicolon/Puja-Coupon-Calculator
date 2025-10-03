# Meena Residency Puja Coupon Calculator

A modern, mobile-friendly web app to calculate total coupon prices for Durga Puja meals. It includes subsidy logic, Veg/Non-Veg options, and optional takeaway packing. This project also features a Node.js backend to collect and aggregate coupon orders.

## Features

### Frontend
- **Dynamic Meal Grid:** Select Veg/Non-Veg coupons for each meal across all Puja days.
- **Subsidy Logic:** Subsidy applies per meal (max 4 coupons per meal, Non-Veg gets priority).
- **Optional Takeaway Packing:** Add takeaway packs (₹40 each) with a stepper control.
- **Modern UI:** Responsive, touch-friendly, with light/dark mode toggle and color-coded Veg/Non-Veg.
- **Instant Price Breakdown:** See a detailed table of all charges, including subsidy splits and takeaway.
- **Clear All:** Reset all selections with one click.

### Backend
- **Node.js & Express Server:** A simple and efficient backend to handle coupon data.
- **Coupon Collection:** A "Collect Coupons" feature to save the current order to the server.
- **Aggregated Totals:** A "Show Total Collected" feature that displays a detailed breakdown of all coupons collected across all orders, perfect for food ordering and sales tracking.
- **File-Based Storage:** Coupon data is stored locally in `coupons.json`.

## Setup and Usage

### 1. Backend Setup
First, set up and run the backend server:
1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open a terminal in the project directory.
3. Install the necessary dependencies by running:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000`.

### 2. Frontend Usage
1. **Open `index.html` in your browser.** (Or navigate to `http://localhost:3000` while the server is running).
2. Use the grid to enter coupon counts for each meal.
3. View the total and detailed price breakdown for the current selection instantly.
4. Click **"Collect Coupons"** to save the current order. The form will clear upon success.
5. Click **"Show Total Collected"** to view a detailed table of all coupons saved on the server.
6. Use the theme toggle (🌙/☀️) for dark or light mode.
7. Click "Clear All" to reset the current selection.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


