/**
 *  Lias::Model::Service
 * 
 *  @version 0.0.1
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2011, 2012 Plus-place project
*/

define( function( require, exports, module ){

var service = $L.service = {};
var services = {};
    
var Service = Backbone.Model.extend({
    /**
     *  Create service
     *  @param  number | string pid
     *  @param  function process
     *  @param  number delay
    */
    spawn: function( pid, process, delay ){
        if( typeof process !== 'function' )
            return false;
        
        if( typeof delay !== 'number' )
            delay = 100;
            
        if( !pid )
            pid = ( new Date() ).getTime();
        
        var srvc = service;
        var data = {
            pid: pid,
            delay: delay,
            process: process,
            status: 'stop',
            timerId: null,
            start : function(){
                srvc.start( this.pid );
            },
            
            stop : function( callback ){
                srvc.stop( this.pid, callback );
            },
            
            restart : function(){
                srvc.restart( this.pid );
            }
        };
        
        data.pid = pid;
        data.delay = delay;
        data.process = process;
        data.status = 'stop';
        data.timerId = null;
        
        services[ pid ] = data;
        return data;
    },
    
    /**
     *  Remove service
     *  @param  number | string pid
    */
    remove: function( pid ){
        var srvc = services[ pid ];
        if( !srvc )
            return false;
            
        var del = function(){
            delete services[ pid ];
        };
            
        if( srvc.status === 'running' )
            service.stop( pid, del );
        else
            del();
    },
    
    
    /**
     *  Start service
     *  @param  number | string pid
    */
    start: function( pid ){
        var srvc = services[ pid ];
        if( srvc.status === 'running' || !srvc )
            return false;
        
        var itvl = function(){ srvc.interval(); };
        srvc.interval = function(){ srvc.process(); };
        srvc.timerId = setInterval( itvl, srvc.delay );
        srvc.status = 'running';
    },
    
    /**
     *  Stop service
     *  @param  number | string pid
     *  @param  function callback
    */
    stop: function( pid, callback ){
        var srvc = services[ pid ];
        if( srvc.status === 'stop' || !srvc )
            return false;
        
        srvc.interval = function(){
            var res = srvc.process( 'stop' );
            if( res === true ){
                clearInterval( srvc.timerId );
                srvc.status = 'stop';
                
                if( typeof callback === 'function' )
                    callback();
            }
        };
        srvc.status = 'stopping';
    },
    
    /**
     *  Kill service
     *  @param  number | string pid
    */
    kill: function( pid ){
        var srvc = services[ pid ];
        if( srvc.status === 'stop' || !srvc )
            return false;
        
        clearInterval( srvc.timerId );
        srvc.status = 'stop';
    },
    
    /**
     *  Restart service
     *  @param  number | string pid
    */
    restart: function( pid ){
        var srvc = services[ pid ];
        var start = function(){
            service.start( pid, srvc.process, srvc.delay );
        };
        
        if( srvc.status === 'running' )
            service.stop( pid, start );
        else
            start();
    },
    
    /**
     *  Get status of service
     *  @param  number | string pid
    */
    getStatus: function( pid ){
        return services[ pid ].status;
    }
});

return new Service();
});
