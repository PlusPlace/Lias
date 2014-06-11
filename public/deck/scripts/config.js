/**
 *  Lias::Config
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

//
// Configure Lias
//
!function(){

  // 'this' is 'window'!
  this.lias = {};

  var toolInfo = {
      'tlx0': {
          'name': 'メッセージ'
        , 'bin':  'tools/global.message/bin/message.js'
        , 'icon': 'tools/global.message/style/images/icon.png'
      }
    , 'tlx1': {
          'name': 'イベント情報'
        , 'bin':  'tools/global.event-info/bin/event-info.js'
        , 'icon': 'tools/global.event-info/style/images/icon.png'
      }
    , 'tlx2': {
          'name': 'タグ情報'
        , 'bin':  'tools/global.tag-info/bin/tag-info.js'
        , 'icon': 'tools/global.tag-info/style/images/icon.png'
      }
    , 'tlx3': {
          'name': '検索'
        , 'bin':  'tools/global.search/bin/search.js'
        , 'icon': 'tools/global.search/style/images/icon.png'
      }
    , 'tlx4': {
          'name': '一般設定'
        , 'bin':  'tools/global.setting/bin/general-setting.js'
        , 'icon': 'tools/global.setting/style/images/icon.png'
      }
    , 'tlp0': {
          'name': 'ホーム'
        , 'bin':  'tools/personal.home/bin/home.js'
        , 'icon': 'tools/personal.home/style/images/icon.png'
      }
    , 'tlp1': {
          'name': 'タイムライン'
        , 'bin':  'tools/personal.timeline/bin/timeline.js'
        , 'icon': 'tools/personal.timeline/style/images/icon.png'
      }
    , 'tlp2': {
          'name': 'グループ'
        , 'bin':  'tools/personal.group/bin/group.js'
        , 'icon': 'tools/personal.group/style/images/icon.png'
      }
    , 'tlp3': {}  // Reserved
    , 'tlp4': {
          'name': 'カレンダー'
        , 'bin':  'tools/personal.calendar/bin/calendar.js'
        , 'icon': 'tools/personal.calendar/style/images/icon.png'
      }
    , 'tlp5': {
          'name': 'ダイレクトメッセージ'
        , 'bin':  'tools/personal.direct-message/bin/direct-message.js'
        , 'icon': 'tools/personal.direct-message/style/images/icon.png'
      }
    , 'tlp6': {} // Reserved
    , 'tlp7': {
          'name': '基本情報'
        , 'bin':  'tools/personal.info/bin/info.js'
        , 'icon': 'tools/personal.info/style/images/icon.png'
      }
    , 'tlg0': {
          'name': 'ホーム'
        , 'bin':  'tools/group.home/bin/home.js'
        , 'icon': 'tools/group.home/style/images/icon.png'
      }
    , 'tlg1': {
          'name': 'タイムライン'
        , 'bin':  'tools/group.timeline/bin/timeline.js'
        , 'icon': 'tools/group.timeline/style/images/icon.png'
      }
    , 'tlg2': {} // Reserved
    , 'tlg3': {
          'name': 'イベント'
        , 'bin':  'tools/group.event/bin/event.js'
        , 'icon': 'tools/group.event/style/images/icon.png'
      }
    , 'tlg4': {
          'name': 'カレンダー'
        , 'bin':  'tools/group.calendar/bin/calendar.js'
        , 'icon': 'tools/group.calendar/style/images/icon.png'
      }
    , 'tlg5': {
          'name': 'ダイレクトメッセージ'
        , 'bin':  'tools/group.direct-message/bin/direct-message.js'
        , 'icon': 'tools/group.direct-message/style/images/icon.png'
      }
    , 'tlg6': {
          'name': '設定'
        , 'bin':  'tools/group.setting/bin/setting.js'
        , 'icon': 'tools/group.setting/style/images/icon.png'
      }
    , 'tlg7': {
          'name': 'コネクション'
        , 'bin':  'tools/group.connection/bin/connection.js'
        , 'icon': 'tools/group.connection/style/images/icon.png'
      }
    , 'tlg8': {
          'name': '設備'
        , 'bin':  'tools/group.facility/bin/facility.js'
        , 'icon': 'tools/group.facility/style/images/icon.png'
      }
    , 'tlg9': {
          'name': 'メンバー'
        , 'bin':  'tools/group.member/bin/member.js'
        , 'icon': 'tools/group.member/style/images/icon.png'
      }
    , 'tlg10': {} // Reserved
    , 'tlg11': {
          'name': '基本情報'
        , 'bin':  'tools/group.info/bin/info.js'
        , 'icon': 'tools/group.info/style/images/icon.png'
      }
  };

  var sessionPaths = {
      'error': 'sessions/error.json'
    , 'events': 'sessions/events.json'
    , 'tag':   'sessions/tag.json'
    , 'search': 'sessions/search.json'
    , 'setting': 'sessions/setting.json'
  };

  this.lias.config = {
      getToolInfo: function( param ){ return toolInfo[ param ]; }
    , getSessionPath: function( param ){ return sessionPaths[ param ]; }
  };
}();


//
//  RequreJS configurations
//
!function(){
  var model      = 'scripts/model/'
    , collection = 'scripts/collection/'
    , view       = 'scripts/view/'
    , router     = 'scripts/router/'
    , util       = 'scripts/util/';

  this.require.config({
    paths: {
      // Initialize
        'init': 'scripts/init'

      // Error
      , 'error': 'scripts/error'

      // Model
      , 'model':  model + 'model'
      , 'loader': model + 'loader'
      , 'debug':  model + 'debug'

      // Collection
      , 'tools': collection + 'tools'

      // View
      , 'view':    view + 'view'
      , 'lancher': view + 'lancher'
      , 'board':   view + 'board'
      , 'header':  view + 'header'
      , 'window':  view + 'window'

      // Router
      , 'router':  router + 'router'
      , 'service': router + 'service'

      // Utility
      , 'util': util + 'util'
    }
  });
}();


//
// Require init script and start Lias
//
$( document ).ready( function(){
  require( [ 'init' ], function( app ){
    app.start();
  });
});
