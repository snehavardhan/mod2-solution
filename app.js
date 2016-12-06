(function (){
  'use strict';
  console.log("Entering JS");
  angular.module('shoppingListApp', [])
  .controller('shoppingListToBuyController', shoppingListToBuyController)
  .controller('shoppingListBoughtController', shoppingListBoughtController)
  .service('shoppingListService', shoppingListService);

  var toBuy=[];

  shoppingListToBuyController.$inject = ['shoppingListService'];
  function shoppingListToBuyController(shoppingListService){
     toBuy = this;
    toBuy.items = shoppingListService.displayItems();
    console.log(toBuy);
    toBuy.removeItem = function(itemIndex){
      shoppingListService.removeItem(itemIndex);
    };

    toBuy.addToBoughtList = function(name, quantity) {
      shoppingListService.addToBoughtList(name, quantity);
    };
  }

  shoppingListBoughtController.$inject = ['shoppingListService'];
  function shoppingListBoughtController(shoppingListService) {
    var scl = this;

    scl.alreadyBought = shoppingListService.getList();
  }

  function shoppingListService(){
    var service = this;
    var items =[];
    var alreadyBought = [];
    service.displayItems = function(){
      items=[
        {name: "Cookies",
        quantity: "10 bags"},
        {name: "Brownie",
        quantity: "3 bags"},
        {name:"Mocha",
        quantity: "5 cups"},
        {name: "Pizza",
        quantity: "4 large"}
      ];
      return items;
    };

    service.addToBoughtList = function(name, quantity){
      var eachItem = {
        name : name,
        quantity : quantity
      };
      alreadyBought.push(eachItem);
    };

    service.removeItem = function(itemIndex){
      items.splice(itemIndex,1);
      if(items.length == 0){
        toBuy.errorMessage = "Everything is bought";
      }
    };

    service.getList = function(){
      return alreadyBought;
    };
  }

})();
