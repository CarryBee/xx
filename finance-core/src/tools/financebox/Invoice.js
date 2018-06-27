/*
收款人
金额计算
金额校验
if(num > 0 && num < 1000000) 
*/
module.exports = class Invoice {
    
    constructor () {
        this.amount = 0;
    }

    set plusnum(val = 0) {
        val = parseFloat(val).toFixed(2);
        if(val >= 0 && val < 1000000) {
            this.amount = val;
        } else throw new Error("amount is NaN");
    }

    set minus(val = 0) {
        val = parseFloat(val).toFixed(2);
        if(val <= 0 && val > -1000000) {
            this.amount = val;
        } else throw new Error("amount is NaN");
    }
}