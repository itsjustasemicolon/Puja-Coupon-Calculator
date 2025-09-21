document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('calculator-container');
    const totalCouponsEl = document.getElementById('total-coupons');
    const totalPriceEl = document.getElementById('total-price');
    const priceBreakdownEl = document.getElementById('price-breakdown');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const takeawayCountInput = document.getElementById('takeaway-count');
    const takeawayPlusBtn = document.getElementById('takeaway-plus');
    const takeawayMinusBtn = document.getElementById('takeaway-minus');

    const mealData = [
        { day: 'Panchami', meal: 'Dinner', type: 'VG', sub: 150.00, nonSub: null, id: 'p_d_vg' },
        { day: 'Panchami', meal: 'Dinner', type: 'NV', sub: 150.00, nonSub: null, id: 'p_d_nv' },
        { day: 'Shasthi', meal: 'B/fast', type: 'VG', sub: 50.00, nonSub: null, id: 'sh_b' },
        { day: 'Shasthi', meal: 'Lunch', type: 'VG', sub: 90.00, nonSub: 120.00, id: 'sh_l' },
        { day: 'Shasthi', meal: 'Dinner', type: 'VG', sub: 90.00, nonSub: null, id: 'sh_d' },
        { day: 'Saptami', meal: 'B/fast', type: 'VG', sub: 50.00, nonSub: null, id: 'sa_b' },
        { day: 'Saptami', meal: 'Lunch', type: 'VG', sub: 100.00, nonSub: 130.00, id: 'sa_l' },
        { day: 'Saptami', meal: 'Dinner', type: 'VG', sub: 140.00, nonSub: null, id: 'sa_d_vg' },
        { day: 'Saptami', meal: 'Dinner', type: 'NV', sub: 140.00, nonSub: null, id: 'sa_d_nv' },
        { day: 'Asthami', meal: 'B/fast', type: 'VG', sub: 50.00, nonSub: null, id: 'as_b' },
        { day: 'Asthami', meal: 'Lunch', type: 'VG', sub: 130.00, nonSub: 180.00, id: 'as_l' },
        { day: 'Asthami', meal: 'Dinner', type: 'VG', sub: 80.00, nonSub: null, id: 'as_d' },
        { day: 'Nabami', meal: 'B/fast', type: 'VG', sub: 50.00, nonSub: null, id: 'na_b' },
        { day: 'Nabami', meal: 'Lunch', type: 'VG', sub: 190.00, nonSub: 250.00, id: 'na_l_vg' },
        { day: 'Nabami', meal: 'Lunch', type: 'NV', sub: 210.00, nonSub: 280.00, id: 'na_l_nv' },
        { day: 'Nabami', meal: 'Dinner', type: 'VG', sub: 140.00, nonSub: null, id: 'na_d_vg' },
        { day: 'Nabami', meal: 'Dinner', type: 'NV', sub: 140.00, nonSub: null, id: 'na_d_nv' },
        { day: 'Dashami', meal: 'Lunch', type: 'VG', sub: 150.00, nonSub: 200.00, id: 'da_l_vg' },
        { day: 'Dashami', meal: 'Lunch', type: 'NV', sub: 220.00, nonSub: 300.00, id: 'da_l_nv' },
        { day: 'Dashami', meal: 'Dinner', type: 'VG', sub: 210.00, nonSub: null, id: 'da_d_vg' },
        { day: 'Dashami', meal: 'Dinner', type: 'NV', sub: 160.00, nonSub: null, id: 'da_d_nv' },
    ];

    // Generate grid
    mealData.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        row.innerHTML = `
            <div data-label="Day">${item.day}</div>
            <div data-label="Meal">${item.meal}</div>
            <div data-label="Type" class="${item.type === 'VG' ? 'veg-text' : item.type === 'NV' ? 'non-veg-text' : ''}">${item.type === 'VG' ? 'Veg' : item.type === 'NV' ? 'Non-Veg' : ''}</div>
            <div data-label="Count" class="input-stepper">
                <button class="stepper-btn minus-btn" data-id="${item.id}">-</button>
                <input type="number" id="${item.id}" min="0" value="0" class="count-input" readonly>
                <button class="stepper-btn plus-btn" data-id="${item.id}">+</button>
            </div>
            <div data-label="Sub Price">${item.sub.toFixed(2)}</div>
            <div data-label="Non-Sub Price">${item.nonSub ? item.nonSub.toFixed(2) : ''}</div>
            <div data-label="Price" class="price" id="price-${item.id}">0.00</div>
        `;
        container.appendChild(row);
    });

    const inputs = document.querySelectorAll('.count-input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    document.querySelectorAll('.stepper-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const input = document.getElementById(id);
            let value = parseInt(input.value);

            if (e.target.classList.contains('plus-btn')) {
                value++;
            } else if (e.target.classList.contains('minus-btn')) {
                value = Math.max(0, value - 1);
            }

            input.value = value;
            // Manually trigger the input event to recalculate totals
            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);

            // Toggle disabled state for minus buttons when value is 0
            const minusBtn = input.parentElement.querySelector('.minus-btn');
            if (minusBtn) minusBtn.disabled = value === 0;
        });
    });

    // Initialize minus buttons disabled state
    document.querySelectorAll('.minus-btn').forEach(btn => btn.disabled = true);

    takeawayPlusBtn.addEventListener('click', () => {
        takeawayCountInput.value = parseInt(takeawayCountInput.value) + 1;
        takeawayMinusBtn.disabled = false;
        calculateTotal();
    });

    takeawayMinusBtn.addEventListener('click', () => {
        const currentValue = parseInt(takeawayCountInput.value);
        if (currentValue > 0) {
            takeawayCountInput.value = currentValue - 1;
        }
        takeawayMinusBtn.disabled = takeawayCountInput.value == 0;
        calculateTotal();
    });

    // Theme toggle + persistence
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        root.classList.add('theme-dark');
        updateThemeIcon(true);
    } else {
        // Explicitly set light defaults
        root.classList.remove('theme-dark');
        updateThemeIcon(false);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = root.classList.toggle('theme-dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggleBtn.querySelector('.theme-icon');
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    }

    clearAllBtn.addEventListener('click', () => {
        inputs.forEach(input => {
            input.value = 0;
        });
        takeawayCountInput.value = 0;
        takeawayMinusBtn.disabled = true;
        calculateTotal();
    });

    function calculateTotal() {
        let grandTotal = 0;
        let totalCoupons = 0;
        const SUBSIDY_LIMIT = 4;
        const TAKEAWAY_PRICE = 40;

        // Add takeaway cost
        const takeawayCount = parseInt(takeawayCountInput.value) || 0;
        grandTotal += takeawayCount * TAKEAWAY_PRICE;

        // Group meals by day and meal name
        const mealGroups = {};
        mealData.forEach(item => {
            const key = `${item.day}-${item.meal}`;
            if (!mealGroups[key]) {
                mealGroups[key] = [];
            }
            mealGroups[key].push(item);
        });

        // Calculate price for each group
        for (const key in mealGroups) {
            const group = mealGroups[key];
            let groupTotalCoupons = 0;
            let nvItem = null;
            let vgItem = null;

            group.forEach(item => {
                const count = parseInt(document.getElementById(item.id).value) || 0;
                groupTotalCoupons += count;
                if (item.type === 'NV') nvItem = { ...item, count };
                else if (item.type === 'VG') vgItem = { ...item, count };
                else { // For items without a type (like breakfast)
                    nvItem = { ...item, count };
                }
            });

            let subsidizedNv = 0;
            let nonSubsidizedNv = 0;
            let subsidizedVg = 0;
            let nonSubsidizedVg = 0;

            if (nvItem && nvItem.count > 0) {
                subsidizedNv = Math.min(nvItem.count, SUBSIDY_LIMIT);
                nonSubsidizedNv = nvItem.count - subsidizedNv;
            }

            let remainingSubsidy = SUBSIDY_LIMIT - subsidizedNv;

            if (vgItem && vgItem.count > 0) {
                subsidizedVg = Math.min(vgItem.count, remainingSubsidy);
                nonSubsidizedVg = vgItem.count - subsidizedVg;
            }

            // Calculate and display price for NV
            if (nvItem) {
                const nvPrice = (subsidizedNv * nvItem.sub) + (nonSubsidizedNv * (nvItem.nonSub || nvItem.sub));
                document.getElementById(`price-${nvItem.id}`).textContent = nvPrice.toFixed(2);
                grandTotal += nvPrice;
                totalCoupons += nvItem.count;
            }

            // Calculate and display price for VG
            if (vgItem) {
                const vgPrice = (subsidizedVg * vgItem.sub) + (nonSubsidizedVg * (vgItem.nonSub || vgItem.sub));
                document.getElementById(`price-${vgItem.id}`).textContent = vgPrice.toFixed(2);
                grandTotal += vgPrice;
                totalCoupons += vgItem.count;
            }
        }

        totalCouponsEl.textContent = totalCoupons;
        totalPriceEl.textContent = grandTotal.toFixed(2);

        // Flash animation for totals
        const totalsSummary = document.querySelector('.totals-summary');
        totalsSummary.classList.remove('flash');
        void totalsSummary.offsetWidth; // Trigger reflow
        totalsSummary.classList.add('flash');

        updatePriceBreakdown();
    }

    function updatePriceBreakdown() {
        priceBreakdownEl.innerHTML = '';
        let hasItems = false;
        const SUBSIDY_LIMIT = 4;
        const TAKEAWAY_PRICE = 40;

        let tableHtml = `
            <h4>Price Breakdown</h4>
            <table class="breakdown-table">
                <thead>
                    <tr>
                        <th>Meal</th>
                        <th>Subsidized</th>
                        <th>Non-Subsidized</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const takeawayCount = parseInt(takeawayCountInput.value) || 0;
        if (takeawayCount > 0) {
            hasItems = true;
            tableHtml += `
                <tr>
                    <td>Takeaway Packing</td>
                    <td colspan="2" style="text-align:center;">${takeawayCount} @ ₹${TAKEAWAY_PRICE.toFixed(2)}</td>
                </tr>
            `;
        }

        const mealGroups = {};
        mealData.forEach(item => {
            const key = `${item.day}-${item.meal}`;
            if (!mealGroups[key]) {
                mealGroups[key] = [];
            }
            mealGroups[key].push(item);
        });

        for (const key in mealGroups) {
            const group = mealGroups[key];
            let nvItem = null;
            let vgItem = null;

            group.forEach(item => {
                const count = parseInt(document.getElementById(item.id).value) || 0;
                if (item.type === 'NV') nvItem = { ...item, count };
                else if (item.type === 'VG') vgItem = { ...item, count };
                else nvItem = { ...item, count };
            });

            if ((nvItem && nvItem.count > 0) || (vgItem && vgItem.count > 0)) {
                hasItems = true;
                
                let subsidizedNv = 0;
                let nonSubsidizedNv = 0;
                let subsidizedVg = 0;
                let nonSubsidizedVg = 0;

                if (nvItem && nvItem.count > 0) {
                    subsidizedNv = Math.min(nvItem.count, SUBSIDY_LIMIT);
                    nonSubsidizedNv = nvItem.count - subsidizedNv;
                }

                let remainingSubsidy = SUBSIDY_LIMIT - subsidizedNv;

                if (vgItem && vgItem.count > 0) {
                    subsidizedVg = Math.min(vgItem.count, remainingSubsidy);
                    nonSubsidizedVg = vgItem.count - subsidizedVg;
                }

                if (nvItem && nvItem.count > 0) {
                    tableHtml += `
                        <tr>
                            <td>${nvItem.day} ${nvItem.meal} <span class="non-veg-text">${nvItem.type === 'NV' ? 'Non-Veg' : ''}</span></td>
                            <td>${subsidizedNv > 0 ? `${subsidizedNv} @ ₹${nvItem.sub.toFixed(2)}` : ''}</td>
                            <td>${nonSubsidizedNv > 0 ? `${nonSubsidizedNv} @ ₹${(nvItem.nonSub || nvItem.sub).toFixed(2)}` : ''}</td>
                        </tr>
                    `;
                }
                if (vgItem && vgItem.count > 0) {
                    tableHtml += `
                        <tr>
                            <td>${vgItem.day} ${vgItem.meal} <span class="veg-text">${vgItem.type === 'VG' ? 'Veg' : ''}</span></td>
                            <td>${subsidizedVg > 0 ? `${subsidizedVg} @ ₹${vgItem.sub.toFixed(2)}` : ''}</td>
                            <td>${nonSubsidizedVg > 0 ? `${nonSubsidizedVg} @ ₹${(vgItem.nonSub || vgItem.sub).toFixed(2)}` : ''}</td>
                        </tr>
                    `;
                }
            }
        }

        tableHtml += `</tbody></table>`;

        if (hasItems) {
            priceBreakdownEl.innerHTML = tableHtml;
        }
    }
});