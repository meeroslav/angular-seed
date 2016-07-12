'use strict';

(function(){
    window.development_mode = true;

    // bootstrap app

    System.import('lib/bootstrap').then(function(){
        System.import('app/main');
    });
})();