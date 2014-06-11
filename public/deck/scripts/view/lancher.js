/**
 *  Lias::View::Lancher
 * 
 *  @require /g/mvc/view/jquery-1.7.1.min.js (Lias::View::jQuery)
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

define( 'lancher', function( require, exports, module ){

var active = null;
    
var Lancher = Backbone.View.extend({
    /**
     *  Show.
     *  @param  boolean animation [ true || false ]
    */
    show: function( animation ){
      var elem = $( '#lancher' );
      
      if( animation === true )
        elem.animate( { left: '0px' }, 500 );
      else
        elem.css( 'left', '0px' );
    }
    
    /**
     *  Hide.
     *  @param  boolean animation [ true || false ]
    */
  , hide: function( animation ){
      var elem = $( '#lancher' );
      
      if( animation === true )
        elem.animate( { left: '-70px' }, 500 );
      else
        elem.css( 'left', '-70px;' );
    }
    
    /**
     *  Add a lancher button.
     *  @param  string name
     *  @param  string desc
     *  @param  string src
     *  @param  function callback
    */
  , addButton: function( name, desc, src, callback ){
      var elem = $( '<img/>' );
      elem.addClass( 'lancher-tool-icon' );
      elem.attr( 'data-tool-name', name );
      elem.attr( 'src', src );
      elem.attr( 'alt', name );
      elem.attr( 'title', desc );
      elem.bind( 'click', callback );
      $( '#inner-lancher' ).append( elem );
      this.update();
      return elem.get( 0 );
    }
    
    /**
     *  Remove a lancher button.
     *  @param  string name
    */
  , removeButton: function( name ){
      $( '#inner-lancher' ).remove( '[data-tool-name=' + name + ']' );
      this.update();
    }
    
    /**
     *  Activate.
     *  @param  string name
    */
  , activate: function( name ){
      var elem = $( '#inner-lancher' ).children( '[data-tool-name=' + name + ']' );
      elem.css( 'background-color', '#fff' );
      if( active !== name )
        this.deactivate();
      active = name;
    }
    
    /**
     *  Deactivate.
    */
  , deactivate: function(){
      var elem = $( '#inner-lancher' ).children( '[data-tool-name=' + active + ']' );
      elem.css( 'background-color', 'transparent' );
    }

  , update: function(){
      var lancher = $( '#lancher' );
      try{
        lancher.tinyscrollbar_update();
      } catch( e ){
        lancher.tinyscrollbar();
      }
    }
    
  , clear: function(){
      $( '#inner-lancher' ).children( ':not([id=back-button])' ).remove();
      this.update();
    }
});

return new Lancher();
});
