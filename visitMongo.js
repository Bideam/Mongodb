var MongoClient=require('mongodb').MongoClient,
	Server=require('mongodb').Server;
var client=new MongoClient(new Server('localhost',28008,{
							socketOptions:{connectTimeoutMS:500},
							poolSize:5,
							auto_reconnect:true
						},{
							numberOfRetries:3,
							retryMiliSeconds:500
						}));

client.open(function(err,client){
	if (err) {
		console.log('Connection Failed');
	}else{
		var db=client.db("testDB");
		if (db) {
			console.log('conncetion success by Object of Client');
			client.close();
			console.log("db has closed");
		}
	}
});

MongoClient.connect("mongodb://localhost:28008/foobar",{
	db:{w:1,native_parser:false},
	server:{
		poolSize:5,
		socketOptions:{connectTimeoutMS:500},
		auto_reconnect:true
	},
	replSet:{},
	mongos:{}
	},function(err,db){
		if (err) {
			console.log("connect failed");
		}else{
			console.log("conenct success by string of mongodb");
			db.logout(function(err,result){
				if (!err) {
					console.log('logged out success');
				}
				db.close();
				console.log('connect close');
			})
		}
	});