/**
 *  Lias::Tools::Message
 *
 *  @identity   tlx0
 *  @version    0.0.1
 *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 *  @copyright  2012, Plus-place project
*/

define( function( require, exports, module ){

//
// Modules
//
var $Model  = require( 'model' )
  , $Loader = require( 'loader' )
  , $Board  = require( 'board' );


//
// Prepararation
//
var $R = 'tools/message';
var $T = $R + '/templates';
var urlList = {
    error: $T + '/error.tpl'
};


//
// Message model
//
var Message = Backbone.Model.extend({
    initialize: function( param ){
      this.id = param.id;
      this.message = param.message;
    }
});


//
// Message collection
//
var Messages = Backbone.Collection.extend({
    model: Message
});

var messages = new Messages();


//
// Template collection
//
var Templates = Backbone.Collection.extend({
    model: $Model.Template
});

var templates = new Templates();


//
// Template view
//
var TemplatesView = Backbone.View.extend({
    /**
     *  @param string name
     *  @param string target
     *  @param object data ("data" will includes JSON)
    */
    applyData: function( name, target, messageId ){
      var data = messages.get( messageId );
      var compiled = this.collection.get( name ).data[ target ];
      var board = $( $Board.get() );

      var html = compiled({
          data: data
      });
      board.append( html );

      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });


//
// Add tool routes
//
var route = function(){ Backbone.history.routeTool.apply( null, arguments ) };

var showError = function( code ){
  if( !messages.get( code ) ){
    messages.add({
        id: code
      , message: lias.error[ code ]
    });
  }

  $Board.clear();
  templatesView.applyData( 'error', 'error-tmpl-main', code );
};

route( 'tlx0', ':code', showError );

//
// Manage active tool
//
var active = {
    id: null
  , mode: null
  , model: null
};

/**
 *  @param object model ("model" must include Tool model)
*/
var activate = function( model ){
  active.id = model.get( 'id' );
  active.mode = model.get( 'mode' );
  active.model = model;
};

var deactivate = function(){
  active.id = null;
  active.mode = null;
  active.model = null;
};


//
// Error tool
//
var errorTool = new $Model.Tool({
    startupCallback: function(){
      if( !templates.get( 'error' ) ){
        templates.add({
            id: 'error'
          , url: urlList[ 'error' ]
          , async: false
        });
      }

      activate( this );
    }

  , closeCallback: function(){
      $Board.clear();
      deactivate();
    }

  , id:   'tlx0'
  , mode: 'error'
});


//
// Set tools
//
module.exports = [
    errorTool
];


//
// Load sylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , async: false
  , cache: false
});

});
