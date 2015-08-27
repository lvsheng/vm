import {main, Widget} from '../../../src/main';

class Order extends Widget {

}
main.register("order", Order);

//just for test
var order = new Order();
order.name = "order";
alert(order.getName());
