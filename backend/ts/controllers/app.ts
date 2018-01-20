import * as express from 'express'

let router = express.Router()

//主页 iview
router.use('/', (req, res) => {

    let d = new Date()
    let data = {
        appname: 'app',
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    }

    res.render('app', data)
})

export = router