import * as express from 'express'

let router = express.Router()

//登录页
router.use('/login', (req, res) => {

    let d = new Date()
    let data = {
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    }

    res.render('admin/login', data)
})

//登录页
router.use('/', (req, res) => {

    let d = new Date()
    let data = {
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    }

    res.render('admin/master', data)
})


export = router