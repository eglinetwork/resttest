/*
 * This is the Javascript Code used for RestTest
 * Besides building a great application I use this opportunity to get familiar with YUI3
 */

YUI({
    modules: {
        'rt_service': {
            fullpath: '/js/rt_service.js',
            requires : ['base', 'widget']
        },
        'rt_datamanager': {
            fullpath: '/js/rt_datamanager.js',
            requires : ['base', 'io']
        }
    }
}).use('base','node','rt_service', 'rt_datamanager', function(Y) {
    function main() {
        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');
        Y.log('it is ready');

        // Load the services and create instances of rt_service
        var dataManager = new Y.RT.DataManager();       
        var data =  dataManager.loadProject('0001');
        

            Y.Array.each (data.services, function(service) {
                var myService = new Y.RT.Service();
                myService.render('#services');
                myService.set('name', service.name);
                myService.set('description', service.description);
            })

    }
    Y.on("domready", main);
});








/*YUI().use('node', 'tabview', 'io', 'gallery-storage-lite', function(Y) {
    Y.namespace('RT');

    Y.RT.data = {}
    
    Y.RT.tabviewRequest = new Y.TabView({
        srcNode: '#requesttab',
        children: [{
            label: 'Content',
            content: '<textarea class="postcontent"></textarea>'
        }, {
            label: 'Headers',
            content: '<textarea class="postcontent"></textarea>'
        }, {
            label: 'Paramter',
            content: '<textarea class="postcontent"></textarea>'
        }]
    });

    Y.RT.tabviewResponse = new Y.TabView({
        srcNode: '#responsetab',
        children: [{
            label: 'Plaintext',
            content: '<textarea class="responsecontent"></textarea>'
        }, {
            label: 'Testcases',
            content: '<textarea class="responsecontent"></textarea>'
        }]
    });

    Y.RT.tabviewRequest.render();
    Y.RT.tabviewResponse.render();
});*/

