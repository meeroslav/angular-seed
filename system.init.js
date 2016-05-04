'use strict';

(function(){
	window.development_mode = true;

	System.import('app/bootstrap').catch(function(err){ console.error(err);  });
})();