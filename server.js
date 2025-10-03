const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const couponsFilePath = path.join(__dirname, 'coupons.json');

// Helper function to read coupons
function readCoupons(callback) {
    fs.readFile(couponsFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If file doesn't exist, start with an empty array
                return callback(null, []);
            }
            return callback(err);
        }
        try {
            const coupons = JSON.parse(data);
            callback(null, coupons);
        } catch (parseErr) {
            callback(parseErr);
        }
    });
}

// Helper function to write coupons
function writeCoupons(coupons, callback) {
    fs.writeFile(couponsFilePath, JSON.stringify(coupons, null, 2), callback);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/coupons', (req, res) => {
    const newCouponOrder = req.body;

    readCoupons((err, coupons) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading coupon data.' });
        }

        coupons.push(newCouponOrder);

        writeCoupons(coupons, (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Error saving coupon data.' });
            }
            res.status(201).json({ message: 'Coupon order saved successfully.' });
        });
    });
});

app.get('/api/coupons/total', (req, res) => {
    readCoupons((err, coupons) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading coupon data.' });
        }
        
        const detailedCounts = {};

        coupons.forEach(order => {
            if (order.details && Array.isArray(order.details)) {
                order.details.forEach(item => {
                    if (detailedCounts[item.id]) {
                        detailedCounts[item.id] += item.count;
                    } else {
                        detailedCounts[item.id] = item.count;
                    }
                });
            }
        });

        res.json(detailedCounts);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
