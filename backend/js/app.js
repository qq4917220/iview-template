"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const swig = require("swig");
const router = require("./routes/router");
const app = express();
let gc = {
    root: path.join(__dirname, '..', '..'),
    baseUrl: '//localhost:8080',
    port: 8080
};
global['C'] = gc;
app.use('/static', express.static(path.join(C.root, 'static')));
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(C.root, 'backend', 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
router.set(app);
let s = app.listen(C.port, () => {
    var pkg = require('../../package.json');
    console.log('--------------------------------------------------------');
    console.log('【Version】 ' + pkg.version);
    console.log('【BaseUrl】 http:' + C.baseUrl);
    console.log('--------------------------------------------------------');
});
//# sourceMappingURL=app.js.map