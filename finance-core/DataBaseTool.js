/**
 * Created by karonl on 2018/6/3.
 * DataBaseTool
 */
const mongoose = require('mongoose');
const stuffSchema = require("./stuffSchema");
let connection, Stuff;
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
		mongoose.Promise = require('bluebird');
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
		    console.log("mongoDB connected successfully");
		});
		Stuff = mongoose.model('Stuff', stuffSchema)
		
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
	DataBaseTool: DataBaseTool,
	Stuff: Stuff
}
/*
module.exports = {}
*/

