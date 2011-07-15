/*
 * This is the Javascript Code used for RestTest
 * Besides building a great application I use this opportunity to get familiar with YUI3
 */

YUI({
    modules: {
        'rt_service': {
            fullpath: '/js/rt_service.js',
            requires : ['base', 'widget', 'io-xdr']
        },
        'rt_project': {
            fullpath: '/js/rt_project.js',
            requires : ['base', 'rt_service']
        },
        'rt_datamanager': {
            fullpath: '/js/rt_datamanager.js',
            requires : ['base', 'io', 'gallery-storage-lite']
        }
    }
}).use('base','node','rt_service', 'rt_project', 'rt_datamanager', function(Y) {
    function main() {
        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');
        Y.log('it is ready');

        // Load the services and create instances of rt_service
        var dataManager = new Y.RT.DataManager();        

        //dataManager.saveSomeData('0001');
        
        var currentProject = new Y.RT.Project({
            srcNode: '#project',
            dataManager: dataManager,
            id : '0001'
        });
        currentProject.render();
        
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

