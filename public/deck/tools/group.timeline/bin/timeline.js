/**
 *  Lias::Tools::GroupTimeline
 *
 *  @identity   tlg1
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
  var $Debug  = require( 'debug' );


//
// Preparation
//
var $R = 'tools/group.timeline';
var $T = $R + '/templates';
var urlList = {
    main: $T + '/main.tpl'
};

var updater = {};

var groupUpdater = {};


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
// Timeline comment model
//
var Comment = Backbone.Model.extend({
    initialize: function( data ){
    }
});


//
// Timeline comment collection
//
var Comments = Backbone.Model.extend({
    model: Comment
});

var comments = new Comments();


//
// Timeline comment view
//
var CommentView = Backbone.View.extend({
    initialize: function( param ){
      var el = param.parentElement;
      this.parentElement = el instanceof jQuery ? el : $( el );
    }

  , add: function( data ){
      var commentTemplate = templates.get( 'main' ).data[ 'timeline-tmpl-comment' ];
      var html = commentTemplate( data );
      this.parentElement.append( html );
    }
});


//
// Timeline model
//
var Timeline = Backbone.Model.extend({
    initialize: function( param ){
      var commentView = this.commentView = new CommentView({
          collection: comments
        , parentElement: param.parentElement
      });

      var comments = param.comments;
      for( var i = 0; comments[ i ]; i++ )
        commentView.add( comments[ i ] );
    }
});


//
// Timeline collection
//
var Timelines = Backbone.Collection.extend({
    model: Timeline
});

var timelines = new Timelines();


//
// Timeline view
//
var TimelineView = Backbone.View.extend({
    el: $( 'body' )

  , events: {
        'click [data-button=group-tl-update-button]': 'update'
    }

  , add: function( data, past ){
      var that = this;
      var mainTemplate = templates.get( 'main' );
      var compiled = mainTemplate.data[ 'timeline-tmpl-follow' ];
      var article = $( compiled( data ) );

      var child = this.collection.add({
          comments: data.comments
        , parentElement: article.find( '[data-input=article-comments]' )
      });

      var model = child.models[ child.models.length - 1 ];

      // For like button binder
      article.find( '[data-button=like-button]' ).bind( 'click', function(){
        if( data.liked === true ) return;

        var elem = $( this ).children( '[data-input=like-number]' );
        elem.html( Number( elem.html() ) + 1 );

        data.liked = true;
      });

      // Comment settings
      // For comment button binder
      article.find( '[data-button=comment-button]' ).bind( 'click', function(){
        var commentArea = article.find( '[data-input=comment-area]' );
        var comment = commentArea.val();

        if( comment.length <= 0 ) return;

        model.commentView.add({
            commentatorId: updater.id
          , commentatorName: updater.name
          , commentatorIcon: updater.icon
          , comment: $Util.escapeHTMLTag( comment )
        });

        commentArea.val( '' );
      });

      if( past === true ){
        $( '#group-tl-follow' ).append( article );
        $Board.update( 'relative' );
      }
      else{
        article.css( 'display', 'none' );
        article.insertBefore( $( '#group-tl-follow' ).children( ':first' ) );
        article.animate({
            'height': 'toggle'
          , 'opacity': 'toggle'
        }, 700, function(){
          $Board.update( 'relative' );
        });
      }

    }

  , update: function(){
      var textarea = $Inner.getInput( 'group-tl-textarea' );
      var text = textarea.val();
      if( text.length <= 0 ) return;

      var time = $Util.getTime();
      timelineView.add({
          "createdAt": [ time[ 0 ], time[ 1 ], time[ 2 ], time[ 3 ], time[ 4 ] ]
        , "article": $Util.escapeHTMLTag( text )
        , "articleId": "a6"
        , "creator": {
              "name": groupUpdater.name
            , "groupId": groupUpdater.id
            , "icon": groupUpdater.icon
          }
        , "likes": "0"
        , "liked": false
        , "comments": []
      });

      textarea.val( '' );
    }

  , showNotice: function(){
      $( '#group-tl-notice' ).show();
      $Board.update( 'relative' );
    }
});

var timelineView = new TimelineView({ collection: timelines });


//
// Timeline
//
var timeline = {
    clearAtBottom: function(){
      $Board.atBottom( null );
    }

  , setFollow: function( json ){
      for( var i = json.length - 1; i >= 0; i-- ){
        this.maxId = json[ i ].articleId;
        timelineView.add( json[ i ] );
      }
    }

  , setPast: function( json ){
      for( var i = 0; json[ i ]; i++ ){
        timelineView.add( json[ i ], true );
      }
    }

  , getData: function( page, callback ){
      var url, id = $Util.currentHash.getUseId();

      if( lias.debugMode === true )
        url = $Debug.getTimelineUrl( id );
      else if( id && id.match( /^g.*/ ) )
        url = '/-/timeline.php?groupId=' + id.substring( 1 ) + '&p=' + page;

      $Util.fetchJson( url, callback );
    }

  , getUpdate: function( callback ){
      var url, id = $Util.currentHash.getUseId();

      if( lias.debugMode === true )
        url = $Debug.getLatestTimelineUrl( id );
      else if( id && id.match( /^g.*/ ) )
        url = '/-/timelineUpdate.php?groupId=' + id.substring( 1 ) + '&maxId=' + this.maxId;

      $Util.fetchJson( url, callback );
    }

  , prepare: function( permission ){
      // set updater
      updater.name = lias.name;
      updater.id = lias.id;
      updater.icon = lias.icon;

      // Set group updater 
      if( permission === true ){
        groupUpdater.name = lias.usingName;
        groupUpdater.id = lias.usingId;
        groupUpdater.icon = lias.usingIcon;
      }

      var page = 2
        , last = false
        , loading = false;

      $Board.atBottom( function(){
        if( loading === true ){
          return;
        }
        else if( last === true ){
          timeline.clearAtBottom();
          return;
        }

        timeline.getData( page, function( d ){
          timeline.setPast( d.articles );

          if( d.articles.length < 10 ){
            timelineView.showNotice();
            last = true;
          }

          loading = false;
        });

        page++;
        loading = true;
      });
    }

  , startChecker: function(){
      if( this.checkerStatus === true ) return;

      var that = this;
      this.checker = setInterval( function(){
        that.getUpdate( function( d, error ){
          if( d.hasOwnProperty( 'Success' ) ) return;
          timeline.setFollow( d.articles );
        });
      }, 10000 );

      this.checkerStatus = true;
    }

  , stopChecker: function(){
      if( this.checkerStatus === false ) return;

      clearInterval( this.checker );
      this.checkerStatus = false;
    }

  , checkerStatus: false
  , checker: ''
  , maxId: ''
};


//
// Add tool routes
//
// For page initialization
var initialize = function(){
  var applyData = function(){
    timeline.getData( 1, function( d ){
      templatesView.applyData( 'main', 'timeline-tmpl-main', { permission: d.permission });
      timeline.setFollow( d.articles );
      timeline.prepare( d.permission );
      timeline.startChecker();

      if( d.articles.length < 10 ){
        timelineView.showNotice();
        timeline.clearAtBottom();
      }
    } );
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', 'main', applyData );
  else
    applyData();
};

Backbone.history.routeTool( 'tlg1', '/', initialize );


//
// Tool model
//
var def = function( id, mode ){
  return new $Model.Tool({
      id: id
    , mode: mode
    , closeCallback: function(){
        $Board.atBottom( null );
        timeline.stopChecker();
      }
  });
};


//
// Set tools
//
module.exports = [
    def( 'tlg1', 'group' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
