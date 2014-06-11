/**
 *  Lias::Tools::PersonalGroup
 * 
 *  @identity   tlp2
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
// Prepraration
//
var $R = 'tools/personal.group';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/main.tpl'
};

var liasId = liasId;


//
// Get group data
//
var getData = function( callback ){
  var url, id = $Util.currentHash.getUseId();

  if( lias.debugMode === true )
    url = $Debug.getGroupUpdateUrl( id );
  else if( id.match( /^p.*/ ) )
    url = '?liasId=' + id.substring( 1 );
  else if( id.match( /^user$/ ) )
    url = '?liasId=' + liasId.substring( 1 );

  $Util.fetchJson( url, callback );
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

      // Prepare board setting
      $Board.clear();
      $Board.setAutoHeight();

      // Append html
      board.append( html );
      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });


//
// Add tool routes
//
var initialize = function(){
  var applyData = function(){
    getData( function( data ){
      templatesView.applyData( 'main', 'group-tmpl-main', data );
    });
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', 'main', applyData );
  else
    applyData();

};

Backbone.history.routeTool( 'tlp2', '', initialize );


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
    def( 'tlp2',  'personal' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css',
    async: false
});

});
