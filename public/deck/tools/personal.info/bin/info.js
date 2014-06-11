/**
 *  Lias::Tools::PersonalInfo
 * 
 *  @identity   tlp7
 *  @version    0.0.2
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
  , $Error  = require( 'error' )
  , $Inner  = $Board.inner;

if( lias.debugMode === true )
  var $Debug = require( 'debug' );

//
// Preparation
//
var $R = 'tools/personal.info';
var $T = $R + '/templates';
var urlList = {
    main:        $T + '/main.tpl'
  , bio:         $T + '/bio.tpl'
  , groups:      $T + '/groups.tpl'
  , tags:        $T + '/tags.tpl'
  , basicInfo:   $T + '/basic-info.tpl'
  , contactInfo: $T + '/contact-info.tpl'
};

var liasId = lias.id;


//
// Get user profile data
//
var getData = function( callback ){
  var url, id = $Util.currentHash.getUseId();

  if( lias.debugMode === true )
    url = $Debug.getProfileDataUrl( id );
  else if( id.match( /^p.*/ ) )
    url = '/-/profile-data.php?liasId=' + id.substring( 1 );
  else if( id.match( /^user$/ ) )
    url = '/-/profile-data.php?liasId=' + liasId.substring( 1 );

  $Util.fetchJson( url, callback );
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
     *  @return object
     *  {
     *      bio: string
     *    , bioPrivacy: string
     *  }
    */
    getBioSetting: function(){
      var ns = this.dialogNS;
      var getIn = function( name ){ return $Inner.getInput( ns + name ).val(); };
      return {
          'bio': getIn( 'bioText' )
        , 'bioPrivacy': getIn( 'bioPrivacy' )
      };
    }

    /**
     *  @return object
     *  {
     *      groups: array
     *    , groupsPrivacy: string
     *  }
    */
  , getGroupsSetting: function(){
      var settings = { groups: [] };
      var e = $Inner.getInput( this.dialogNS + 'groups' ).find( 'div[data-append]' );

      for( var i = 0; e.get( i ); i++ )
        settings.groups[ i ] = e.eq( i ).attr( 'data-append' );

      settings.groupsPrivacy = $Inner.getInput( this.dialogNS + 'groupsPrivacy' ).val();

      return settings;
    }

    /**
     *  @return object
     *  {
     *      tags: array
     *    , tagsPrivacy: string
     *  }
    */
  , getTagsSetting: function(){
      var settings = { tags: [] };
      var e = $Inner.getInput( this.dialogNS + 'tags' ).find( 'div[data-append]' );

      for( var i = 0; e.get( i ); i++ )
        settings.tags[ i ] = e.eq( i ).attr( 'data-append' );

      settings.tagsPrivacy = $Inner.getInput( this.dialogNS + 'tagsPrivacy' ).val();

      return settings;
    }

    /**
     *  @return object
    */
  , getBasicInfoSetting: function(){
      var genderElem = $Inner.getInput( this.dialogNS + 'gender' );
      var gender     = genderElem.val();
      var settings = {
          genderVal:           gender
        , gender:              genderElem.find( '[value=' + gender + ']' ).html()
        , genderPrivacy:       $Inner.getInput( this.dialogNS + 'genderPrivacy' ).val()
        , birthdayYear:        $Inner.getInput( this.dialogNS + 'birthdayYear' ).val()
        , birthdayMonth:       $Inner.getInput( this.dialogNS + 'birthdayMonth' ).val()
        , birthdayDay:         $Inner.getInput( this.dialogNS + 'birthdayDay' ).val()
        , birthdayPrivacy:     $Inner.getInput( this.dialogNS + 'birthdayPrivacy' ).val()
        , belongGroupsPrivacy: $Inner.getInput( this.dialogNS + 'belongGroupsPrivacy' ).val()
      };

      return settings;
    }

  , getContactInfoSetting: function(){
      var settings = { websites: [], mails: [] };
      var e = $Inner.getInput( this.dialogNS + 'websites' ).find( 'div[data-append]' );

      for( var i = 0; e.get( i ); i++ )
        settings.websites[ i ] = e.eq( i ).attr( 'data-append' );

      e = $Inner.getInput( this.dialogNS + 'mails' ).find( 'div[data-append]' );

      for( i = 0; e.get( i ); i++ )
        settings.mails[ i ] = e.eq( i ).attr( 'data-append' );

      settings.websitesPrivacy = $Inner.getInput( this.dialogNS + 'websitesPrivacy' ).val();
      settings.mailsPrivacy = $Inner.getInput( this.dialogNS + 'mailsPrivacy' ).val();

      return settings;
    }

  , setTagsSetting: function( data ){
      var compiled = this.collection.get( 'tags' ).data[ 'info-tmpl-tag' ];
      var target = $Inner.getInput( this.dialogNS + 'tags' );

      for( var i = 0; data.tags[ i ]; i++ ){
        var tagData = data.tags[ i ];
        var html = compiled( { tag: tagData } );
        target.append( html );
      }

      var tagText = $Inner.getInput( this.dialogNS + 'tagText' );
      var tagNotice = $Inner.getPart( this.dialogNS + 'tagNotice' );
      var count = 0;

      $Inner.getButton( this.dialogNS + 'add' ).bind( 'click', function(){
        var name = tagText.val();
        if( name.length <= 0 ){
          tagNotice.show();
        }
        else{
          var html = compiled( { tag: { tagId: 'new_' + count, name: $Util.escapeHTMLTag( name ) } } );
          target.append( html );
          tagText.val( '' );
          tagNotice.hide();
          count++;
        }

        $Board.update();
      } );

      $Board.update();
    }

  , setContactInfoSetting: function( data ){
      var compiled = this.collection.get( 'contactInfo' ).data[ 'info-tmpl-datum' ];
      var ci = data.contactInfo;

      //
      //  Mails
      //
      var mails = $Inner.getInput( this.dialogNS + 'mails' );

      // Append mail address
      for( var i = 0; ci.mails[ i ]; i++ ){
        var mailData = ci.mails[ i ];
        var html = compiled( { datum: mailData } );
        mails.append( html );
      }

      // Set button working
      var m_count = 0;
      var m_text = $Inner.getInput( this.dialogNS + 'mailText' );
      var m_notice = $Inner.getPart( this.dialogNS + 'mailsNotice' );

      $Inner.getButton( this.dialogNS + 'addMail' ).bind( 'click', function(){
        var val = m_text.val();
        if( val.length <= 0 ){  // Fail
          m_notice.show();
        }
        else{ // Success
          var html = compiled( { datum: $Util.escapeHTMLTag( val ) } );
          mails.append( html );
          m_text.val( '' );
          m_notice.hide();
          m_count++;
        }
        $Board.update();
      });

      //
      //  Websites
      //
      var websites = $Inner.getInput( this.dialogNS + 'websites' );

      // Append website URL
      for( i = 0; ci.websites[ i ]; i++ ){
        var websiteData = ci.websites[ i ];
        html = compiled( { datum: websiteData } );
        websites.append( html );
      }

      // Set button working
      var w_count = 0;
      var w_text = $Inner.getInput( this.dialogNS + 'websiteText' );
      var w_notice = $Inner.getPart( this.dialogNS + 'websitesNotice' );

      $Inner.getButton( this.dialogNS + 'addWebsite' ).bind( 'click', function(){
        var val = w_text.val();
        if( val.length <= 0 ){  // Fail
          w_notice.show();
        }
        else{ // Success
          var html = compiled( { datum: $Util.escapeHTMLTag( val ) } );
          websites.append( html );
          w_text.val( '' );
          w_notice.hide();
          w_count++;
        }
        $Board.update();
      });
      $Board.update();
    }

    /**
     *  @param  string section
     *  @return object
    */
  , getSettings: function( section ){
      switch( section ){
        case 'bio':
          return this.getBioSetting();
        case 'groups':
          return this.getGroupsSetting();
        case 'tags':
          return this.getTagsSetting();
        case 'basicInfo':
          return this.getBasicInfoSetting();
        case 'contactInfo':
          return this.getContactInfoSetting();
      }
    }

  , setSettings: function( section, data ){
      switch( section ){
        case 'tags':
          this.setTagsSetting( data );
          break;
        case 'contactInfo':
          this.setContactInfoSetting( data );
          break;
      }
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
        , __dir__: hash + '/'
      });

      $Board.clear();
      $Board.setAutoHeight();

      board.append( html );
      $Board.update();
    }

    /**
     *  @param  string section
    */
  , setDialog: function( section ){
      var _self = this;
      var restartHash = $Util.currentHash.getRoot();
      var restoreHash = restartHash + '/';

      $Inner.getButton( this.dialogNS + 'apply' ).bind( 'click', function(){
        var cdata = _self.getSettings( section );
//--DEBUG
        var n = [];
        for( var k in cdata ){
            n[ n.length ] = cdata[ k ];
        }
        alert( n );
//==debug
        location.hash = restartHash;
      } );

      $Inner.getButton( this.dialogNS + 'cancel' ).bind( 'click', function(){
        location.hash = restoreHash;
      } );
    }

  , dialogNS: 'info\\:\\:dialog\\:\\:'
});

