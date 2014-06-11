/**
 *  Lias::Util
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

define( 'util', function( require, exports, module ){

//
// Modules
//
var $Loader = require( 'loader' );


//
// Require
//
module.exports.fetchJson = function( url ){
  var data, callback, async;

  for( var i = 1; arguments.length > i; i++ ){
    if( typeof arguments[ i ] == 'function' )
      callback = arguments[ i ];
    else if( typeof arguments[ i ] == 'boolean' )
      async = arguments[ i ];
  }

  $Loader.require({
      url: url
    , methodType: 'GET'
    , async: async
    , cache: false
    , done: function( res ){
        data = eval( '(' + res + ')' );
        if( typeof callback == 'function' )
          callback( data );
      }
    , error: function( res ){
      console.log( res );
        data = eval( '(' + res + ')' );
        if( typeof callback == 'function' )
          callback( data, true );
      }
  });

  return data;
};


//
// Hash getter
//
module.exports.currentHash = {
    /**
     *  @return string
    */
    get: function(){
      return location.hash.replace( /^#/, '' );
    }

    /**
     *  @return array
    */
  , getSplit: function(){
      return this.get().split( '/' );
    }

    /**
     *  @return string
    */
  , getUseId: function(){
      return this.getSplit()[ 0 ];
    }

    /**
     *  @return string
    */
  , getRoot: function(){
      var hash = this.getSplit();
      return [ hash[ 0 ], hash[ 1 ] ].join( '/' );
    }
};


//
// Time getter
//
module.exports.getTime = function(){
  var date = new Date();
  var year = date.getYear();
  year = year < 2000 ? year + 1900 : year;
  return [
      year
    , date.getMonth() + 1
    , date.getDate()
    , date.getHours()
    , date.getMinutes()
    , date.getSeconds()
  ];
};


//
// Escape html tag
//
module.exports.escapeHTMLTag = function( targetString ){
  return targetString.replace( /[<>&"']/g, function( match ){
    return {
        '<': '&lt;'
      , '>': '&gt;'
      , '&': '&amp;'
      , '"': '&#39;'
      , "'": '&quot;'
    }[ match ];
  });
};


//
// Route
//
module.exports.route = function(){
  Backbone.history.routeTool.apply( null, arguments );
};

});
