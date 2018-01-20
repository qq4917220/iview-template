import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as _ from 'lodash'
import * as swig from 'swig'
import * as router from './routes/router'

const app = express()

let gc = {
    root: path.join(__dirname, '..', '..'),
    baseUrl: '//localhost:8080',
    port: 8080
}

global['C'] = gc

app.use('/static', express.static(path.join(C.root, 'static')))

// 这里要调整为移动端的 footer或者没有
// ysHelper.tools.pcFooter(app)

app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(C.root, 'backend', 'views'))
app.engine('html', swig.renderFile)
app.set('view engine', 'html')

router.set(app)

let s = app.listen(C.port, () => {
    // let host = s.address().address
    // let port = s.address().port
    //console.log('listen at http://%s:%s', host, port)
    //获取当前版本号
    var pkg = require('../../package.json')
    console.log('--------------------------------------------------------')
    console.log('【Version】 ' + pkg.version)
    console.log('【BaseUrl】 http:' + C.baseUrl)
    console.log('--------------------------------------------------------')
})