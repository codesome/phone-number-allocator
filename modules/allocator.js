
var numbers = require('../models/numbers.js');
var currentState = require('../models/currentState.js');
var deasync = require("deasync")

// for holding the database document of the current pointer of numbers
var state;

// updating the state on startup of the application
currentState.findOne({},function(err,n){
    if(n) {
        // loading the previous state
        state = n;
    } else {
        // App was run for the first time
        // hence creating a state document
        currentState({
            currentNumber:1111111111 // start point of numbers
        }).save(function(){
            currentState.findOne({},function(err,n){
                // getting the object an assigning
                state = n;
            });
        });
    }
});

/**
* Used to check if next number pointed by state is available or no
*
* @Params: None
*
* returns the number pointed by the state if its available
* returns 'false' if the next pointer in the state exists
*/
var getUnusedNumberUtil = deasync(function (cb) {

    numbers.findOne({'number': state.currentNumber}, function(err, n){

        if(n) {
            // number exists
            state.currentNumber++;
            cb(null,false);
        } else {
            // number is available
            var num = state.currentNumber;
            state.currentNumber++;
            state.save(function(){
                cb(null,num);
            });
        }

    });

});

/**
* Utility used in getNumber function to get an unused number from database
* @Param: (callback)
*         * callback(status, num)
*             * status=true means some number was available, which is equal to 'num'
*             * status=false means no number was available, num=0
*
* Does not return anything
*/
function getUnusedNumber(callback) {

    if(state.currentNumber > 9999999999) {
        // pointer limit exceeded
        return callback(false,0);
    } else {

        // get unused number
        var num = getUnusedNumberUtil();

        while(!num) {
            // while pointer doesnt not point to unused number
            num = getUnusedNumberUtil();
        }

        if(num<=9999999999) {
            // valid number
            callback(true,num);
        } else {
            // if pointer exceeded the limit
            callback(false,0);
        }

        
    }

}

/**
* Used to get an unused number from database
* @Param: (fromSpecial,callback)
*         * fromSpecial=true means it was called after special number was not available
*         * callback(status, num) or callback(status, isSpecial, num)
*             * status=true means some number was available, which is equal to 'num'
*             * status=false means no number was available, num=0
*         * callback(status, gotSpecial, num)
*             * gotSpecial=false as it was called after special number was not available
*             * status=true means some number was available, which is equal to 'num'
*             * status=false means no number was available, num=0
*
* Does not return anything
*/
function getNumber(fromSpecial,callback) {

    getUnusedNumber(function(status,num){

        if(fromSpecial) {
            // if it was called after special number was not available
            callback(status,false,num);
        } else {
            callback(status,num);
        }

    });

}

/**
* Used to get a special number
* @Param: (wantedNumber,callback)
*         * wantedNumber=the special number wanted
*         * callback(status, gotSpecial, num)
*             * gotSpecial=true means the wantedNumber was available
*             * gotSpecial=false means the wantedNumber was not available, hence some number is given
*             * status=true means special/some number was available, which is equal to 'num'
*             * status=false means no number was available, num=0
*
* Does not return anything
*/
function getSpecialNumber(wantedNumber, callback) {

    if( wantedNumber<state.currentNumber || wantedNumber<1111111111 || wantedNumber>9999999999 ) {
        // wantedNumber not available
        return getNumber(true,callback);
    
    } else {

        numbers.findOne({'number': wantedNumber}, function(err, n){

            if(n) {
                // wantedNumber exists
                return getNumber(true,callback);
            } else {
                // wantedNumber available
                // storing this special number in database
                numbers({
                    'number':wantedNumber
                }).save(function(){
                    callback(true,true,wantedNumber);
                });
            }

        });

    }


};

module.exports.getNumber = getNumber;
module.exports.getSpecialNumber = getSpecialNumber;