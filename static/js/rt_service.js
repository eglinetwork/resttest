YUI.add('rt_service', function (Y) {

    Y.namespace('RT').Service = Y.Base.create('service', Y.Widget, [],  {
        DISPLAY_TEMPLATE : '<section><header><h2 id="name">Service name</h2> \
                            <nav id="servicenav"  class="subnavright"><ul><li>Edit</li><li>Save</li><li>Minimize</li></ul></nav> \
                            <label>Description:</label><br><textarea class="servicedescription" id="description">Write a short description the service here... </textarea></header><section class="request"><header><h2>Request</h2></header><p><label>Method</label><select><option>GET</option><option>POST</option></select><button class="request">Request</button></p><p><label>Service URL</label><input type="text" class="serviceurl"></p><div id="requesttab"></div></section><section class="response"><header><h2>Response</h2></header><div id="responsetab"></div></section></section>',
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
            this.after('descriptionChange', this._afterDescriptionChange, this);
            this._display.one('#description').after('change', this._afterDescriptionUIChange, this);
        },

        syncUI: function() {
            this._updateDescriptionUI(this.get('description'));
        },

        _afterDescriptionChange: function(e) {
            this._updateDescriptionUI(e.newVal);
        },

        _afterDescriptionUIChange: function(e) {            
            this.set('description', e.target.get('value'));
        },

        _updateDescriptionUI: function (value) {
            this._display.one('#description').setContent(value);
        }
        
    }, {
        ATTRS: {
            name : {
                getter: function() {
                    return this._display.one('#name').getContent()
                },
                setter: function(value)  {
                    return this._display.one('#name').setContent(value);
                }
            },
            description : {
                value: ""
            }
        }
    })
    
}, '0.1', {
    requires : ['base', 'widget']
});