 YUI.add('rt_testcase_yui', function(Y) {
 
     Y.namespace('RT').TestcaseYUI = Y.Base.create('testcase_yui', Y.Base, [], {
         DISPLAY_TEMPLATE: '',
 
         initializer: function() {
 
         },
 
         destructor: function() {
 
         },
 
         run: function(o) {
             var testdata = Y.JSON.parse(o.responseText);
             eval("var testCaseObject = "+this.get('code'));
             var myTestCase = new Y.Test.Case(testCaseObject);
                          
             this.get('consoleContainer').setContent('Teseting...');
             Y.Test.Runner.add(myTestCase);
             
             //run the tests
             Y.Test.Runner.run();
             Y.Test.Runner.on('complete', function() {
                this.get('consoleContainer').setContent(
                    '<code>'+Y.Test.Runner.getResults(Y.Test.Format.TAP)+'</code>'
                );    
             }, this);
             
             
         }
 
     }, {
         ATTRS: {
             code: {
                 value: "",
                 validator: Y.Lang.isString
             },
             consoleContainer: {
                 value: {}
             }
         }
     });
 
 }, '0.1', {
     requires: ['base', 'json', 'console', 'test']
 });