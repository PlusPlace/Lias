/**
 *  Lias::Tools::EventInfo
 *
 *  @identity   tlx1
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
var $R = 'tools/global.event-info';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/main.tpl'
};


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
    applyData: function( name, target, data ){
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
//
//
var route = function(){ Backbone.history.routeTool.apply( null, arguments ) };

var initialize = function(){
  $Board.clear();
  templatesView.applyData( 'main', 'event-info-tmpl-main' );
};

route( 'tlx1', '', initialize );


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


var tool = new $Model.Tool({
    id:   'tlx1'

  , startupCallback: function(){
      activate( this );
    }

  , closeCallback: function(){
      $Board.clear();
      deactivate();
    }
});

//
// Set tools
//
module.exports = [
    tool
];

//
// Load main template and sylesheet
//
templates.add({
    id: 'main'
  , url: urlList[ 'main' ]
  , async: false
});

$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
