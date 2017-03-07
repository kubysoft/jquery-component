// BLANKCOMPONENT  *mycomponent. 


// BEGIN SCOPE 
// self executing function for jquery reference. That prevents the $ is allways jquery component. 
// W = window D= document undefined = nothing prevent undefined = true
(function ($, W, D, undefined ) {
// ---------------------------------------------------------
// INTERNAL COMPONENT 
// ------------------------------------------------------------
var jHelp = {
	// default values *defaults
	defaults : {

	}, // end defaults 

	// SERVER CONNECTION *server *options 
	serverOptions: {
		hostname : "kubyapi.com", 
    	url : "/node/help"

	},
	// CALL SERVER *server *call 
	CallServer: function(settings, Myparams){
	    // console.log("fn CallServer")
	    var self = this; 
	    var Mydiv = this.MainDiv;  
	    if (!Myparams) { Myparams = {}}
		var hostName = window.location.hostname; 
		if ( this.serverOptions.hostname ) { hostName = this.serverOptions.hostname }
		var url='http://'+ hostName + this.serverOptions.url + '/';
		console.log("KUDABY CALL SERVER: " + url);console.log("Settings:") ; console.dir(settings); console.log("Myparams:"); console.dir(Myparams); 
	    // NodeAjaxTime =  new Date().getTime();
	    var MydataReturn = null; 
	    $.ajax({
	        type: settings.CallType,
	        url: url,
	        contentType: 'application/json',
	        timeout: settings.timeout,
	        data: Myparams  ,
	        success: function(data) {
	            if (settings.success) { settings.success.call(self,data);}     
	            
	        }, // success 
	        error: function(jqXHR, textStatus, errorThrown) {
	            //alert( "error" +err);
	            var MainDiv = $('#'+Mydiv); 
	            MainDiv.html(''); 
	            MainDiv.AddYesNo ({
	                type: 'warning' , title: 'Error', 
	                description : errorThrown   , 
	            }); 
	        } // error 
	         
	    })
	    .done(function(data) {
	    	// console.log("done ") 
	            if (data.error) {
	                var verror = "<div style='background-color:red' class='alert'>"+
	                "<a style='color:#fff'>"+data.error+"</a>"+
	                "<br><a class='alert'>" +data.errorDescription + "</a></div>"
	                 $('#'+Mydiv).html(verror);
	            }else{
	                if (settings.done) { 
						// setTimeout(function(){ settings.success(data);  }, 100);
						settings.success(done);
	                }
	            }
			} // function 
	    )// done 


	},// end call server,

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

		self.CallServer({success: self.showFile},options)
	},// end init
	
	// SHOW FILE *show file 
	showFile: function(data){
		var self = this; // reference to mycomponent . 
		self.MainDiv.html(data) // jquery version of actual element 
	},
	// HTML INIT  *html
	// cacth all html an d 
	HtmlInit: function(){
		var self = this; 


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
$.fn.jHelp = function(options){
	// RETURN FOR EACH ELEMENT CHAINING MANTEINING 
	return this.each(function(){
		// this is now jquery object this.html('');
		//var my = Object.create(jLists);
		var my = jHelp.create({
			test:function(){
				console.log("fn test ")
			}
		})

		my.init(options, this);


		// INSTANCIATE MYCOMPONENT 
		// access to my component from outside like $('#mydiv').data('mycomponent')
		$.data(this,'jHelp',my)

	}); 
	// end return FOR EACH ELEMENT CHAINING MANTEINING  
}
 

})(jQuery, window, document);
// END SCOPE MYCOMPONENT  


