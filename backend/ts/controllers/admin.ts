import * as express from 'express'

let router = express.Router()

//登录验证
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

//退出登录
router.use('/menu', (req, res) => {
	let data =
		{
			"data": {
				"items": [{
					"id": 1000,
					"icon": "",
					"title": "Group",
					"url": "",
					"status": true,
					"children": [{
						"id": 1001,
						"icon": "",
						"title": "Page1 ",
						"url": "page1",
						"status": true
					}, {
						"id": 1002,
						"icon": "search",
						"title": "search",
						"url": "search",
						"status": true
					}]
				}, {
					"id": 2000,
					"icon": "android-share",
					"title": "Iframe兼容旧版",
					"url": "",
					"status": true,
					"children": [{
						"id": 2001,
						"icon": "",
						"title": "新浪",
						"url": "http://www.sina.com.cn",
						"status": true
					}, {
						"id": 2002,
						"icon": "",
						"title": "百度",
						"url": "http://www.baidu.com",
						"status": true
					}]
				}, {
					"id": 3000,
					"icon": "",
					"title": "OnePage",
					"url": "home",
					"status": true
				}]
			}
		}
	res.json(data)
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