var express = require('express');
var router = express.Router();
var allocator = require('../modules/allocator.js');

router.get('/', function(req, res) {
	res.render('index');
});

// To get any available number
router.post('/getNumber', function(req, res) {
	
	allocator.getNumber(false,function(status,num){

		if(status) {
			// number available
			res.send({
				status:true,
				number: ''+num
			});
		} else {
			// no numbers are available
			res.send({
				status: false,
				ECODE: "ELIMIT"
			});
		}

	});

});


// To get a special number
router.post('/getSpecialNumber' , function(req, res) {

	// Number requested by uses. Assigned to 0 if its in invalid form
	var wantedNumber = Number(req.body.number) || 0;

	allocator.getSpecialNumber(wantedNumber,function(status,gotSpecial,num) {

		if(status) {
			// Number available
			if(gotSpecial) {
				// requested number was available
				res.send({
					status:true,
					number: ''+num,
					special: true,
				});
			} else {

				// requested number was not available
				
				if(wantedNumber<1111111111 || wantedNumber>9999999999) {
					// requested number was in invalid form/range
					var ECODE = "EINV";
				} else {
					// requested number exists
					var ECODE = "EEXISTS";
				}

				res.send({
					status:true,
					number: ''+num,
					special: false,
					ECODE: ECODE
				});

			}


		} else {
			// no numbers are available
			res.send({
				status: false,
				ECODE: "ELIMIT"
			});
		}

	});

});

module.exports = router;
