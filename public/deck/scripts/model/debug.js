/**
 *  Lias::Model::Debug
 *
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 *
 *  Copyright (c) 2012 Plus-place project
*/

define( 'debug', function( require, exports, module ){

var uid = 'p0';

var Debug = Backbone.Model.extend({
    /**
     *  @param  string id
     *  @return string
    */
    getProfileDataUrl: function( id ){
      return {
          'p0': '/-/dp0/profile-data.json'
        , 'p1': '/-/dp1/profile-data.json'
        , 'p2': '/-/dp2/profile-data.json'
        , 'g0': '/-/dg0/profile-data.json'
        , 'g1': '/-/dg1/profile-data.json'
        , 'user': '/-/dp0/profile-data.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getSessionUrl: function( id ){
      return {
          'p0': '/-/dp0/session.json'
        , 'p1': '/-/dp1/session.json'
        , 'p2': '/-/dp2/session.json'
        , 'g0': '/-/dg0/session.json'
        , 'g1': '/-/dg1/session.json'
        , 'user': '/-/dp0/session.json'
        , undefined: '/-/dp0/session.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getTimelineUrl: function( id ){
      return {
          'g0': '/-/dg0/timeline.json'
        , 'p0': '/-/dp0/timeline.json'
        , 'user': '/-/dp0/timeline.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getLatestTimelineUrl: function( id ){
      return {
          'g0': '/-/dg0/latest-timeline.json'
        , 'p0': '/-/dp0/latest-timeline.json'
        , 'user': '/-/dp0/latest-timeline.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getGroupUpdateUrl: function( id ){
      return {
          'p0': '/-/dp0/group-update.json'
        , 'user': '/-/dp0/group-update.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getCalendarUrl: function( id ){
      return {
          'g0': '/-/dg0/calendar.json'
        , 'p0': '/-/dp0/calendar.json'
        , 'user': '/-/dp0/calendar.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getMemberDataUrl: function( id ){
      return {
          'g0': '/-/dg0/member-data.json'
      }[ id ];
    }

    /**
     *  @param  string id
     *  @return string
    */
  , getConnectionDataUrl: function( id ){
      return {
          'g0': '/-/dg0/connection-data.json'
      }[ id ];
    }
});

return new Debug();
});
