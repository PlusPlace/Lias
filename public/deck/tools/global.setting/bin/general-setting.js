/**
 *  Lias::Tools::GlobalGeneralSetting
 *
 *  @identity   tlx4
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
  , $Board  = require( 'board' )
  , $Util   = require( 'util' )
  , $Inner  = $Board.inner;

if( lias.debugMode === true )
  var $Debug = require( 'debug' );


//
// Preparation
//
var $R = 'tools/global.setting';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/general.tpl'
};


//
// Add templates
//
var addTemplate = function( id, listName, callback ){
  templates.add({ id: id, url: urlList[ listName ], callback: callback });
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

      $Board.clear();
      $Board.setAutoHeight();

      board.append( html );
      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });


//
// Add tool routes
//
Backbone.history.routeTool( 'tlx4', '/', function(){
  var applyData = function(){
    templatesView.applyData( 'main', 'setting-tmpl-main' );
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', 'main', applyData );
  else
    applyData();
});


//
// Tool model
//
var def = function( id, mode ){
  return new $Model.Tool({
      id: id
    , mode: mode
  });
};


//
// Set tools
//
module.exports = [
    def( 'tlx4', 'global' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/general.css'
  , cache: false
});

});
