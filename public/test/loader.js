/**
 *  Lias::Model::Loader for Test
 * 
 *  @version 0.0.2
 *  @author  Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 * 
 *  Copyright (c) 2012 Plus-place project
*/

var verify = {};

var ajax = {
    /**
     *  Ajax
     * 
     *  option object has
     *  {
     *      methodType : 'GET' || 'POST'
     *      dataType : 'xml' || 'text'
     *      url : string
     *      data : string
     *      async : true || false
     *      cache : true || false
     *      callback : function
     *      done : function
     *      loading : function
     *      sent : function
     *      open : function
     *      unsent : function
     *      error : function
     *      username : string
     *      password : string
     *      headerLabel : string
     *      headerValue : string
     *  }
     * 
     *  @param  object option
     *  @return object XMLHttpRequest
    */
    require: function( option ){
      var rv = verify.ajax( option );
      if( !rv )
        return false;

      var loaded = [];
      if( typeof rv.url === 'string' )
        rv.url = [ rv.url ];

      for( var i = 0; rv.url.length > i; i++ )
        loaded[ i ] = '';

      var error = false;
      var pointer = 0;
      var require = function( url, ptr ){
        var key, req = {};
        for( key in rv )
          req[ key ] = rv[ key ];

        req.url = url;

        req.error = function( res, status ){
          error = true;
          if( rv.error !== null )
            rv.error( res, status );
        };

        req.done = function( res, status ){
          if( rv.loaded !== null )
            req.loaded( res, status );
          loaded[ ptr ] ='loaded';

          var complete;
          for( var i = 0; loaded.length > i; i++ ){
            if( loaded[ i ] !== 'loaded' ){
              complete = false;
              break;
            }
          }

          if( complete !== false ){
            if( rv.done !== null )
              rv.done.apply( null, arguments );
          }
        };

        ajaxMain( req );
        
        pointer++;
        if( rv.url.length > pointer )
          require( rv.url[ pointer ], pointer );
      };
      
      require( rv.url[ pointer ], pointer );
    }

    /**
     *  Require script
     *  
     *  option object has 
     *  {
     *      url : string || array || object
     *      error : function
     *      done : function
     *      loaded : function
     *      async : true || false
     *      cache : true || false
     *  }
    */
  , requireScript: function( option ){
      option.type = 'text';
      option.loaded = function( res, status ){
        appendScript( res, option.id ); 
      };
      this.require( option );    
    }

    /**
     *  Require stylesheet
     *  
     *  option object has 
     *  {
     *      url : string || array || object
     *      error : function
     *      done : function
     *      loaded : function
     *      async : true || false
     *      cache : true || false
     *  }
    */
  , requireStylesheet: function( option ){
      option.type = 'text';
      option.loaded = function( res, status ){
        appendStyle( res, option.id );
      };
      this.require( option );
    }
};

/**
 *  @param  object rv (Includes require arguments)
*/
var ajaxMain = function( rv ){
  var xhr = getXhr();
  var callback = function(){
    var response;
    // In text format
    if( rv.dataType == 'text' )
      response = xhr.responseText;
    // In XML format
    else if( rv.dataType == 'xml' )
      response = xhr.responseXML;
    // Selectable
    else 
      response = xhr;
    
    if( rv.callback !== null )
      rv.callback( response, xhr.readyState, xhr.status );
    
    if( xhr.readyState == 4 && xhr.status == 200 ){
      if( rv.done !== null )
        rv.done( response, xhr.status );
    }
    else if( xhr.readyState == 4 && xhr.status != 200 ){
      if( rv.error !== null )
        rv.error( response, xhr.status );
    }
    else if( xhr.readyState == 3 ){
      if( rv.loading !== null )
        rv.loading( xhr.status );
    }
    else if( xhr.readyState == 2 ){
      if( rv.sent !== null )
        rv.sent( xhr.status );
    }
    else if( xhr.readyState == 1 ){
      if( rv.open !== null )
        rv.open( xhr.status );
    }
    else if( xhr.readyState === 0 ){
      if( rv.unsent !== null )
        rv.unsent( xhr.status );
    }
  };
  
  if( xhr.onload )
    xhr.onload = callback;
  else
    xhr.onreadystatechange = callback;
      
  if( rv.cache === false ){
    if( rv.url.indexOf( '?', 0 ) != -1 )
      rv.url += '&_' + Math.random();
    else
      rv.url += '?_' + Math.random();
  }
  
  var result;
  if( rv.ready !== null )
    result = rv.ready();
      
  if( result === false )
    return false;
      
  xhr.open( rv.methodType, rv.url, rv.async, rv.username, rv.password );
  
  if( rv.headerLabel && rv.headerValue )
    xhr.setRequestHeader( rv.headerLabel, rv.headerValue );

  xhr.send( rv.data );
  
  return xhr;
};

