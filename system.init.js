'use strict';

(function(){
	window.development_mode = true;

	// override app path for dev
	System.paths['app/*'] = "dist/app/*";
	// bootstrap app
	System.import('app/bootstrap').catch(function(err){ console.error(err);  });
})();