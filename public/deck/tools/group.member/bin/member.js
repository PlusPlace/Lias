/**
 *  Lias::Tools::Member
 *
 *  @identity   tlg9
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
var $R = 'tools/group.member';
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


//
// Set members
//
var Member = Backbone.Model.extend({
    initialize: function(){
    }
});

var Members = Backbone.Collection.extend({
    model: Member
});

var members = new Members();

var MemberView = Backbone.View.extend({
    addLoginUser: function( data ){
      var compiled = templates.get( 'main' ).data[ 'member-tmpl-login-user' ];
      var loginUser = $( compiled({ data: data }) );
      var expanded = false;

      loginUser.find( '[data-button=member-edit-button]' ).bind( 'click', function(){
        if( expanded === true ) return;
        loginUser.find( '[data-part=member-editable-field]' ).animate( { 'height': '150px' }, 300 );
        loginUser.find( '[data-button=member-edit-button]' ).css( 'display', 'none' );
        loginUser.find( '[data-button=member-complete-edit-button]' ).css( 'display', 'block' );
        expanded = true;
      });

      loginUser.find( '[data-button=member-complete-edit-button]' ).bind( 'click', function(){
        if( expanded === false ) return;
        loginUser.find( '[data-part=member-editable-field]' ).animate( { 'height': '50px' }, 300 );
        loginUser.find( '[data-button=member-edit-button]' ).css( 'display', 'block' );
        loginUser.find( '[data-button=member-complete-edit-button]' ).css( 'display', 'none' );
        expanded = false;

        // Reflect position
        var position = loginUser.find( '[data-input=member-position-text]' ).val();
        loginUser.find( '[data-input=member-position]' ).html( $Util.escapeHTMLTag( position ) );
      });

      loginUser.insertBefore( $( '#member-lists' ).children( ':first' ) );
    }

  , addBelongUser: function( data ){
      var compiled = templates.get( 'main' ).data[ 'member-tmpl-belong-user' ];
      var belongUser = $( compiled({ data: data }) );
      var expanded = false;

      belongUser.find( '[data-button=member-remove-button]' ).bind( 'click', function(){
        if( expanded ===  true ) return;
        belongUser.find( '[data-part=member-editable-field]' ).animate( { 'height': '150px' }, 300 );
        belongUser.find( '[data-button=member-remove-button]' ).css( 'display', 'none' );
        belongUser.find( '[data-button=member-cancel-remove-button]' ).css( 'display', 'block' );
        expanded = true;
      });

      belongUser.find( '[data-button=member-cancel-remove-button]' ).bind( 'click', function(){
        if( expanded === false ) return;
        belongUser.find( '[data-part=member-editable-field]' ).animate( { 'height': '50px' }, 300 );
        belongUser.find( '[data-button=member-remove-button]' ).css( 'display', 'block' );
        belongUser.find( '[data-button=member-cancel-remove-button]' ).css( 'display', 'none' );
        expanded = false;
      });

      belongUser.find( '[data-button=member-remove-confirm-button]' ).bind( 'click', function(){
        if( expanded === false ) return;
        $( '#member-lists' ).find( '[data-append=' + data.userId + ']' ).remove();
      });

      $( '#member-lists' ).append( belongUser );
    }
});

var memberView = new MemberView({ collection: members });

var prepare = function( data ){
  var id = lias.debugMode === true ? lias.id : lias.id.substring( 1 );

  for( var i = 0; data.members[ i ]; i++ ){
    data.members[ i ].permission = data.permission;
    if( data.members[ i ].userId == id )
      memberView.addLoginUser( data.members[ i ] );
    else
      memberView.addBelongUser( data.members[ i ] );
  }
};


//
// JSON receiver
//
var getData = function( callback ){
  var url, id = $Util.currentHash.getUseId();

  if( lias.debugMode === true )
    url = $Debug.getMemberDataUrl( id );
  else if( id && id.match( /^g.*/ ) )
    url = 'http://dev-lias.plus-place.org/-/group-member.php?groupId=' + id.substring( 1 );

  $Util.fetchJson( url, callback );
};


//
// Add tool routes
//
Backbone.history.routeTool( 'tlg9', '/', function(){
  var applyData = function(){
    getData( function( data ){
      templatesView.applyData( 'main', 'member-tmpl-main' );
      prepare( data );
    });
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
    def( 'tlg9', 'group' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
