'use strict';

(function(){
	window.development_mode = true;

	// bootstrap app
	System.import('app/bootstrap').catch(function(err){ console.error(err);  });
})();