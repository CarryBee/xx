const OrderMoudle = require("../src/modules/OrderModule");

async function a() {
    try{
        const list = ["5b2698084f2b66ff144caf9b"];
        const order = new OrderMoudle("sss", list);
        await order.createByList(); // 创建订单
    }catch(e){
        console.log("2" + e)
    }
    
}

a();

