var async   = require('async')
var jwt = require('jsonwebtoken');
var config = require('../config')
var login = require('../schemas/login')
var bill = require('../schemas/bill')

module.exports = {
	getAllUsers : function (data, cb) {
		login.find({'type':'user'},{ '_id': 0,'password':0,'__v':0 }, function(err,result){			
			cb(null,{'message':'all users login data','data':result});
		});
	},

	createUserLogin : function(reqObject,cb){
		var createLogin = {};

		createLogin.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['name','email','password','type']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		createLogin.checkEmail = function(cb){
			login.find({'email':reqObject.email}, function(err, result){
				if(err)
				  cb({message:'DB Error'},null);
				else{
			 	 	 if(result.length!=0)
			 	 	    cb({message:'Email already exists'},null);
			 	 	 else
			 	 	   cb(null,true);			 	 	 	
				 }
			});
		}
		createLogin.saveData = function(cb){

			var logindata = {
			    name  		:       reqObject.name,		
				email		: 		reqObject.email,
				password	: 		reqObject.password,
				type        :       reqObject.type,
				verified    :       true,
				active      :       true,
				created_on  :       new Date().getTime(),
				last_login 	: 		new Date().getTime()
			};
			console.log(logindata)
			var newlogin = new login(logindata);
			newlogin.save(function(err){
				console.log(err)
				if(err)
					cb({message:'DB Error'},null)
				else
					cb(null,{message :'Account created successfully.'});	
			})
		}
		async.series(createLogin,function(error,result){
			
			if(error)
				cb(error,null)
			else
				cb(null,result.saveData)
		});
	},

	adminLogin : function(reqObject,callback){
		var adminLogin = {};

		adminLogin.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['email','password']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		}

		adminLogin.doLogin = function(cb){
			login.find({'email' :reqObject.email}, function(err,result){			
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result[0]){
					  if(result[0].password==reqObject.password)
					    {
					    	if(result[0].verified&&result[0].active){
					    		var token =  jwt.sign({'name' :result[0].email, 'email':result[0].email, 'type':result[0].type},config.app.authsecret);
					    		cb(null,{message :'login success', data: {'token':token}});
					    	}
					    	else
								cb({message:'account inactive'},null)
						}
					   else
					   	cb({message:'incorrect password'},null)
					}	
					else
					   cb({message:'account does not exists'},null)
				}
			});
		}

		async.series(adminLogin,function(error,result){
			if(error)
				callback(error,null)
			else
				callback(null,result.doLogin)
		});
	},

	addBillConfig : function(reqObject,callback){
		login.find({'email' : reqObject.email}, function(err,result){
				var ob = {
					 'login_id' : result[0]._id,
					 'email'    : reqObject.email,
					 
					 'pricing'  : {
					 	'house_rent' 		 : 4000,
					 	'elec_unit_charge'   : 6,
					 	'water_charge'       : 100
					 },

					 'bills' : []	
				}

				var b = new bill(ob)
				b.save(function(err, res){
					if(err)
					console.log(err);
					console.log(res);
				})
		});
	},

	getUserBills : function(reqObject,callback){
		var billing = {};

		billing.validateRequestArgs = function(cb){
			result = validateRequestObject(reqObject, ['email']);
			if(result!=true)
				cb({message:'Validation failed',values:result},null);
			else
				cb(null,true);
		},

		billing.checkLogin = function(cb){
			login.find({'email':reqObject.email}, function(err,result){
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result.length==1)
						cb(null,true);
					else
						cb({message:'User does not exists','login':false},null);
				}
			})
		}

		billing.getBillData = function(cb){
			bill.find({'email':reqObject.email},{ '_id': 0,'__v':0 }, function(err, result){
				if(err)
					cb({message:'DB Error'},null)
				else{
					if(result.length!=0)
						cb(null,{message :'bill data', data: result});
					else
						cb({message :'Pricing not set for this user.','pricing':false}, null);
				}
			})
		}

		async.series(billing, function(error, result){
			if(error)
				callback(error,null)
			else
				callback(null,result.getBillData)
		})
	}


}