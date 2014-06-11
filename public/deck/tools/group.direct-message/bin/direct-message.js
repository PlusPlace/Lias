/**
 *  Lias::Tools::DirectMessage
 *
 *  @identity   tlg5
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
var $R = 'tools/group.direct-message';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/main.tpl'
  , viewer: $T + '/viewer.tpl'
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
     *  @param string type <It will be assigned 'received' or 'sent'>
     *  @param  string message
     *  @param  string | number year
     *  @param  string | number month
     *  @param  string | number day
     *  @param  string | number hour
     *  @param  string | number minute
    */
    addMessage: function( type, message, year, month, day, hour, minute ){
      var target = type == 'received' ? 'dm-tmpl-received-message' : type == 'sent' ? 'dm-tmpl-sent-message' : null;
      var compiled = this.collection.get( 'viewer' ).data[ target ];
      var html = compiled({
          message: message
        , year: year
        , month: month
        , day: day
        , hour: hour
        , minute: minute
      });
      $( '#group-dm-inner-body' ).append( html );
      $( '#group-dm-body' ).tinyscrollbar_update( 'bottom' );
    }

    /**
     *  @param string name
     *  @param string target
     *  @param object data ("data" will includes JSON)
    */
  , applyData: function( name, target, data ){
      var compiled = this.collection.get( name ).data[ target ];
      var board = $( $Board.get() );

      var hash = $Util.currentHash.getRoot();
      var html = compiled({
          data: data
        , __dirname: hash + '/'
      });

      $Board.clear();
      board.append( html );
      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });


//
// Add tool routes
//
// For page initialization
Backbone.history.routeTool( 'tlg5', '/', function(){
  var applyData = function(){
    templatesView.applyData( 'main', 'dm-tmpl-main' );
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', urlList[ 'main' ], applyData );
  else
    applyData();

  $Board.setAutoHeight();
});

// For destination messages
Backbone.history.routeTool( 'tlg5', 'destination/:destination', function( destination ){
  var applyData = function(){
    var data = {
        destination: destination
    };
    templatesView.applyData( 'viewer', 'dm-tmpl-viewer', data );

    var update = function(){
      try{
        $( '#group-dm-body' ).tinyscrollbar_update( 'relative' );
      } catch( e ){
        $( window ).unbind( 'resize', update );
      }
    };

    $( '#group-dm-body' ).tinyscrollbar( 'bottom' );
    $( window ).bind( 'resize', update );

    /////////////////////
    //  Tmpl
    /////////////////////
    setTimeout( function(){
      update();
    }, 1000 );

    $Inner.getButton( 'group-dm-send-button' ).bind( 'click', function(){
      var textarea = $Inner.getInput( 'group-dm-textarea' );
      var value = textarea.val();

      if( value.length <= 0 ) return;

      var date = new Date();
      var year = date.getYear();
      year = year < 2000 ? year + 1900 : year;
      templatesView.addMessage(
          'sent'
        , $Util.escapeHTMLTag( value )
        , year
        , date.getMonth() + 1
        , date.getDate()
        , date.getHours()
        , date.getMinutes()
      );

      textarea.val( '' );
    });

    $Board.setFullHeight();
  };

  if( !templates.get( 'viewer' ) )
    addTemplate( 'viewer', urlList[ 'viewer' ], applyData );
  else
    applyData();
});

// Ready for destination page

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
    def( 'tlg5', 'group' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
