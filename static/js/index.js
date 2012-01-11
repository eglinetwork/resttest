/*
 * This is the Javascript Code used for RestTest
 * Besides building a great application I use this opportunity to get familiar with YUI3
 */

YUI({
    modules: {
        'ext_beautify': {
            fullpath: 'http://jsbeautifier.org/beautify.js'
        },
        'gallery-prettify': {
            fullpath: 'http://derek.github.com/sandbox/yui/gallery-prettify/gallery-prettify.js'
        },
        'ext_ace': {
             fullpath: '/js/libs/ace/build/src/ace.js'
        },
        'ext_ace_theme': {
             fullpath: '/js/libs/ace/build/src/theme-twilight.js'
        },
        'ext_ace_mode': {
             fullpath: '/js/libs/ace/build/src/mode-javascript.js'
        },
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
            requires : ['base', 'widget', 'io-xdr', 'tabview', 'overlay', 'gallery-prettify', 'rt_keyvalueeditor', 'rt_testcase_yui', 'ext_ace', 'ext_ace_theme', 'ext_ace_mode', 'ext_beautify']
        },
        'rt_project': {
            fullpath: '/js/rt_project.js',
            requires : ['base', 'rt_service']
        },
        'rt_datamanager': {
            fullpath: '/js/rt_datamanager.js',
            requires : ['base', 'io', 'gallery-storage-lite', 'json', 'overlay', 'ext_beautify']
        }, 
        'rt_integrationtest': {
            fullpath: '/js/rt_integrationtest.js',
            requires : ['base', 'rt_project', 'rt_testcase_yui']
        }
    }
}).use('base','node','json', 'rt_service', 'rt_project', 'rt_datamanager', 'rt_integrationtest', function(Y) {
    
    function main() {        
        Y.one('.yui3-js-enabled').removeClass('yui3-js-enabled');
        Y.log('it is ready');

        // Load the services and create instances of rt_service
        var dataManager = new Y.RT.DataManager();        
        //var currentPage = Y.one(#)
        
        Y.all('.projectnav').on('click', function (e){
            if (!Y.Lang.isUndefined(this.currentPage)){
                this.currentPage.replaceClass('show', 'hide');
            }
            this.currentPage = Y.one('#' + e.currentTarget.get('id').substr(4));
            this.currentPage.replaceClass('hide', 'show');
            //alert(target);
        }, this);

        this.currentPage = Y.one('#project');
        this.currentPage.replaceClass('hide', 'show');

        var currentProject = new Y.RT.Project({
            srcNode: '#project',
            dataManager: dataManager,
            id : '0001'
        });
        currentProject.render();
        
        
        
    }
    Y.on("domready", main);
});