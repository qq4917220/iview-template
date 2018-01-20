"use strict";
const express = require("express");
let router = express.Router();
router.use('/', (req, res) => {
    let d = new Date();
    let data = {
        appname: 'app',
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    };
    res.render('app', data);
});
module.exports = router;
//# sourceMappingURL=app.js.map