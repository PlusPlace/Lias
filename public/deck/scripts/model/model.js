/**
 *  Lias::Model::Core
 * 
 *  @version 0.0.2
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2011, 2012 Plus-place project
*/

define( 'model', function( require, exports, module ){

//
// Modules
//
var $Loader = require( 'loader' )
  , $Debug  = require( 'debug' );


//
// Template model
//
module.exports.Template = Backbone.Model.extend({
    /**
     *  @param object param
     *  param = {
     *      url: string
     *    , id: string
     *  }
    */
    initialize: function( param ){
      this.id = param.id;
      this.url = param.url;
      this.async = param.async;

      if( !param.callback ) this.callback = function(){};
      else this.callback = param.callback;

      if( param.url ) this.fetch();
    }

    /**
     *  @return string
    */
  , fetch: function(){
      var _self = this;

      $Loader.require({
          url: this.url
        , async: this.async
        , cache: false
        , done: function( res ){
            _self.data = _self.compile( res );
            _self.callback( _self.data );
          }
      });

      return _self.data;
    }

    /**
     *  @param  string tmpl
     *  @return object
    */
  , compile: function( tmpl ){
      var data = {};
      var parts = $( tmpl ).filter( 'script[type=text\\/template]' );

      for( var i = 0; parts[ i ]; i++ ){
        var elem = parts.eq( i );
        var id   = elem.attr( 'id' );
        var text = elem.text();
        if( text == '' )
          text = elem.html();
        data[ id ] = _.template( text );
      }

      return data;
    }
});


//
// Tool model
//
module.exports.Tool = Backbone.Model.extend({
    /**
     *  @param object param
     *  param = {
     *      id: string
     *    , mode: string
     *  }
    */
    initialize: function( param ){
      this.startupCallback = param.startupCallback || function(){};
      this.closeCallback = param.closeCallback || function(){};
      this.set( param );
      this.loaded = true;
    }

  , startup: function(){
      if( this.get( 'up' ) === true )
        return;

      var type = location.hash.replace( /^#/, '' ).split( '/' )[ 0 ];
      this.startupCallback.call( this, type );
      this.set( 'up', true );
    }

  , close: function(){
      if( this.get( 'up' ) === false )
        return;

      this.closeCallback.call( this );
      this.set( 'up', false );
    }

  , restart: function(){
      if( this.get( 'up' ) === true )
        this.close();

      if( this.get( 'up' ) === false )
        this.startup();
    }

  , defaults: {
        id: null
      , mode: null
      , up: false
    }
});

} );

