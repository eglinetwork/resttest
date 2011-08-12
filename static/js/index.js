/*
 * This is the Javascript Code used for RestTest
 * Besides building a great application I use this opportunity to get familiar with YUI3
 */

YUI({
    modules: {
        'rt_testcase_yui': {
            fullpath: '/js/rt_testcase_yui.js',
            requires : ['base', 'json', 'console', 'test']
        },
        'rt_keyvalueeditor': {
            fullpath: '/js/rt_keyvalueeditor.js',
            requires : ['base', 'widget']
        },
        'rt_service': {
            fullpath: '/js/rt_service.js',
            requires : ['base', 'widget', 'io-xdr', 'tabview', 'rt_keyvalueeditor', 'rt_testcase_yui']
        },
        'rt_project': {
            fullpath: '/js/rt_project.js',
            requires : ['base', 'rt_service']
        },
        'rt_datamanager': {
            fullpath: '/js/rt_datamanager.js',
            requires : ['base', 'io', 'gallery-storage-lite', 'json', 'overlay']
        }
    }
}).use('base','node','json', 'rt_service', 'rt_project', 'rt_datamanager', function(Y) {
    function main() {
        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');
        Y.log('it is ready');

        // Load the services and create instances of rt_service
        var dataManager = new Y.RT.DataManager();        

        // While early development use this method to add some dummy data to the env
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