YUI.add('rt_service', function (Y) {

    Y.namespace('RT').Service = Y.Base.create('service', Y.Widget, [],  {
        DISPLAY_TEMPLATE : '<section><header><h2 id="name">Service name <input type="text" id="servicename"></h2> \
                            <nav id="servicenav"  class="subnavright"><ul><li>Edit</li><li>Minimize</li></ul></nav> \
                            <label>Description:</label><br><textarea class="servicedescription" id="description">Write a short description the service here... </textarea> \
</header><section class="request"><header><h2>Request</h2></header><p><label>Method</label><select id="method"><option>GET</option><option>POST</option></select> \
<button id="request" class="request">Request</button></p><p><label>Service URL</label><input type="text" id="url" class="serviceurl"></p><div id="requesttab"></div></section><section class="response"><header> \ \n\
<h2>Response</h2></header><div id="responsetab"><div id="plainResponse" class= "responsecontent">Response</div></div></section></section>',
        initializer: function () {

        },

        destructor: function () {

        },

        renderUI: function () {
            var content = this.get('contentBox');
            //var node = Y.Node.create(Y.Lang.sub(this.DISPLAY_TEMPLATE, this.getClassName('display')));
            var node = Y.Node.create(this.DISPLAY_TEMPLATE);
            content.append(node);
            this._display = node;
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

            this._display.one('#request').on('click', this._doRequest, this);
        },

        syncUI: function() {
            this._updateNameUI(this.get('name'));
            this._updateDescriptionUI(this.get('description'));
            this._updateUrlUI(this.get('url'));
            this._updateMethodUI(this.get('method'));
        },

        getDataObject: function() {
            var data = {};
            data.name = this.get('name');
            data.description = this.get('description');
            data.url = this.get('url');
            data.method = this.get('method');
            return data;
        },

        _updateNameUI: function (value) {
            this._display.one('#servicename').set('value', value);
        },

        _updateDescriptionUI: function (value) {
            this._display.one('#description').set('value', value);
        },

        _updateUrlUI: function (value) {
            this._display.one('#url').set('value', value);
        },

        _updateMethodUI: function (value) {
            this._display.one('#method').set('value', value);
        },
        
        _doRequest: function () {
            var xdrConfig = {
                id:'flash',
                src:'js/io.swf'
            }
            Y.io.transport(xdrConfig);

            var cfg = {
                method: this.get('method'),
                xdr: {
                    use:'flash' //This is the xdrConfig id we referenced above.
                },
                
                on: {
                    //Our event handlers previously defined:
                    start: function(id, args) {
                        Y.log('START')
                    },
                    success: function(id, o, args) {
                        Y.log('SUCCESS');
                        context._display.one('#plainResponse').setContent(o.responseText);
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
            var obj = Y.io(this.get('url'), cfg);
        }

    }, {
        ATTRS: {
            name : {
                value: "",
                validator: Y.Lang.isString
            },
            description : {
                value: "",
                validator: Y.Lang.isString
            },
            url : {
                value: ""
            },
            method : {
                value: "",
                validator: Y.Lang.isString
            }
        }
    })
    
}, '0.1', {
    requires : ['base', 'widget', 'io-xdr']
});