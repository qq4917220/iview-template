"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main = require("../controllers/app");
const admin = require("../controllers/admin");
function set(app) {
    app.use('/admin', admin),
        app.use('/', main);
}
exports.set = set;
//# sourceMappingURL=router.js.map