/**
 *  Lias::Collection::Tools
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

define( 'tools', function( require, exports, module ){

//
// Modules
//
var $View = require( 'view' );

var active;
var Tools = Backbone.Collection.extend({
    /**
     *  @param  string toolName
     *  @param  string id
    */
    startup: function( id ){
      var tool = this.get( id );

      if( active ){
        // Close active tool
        active.close();
        active = null;
      }

      tool.startup(); // Startup
      active = tool;  // Set as active tool
      
    }

  , closeActive: function(){
      if( active ){
        active.close();
        active = null;
      }
    }

  , restartActive: function(){
      if( active && active.restart )
        active.restart();
    }

    /**
     *  Check loading a tool
     *  @param  string name
     *  @return true | false <If it returns 'true', the tool has already loaded. If not, the tool has NOT been loaded.>
    */
  , isLoaded: function( id ){
      var tool = this.get( id );
      return !!( tool && tool.loaded === true );
    }
    
    /**
     *  Load a tool
     *  @param  string id
     *  @param  function callback
     *  @return false <No tool data or Not loaded.>
    */
  , loadTool: function( id, callback, errorCallback ){
      var _self = this;
      var toolInfo = lias.config.getToolInfo( id );

      if( !toolInfo && typeof errorCallback == 'function' ){
        errorCallback( id );
        return;
      }

      var url = toolInfo.bin;

      $View.showLoader();

      require( [ url ], function( modules ){
        if( !modules ){
          if( typeof errorCallback == 'function' )
            errorCallback( id, url );
          return;
        }

        for( var i = 0; modules[ i ]; i++ )
          _self.add( modules[ i ] );
        if( typeof callback == 'function' )
          callback();

        $View.hideLoader();
      });
    }
});

module.exports = new Tools();
});
