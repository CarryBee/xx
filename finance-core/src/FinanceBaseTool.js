const mysql = require('promise-mysql');
const Promise = require('bluebird');
let pool;
class FinanceBaseTool {

    static async start() {
        pool = await mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '920589656',
            database: 'btcauto',
            connectionLimit: 10
        })

  
        pool.on('connection', function (connection) {
            console.log('Create %d connection', connection.threadId); // 创建
        });
  
        pool.on('release', function (connection) {
            console.log('Connection %d released', connection.threadId); // 返回连接池
        });
        
    }

    constructor() {
        if(!pool) throw new Error("数据库未连接");
        this.pool = pool;
        return this;
    }

    getSqlDisposer() {
        const that = this;
        const back = that.pool.getConnection().disposer(function(connection) {
            that.pool.releaseConnection(connection);
        });

        return function(callback) {
            Promise.using(back, callback);
        }
    }
}
module.exports = FinanceBaseTool;