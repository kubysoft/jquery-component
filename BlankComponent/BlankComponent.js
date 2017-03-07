// BLANKCOMPONENT  *mycomponent. 


// BEGIN SCOPE 
// self executing function for jquery reference. That prevents the $ is allways jquery component. 
// W = window D= document undefined = nothing prevent undefined = true
(function ($, W, D, undefined ) {
// ---------------------------------------------------------
// INTERNAL COMPONENT 
// ------------------------------------------------------------
var BlankComponent = {
	// default values *defaults
	defaults : {
		name: 'Default Name', 

	}, // end defaults 

	// CREATE A INSTANCE  *new *instance
	create: function(options){
		var instance = Object.create(this);
		Object.keys(options).forEach(function(key){
			instance[key] = options[key];
		})
		return instance; 

	}, // end create

	// INIT *init componentn  
	init: function(options, elem){
		// INI OBJECTS  
		var self = this; // reference to mycomponent . 
		self.MainDiv = $(elem); // jquery version of actual element 

		// INI OPTIONS 
		self.options = $.extend({}, self.defaults, options);
		self.recordset = self.options.recordset; 



		// CALL MAIN
		self.HtmlInit(); 


	},// end init

	// HTML INIT  *html
	// cacth all html an d 
	HtmlInit: function(){
		var self = this; 
		self.MainDiv.append("Hello component initiated !!! "); 

		self.divName = $("<div/>",{class:"container"}).appendTo(self.MainDiv)
	}, 


	// ******************************  FUNCTIONS FROM HERE !!!!
	sayHi: function(){
		var self = this, op = self.options; 
		self.divName.html('').append("Hi " + op.name)
	}



}// END COMPONENT 


// ---------------------------------------------------------
// JQUERY DECLARED FUNCTIONS 
// ------------------------------------------------------------
$.fn.BlankComponent = function(options){
	// RETURN FOR EACH ELEMENT CHAINING MANTEINING 
	return this.each(function(){
		// this is now jquery object this.html('');
		//var my = Object.create(jLists);
		var my = BlankComponent.create({
			test:function(){
				console.log("fn test ")
			}
		})

		my.init(options, this);


		// INSTANCIATE MYCOMPONENT 
		// access to my component from outside like $('#mydiv').data('mycomponent')
		$.data(this,'BlankComponent',my)

	}); 
	// end return FOR EACH ELEMENT CHAINING MANTEINING  
}
 

})(jQuery, window, document);
// END SCOPE MYCOMPONENT  


