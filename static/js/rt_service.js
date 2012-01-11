 YUI.add('rt_service', function(Y) {

    Y.namespace('RT').Service = Y.Base.create('service', Y.Widget, [], {
        DISPLAY_TEMPLATE: '<section class="service">' +
                            '<header>' +
                            '<h1>Service: <input type="text" id="servicename_{id}"></h1>'+
                            '<!-- <nav id="servicenav" class="subnavright"><ul><li>Edit</li><li>Minimize</li></ul></nav> -->'+
                            '<label>Description:</label><br>'+
                            '<textarea class="servicedescription" id="description_{id}">Write a short description the service here... </textarea>'+                           
                            '</header>'+
                            '<section class="request">'+
                            '<div id="requesttab_{id}"></div>'+
                            '</section>'+
                            '<section class="response">'+
                            '<div id="responsetab_{id}"></div>'+   
                            '</section>'+
                            '</section>',

        REQUEST_TEMPLATE_SPEC: '<div class="tabcontent"><p><label>Method</label><select id="method_{id}"><option>GET</option><option>POST</option></select> \
                                </p> \
                                <p><label>Service URL</label><input type="text" id="url_{id}" class="serviceurl"></p> \
                                <p><button id="editpostcontent_{id}">Edit</button><pre id="postcontent_{id}" class="prettyprint"> \
                                </pre></p></div>',
                                     
        REQUEST_TEMPLATE_TESTCASES: '<div class="tabcontent"><p> \
                                     <select><option>Example</option></select> \
                                     <button id="addtestcase_{id}" class="request">Add</button> \
                                     <button id="dorequest_{id}" class="request">Request</button></p> \
                                     <p><h2>Request parameters for this test</h2></p> \
                                     <div id="testparameters_{id}"></div> \
                                     <p><h2>Test Code [currently only <a href="http://yuilibrary.com/yui/docs/test/">Y.Test</a> supported, ]</h2></p> \
                                     <button id="edittestcasecode_{id}">Edit</button> \
                                     <code><pre id="testcasecode_{id}" class="prettyprint"></pre></code></div>',                            

        RESPONSE_TEMPLATE_PLAIN: '<div class="tabcontent"><pre id="plainresponse_{id}" class="responsecontent prettyprint"></pre></div>',
        
        RESPONSE_TEMPLATE_TESTPROTOCOL: '<div class="tabcontent"><pre><code id="testcaseconsole_{id}" class= "responsecontent"></code></pre></div>',

        initializer: function() {

        },

        destructor: function() {

        },

        renderUI: function() {
            var content = this.get('contentBox');
            var id = this.get('id');
            var node = Y.Node.create(Y.substitute(this.DISPLAY_TEMPLATE, {'id': id}));
            content.append(node);                
            
            //UI Elements
            this._display = node;
            this._requesttab = this._display.one('#requesttab_'+id);
            this._responsetab = this._display.one('#responsetab_'+id);
            this._servicename = this._display.one('#servicename_'+id);
            this._description = this._display.one('#description_'+id);
            this._codeeditor = this._display.one('#codeeditor_'+id);
            
            
            var request_template_testcases =  Y.substitute(this.REQUEST_TEMPLATE_TESTCASES, {'id': id});
            var request_template_spec =  Y.substitute(this.REQUEST_TEMPLATE_SPEC, {'id': id});
            this.tabviewRequest = new Y.TabView({
                srcNode: this._requesttab,
                children: [{
                    label: 'Request specification',
                    content: request_template_spec
                }, {
                    label: 'Testcases',
                    content: request_template_testcases
                }]
            });
            this.tabviewRequest.render();
            
            //UI Elements
            this._method = this._display.one('#method_'+id);
            this._url = this._display.one('#url_'+id);
            this._editpostcontent = this._display.one('#editpostcontent_'+id);
            this._postcontent = this._display.one('#postcontent_'+id);
            this._addtestcase = this._display.one('#addtestcase_'+id);
            this._btdorequest = this._display.one('#dorequest_'+id);
            this._testparameters = this._display.one('#testparameters_'+id);
            this._testcasecode = this._display.one('#testcasecode_'+id);
            this._edittestcasecode = this._display.one('#edittestcasecode_'+id);
            
            this.testParameters = new Y.RT.KeyValueEditor({
                addButtonText : '+',
                keyText : 'Parameter',
                valueText : 'Testvalue',
                pairs :[]    
            });
            this.testParameters.render(this._testparameters);            
            
            var response_template_plain =  Y.substitute(this.RESPONSE_TEMPLATE_PLAIN, {'id': id});
            var response_template_testprotocol =  Y.substitute(this.RESPONSE_TEMPLATE_TESTPROTOCOL, {'id': id});
            
            
            this.tabviewResponse = new Y.TabView({
                srcNode: this._responsetab,
                children: [{
                    label: 'Testprotocol',
                    content: response_template_testprotocol
                },{
                    label: 'Response (plain text)',
                    content: response_template_plain
                }]
            });
            this.tabviewResponse.render();
            // UI Elements
            this._plainresponse = this._display.one('#plainresponse_'+id);
            this._testcaseconsole = this._display.one('#testcaseconsole_'+id);
        },

        bindUI: function() {
            //Name
            this.after('nameChange', function(e) {
                this._updateNameUI(e.newVal);
            }, this);
            this._servicename.after('change', function(e) {
                this.set('name', e.target.get('value'));
            }, this);

            //Description
            this.after('descriptionChange', function(e) {
                this._updateDescriptionUI(e.newVal);
            }, this);
            this._description.after('change', function(e) {
                this.set('description', e.target.get('value'));
            }, this);

            //Url
            this.after('urlChange', function(e) {
                this._updateUrlUI(e.newVal);
            }, this);
            this._url.after('change', function(e) {
                this.set('url', e.target.get('value'));
            }, this);

            //Method
            this.after('methodChange', function(e) {
                this._updateMethodUI(e.newVal);
            }, this);
            this._method.after('change', function(e) {
                this.set('method', e.target.get('value'));
            }, this);

            //Content
            this.after('postcontentChange', function(e) {
                this._updatePostcontentUI(e.newVal);
            }, this);
            this._postcontent.after('change', function(e) {
                this.set('postcontent', e.target.get('value'));
            }, this);
            
            //Testcases
            this.after('testcasesChange', function(e) {
                this._updateTestcasesUI(e.newVal);
            }, this);
            this.testParameters.after('change', function(e) {
                //this.set('testcases', this.testParameters.get(''));
            }, this);

            this._btdorequest.on('click', this._doRequest, this);
            this._editpostcontent.on('click', function() {
                this._editCode('postcontent');
            }, this);
            this._edittestcasecode.on('click', function() {
                this._editCode('testcases');
            }, this);
            

        },

        syncUI: function() {
            this._updateNameUI(this.get('name'));
            this._updateDescriptionUI(this.get('description'));
            this._updateUrlUI(this.get('url'));
            this._updateMethodUI(this.get('method'));
            this._updatePostcontentUI(this.get('postcontent'));
            this._updateTestcasesUI(this.get('testcases'));
        },

        getDataObject: function() {
            var data = {};
            data.name = this.get('name');
            data.description = this.get('description');
            data.url = this.get('url');
            data.method = this.get('method');
            data.postcontent = this.get('postcontent');
            data.testcases = this.get('testcases');
            return data;
        },

        _updateNameUI: function(value) {
            this._servicename.set('value', value);
        },

        _updateDescriptionUI: function(value) {
            this._description.set('value', value);
        },

        _updateUrlUI: function(value) {
            this._url.set('value', value);
        },

        _updateMethodUI: function(value) {
            this._method.set('value', value);
        },

        _updatePostcontentUI: function(value) {
            this._postcontent.setContent(value);
        },  

        _updateTestcasesUI: function(value) {
            if (Y.Lang.isUndefined(this._currentcase)) { 
                this._currentcase = 0;
            }
            if (!Y.Lang.isUndefined(value[this._currentcase])) {
                this.testParameters.set('pairs', value[this._currentcase].parameters);
                this._testcasecode.setContent(value[this._currentcase].testCaseCode);
                Y.prettyPrint();
            }
            
        },

        _doRequest: function() {
            this._plainresponse.setContent("");
            var xdrConfig = {
                id: 'flash',
                src: '/js/io.swf'
            };
            Y.io.transport(xdrConfig);
            var reqdata = this.get('postcontent');
            // replace variables with values
            Y.each(this.get('testcases')[this._currentcase].parameters, function(param) {
                reqdata = reqdata.replace(param.key, param.value);
            });
            
            var cfg = {
                method: this.get('method'),
                data: reqdata,
                xdr: {
                    use: 'flash' //This is the xdrConfig id we referenced above.
                },

                on: {
                    //Our event handlers previously defined:
                    start: function(id, args) {
                        Y.log('START');
                    },
                    success: function(id, o, args) {
                        Y.log('SUCCESS');
                        var json_formated = js_beautify(o.responseText);
                        context._plainresponse.setContent(json_formated);
                        Y.prettyPrint();
                        var testcase = new Y.RT.TestcaseYUI({
                                code: context.get('testcases')[context._currentcase].testCaseCode,
                                consoleContainer : context._testcaseconsole
                            });
                        testcase.run(o);
                    },
                    failure: function(id, a) {
                        Y.log("ERROR " + id + " " + a.statusText, "info", "Request");
                    },
                    end: function(id, args) {
                        Y.log('END');
                    }
                }
            };
            var context = this;
            var obj = Y.io(this.get('project').get('serverURL') + this.get('url'), cfg);
            },
            
            _editCode: function(attribute) {
                Y.one('#savecode').replaceClass('hide', 'show');
                Y.one('#savecode').on('click', function(){ 
                    var code =  this.testCaseCodeEditor.getSession().getValue();
                    if (attribute == 'testcases') {
                        var cases = this.get(attribute);
                        cases[this._currentcase].testCaseCode = code;
                        this.set(attribute, cases);
                    } else {
                        this.set(attribute, code);
                    }
                    Y.one('#status').setStyle('height','20px');
                    Y.one('#codeeditor').setStyle('display','none');
                    Y.one('#topspace').setStyle('height','130px');
                    Y.prettyPrint();
                    Y.one('#savecode').replaceClass('show', 'hide');
                }, this);
                Y.one('#status').setStyle('height','250px');
                Y.one('#codeeditor').setStyle('display','inline');
                Y.one('#topspace').setStyle('height','360px');

                this.testCaseCodeEditor = ace.edit('codeeditor');
                this.testCaseCodeEditor.setTheme("ace/theme/twilight");
                var JavaScriptMode = require("ace/mode/javascript").Mode;
                this.testCaseCodeEditor.getSession().setMode(new JavaScriptMode());
                var data = this.get(attribute)
                if(attribute == 'testcases') {
                    var cases = this.get(attribute);
                    data = cases[this._currentcase].testCaseCode;
                }
                this.testCaseCodeEditor.getSession().setValue(data);
       }
    }, {
        ATTRS: {
            id :  {
                value: ""
            },            
            name: {
                value: "",
                validator: Y.Lang.isString
            },
            description: {
                value: "",
                validator: Y.Lang.isString
            },
            url: {
                value: ""
            },
            method: {
                value: "",
                validator: Y.Lang.isString
            },
            postcontent: {
                value: "",
                validator: Y.Lang.isString
            },
            testcases: {
                value: [],
                validator: Y.Lang.isArray
            },
            project: {
                value: undefined
            }
        }
    });

}, '0.1', {
    requires: ['base', 'widget', 'io-xdr','gallery-prettify', 'tabview', 'rt_keyvalueeditor', 'rt_testcase_yui']
});