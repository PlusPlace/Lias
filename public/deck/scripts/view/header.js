/**
 *  Lias::View::Header
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

define( 'header', function( require, exports, module ){

var expanded = false;

var Header = Backbone.View.extend({
    show: function(){
      var elem = document.getElementById( 'header' );
      elem.style.display = 'block';
    }
    
    
  , hide: function(){
      var elem = document.getElementById( 'header' );
      elem.style.display = 'none';
    }

  , expand: function( animation ){
      var elem = $( '#header' );

      if( animation === true )
        elem.animate( { height: '100%' }, 'fast' );
      else
        elem.css( 'height', '100%' );

      expanded = true;
    }

  , reduce: function( animation ){
      var elem = $( '#header' );

      if( animation === true )
        elem.animate( { height: '60px' }, 'fast' );
      else
        elem.css( 'height', '60px' );

      expanded = false;
    }

  , toggle: function( animation ){
      if( expanded === false )
        this.expand( animation );
      else
        this.reduce( animation );
    }
});

return new Header();
});
