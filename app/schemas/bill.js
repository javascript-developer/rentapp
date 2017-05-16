var mongoose = require('mongoose'); 
var bill = mongoose.Schema({

 email    : { type : String  }, 
 pricing  : {
 	house_rent 		 : { type: Number },
 	elec_unit_charge : { type: Number },
 	water_charge     : { type: Number }
 },

 bills : [{ 
	from 			 : { type: Number },
	to   			 : { type: Number },
	house_rent  	 : { type: Number },
	electricity_bill : { type: Number },
	water_bill   	 : { type: Number },
	generated_on 	 : { type: Number },
	paid_on      	 : { type: Number },
	payment_mode 	 : { type: String },
	status 		 	 : { type: String }
 }]	

});
module.exports = mongoose.model('bill',bill);
