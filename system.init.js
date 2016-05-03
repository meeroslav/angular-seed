'use strict';

(function(){
	window.development_mode = true;

	System.import('app').catch(function(err){ console.error(err);  });
})();