/**
 *  Verify arguments of self.sys.ajax method.
 *  @param  object option
 *  @return object || false  < If url isn't String, return false. >
*/
verify.ajax = function( option ){
  if( !option.url )
    return false;
      
  var o = option;
  // method Type
  o.methodType = typeof o.methodType === 'string' && o.methodType.match( /^GET|POST$/ ) !== null ? o.methodType : 'GET';
  // Data type
  o.dataType = typeof o.dataType === 'string' && o.dataType.match( /^xml|text$/ ) !== null ? o.dataType : 'text';
  // Data
  o.data = typeof o.data === 'string' ? o.url : null;
  // Async
  o.async = typeof o.async === 'boolean' ? o.async : true;
  // Cache
  o.cache = typeof o.cache === 'boolean' ? o.cache : true;
  // Callback
  o.callback = typeof o.callback === 'function' ? o.callback : null;
  // Username
  o.username = o.username ? o.username : undefined;
  // Password
  o.password = o.password ? o.password : undefined;
  // Header label
  o.headerLabel = o.headerLabel ? o.headerLabel : null;
  // Header value
  o.headerValue = o.headerValue ? o.headerValue : null;
  // Done
  o.done = typeof o.done === 'function' ? o.done : null;
  // Loaded
  o.loaded = typeof o.loaded === 'function' ? o.loaded : null;
  // Loading
  o.loading = typeof o.loading === 'function' ? o.loading : null;
  // Sent
  o.sent = typeof o.sent === 'function' ? o.sent : null;
  // Open
  o.open = typeof o.open === 'function' ? o.open : null;
  // Unsent
  o.unsent = typeof o.unsent === 'function' ? o.unsent : null;
  // Ready
  o.ready = typeof o.ready === 'function' ? o.ready : null;
  // Error
  o.error = typeof o.error === 'function' ? o.error : null;
  // Loaders
  o.showLoader = typeof o.showLoader === 'boolean' ? o.showLoader : true;
  
  if( o.methodType === 'POST' ){
    if( o.headerLabel === null )
      o.headerLabel = 'Content-Type';
    if( o.headerValue === null )
      o.headerValue = 'application/x-www-form-urlencoded';
  }
  
  return o;
};

/**
 *  Get XmlHttpRequest
 *  @return object XMLHttp object
*/
var getXhr = function(){
  var xhr;
  try{
    xhr = new XMLHttpRequest();
  } catch( e ){
    try{
      xhr = new XDomainRequest();
    } catch( e ){
      try{
        xhr = new ActiveXObject( 'Msxml2.XMLHTTP' );
      } catch( e ){
        try{
          xhr = new ActiveXObject( 'Microsft.XMLHTTP' );
        }
        catch( e ){
          xhr = false;
        }
      }
    }
  }
  
  return xhr;
};

/**
 *  Append script tag
 *  @param  string res
*/
var appendScript = function( res, id ){
  var elem = document.createElement( 'script' );
  elem.type = 'text/javascript';
  elem.text = res;
  if( id ) elem.id = id;
  document.getElementsByTagName( 'head' ).item( 0 ).appendChild( elem );
};

/**
 *  Append style tag
 *  @param  string res
*/
var appendStyle = function( res, id ){
  var rules = document.createTextNode( res );
  var elem = document.createElement( 'style' );
  elem.type = 'text/css';
  if( elem.styleSheet )
    elem.styleSheet.cssText = res;
  else
    elem.appendChild( rules );
  if( id )
    elem.id = id;
  document.getElementsByTagName( 'head' ).item( 0 ).appendChild( elem );
};
