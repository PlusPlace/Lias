/**
 *  Lias::View::MultipurposeBoard
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

define( 'board', function( require, exports, module ){

var body = 'multipurpose-board'
  , inner = 'inner-multipurpose-board';

var Board = Backbone.View.extend({
    get: function(){
      return document.getElementById( inner );
    }
    
    /**
     *  Show.
     *  @param  boolean animation [ true || false ]
    */
  , show: function( animation ){
      var _self = this;
      var elem = $( '#' + body );
      if( animation === true ){
        elem.fadeIn( 'fast', function(){ _self.update(); } );
      }
      else{
        elem.show();
        _self.update();
      }
    }
    
    /**
     *  Hide.
     *  @param  boolean animation [ true || false ]
    */
  , hide: function( animation ){
      var _self = this;
      var elem = $( '#' + body );
      if( animation === true ){
        elem.fadeOut( 'fast', function(){ _self.update(); } );
      }
      else{
        elem.hide();
        _self.update();
      }
    }

    /**
     *  Update board.
     *  @param  object param <This object will have parameters for tinyscrollbar.js>
    */
  , update: function( param ){
      var board = $( '#' + body );
      try{
        board.tinyscrollbar_update( param );
      } catch( e ){
        board.tinyscrollbar( param );
      }
      if( param ){
      }
    }

  , atBottom: function( callback ){
      var board = $( '#' + body );
      board.tinyscrollbar_atBottom( callback );
    }

  , setFullHeight: function(){
      $( '#' + inner ).css( 'height', '100%' );
    }

  , setAutoHeight: function(){
      $( '#' + inner ).css( 'height', 'auto' );
    }
    
  , clear: function( animation ){
      $( '#' + inner ).html( '' );
      this.update();
    }

  , html: function( contents ){
      $( '#' + inner ).html( contents );
      this.update();
    }

  , inner: {
        /**
         *  Get input
         *  @param  string type
        */
        getInput: function( type ){
          return $( '[data-input=' + type + ']' );
        }

        /**
         *  Get button
         *  @param  string type
        */
      , getButton: function( type ){
          return $( '[data-button=' + type + ']' );
        }

        /**
         *  Get part
         *  @param  string type
        */
      , getPart: function( type ){
            return $( '[data-part=' + type + ']' );
        }

        /**
         *  Clear
         *  @param  number selector
        */
      , clear: function( target, selector ){
          var _self = this;
          var elem = _self.getInput( target );
          if( selector )
            elem.children( '[data-append=' + selector + ']' );
          else
            elem.children( '[data-append]' ).remove();
          module.update();
        }
    }
});

var module = new Board();

return module;
});
