 YUI.add('rt_testcase_yui', function(Y) {
 
     Y.namespace('RT').TestcaseYUI = Y.Base.create('testcase_yui', Y.Base, [], {
         CASE_TEMPLATE: '<div class="rtTest testcase"><h2>{name}</h2>'+
                        '<div class="rtTest summary">Passed:{passed} Failed:{failed} Total:{total} (Ignored {ignored}) Duration:{duration}</div></div>',
         TEST_TEMPLATE: '<div class="rtTest test">{name}: {message}</div>',
         initializer: function() {
 
         },
 
         destructor: function() {
 
         },
 
         run: function(o) {
             var testdata = Y.JSON.parse(o.responseText);
             eval("var testCaseObject = " + this.get('code'));
             
             var myTestCase = new Y.Test.Case(testCaseObject);
             Y.Test.Runner.clear();
             Y.Test.Runner.add(myTestCase);
             
             this.get('consoleContainer').empty();             
            
             //run the tests
             
             Y.Test.Runner.on('complete', function() {                 
                 var resultsObject = Y.Test.Runner.getResults();
                 var testResult = resultsObject[testCaseObject.name];
                 var node = Y.Node.create(Y.substitute(this.CASE_TEMPLATE, {
                     'name' : testResult.name,
                     'passed' : testResult.passed,
                     'failed' : testResult.failed,
                     'total'  : testResult.total,
                     'ignored': testResult.ignored,
                     'duration':testResult.duration
                 }));
                 for(var test in testResult) {
                   var testObejct = testResult[test];
                   if (!Y.Lang.isUndefined(testObejct.name)) {
                       var testNode = Y.Node.create(Y.substitute(this.TEST_TEMPLATE, {
                           name : testObejct.name,
                           message: testObejct.message
                       }));
                       testNode.addClass(testObejct.result);
                       node.append(testNode);
                   }
                 }

                 this.get('consoleContainer').append(node);
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