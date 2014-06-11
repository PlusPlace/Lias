/**
 *  Lias::View::Core
 *
 *  @version    0.0.1
 *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
 *  @copyright  2012, Plus-place project
*/

define( function( require, exports, module ){

var ViewCore = Backbone.View.extend({
    showLoader: function(){
        $( '#loader' ).show();
    };

    hideLoader: function(){
        $( '#loader' ).hide();
    }
});

return new ViewCore();
});
