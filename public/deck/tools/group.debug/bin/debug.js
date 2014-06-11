/**
 *  Lias::Tools::Debug
 *
 *  @identity   tlp6, tlg10
 *  @version    0.0.1
 *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 *  @copyright  2012, Plus-place project
*/

define( function( require, exports, module ){

var $Tool   = require( 'scripts/mvc/model/tool' ),
    $Loader = require( 'scripts/mvc/model/loader' ),
    $Board  = require( 'scripts/mvc/view/board' ),
    $Inner  = $Board.inner;

var $R = 'tools/debug';
var startup = false;

var tmplLists = {
    main: {
        url: $R + '/templates/main.tpl',
        template: null
    }
};

var getTemplate = function( type, name ){
    var d = tmplLists[ type ];
    if( !d )
        return false;
    if( d.loaded === false )
        loadTemplate( type );
    return d.template;
};

var loadTemplate = function( type ){
    var d = tmplLists[ type ];
    $Loader.require({
        url: d.url,
        cache: false,
        async: false,
        dataType: 'text',
        done: function( data ){
            d.template = data;
        }
    });
};

var p_debug = {};
var p_up = false;
p_debug.startup = function(){
    if( p_up === true )
        return;

    // Preparation
    $Board.clear();
    $Inner.applyTemplate( getTemplate( 'main' ), 'debug-tmpl-main' );
    
    p_up = true;
};

p_debug.close = function(){
    $Board.clear();
    p_up = false;
};

p_debug.loaded = true;

var g_debug = {};
var g_up = false;
g_debug.startup = function(){
    if( g_up === true )
        return;

    // Preparation
    $Board.clear();
    $Inner.applyTemplate( getTemplate( 'main' ), 'debug-tmpl-main' );
    
    g_up = true;
};

g_debug.close = function(){
    $Board.clear();
    g_up = false;
};

g_debug.loaded = true;

module.exports = {
    'tlp6': p_debug,
    'tlg10': g_debug
};

$Loader.requireStylesheet({
    url: $R + '/style/style.css',
    cache: false,
    async: false
});

loadTemplate( 'main' );
});

