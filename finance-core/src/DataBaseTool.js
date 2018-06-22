/**
 * Created by karonl on 2018/6/3.
 * DataBaseTool
 */
const mongoose = require('mongoose');
const StuffSchema = require("./schemas/StuffSchema");
const StuffSnapSchema = require("./schemas/StuffSnapSchema");
const UserSchema = require("./schemas/UserSchema");
const UnidSchema = require("./schemas/UnidSchema");
const PhoneSchema = require("./schemas/PhoneSchema");
const MachineSchema = require("./schemas/MachineSchema");
const OrderSchema = require("./schemas/OrderSchema");
let connection;
// 加载 Schema
const stuff = mongoose.model('Stuff', StuffSchema);
const user = mongoose.model('User', UserSchema);
const unid = mongoose.model('Unid', UnidSchema);
const phone = mongoose.model('Phone', PhoneSchema);
const stuffsnap = mongoose.model('StuffSnap', StuffSnapSchema);
const machine = mongoose.model('Machine', MachineSchema);
const order = mongoose.model('Order', OrderSchema);
//
class DataBaseTool {

	static async start() { // return promise

		if(connection) return connection;
		else {
			let dbt = new DataBaseTool();
			connection = await dbt.connect();
			return connection;
		}
	}

    constructor() {
		let inst = mongoose.connection;
    	inst.on('error', console.error.bind(console, 'connection error:'));
		inst.on('close', function () {
		    console.log("close");
		});
		inst.on('mongoDB reconnected', function () {
		    console.log("reconnect successfully");
		});
		inst.on('mongoDB disconnected', function () {
		    console.log("disconnected");
		});
		inst.once('open', function() {
		    console.log("MongoDB connected successfully");
		});	
    }

    async connect() {
		try {
			await mongoose.connect('mongodb://localhost/j-finance', { 
	    		connectTimeoutMS: 1000,
	    		poolSize: 4,
	    		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  				reconnectInterval: 1000, // Reconnect every 1000ms
	    		autoReconnect: true
	    	});
	    	return mongoose.connection;
		} catch(e) {
			return undefined;
		}
    }
}
module.exports = {
	'DataBaseTool': DataBaseTool,
	'Stuff': stuff,
	'StuffSnap': stuffsnap,
	'User': user,
	'Unid': unid,
	'Phone': phone,
	'Machine': machine,
	'Order': order
};

