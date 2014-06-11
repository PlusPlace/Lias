/**
 *  Lias::Tools::PersonalTagInfo
 *
 *  @identity   tlx2
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
  , $Debug  = require( 'debug' )
  , $Board  = require( 'board' )
  , $Util   = require( 'util' )
  , $Inner  = $Board.inner;


//
// Preparation
//
var $R = 'tools/global.tag-info';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/main.tpl'
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
      board.append( html );

      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });


//
// Add tool routes
//
// For page initialization
Backbone.history.routeTool( 'tlx2', '/',  function(){
  $Board.clear();

  var applyData = function(){
    templatesView.applyData( 'main', 'tag-info-tmpl-main' );
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', 'main', applyData );
  else
    applyData();
});

Backbone.history.routeTool( 'tlx2', 'id/:id', function( id ){
  $Board.clear();

  var applyData = function(){
    templatesView.applyData( 'main', 'tag-info-tmpl-main' );
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

    , closeCallback: function(){
        $Board.clear();
      }
  });
};


//
// Set tools
//
module.exports = [
    def( 'tlx2', 'global' )
];


//
// Load stylesheet
//

$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
