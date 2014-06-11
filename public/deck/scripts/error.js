/**
 *  Lias::Error
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2011, 2012 Plus-place project
*/

define( 'error', function( require, exports, module ){

//
// Modules
//
var $Model  = require( 'model' )
  , $Loader = require( 'loader' )
  , $Board  = require( 'board' )
  , $Lancher = require( 'lancher' );


//
// Preparation
//
var templateUrl = 'templates/error.tpl';
var styleUrl = 'style/error.css';


//
// Error model
//
var templatesView;
var ErrorModel = Backbone.Model.extend({
    notice: function( errorCode, errorMessage ){
      if( !templatesView )
        templatesView = prepareTemplate();
      templatesView.applyData( errorCode, errorMessage );
    }
});


//
// Template view
//
var prepareTemplate = function(){

  $Loader.requireStylesheet({
      url: styleUrl
  });

  var errorTemplate = new $Model.Template({
      url: templateUrl
    , async: false
  });

  var TemplatesView = Backbone.View.extend({
      /**
       *  @param string name
       *  @param string target
       *  @param object data ("data" will includes JSON)
      */
      applyData: function( errorCode, errorMessage ){
        var compiled = this.model.data[ 'error-tmpl-main' ];
        var board = $( $Board.get() );

        var html = compiled({
            code: errorCode
          , message: errorMessage
        });

        $Lancher.deactivate();
        $Board.clear();
        board.append( html );
        $Board.update();
      }
  });

  return new TemplatesView({ model: errorTemplate });
};

module.exports = new ErrorModel();

});
