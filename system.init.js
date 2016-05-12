'use strict';

(function(){
	window.development_mode = true;

	System.paths['app/*'] = "dist/app/*";
	// bootstrap app
	System.import('app/bootstrap').catch(function(err){ console.error(err);  });
})();