document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('calculator-container');
    const totalCouponsEl = document.getElementById('total-coupons');
    const totalPriceEl = document.getElementById('total-price');
    const priceBreakdownEl = document.getElementById('price-breakdown');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeHint = document.querySelector('.theme-hint');
    // Per-row takeaway controls will be created dynamically for Lunch items

    const mealData = [
        { day: 'Panchami', meal: 'Dinner', type: 'VG', sub: 150, nonSub: null, id: 'p_d_vg' },
        { day: 'Panchami', meal: 'Dinner', type: 'NV', sub: 150, nonSub: null, id: 'p_d_nv' },
        { day: 'Shasthi', meal: 'B/fast', type: '', sub: 50, nonSub: null, id: 'sh_b' },
        { day: 'Shasthi', meal: 'Lunch', type: '', sub: 90, nonSub: 120, id: 'sh_l' },
        { day: 'Shasthi', meal: 'Dinner', type: '', sub: 90, nonSub: null, id: 'sh_d' },
        { day: 'Saptami', meal: 'B/fast', type: '', sub: 50, nonSub: null, id: 'sa_b' },
        { day: 'Saptami', meal: 'Lunch', type: '', sub: 100, nonSub: 130, id: 'sa_l' },
        { day: 'Saptami', meal: 'Dinner', type: 'VG', sub: 140, nonSub: null, id: 'sa_d_vg' },
        { day: 'Saptami', meal: 'Dinner', type: 'NV', sub: 140, nonSub: null, id: 'sa_d_nv' },
        { day: 'Asthami', meal: 'B/fast', type: '', sub: 50, nonSub: null, id: 'as_b' },
        { day: 'Asthami', meal: 'Lunch', type: '', sub: 130, nonSub: 180, id: 'as_l' },
        { day: 'Asthami', meal: 'Dinner', type: '', sub: 80, nonSub: null, id: 'as_d' },
        { day: 'Nabami', meal: 'B/fast', type: '', sub: 50, nonSub: null, id: 'na_b' },
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
        // Build the Count cell content with optional takeaway for Lunch only (wrapped to keep 7 columns)
        const countCellHtml = `
            <div data-label="Count" class="count-cell">
                <div class="input-stepper">
                    <button class="stepper-btn minus-btn" data-id="${item.id}">-</button>
                    <input type="number" id="${item.id}" min="0" value="0" class="count-input" readonly>
                    <button class="stepper-btn plus-btn" data-id="${item.id}">+</button>
                </div>
                ${item.meal === 'Lunch' ? `
                <div class="takeaway-inline">
                    <span class="tw-label">Takeaway</span>
                    <div class="input-stepper small" aria-label="Takeaway count for ${item.day} ${item.meal}${item.type ? ' ' + (item.type==='VG'?'Veg':'Non-Veg') : ''}">
                        <button class="stepper-btn minus-btn" data-takeaway-for="${item.id}">-</button>
                        <input type="number" id="tw-${item.id}" min="0" value="0" class="count-input" readonly>
                        <button class="stepper-btn plus-btn" data-takeaway-for="${item.id}">+</button>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        row.innerHTML = `
            <div data-label="Day">${item.day}</div>
            <div data-label="Meal"><span class="menu-trigger" data-day="${item.day}" data-meal="${item.meal}" data-type="${item.type || 'NA'}" role="button" tabindex="0" aria-label="View menu">${item.meal}</span><span class="tap-hint">Tap for menu</span></div>
            <div data-label="Type" class="${item.type === 'VG' ? 'veg-text' : item.type === 'NV' ? 'non-veg-text' : 'type-na'}">${item.type === 'VG' ? 'Veg' : item.type === 'NV' ? 'Non-Veg' : '—'}</div>
            ${countCellHtml}
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
            // If this is a takeaway control, handle separately
            const twFor = e.target.dataset.takeawayFor;
            if (twFor) {
                const twInput = document.getElementById(`tw-${twFor}`);
                const mainInput = document.getElementById(twFor);
                const mainCount = parseInt(mainInput?.value) || 0;
                let twValue = parseInt(twInput.value) || 0;
                if (e.target.classList.contains('plus-btn')) {
                    if (twValue < mainCount) twValue++;
                } else if (e.target.classList.contains('minus-btn')) {
                    twValue = Math.max(0, twValue - 1);
                }
                twInput.value = twValue;
                // Toggle disabled for takeaway buttons
                const twStepper = twInput.parentElement;
                const minusBtn = twStepper.querySelector('.minus-btn');
                const plusBtn = twStepper.querySelector('.plus-btn');
                if (minusBtn) minusBtn.disabled = twValue === 0;
                if (plusBtn) plusBtn.disabled = twValue >= mainCount;
                calculateTotal();
                return;
            }

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

            // Sync corresponding takeaway control: cap to main count and update button states
            const twInput = document.getElementById(`tw-${id}`);
            if (twInput) {
                let twVal = parseInt(twInput.value) || 0;
                if (twVal > value) {
                    twVal = value;
                    twInput.value = twVal;
                }
                const twStepper = twInput.parentElement;
                const twMinus = twStepper.querySelector('.minus-btn');
                const twPlus = twStepper.querySelector('.plus-btn');
                if (twMinus) twMinus.disabled = twVal === 0;
                if (twPlus) twPlus.disabled = twVal >= value;
            }
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
    // Initialize takeaway plus buttons: disabled until main count > 0
    document.querySelectorAll('input[id^="tw-"]').forEach(twInput => {
        const mainId = twInput.id.replace('tw-','');
        const mainVal = parseInt(document.getElementById(mainId)?.value) || 0;
        const twStepper = twInput.parentElement;
        const twPlus = twStepper.querySelector('.plus-btn');
        const twMinus = twStepper.querySelector('.minus-btn');
        if (twPlus) twPlus.disabled = mainVal === 0;
        if (twMinus) twMinus.disabled = true; // starts at 0
    });

    // Theme toggle + persistence
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    // Default to light mode when no saved preference; otherwise honor saved choice
    const isDarkOnLoad = savedTheme === 'dark';
    if (isDarkOnLoad) {
        root.classList.add('theme-dark');
    } else {
        root.classList.remove('theme-dark');
    }
    updateThemeIcon(isDarkOnLoad);
    updateThemeHint(isDarkOnLoad);

    themeToggleBtn.addEventListener('click', () => {
        const isDark = root.classList.toggle('theme-dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
        updateThemeHint(isDark);
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggleBtn.querySelector('.theme-icon');
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    }

    function updateThemeHint(isDark) {
        if (themeHint) {
            themeHint.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
    }

    clearAllBtn.addEventListener('click', () => {
        inputs.forEach(input => {
            input.value = 0;
        });
        // Reset all per-row takeaway inputs and buttons
        document.querySelectorAll('input[id^="tw-"]').forEach(tw => {
            tw.value = 0;
            const twStepper = tw.parentElement;
            const twMinus = twStepper.querySelector('.minus-btn');
            const twPlus = twStepper.querySelector('.plus-btn');
            if (twMinus) twMinus.disabled = true;
            if (twPlus) twPlus.disabled = true; // main counts are 0 after reset
        });
        calculateTotal();
    });

    function calculateTotal() {
        let grandTotal = 0;
        let totalCoupons = 0;
        const SUBSIDY_LIMIT = 4;
        const TAKEAWAY_PRICE = 40;

        // We'll add takeaway cost per row to that row's price, so no global add here

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

            // Fetch per-item takeaway counts (exists only for Lunch rows)
            let twNv = 0;
            let twVg = 0;
            if (nvItem) {
                const twEl = document.getElementById(`tw-${nvItem.id}`);
                if (twEl) twNv = parseInt(twEl.value) || 0;
            }
            if (vgItem) {
                const twEl = document.getElementById(`tw-${vgItem.id}`);
                if (twEl) twVg = parseInt(twEl.value) || 0;
            }

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
                const nvBase = (subsidizedNv * nvItem.sub) + (nonSubsidizedNv * (nvItem.nonSub || nvItem.sub));
                const nvPrice = nvBase + (twNv * TAKEAWAY_PRICE);
                document.getElementById(`price-${nvItem.id}`).textContent = nvPrice;
                grandTotal += nvPrice;
                totalCoupons += nvItem.count;
            }

            // Calculate and display price for VG
            if (vgItem) {
                const vgBase = (subsidizedVg * vgItem.sub) + (nonSubsidizedVg * (vgItem.nonSub || vgItem.sub));
                const vgPrice = vgBase + (twVg * TAKEAWAY_PRICE);
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
                        <th>Takeaway</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Takeaway rows will be shown per Lunch group below

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

            // Takeaway per item (Lunch rows have tw inputs)
            let twNv = 0;
            let twVg = 0;
            if (nvItem) {
                const twEl = document.getElementById(`tw-${nvItem.id}`);
                if (twEl) twNv = (parseInt(twEl.value) || 0);
            }
            if (vgItem) {
                const twEl = document.getElementById(`tw-${vgItem.id}`);
                if (twEl) twVg = (parseInt(twEl.value) || 0);
            }

            // Compute subsidy splits
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

            // Render NV row only if it has counts or takeaway
            if (nvItem && (nvItem.count > 0 || twNv > 0)) {
                hasItems = true;
                // Split takeaway across subsidized/non-subsidized portions
                const nvNonSubPrice = (nvItem.nonSub || nvItem.sub);
                const twNvSub = Math.min(twNv, subsidizedNv);
                const twNvNonSub = Math.max(0, twNv - twNvSub);
                const subNormalNv = Math.max(0, subsidizedNv - twNvSub);
                const nonSubNormalNv = Math.max(0, nonSubsidizedNv - twNvNonSub);

                const subText = subNormalNv > 0 ? `${subNormalNv} @ ₹${nvItem.sub}` : '';
                const nonSubText = nonSubNormalNv > 0 ? `${nonSubNormalNv} @ ₹${nvNonSubPrice}` : '';
                const twParts = [];
                if (twNvSub > 0) twParts.push(`${twNvSub} @ ₹${nvItem.sub} + ₹${TAKEAWAY_PRICE}`);
                if (twNvNonSub > 0) twParts.push(`${twNvNonSub} @ ₹${nvNonSubPrice} + ₹${TAKEAWAY_PRICE}`);
                const takeawayText = twParts.join(' | ');
                tableHtml += `
                    <tr>
                        <td>${nvItem.day} ${nvItem.meal} ${nvItem.type === 'NV' ? '<span class="non-veg-text">Non-Veg</span>' : (nvItem.type === 'VG' ? '<span class="veg-text">Veg</span>' : '')}${twNv > 0 ? ' <span class="tw-flag">Takeaway</span>' : ''}</td>
                        <td>${subText}</td>
                        <td>${nonSubText}</td>
                        <td>${takeawayText}</td>
                    </tr>
                `;
            }

            // Render VG row if it has counts or takeaway
            if (vgItem && (vgItem.count > 0 || twVg > 0)) {
                hasItems = true;
                // Split takeaway across subsidized/non-subsidized portions
                const vgNonSubPrice = (vgItem.nonSub || vgItem.sub);
                const twVgSub = Math.min(twVg, subsidizedVg);
                const twVgNonSub = Math.max(0, twVg - twVgSub);
                const subNormalVg = Math.max(0, subsidizedVg - twVgSub);
                const nonSubNormalVg = Math.max(0, nonSubsidizedVg - twVgNonSub);

                const subText = subNormalVg > 0 ? `${subNormalVg} @ ₹${vgItem.sub}` : '';
                const nonSubText = nonSubNormalVg > 0 ? `${nonSubNormalVg} @ ₹${vgNonSubPrice}` : '';
                const twParts = [];
                if (twVgSub > 0) twParts.push(`${twVgSub} @ ₹${vgItem.sub} + ₹${TAKEAWAY_PRICE}`);
                if (twVgNonSub > 0) twParts.push(`${twVgNonSub} @ ₹${vgNonSubPrice} + ₹${TAKEAWAY_PRICE}`);
                const takeawayText = twParts.join(' | ');
                tableHtml += `
                    <tr>
                        <td>${vgItem.day} ${vgItem.meal} ${vgItem.type === 'VG' ? '<span class="veg-text">Veg</span>' : (vgItem.type === 'NV' ? '<span class="non-veg-text">Non-Veg</span>' : '')}${twVg > 0 ? ' <span class="tw-flag">Takeaway</span>' : ''}</td>
                        <td>${subText}</td>
                        <td>${nonSubText}</td>
                        <td>${takeawayText}</td>
                    </tr>
                `;
            }
        }

        tableHtml += `</tbody></table>`;

        if (hasItems) {
            priceBreakdownEl.innerHTML = tableHtml;
        }
    }
});