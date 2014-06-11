/**
 *  Lias::View::Core
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

define( 'view', function( require, exports, modules ){

var display = false
  , hidingTimer
  , showingTimer;

var setShowingTimer = function(){
  showingTimer = setTimeout( function(){
    hideLoader();
    showingTimer = null;
  }, 60000 );
};

var setHidingTimer = function(){
  hidingTimer = setTimeout( function(){
    document.getElementById( 'loader' ).style.display = 'none';
    display = false;
    hidingTimer = null;
  }, 300 );
};

var showLoader = modules.exports.showLoader = function(){
  if( hidingTimer ){
    clearTimeout( hidingTimer );
    hidingTimer = null;
  }

  setShowingTimer();

  document.getElementById( 'loader' ).style.display = 'block';
  display = true;
};

var hideLoader = modules.exports.hideLoader = function(){
  if( display === true ){
    setHidingTimer();
  }

  if( showingTimer ){
    clearTimeout( showingTimer );
    showingTimer = null;
  }
};

});
