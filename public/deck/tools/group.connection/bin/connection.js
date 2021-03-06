/**
 *  Lias::Tools::Connection
 *
 *  @identity   tlg7
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
var $R = 'tools/group.connection';
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

      $Board.clear();
      $Board.setAutoHeight();

      board.append( html );
      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });

var Group = Backbone.Model.extend({
    initialize: function(){
    }
});

var Groups = Backbone.Collection.extend({
    model: Group
});

var groups = new Groups();

var GroupView = Backbone.View.extend({
    add: function( data ){
      var compiled = templates.get( 'main' ).data[ 'connection-tmpl-connecting-group' ];
      var connectingGroup = $( compiled( data ) );
      var expanded = false;

      connectingGroup.find( '[data-button=group-connection-remove-button]' ).bind( 'click', function(){
        if( expanded === true ) return;
        connectingGroup.find( '[data-part=group-connection-editable-field]' ).animate( { 'height': '150px' }, 300 );
        connectingGroup.find( '[data-button=group-connection-remove-button]' ).css( 'display', 'none' );
        connectingGroup.find( '[data-button=group-connection-cancel-remove-button]' ).css( 'display', 'block' );
        expanded = true;
      });

      connectingGroup.find( '[data-button=group-connection-cancel-remove-button]' ).bind( 'click', function(){
        if( expanded === false ) return;
        connectingGroup.find( '[data-part=group-connection-editable-field]' ).animate( { 'height': '50px' }, 300 );
        connectingGroup.find( '[data-button=group-connection-remove-button]' ).css( 'display', 'block' );
        connectingGroup.find( '[data-button=group-connection-cancel-remove-button]' ).css( 'display', 'none' );
        expanded = false;
      });

      connectingGroup.find( '[data-button=group-connection-remove-confirm-button]' ).bind( 'click', function(){
        if( expanded === false ) return;
        $( '#group-connection-lists' ).find( '[data-append=' + data.groupId + ']' ).remove();
      });

      $( '#group-connection-lists' ).append( connectingGroup );
    }
});

var groupView = new GroupView({ collection: groups });

var prepare = function( data ){
  for( var i = 0; data.groups[ i ]; i++ ){
    data.groups[ i ].permission = data.permission;
    groupView.add( data.groups[ i ] );
  }
};


//
// JSON receiver
//
var getData = function( callback ){
  var url, id = $Util.currentHash.getUseId();

  if( lias.debugMode === true )
    url = $Debug.getConnectionDataUrl( id );
  else if( id && id.match( /^g.*/ ) )
    url = '';

  $Util.fetchJson( url, callback );
};


//
// Add tool routes
//
Backbone.history.routeTool( 'tlg7', '/', function(){
  var applyData = function(){
    getData( function( data ){
      templatesView.applyData( 'main', 'connection-tmpl-main' );
      prepare( data );
    })
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
    def( 'tlg7', 'group' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
