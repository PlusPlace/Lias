/**
 *  Lias::Tools::PersonalHome
 *
 *  @identity   tlp0
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
var $R = 'tools/personal.home';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/main.tpl'
  , news: $T + '/news.tpl'
  , latest: $T + '/latest.tpl'
};


//
// Add templates
//
var addTemplate = function( id, url, callback ){
  templates.add({ id: id, url: url, callback: callback });
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
     *  @param  string name
     *  @param  string target
     *  @param  object data ("data" will includes JSON)
    */
    applyData: function( name, target, data ){
      var compiled = this.collection.get( name ).data[ target ];
      var board = $( $Board.get() );

      var html = compiled({
          data: data
        , __dirname: $Util.currentHash.getRoot() + '/'
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
// For page initialization
Backbone.history.routeTool( 'tlp0', '/', function(){
  var applyData = function(){
    templatesView.applyData( 'main', 'home-tmpl-main' );
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', urlList[ 'main' ], applyData );
  else
    applyData();
});

// For latest page
Backbone.history.routeTool( 'tlp0', 'latest', function(){
  var applyData = function(){
    templatesView.applyData( 'latest', 'home-tmpl-latest' );
  };

  if( !templates.get( 'latest' ) )
    addTemplate( 'latest', urlList[ 'latest' ], applyData );
  else
    applyData();
});

// For news page
Backbone.history.routeTool( 'tlp0', 'news', function(){
  var applyData = function(){
    templatesView.applyData( 'news', 'home-tmpl-news' );
  };

  if( !templates.get( 'news' ) )
    addTemplate( 'news', urlList[ 'news' ], applyData );
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
module.exports = [
    def( 'tlp0', 'personal' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});
});
