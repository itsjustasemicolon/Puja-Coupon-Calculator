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
        { day: 'Panchami', meal: 'Dinner', type: 'VG', sub: 150, nonSub: null, id: 'p_d_vg' },
        { day: 'Panchami', meal: 'Dinner', type: 'NV', sub: 150, nonSub: null, id: 'p_d_nv' },
        { day: 'Shasthi', meal: 'B/fast', type: 'VG', sub: 50, nonSub: null, id: 'sh_b' },
        { day: 'Shasthi', meal: 'Lunch', type: 'VG', sub: 90, nonSub: 120, id: 'sh_l' },
        { day: 'Shasthi', meal: 'Dinner', type: 'VG', sub: 90, nonSub: null, id: 'sh_d' },
        { day: 'Saptami', meal: 'B/fast', type: 'VG', sub: 50, nonSub: null, id: 'sa_b' },
        { day: 'Saptami', meal: 'Lunch', type: 'VG', sub: 100, nonSub: 130, id: 'sa_l' },
        { day: 'Saptami', meal: 'Dinner', type: 'VG', sub: 140, nonSub: null, id: 'sa_d_vg' },
        { day: 'Saptami', meal: 'Dinner', type: 'NV', sub: 140, nonSub: null, id: 'sa_d_nv' },
        { day: 'Asthami', meal: 'B/fast', type: 'VG', sub: 50, nonSub: null, id: 'as_b' },
        { day: 'Asthami', meal: 'Lunch', type: 'VG', sub: 130, nonSub: 180, id: 'as_l' },
        { day: 'Asthami', meal: 'Dinner', type: 'VG', sub: 80, nonSub: null, id: 'as_d' },
        { day: 'Nabami', meal: 'B/fast', type: 'VG', sub: 50, nonSub: null, id: 'na_b' },
        { day: 'Nabami', meal: 'Lunch', type: 'VG', sub: 190, nonSub: 250, id: 'na_l_vg' },
        { day: 'Nabami', meal: 'Lunch', type: 'NV', sub: 210, nonSub: 280, id: 'na_l_nv' },
        { day: 'Nabami', meal: 'Dinner', type: 'VG', sub: 140, nonSub: null, id: 'na_d_vg' },
        { day: 'Nabami', meal: 'Dinner', type: 'NV', sub: 140, nonSub: null, id: 'na_d_nv' },
        { day: 'Dashami', meal: 'Lunch', type: 'VG', sub: 150, nonSub: 200, id: 'da_l_vg' },
        { day: 'Dashami', meal: 'Lunch', type: 'NV', sub: 220, nonSub: 300, id: 'da_l_nv' },
        { day: 'Dashami', meal: 'Dinner', type: 'VG', sub: 210, nonSub: null, id: 'da_d_vg' },
        { day: 'Dashami', meal: 'Dinner', type: 'NV', sub: 160, nonSub: null, id: 'da_d_nv' },
    ];

    // Menu data mapping (edit this to add real menus)
    // Key format: `${day}-${meal}-${type || 'NA'}`
    const menuDataMap = {
        // PANCHAMI (27-Sep / Saturday)
        'Panchami-Dinner-VG': ['Fried Rice', 'Paneer Butter Masala'],
        'Panchami-Dinner-NV': ['Fried Rice', 'Chicken Butter Masala (3pc)'],

        // SHASTHI (28-Sep / Sunday)
        'Shasthi-B/fast-NA': ['Veg Noodles', 'Ketchup', 'French Fries (4pc)'],
        'Shasthi-Lunch-NA': ['Luchi', 'Begun Bhaja (2 pc)', 'Chanar Kalia (2 pc)', 'Alu-green motor', 'Chutney', 'Papad', 'Sweet (1pc)'],
        'Shasthi-Dinner-NA': ['Kachuri (4pc)', 'Aloo Dum (4pc)', 'Vegetable Chop (1pc)', 'Pantua (1pc)'],

        // SAPTAMI (29-Sep / Monday)
        'Saptami-B/fast-NA': ['Idli (4 pc)', 'Sambar', 'Chatni', 'Chanar Jilipi (1pc)'],
        'Saptami-Lunch-NA': ['Khichudi', 'Beguni (2)', 'Alu Bhaja', 'Labra', 'Pineapple Chutney', 'Papad', 'Rosogolla (1pc)'],
        'Saptami-Dinner-NV': ['Fried Rice', 'Chilli Chicken (4pc)'],
        'Saptami-Dinner-VG': ['Fried Rice', 'Shahi Paneer'],

        // ASTHAMI (30-Sep / Tuesday)
        'Asthami-B/fast-NA': ['Plain Porotha (3 pc)', 'Sada Alur Chochori', 'Bonde'],
        'Asthami-Lunch-NA': ['Luchi (4 pcs)', 'Begun Bhaja', 'Dhoka Dalna', 'Basanti Polao', 'Potol Dorma', 'Mixed Chutney', 'Papad', 'Ice-cream (Metro-Butterscotch)', 'Kamolavog (1)'],
        'Asthami-Dinner-NA': ['Dal Puri (4 pc)', 'Dhoniapata-Pudina Chatni', 'Alu-Phukopi', 'Ladykini (1)'],

        // NABAMI (01-Oct / Wednesday)
        'Nabami-B/fast-NA': ['Luchi (4 pc)', 'Cholar Dal w/ Narkel', 'Ladoo (1 pc)'],
        'Nabami-Lunch-NV': ['Plain Rice', 'Sobji Diye Sona Moong Dal', 'Jhuro Alu Bhaja', 'Khejur Aam Sotto Chutni', 'Papad', 'Misti Doi (Amul/85g)', 'Gulab Jamun (1pc)', 'Mutton (3pc) with Alu (1 pc)/Katla Macher Kalia (2pc)'],
        'Nabami-Lunch-VG': ['Plain Rice', 'Sobji Diye Sona Moong Dal', 'Jhuro Alu Bhaja', 'Khejur Aam Sotto Chutni', 'Papad', 'Misti Doi (Amul/85g)', 'Gulab Jamun (1pc)', 'Navratna Korma', 'Chanar Kofta'],
        'Nabami-Dinner-NV': ['Fried Rice', 'Chicken Manchurian'],
        'Nabami-Dinner-VG': ['Fried Rice', 'Veg Manchurian'],

        // DASHAMI (02-Oct / Thursday)
        'Dashami-Lunch-NV': ['Plain Rice', 'Sukto', 'Mixed chutney', 'Papad', 'Sweet (1pc)', 'Shorshe Ilish'],
        'Dashami-Lunch-VG': ['Plain Rice', 'Sukto', 'Mixed chutney', 'Papad', 'Sweet (1pc)', 'Alu-motor - Paneer'],
        'Dashami-Dinner-NV': ['Chicken Biriyani', 'Chicken Chaap (1 pc)'],
        'Dashami-Dinner-VG': ['Jeera Rice', 'Paneer Butter Masala']
    };

    // Generate grid
    mealData.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        row.innerHTML = `
            <div data-label="Day">${item.day}</div>
            <div data-label="Meal"><span class="menu-trigger" data-day="${item.day}" data-meal="${item.meal}" data-type="${item.type || 'NA'}" title="View menu">${item.meal}</span></div>
            <div data-label="Type" class="${item.type === 'VG' ? 'veg-text' : item.type === 'NV' ? 'non-veg-text' : ''}">${item.type === 'VG' ? 'Veg' : item.type === 'NV' ? 'Non-Veg' : ''}</div>
            <div data-label="Count" class="input-stepper">
                <button class="stepper-btn minus-btn" data-id="${item.id}">-</button>
                <input type="number" id="${item.id}" min="0" value="0" class="count-input" readonly>
                <button class="stepper-btn plus-btn" data-id="${item.id}">+</button>
            </div>
            <div data-label="Sub Price">${item.sub}</div>
            <div data-label="Non-Sub Price">${item.nonSub ? item.nonSub : ''}</div>
            <div data-label="Price" class="price" id="price-${item.id}">0</div>
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

    // Tooltip element (single instance)
    const tooltip = document.createElement('div');
    tooltip.id = 'menu-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    const hideTooltip = () => {
        tooltip.style.display = 'none';
        tooltip.setAttribute('aria-hidden', 'true');
    };

    const getMenuKey = (day, meal, type) => {
        const t = type && type !== '' ? type : 'NA';
        return `${day}-${meal}-${t}`;
    };

    const getMenuContent = (day, meal, type) => {
        const key = getMenuKey(day, meal, type);
        let items = menuDataMap[key];
        if (!items && type && type !== 'NA') {
            // fallback to no-type key
            items = menuDataMap[`${day}-${meal}-NA`];
        }
        if (!items) return `<div class="menu-title">${day} ${meal}${type && type !== 'NA' ? ' ('+ (type==='VG'?'Veg':'Non-Veg') +')' : ''}</div><div class="menu-empty">Menu not set</div>`;
        const list = items.map(i => `<li>${i}</li>`).join('');
        return `<div class="menu-title">${day} ${meal}${type && type !== 'NA' ? ' ('+ (type==='VG'?'Veg':'Non-Veg') +')' : ''}</div><ul class="menu-list">${list}</ul>`;
    };

    const showTooltip = (triggerEl) => {
        const day = triggerEl.getAttribute('data-day');
        const meal = triggerEl.getAttribute('data-meal');
        const type = triggerEl.getAttribute('data-type');
        tooltip.innerHTML = getMenuContent(day, meal, type);
        tooltip.style.display = 'block';
        tooltip.setAttribute('aria-hidden', 'false');
        const rect = triggerEl.getBoundingClientRect();
        const padding = 8;
        const top = Math.min(window.innerHeight - tooltip.offsetHeight - padding, rect.bottom + 8);
        let left = rect.left;
        if (left + tooltip.offsetWidth + padding > window.innerWidth) {
            left = window.innerWidth - tooltip.offsetWidth - padding;
        }
        tooltip.style.top = `${Math.max(padding, top)}px`;
        tooltip.style.left = `${Math.max(padding, left)}px`;
    };

    // Attach hover and click handlers
    document.querySelectorAll('.menu-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => showTooltip(el));
        el.addEventListener('mouseleave', () => hideTooltip());
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (tooltip.style.display === 'block') hideTooltip(); else showTooltip(el);
        });
    });

    // Hide tooltip on outside click, scroll, or resize
    document.addEventListener('click', hideTooltip);
    window.addEventListener('scroll', hideTooltip, true);
    window.addEventListener('resize', hideTooltip);

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
                document.getElementById(`price-${nvItem.id}`).textContent = nvPrice;
                grandTotal += nvPrice;
                totalCoupons += nvItem.count;
            }

            // Calculate and display price for VG
            if (vgItem) {
                const vgPrice = (subsidizedVg * vgItem.sub) + (nonSubsidizedVg * (vgItem.nonSub || vgItem.sub));
                document.getElementById(`price-${vgItem.id}`).textContent = vgPrice;
                grandTotal += vgPrice;
                totalCoupons += vgItem.count;
            }
        }

        totalCouponsEl.textContent = totalCoupons;
        totalPriceEl.textContent = grandTotal;

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
                    <td colspan="2" style="text-align:center;">${takeawayCount} @ ₹${TAKEAWAY_PRICE}</td>
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
                            <td>${subsidizedNv > 0 ? `${subsidizedNv} @ ₹${nvItem.sub}` : ''}</td>
                            <td>${nonSubsidizedNv > 0 ? `${nonSubsidizedNv} @ ₹${(nvItem.nonSub || nvItem.sub)}` : ''}</td>
                        </tr>
                    `;
                }
                if (vgItem && vgItem.count > 0) {
                    tableHtml += `
                        <tr>
                            <td>${vgItem.day} ${vgItem.meal} <span class="veg-text">${vgItem.type === 'VG' ? 'Veg' : ''}</span></td>
                            <td>${subsidizedVg > 0 ? `${subsidizedVg} @ ₹${vgItem.sub}` : ''}</td>
                            <td>${nonSubsidizedVg > 0 ? `${nonSubsidizedVg} @ ₹${(vgItem.nonSub || vgItem.sub)}` : ''}</td>
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