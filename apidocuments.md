// page 1

List of QuickSearch 
(Get) http://localhost:9200/recipe

//Page2

Filter on basis of cost 
(Get)http://localhost:9200/filter/lcost=200&hcost=300
  
Sort on basis of cost 
(Get)http://localhost:9200/filter/200?menu_type=veg

//Page3

Menu of the restaurant 
(Get) http://localhost:9200/restaurantmenu

//page4

Menu details (selected item)
(Post) http://localhost:9200/menu/1

Place order 
(Post) http://localhost:9200/placeorder

//page5

List of order placed
(Get) http://localhost:9200/orders

List of order placed of particular user 
(Get) http://localhost:9200/orders?email:fazan@gmail.com

Update order status 
(Put) localhost:9200/updateOrder/1

////////////////////////////////

Delete orders

(Delete) http://localhost:9200/deleteorder/62c7a4e66cb13e0fd2358ef4






live heroku live link

///////   https://frontapis.herokuapp.com/recipe


live link for login app

////////