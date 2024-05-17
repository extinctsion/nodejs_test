const express = require('express');
const { route } = require('./products');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});


router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.productId
    };
    res.status(201).json({
        message: 'Orders were created',
        orderCreated: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;