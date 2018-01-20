import * as http from 'http'
import * as path from 'path'
import * as express from 'express'

import * as main from '../controllers/app'
import * as admin from '../controllers/admin'


/**
 * set 设置express路由
 * @param app 
 */
export function set(app: express.Express) {
    app.use('/admin', admin),
        app.use('/', main)
}