 YUI.add('rt_service', function(Y) {

    Y.namespace('RT').Service = Y.Base.create('service', Y.Widget, [], {
        DISPLAY_TEMPLATE: '<section> \
                            <header> \
                            <h2 id="name">Service name <input type="text" id="servicename"></h2> \
                            <nav id="servicenav" class="subnavright"><ul><li>Edit</li><li>Minimize</li></ul></nav> \
                            <label>Description:</label><br> \
                            <textarea class="servicedescription" id="description">Write a short description the service here... </textarea> \
                            </header> \
                            <section class="request"> \
                            <div id="requesttab"> \
                            </div> \
                            </section> \
                            <section class="response"> \
                            <div id="responsetab"> \
                            </div> \
                            </section> \
                            </section>',

        REQUEST_TEMPLATE_SPEC: '<div class="tabcontent"><p><label>Method</label><select id="method"><option>GET</option><option>POST</option></select> \
                                </p> \
                                <p><label>Service URL</label><input type="text" id="url" class="serviceurl"></p> \
                                <div id="content"> \
                                <textarea class="postcontent" id="postcontent"></textarea> \
                                </div></div>',

        REQUEST_TEMPLATE_TESTCASES: '<div class="tabcontent"><p> \
                                     <select><option>Example</option></select> \
                                     <button id="addTestCase" class="request">Add</button> \
                                     <button id="request" class="request">Request</button></p> \
                                     <p><h2>Request parameters for this test</h2></p> \
                                     <div id="testparameters"></div> \
                                     <p><h2>Test Code (currently only Y.Test supported)</h2></p> \
                                     <code><textarea id="testCaseCode" class="testCaseCode">{}</textarea></code></div>',

        RESPONSE_TEMPLATE_PLAIN: '<div class="tabcontent"><pre><code id="plainResponse" class= "responsecontent"></code></pre></div>',

        initializer: function() {

        },

        destructor: function() {

        },

        renderUI: function() {
            var content = this.get('contentBox');
            //var node = Y.Node.create(Y.Lang.sub(this.DISPLAY_TEMPLATE, this.getClassName('display')));
            var node = Y.Node.create(this.DISPLAY_TEMPLATE);
            content.append(node);
            this._display = node;

            this.tabviewRequest = new Y.TabView({
                srcNode: this._display.one('#requesttab'),
                children: [{
                    label: 'Request specification',
                    content: this.REQUEST_TEMPLATE_SPEC
                }, {
                    label: 'Testcases',
                    content: this.REQUEST_TEMPLATE_TESTCASES
                }]
            });
            this.tabviewRequest.render();
            this.testParameters = new Y.RT.KeyValueEditor({
                addButtonText : '+',
                keyText : 'Parameter',
                valueText : 'Testvalue',
                pairs :[]    
            });
            this.testParameters.render(this._display.one('#testparameters'));

            this.tabviewResponse = new Y.TabView({
                srcNode: this._display.one('#responsetab'),
                children: [{
                    label: 'Response (plain text)',
                    content: this.RESPONSE_TEMPLATE_PLAIN
                }, {
                    label: 'Testprotocol',
                    content: '<div class="tabcontent"><pre><code id="testCaseConsole" class= "responsecontent"></code></pre></div>'
                }]
            });
            this.tabviewResponse.render();
            
        },

        bindUI: function() {
            //Name
            this.after('nameChange', function(e) {
                this._updateNameUI(e.newVal);
            }, this);
            this._display.one('#name').after('change', function(e) {
                this.set('name', e.target.get('value'));
            }, this);

            //Description
            this.after('descriptionChange', function(e) {
                this._updateDescriptionUI(e.newVal);
            }, this);
            this._display.one('#description').after('change', function(e) {
                this.set('description', e.target.get('value'));
            }, this);

            //Url
            this.after('urlChange', function(e) {
                this._updateUrlUI(e.newVal);
            }, this);
            this._display.one('#url').after('change', function(e) {
                this.set('url', e.target.get('value'));
            }, this);

            //Method
            this.after('methodChange', function(e) {
                this._updateMethodUI(e.newVal);
            }, this);
            this._display.one('#method').after('change', function(e) {
                this.set('method', e.target.get('value'));
            }, this);

            //Content
            this.after('postcontentChange', function(e) {
                this._updateMethodUI(e.newVal);
            }, this);
            this._display.one('#postcontent').after('change', function(e) {
                this.set('postcontent', e.target.get('value'));
            }, this);
            
            //Testcases
            this.after('testcasesChange', function(e) {
                this._updateTestcasesUI(e.newVal);
            }, this);
            this.testParameters.after('change', function(e) {
                //this.set('testcases', this.testParameters.get(''));
            }, this);

            this._display.one('#request').on('click', this._doRequest, this);
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
            // This has to be changed to get data from a local testcases array
            data.testcases = [{
                parameters : this.testParameters.get('pairs'),
                testCaseCode  : this._display.one('#testCaseCode').get('value')
            }];
            return data;
        },

        _updateNameUI: function(value) {
            this._display.one('#servicename').set('value', value);
        },

        _updateDescriptionUI: function(value) {
            this._display.one('#description').set('value', value);
        },

        _updateUrlUI: function(value) {
            this._display.one('#url').set('value', value);
        },

        _updateMethodUI: function(value) {
            this._display.one('#method').set('value', value);
        },

        _updatePostcontentUI: function(value) {
            this._display.one('#postcontent').set('value', value);
        },  

        _updateTestcasesUI: function(value) {
            this.currentcase = value[0];
            if (!Y.Lang.isUndefined(this.currentcase)) {
                this.testParameters.set('pairs', this.currentcase.parameters);
            }
            this._display.one('#testCaseCode').set('value', this.currentcase.testCaseCode);
        },

        _doRequest: function() {
            this._display.one('#plainResponse').setContent("");
            var xdrConfig = {
                id: 'flash',
                src: 'js/io.swf'
            };
            Y.io.transport(xdrConfig);
            var reqdata = this.get('postcontent');
            // replace variables with values
            Y.each(this.currentcase.parameters, function(param) {
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
                        context._display.one('#plainResponse').setContent(o.responseText);
                        var testcase = new Y.RT.TestcaseYUI({
                                code: context.currentcase.testCaseCode,
                                consoleContainer : context._display.one('#testCaseConsole')
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
            var obj = Y.io(this.get('project').get('serverURL')+this.get('url'), cfg);
        }

    }, {
        ATTRS: {
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
    requires: ['base', 'widget', 'io-xdr', 'tabview', 'rt_keyvalueeditor', 'rt_testcase_yui']
});