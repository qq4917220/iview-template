import * as express from 'express'

let router = express.Router()

//
router.use('/login/verify', (req, res) => {
    const phone = req.body.phone || req.query.phone;
    const code = req.body.code || req.query.code;
    const loginUser = {
        id: phone,
        name: phone,
        role: 'admin'
    }
    let result = {
        status: true,
        msg: "登录成功",
        user: loginUser
    }
    req.session!.user = loginUser
    res.json(result)
})

//登录
router.use('/login', (req, res) => {
    //赋参数
    let d = new Date()
    let data = {
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl
    }
    res.render('admin/login', data)
})

//退出登录
router.use('/logout', (req, res) => {
    delete req.session!.user
    res.redirect('./login');
    return;
})

//master模板页
router.use('/', (req, res) => {

    //判断是否登录
    if (!req.session!.user) {
        //res.redirect(C.baseUrl + '/admin/login')
        //return;
        const loginUser = {
            id: 0,
            name: "test",
            role: 'admin'
        }
        req.session!.user = loginUser;
    }


    //赋参数
    let d = new Date()
    let data = {
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        baseUrl: C.baseUrl,
        loginUser: JSON.stringify(req.session!.user)
    }

    res.render('admin/master', data)
})


export = router