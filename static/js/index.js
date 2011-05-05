/*
 * This is the Javascript Code used for RestTest
 * Besides building a great application I use this opportunity to get familiar with YUI3
 */

YUI().use('node', 'tabview', 'io', function(Y) {
    var tabviewRequest = new Y.TabView({
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

    var tabviewResponse = new Y.TabView({
        srcNode: '#responsetab',
        children: [{
            label: 'Content',
            content: '<textarea class="responsecontent"></textarea>'
        }, {
            label: 'Headers',
            content: '<textarea class="responsecontent"></textarea>'
        }, {
            label: 'Paramter',
            content: '<textarea class="responsecontent"></textarea>'
        }]
    });
    
    tabviewRequest.render();
    tabviewResponse.render();
});