/**
 * @author egli
 */

YUI().use("node", function(Y) {
 
    function init() {
        Y.log('domready fired');
		
    }
    Y.on("domready", init);
 
 
});
