/**
 *  Lias::Tools::GroupCalendar
 *
 *  @identity   tlg4
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
var $R = 'tools/group.calendar';
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
// Calendar getter
//
var getCalendar = function( year, month ){
  var calendarArray = [];
  var monthArray = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  var monthDay = monthArray[ month - 1 ];
  var currentDay = ( new Date( year, ( month - 1 ), 1, 0, 0, 0 ) ).getDay();

  if( month == 2 )
    monthDay += year % 4 ? 0 : year % 100 ? 1 : year % 400 ? 0 : 1;

  for( var i = 0, j = 0; i < monthDay; i++ ){
    var day = i + currentDay;
    if( day % 7 === 0 && i !== 0 )
      j++;
    if( !calendarArray[ j ] )
      calendarArray[ j ] = [];
    calendarArray[ j ][ day - j * 7 ] = i + 1;
  }

  return calendarArray;
};


//
// Get data
//
var getData = function( id, callback ){
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
    el: 'body'

  , events: {
        'click [data-button=group-calendar-previous]': 'goPrevious'
      , 'click [data-button=group-calendar-next]': 'goNext'
    }

  , goPrevious: function(){
      var hash = $Util.currentHash.getRoot();
      var cy = currentYear
        , cm = currentMonth;

      if( cm - 1 <= 0 ){
        cy--;
        cm = 12;
      }
      else{
        cm--;
      }

      Backbone.history.navigate( [ hash, 'date', cy, cm ].join( '/' ), { trigger: true } );
    }

  , goNext: function(){
      var hash = $Util.currentHash.getRoot();
      var cy = currentYear
        , cm = currentMonth;

      if( cm + 1 >= 13 ){
        cy++;
        cm = 1;
      }
      else{
        cm++;
      }

      Backbone.history.navigate( [ hash, 'date', cy, cm ].join( '/' ), { trigger: true } );
    }

    /**
     *  @param string name
     *  @param string target
     *  @param object data ("data" will includes JSON)
    */
  , applyData: function( name, target, data ){
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

  , setCalendar: function( year, month, data ){
      var compiled = this.collection.get( 'main' ).data[ 'calendar-tmpl-table' ];
      var html = compiled({
          array: getCalendar( year, month )
        , date: [ year + '', month + '' ]
        , data: data
      });

      $( '#group-calendar-input' ).html( html );
      $Board.update();
    }
});

var templatesView = new TemplatesView({ collection: templates });


//
// History
//
var route = function(){ Backbone.history.routeTool.apply( null, arguments ) };
var currentYear, currentMonth;

var selectYear = function(){
  var hash = $Util.currentHash.getRoot();
  var date = new Date();
  var year = date.getYear();
  year += year < 2000 ? 1900 : 0;
  Backbone.history.navigate( [ hash, 'date', year ].join( '/' ), { trigger: true, replace: true } );
};

route( 'tlg4', '', selectYear );
route( 'tlg4', 'date', selectYear );

var selectMonth = function( year ){
  var hash = $Util.currentHash.getRoot();
  var date = new Date();
  var month = date.getMonth() + 1;
  Backbone.history.navigate( [ hash, 'date', year, month ].join( '/' ), { trigger: true, replace: true } );
};

route( 'tlg4', 'date/:year', selectMonth );

var applyDate = function( year, month ){
  currentYear = Number( year );
  currentMonth = Number( month );

  var applyData = function(){
    templatesView.applyData( 'main', 'calendar-tmpl-main' );
    templatesView.setCalendar( currentYear, currentMonth );
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', 'main', applyData );
  else
    applyData();
};

route( 'tlg4', 'date/:year/:month', applyDate );


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
    def( 'tlg4', 'group' )
];



//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css',
    cache: false
});

});

