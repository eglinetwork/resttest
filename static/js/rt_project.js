YUI.add('rt_project', function (Y) {

    Y.namespace('RT').Project = Y.Base.create('project', Y.Widget, [],  {
        DISPLAY_TEMPLATE : '',

        _services : [],
        
        
        initializer: function () {
            if (!Y.Lang.isNull(this.get('id'))) {
                var data =  this.get('dataManager').loadProject(this.get('id'));
                this.loadDataObject(data);
            }
        },

        destructor: function () {

        },

        renderUI: function () {
            var content = this.get('contentBox');
            this._display = content;
        },

        bindUI: function() {
            // Name
            this.after('nameChange', function(e) {
                this._updateNameUI(e.newVal);
            }, this);
            this._display.one('#name').after('change', function(e) {
                this.set('name', e.target.get('value'));
            }, this);

            // Description
            this.after('descriptionChange', function(e) {
                this._updateDescriptionUI(e.newVal);
            }, this);
            this._display.one('#description').after('change', function(e) {
                this.set('description', e.target.get('value'));
            }, this);

            // Server URL
            this.after('descriptionChange', function(e) {
                this._updateServerURLUI(e.newVal);
            }, this);
            this._display.one('#serverURL').after('change', function(e) {
                this.set('serverURL', e.target.get('value'));
            }, this);

            // Buttons
            this._display.one('#saveProject').on('click', this._saveProject, this);
            this._display.one('#addService').on('click', this._addService, this);

        },

        syncUI: function() {
            this._updateNameUI(this.get('name'));
            this._updateDescriptionUI(this.get('description'));
            this._updateServerURLUI(this.get('serverURL'));
        },

        loadDataObject: function(data) {
            this.set('name', data.name);
            this.set('description', data.description);
            this.set('serverURL', data.serverURL);
            
            Y.Array.each (data.services, function(service) {
                this._addService(service);
            }, this);
        },

        getDataObject: function() {
            var data = {};
            data.name = this.get('name');
            data.description = this.get('description');
            data.serverURL = this.get('serverURL');
            data.services = [];
            Y.Array.each (this._services, function(wdgService) {
                data.services.push(wdgService.getDataObject());
            });
            return data;
        },

        _updateNameUI: function (value) {
            this._display.one('#name').set('value', value);
        },

        _updateDescriptionUI: function (value) {
            this._display.one('#description').set('value', value);
        },

        _updateServerURLUI: function (value) {
            this._display.one('#serverURL').set('value', value);
        },

        _saveProject: function () {
            Y.one('#status').setContent('Saving...');
            var data = this.getDataObject();
            this.get('dataManager').saveProject(this.get('id'), data);
            Y.one('#status').setContent('Project has been saved.');
        },

        _addService: function (service) {
            var myService = new Y.RT.Service(service);
            myService.set('project', this);
            myService.render('#services');
            this._services.push(myService);
        }

    }, {
        ATTRS: {
            id : {
                value: null
            },
            name : {
                value: ""
            },
            description : {
                value: ""
            },
            serverURL : {
                value: ""
            },
            dataManager : {
                value: ""
            }
        }
    })

}, '0.1', {
    requires : ['base', 'widget', 'rt_service']
});