var templatesView = new TemplatesView({ collection: templates });


//
// Add tool routes
//
var route = function(){ Backbone.history.routeTool.apply( null, arguments ) };


// For page initialization
var initialize = function(){
  var applyData = function(){
    getData( function( data ){
      templatesView.applyData( 'main', 'info-tmpl-main', data );
    });
  };

  if( !templates.get( 'main' ) )
    addTemplate( 'main', urlList[ 'main' ], applyData );
  else
    applyData();
};

route( 'tlp7', '', initialize );


// For editor
var setEditor = function(){
  Backbone.history.navigate( $Util.currentHash.getRoot() + '/', { trigger: true, replace: true } );
};

route( 'tlp7', 'edit', setEditor );


// For setting section
var setSection = function( section ){
  var url = urlList[ section ];
  if( !url ){
    $Error.notice( 'no_tool_option', 'Lias::Tools::PersonalInfo - Tool Option Not Found' );
    return false;
  }

  var applyData = function(){
    getData( function( data ){
      if( !data ){
        $Error.notice( 'cannot_get', 'Lias::Tools::PersonalInfo - Cannot get data' );
      }
      if( data.permission !== true ){
        $Error.notice( 'invalid_command', 'Lias::Tools::PersonalInfo - Invalid Command' );
        return false;
      }
      templatesView.applyData( section, 'info-tmpl-dialog', data );
      templatesView.setDialog( section );
      templatesView.setSettings( section, data );
    });
  };

  if( !templates.get( section ) )
    addTemplate( section, url, applyData );
  else
    applyData();
};

route( 'tlp7', 'edit/:section', setSection );


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
    def( 'tlp7', 'personal' )
];


//
// Load stylesheet
//
$Loader.requireStylesheet({
    url: $R + '/style/style.css'
  , cache: false
});

});
