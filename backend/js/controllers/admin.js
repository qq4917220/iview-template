"use strict";
const express = require("express");
let router = express.Router();
router.use('/login', (req, res) => {
    let d = new Date();
    let data = {
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    };
    res.render('admin/login', data);
});
router.use('/', (req, res) => {
    let d = new Date();
    let data = {
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    };
    res.render('admin/master', data);
});
module.exports = router;
//# sourceMappingURL=admin.js.map