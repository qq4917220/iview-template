import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as _ from 'lodash'
import * as swig from 'swig'
import './global'
import * as router from './routes/router'

const app = express()

/**SESSION */
app.use(session({
    name: C.session.name,
    cookie: { expires: new Date(Date.now() + C.session.maxAge), maxAge: C.session.maxAge },
    secret: C.session.secret,
    resave: false,
    saveUninitialized: true
}));

/**SETTING */
app.use('/', express.static(path.join(C.root, 'static')))
app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(C.root, 'backend', 'views'))
app.engine('html', swig.renderFile)
app.set('view engine', 'html')


router.set(app)

let s = app.listen(C.port, () => {
    //获取当前版本号
    var pkg = require('../../package.json')
    console.log('--------------------------------------------------------')
    console.log('【Version】 ' + pkg.version)
    console.log('【BaseUrl】 http:' + C.baseUrl)
    console.log('--------------------------------------------------------')
})