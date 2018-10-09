(function(){
'use strict';

var toBuyList = [
	{ name: "beers", quantity: 20 },
	{ name: "cookies", quantity: 10 },
	{ name: "olives", quantity: 30 },
	{ name: "pizzas", quantity: 2 },
	{ name: "snacks", quantity: 5 }
];

var boughtList = [];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var ToBuyCtrl = this;
	toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
	 toBuyCtrl.bought = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
} 

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;  
  boughtCtrl.items = ShoppingListCheckOffService.getBougthItems();
}


function ShoppingListCheckOffService(){
	var service = this;

	var itemsToBuy = toBuyList;
	var boughtItems = boughtList;
    
    service.buyitem = function(itemIndex) {
    	var item = itemsToBuy[itemIndex];
    	service.addBoughtItem(item);
    removeFromItemsToBuy(itemIndex);
    };

    service.getItemstoBuy = function () {
    	return itemsToBuy;
    };

    service.getBougthItems = function () {
    	return boughtItems;
  	};

  	service.addBoughtItem = function (item) {
    	boughtItems.push(item);
  	};

  	function removeFromItemsToBuy(itemIndex) {
	  itemsToBuy.splice(itemIndex, 1);
  };
}

})();