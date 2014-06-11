/**
 *  Lias::Initialize
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2011, 2012 Plus-place project
*/

define( 'init', function( require, exports, module ){

//
// Modules
//
var $Model   = require( 'model' )
  , $Tools   = require( 'tools' )
  , $Lancher = require( 'lancher' )
  , $Header  = require( 'header' )
  , $Board   = require( 'board' )
  , $Error   = require( 'error' )
  , $Util    = require( 'util' );

if( lias.debugMode === true )
  var $Debug = require( 'debug' );


//
// Prepare
//
var liasId;
    

//
// Get session
//
var getSession = function( id ){
  var url = lias.config.getSessionPath( id );

  if( !url ){
    if( lias.debugMode === true )
      url = $Debug.getSessionUrl( id );
    else if( id && id.match( /^p.*/ ) )
      url = '/-/session.php?liasId=' + id.substring( 1 );
    else if( id && id.match( /^g.*/ ) )
      url = '/-/session.php?groupId=' + id.substring( 1 );
    else if( !id || ( id && id.match( /^user$/ ) ) )
      url = '/-/session.php';
  }

  return $Util.fetchJson( url, false ); 
};


//
// Model. Main app
//
var Model = Backbone.Model.extend({
    start: function(){
      // Get login user ID
      var session = getSession();

      if( session[ 'Error' ] )
        location.replace( '/login/' );

      liasId = session.id;
      lias.id = session.id;
      lias.name = session.pageName;
      lias.icon = session.pageIcon;

      this.trigger( 'showAll' );
      Backbone.history.start();
    }
    
  , stop: function(){
      delete usingId;
      this.trigger( 'hideAll' );
      this.trigger( 'clear' );
      Backbone.history.stop();
    }
});

// Create model instance
var model = new Model();


//
// View
//
var View = Backbone.View.extend({
    el: 'body'

  , events: {
        'click #back-to-home': 'backToHome'
      , 'click #search': 'goSearch'
      , 'click #user-menu': 'toggleHeader'
    }

  , initialize: function(){
      this.model.bind( 'showAll', this.showAll );
      this.model.bind( 'hideAll', this.hideAll );
      this.model.bind( 'clear', this.clear );
      $( window ).bind( 'resize', this.update );
    }

  , update: function(){
      $Lancher.update( 'relative' );
      $Board.update( 'relative' );
    }

  , backToHome: function(){
      router.navigate( 'user', { trigger: true } );
    }

  , goSearch: function(){
      router.navigate( 'search', { trigger: true } );
    }

  , toggleHeader: function(){
      if( this.expanded === false )
        this.expandHeader();
      else if( this.expanded === true )
        this.reduceHeader();
    }

  , expandHeader: function(){
      $Header.expand( true );
      $( '#user-menu img' ).attr( 'src', 'style/images/user-menu-back.png' );
      this.expanded = true;
    }

  , reduceHeader: function(){
      $Header.reduce( true );
      $( '#user-menu img' ).attr( 'src', 'style/images/user-menu.png' );
      this.expanded = false;
    }

    /**
     *  @param  string name
     *  @param  string desc
     *  @param  string icon
    */
  , addButton: function( name, desc, icon ){
      $Lancher.addButton( name, desc, icon, function(){
        var d = location.hash.replace( /^#/, '' ).split( '/' );
        router.navigate( [ d[ 0 ], name ].join( '/' ), { trigger: true } );
      } );
    }

  , clear: function(){
      $Board.clear();
      $Lancher.clear();
    }

  , showAll: function(){
      $( '#loading' ).fadeOut( 'slow', function(){
        $Header.show( true );
        $Board.show( true );
        $Lancher.show( true );
      } );
    }

  , hideAll: function(){
      $Header.hide( true );
      $Board.hide( true );
      $Lancher.hide( true );
  }

  , changePageStatus: function( icon, name ){
      // Change page status
      $( '#page-icon' ).attr( 'src', icon );
      $( '#page-name' ).html( name );
    }

  , expanded: false
});

// Create view instance
var view = new View({ model: model });


//
// History
//
var handlers = {
    elements: {}

    /**
     * @param   function handler
     * @param   string toolId
     * @param   regexp regExp
    */
  , add: function( handler, toolId, regExp ){
      if( !this.elements[ toolId ] )
        this.elements[ toolId ] = [];
      this.elements[ toolId ].push( { handler: handler, regExp: regExp } );
    }

    /**
     * @param   string toolId
     * @param   string option
    */
  , trigger: function( toolId, option ){
      var elem = this.elements[ toolId ];
      if( !elem )
        return;

      if( option === undefined )
        option = '';

      var matched = false;

      for( var i = 0; elem[ i ]; i++ ){
        var matching = option.match( elem[ i ].regExp );
        if( matching ){
          elem[ i ].handler.apply( null, matching.slice( 1 ) );
          matched = true;
        }
      }

      if( matched === false ){
        throw {
            'type': 'lias_exception'
          , 'code': 'no_tool_option'
          , 'message': 'Lias::Initialize - Tool Option Not Found'
        };
      }
    }
};


/**
 *  @param  string toolId
 *  @param  string expression
 *  @param  function handler
*/
Backbone.History.prototype.routeTool = function( toolId, expression, handler ){
  var exp = expression != '' ? expression.split( '/' ) : [];
  var regExpStr = '';

  for( var i = 0; exp[ i ]; i++ ){
    if( exp[ i ].match( /^:.*/ ) )
      regExpStr += '([^/]+)';
    else if( exp[ i ].match( /^\*.*/ ) )
      regExpStr += '(.*?)';
    else
      regExpStr += exp[ i ];
    if( exp[ i + 1 ] )
      regExpStr += '/';
  }

  var regExp = new RegExp( '^' + regExpStr + '$' );

  handlers.add( handler, toolId, regExp );
};


//
// Preparation
//
var usingSession
  , usingId = null
  , usingToolName = null;


//
// Router
//
var Router = Backbone.Router.extend({
    routes: {
        '': 'getParam_0'
      , '/': 'getParam_0'
      , ':id': 'getParam_1'
      , ':id/': 'getParam_1'
      , ':id/:toolName': 'getParam_2'
      , ':id/:toolName/*option': 'getParam_3'
    }

    /**
     *  @param  object obj
     *  {
     *    view: object (Including View instance)
     *  }
    */
  , initialize: function( obj ){
      this.view = obj.view;
    }

  , getParam_0: function(){
      this.easyNavigate( 'user' );
    }

    /**
     *  @param  string id
    */
  , getParam_1: function( id ){
      // Avoid invalid hash parameter from facebook
      if( id == '_=_' ) this.easyNavigate( 'user' );

      this.prepare();

      try{
        this.initPage( id );
      } catch( e ){
        if( e.type == 'lias_exception' ){
          $Error.notice( e.code, e.message );
          return false;
        }
        else{
          throw e;
        }
      }

      this.easyNavigate( id, usingSession.primaryToolName );
    }

    /**
     *  @param  string id
     *  @param  string toolName
    */
  , getParam_2: function( id, toolName ){
      this.prepare();

      if( usingId != id ){
        try{
          this.initPage( id );
        } catch( e ){
          if( e.type == 'lias_exception' ){
            $Error.notice( e.code, e.message );
            return false;
          }
          else{
            throw e;
          }
        }
      }

      var that = this;
      this.execTool( toolName, function(){
        that.easyNavigate( id, toolName, '' );
      });
    }

    /**
     *  @param  string id
     *  @param  string toolName
     *  @param  string toolParamas
    */
  , getParam_3: function( id, toolName, toolOption ){
      this.prepare();

      var that = this;
      var callback = function(){
        var toolId = usingSession.usingTools[ toolName ];

        $Lancher.activate( toolName );

        try{
          handlers.trigger( toolId, toolOption );
        } catch( e ){
          if( e.type == 'lias_exception' ){
            $Error.notice( e.code, e.message );
            return false;
          }
          else{
            throw e;
          }
        }
      };

      if( id != usingId || toolName != usingToolName ){
        if( id != usingId ){
          try{
            this.initPage( id );
          } catch( e ){
            if( e.type == 'lias_exception' ){
              $Error.notice( e.code, e.message );
              return false;
            }
            else{
              throw e;
            }
          }
        }
        this.execTool( toolName, callback );
      }
      else{
        callback();
      }
    }

    /**
     *  @param  string id
    */
  , initPage: function( id ){
      // Use active ID
      usingId = id;

      // Clear lancher and board
      this.view.clear();

      // Get user session
      var allSession = getSession( id );
      if( !allSession ){
        throw {
            'type': 'lias_exception'
          , 'code': 'no_id'
          , 'message': 'User or Group Not Found'
        };
      }
      else{
        usingSession = allSession;
      }

      var usingTools = usingSession.usingTools;

      lias.usingId = usingSession.id;
      lias.usingIcon = usingSession.pageIcon;
      lias.usingName = usingSession.pageName;

      // Add lancher icons
      for( var key in usingTools ){
        var toolInfo = lias.config.getToolInfo( usingTools[ key ] );
        this.view.addButton( key, toolInfo.name, toolInfo.icon )
      }

      if( !usingSession.pageIcon || usingSession.pageIcon.length <= 0 ){
        if( id.match( /^p.*/ ) )
          usingSession.pageIcon = 'style/images/default-profile-image.png';
        else if( id.match( /^g.*/ ) )
          usingSession.pageIcon = 'style/images/group-default-profile-image.png';
      }

      this.view.changePageStatus( usingSession.pageIcon, usingSession.pageName );
    }

    /**
     *  @param  string name
    */
  , execTool: function( toolName, callback ){
      var toolId = usingSession.usingTools[ toolName ];
      var cb = function(){
        $Tools.startup( toolId );
        usingToolName = toolName;
        callback();
      };

      if( $Tools.isLoaded( toolId ) === false ){
        $Tools.loadTool( toolId, cb, function(){
          $Error.notice( 'no_tool', 'Tool Not Found' );
        });
      }
      else{
        cb();
      }
    }

  , easyNavigate: function(){
      var param = [];

      for( var i = 0; arguments[ i ] != undefined; i++ )
        param.push( arguments[ i ] );

      this.navigate( param.join( '/' ), { trigger: true, replace: true } );
    }

  , prepare: function(){
      this.view.reduceHeader();
    }
});

// Create router instance
var router = new Router({ view: view });

return model;

});
