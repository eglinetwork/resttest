YUI.add('rt_keyvalueeditor', function (Y) {


    Y.namespace('RT').KeyValueEditor = Y.Base.create('keyvalueeditor', Y.Widget, [], {
        DISPLAY_TEMPLATE: '<div id="pairs"><table><thead><tr><td>{keyText}</td><td>{valueText}</td><td><button id="addNewPair" class="button">{addButtonText}</button> \
                           </td></tr></thead> \
                           <tbody id="pairsBody"></tbody></table></div>',
        ROW_TEMPLATE: '<tr><td><input id="key" type="text"></td><td><input id="value" type="text"></td><td><a></a></td></tr>',
        _refresh: null,

        initializer: function () {
            //Load Pairs if provided
            
        },

        destructor: function () {
            // cancel the refreshes
        },

        renderUI: function () {
            //Create a proper node from DISPLAY_TEMPLATE and assign it to this._diplsay
            //Add it into the DOM under the contentBox
            var content = this.get('contentBox');
            var node = Y.Node.create(Y.Lang.sub(this.DISPLAY_TEMPLATE, {
                'keyText' : this.get('keyText'), 
                'valueText' : this.get('valueText'), 
                'addButtonText' : this.get('addButtonText')
            }));
            content.append(node);
            this._display = node;
        },

        bindUI: function () {
            //Name
            this.after('pairsChange', function(e) {
                this._updatePairsUI(e.newVal);
            }, this);
            this._display.one('#addNewPair').on('click', function (e) {
                this._addRow();
            }, this);
        },

        syncUI: function () {
            // Update display with current time
            this._updatePairsUI(this.get('pairs'));
        },
        
        _updatePairsUI: function(value) {
            // Wirte pairs array of table to values
            this._display.one('#pairsBody').empty(true);
            Y.each(this.get('pairs'), function (pair){
                this._addRow(pair);
            }, this);
        },
        
        _updatePairs: function (e){
            // Wirte values of table to pairs array
            var newPairs = [];
            this._display.one('#pairsBody').all('tr').each(function(row){
                var pair = {
                    'key' : row.one("#key").get('value'),
                    'value' :row.one("#value").get('value')
                };
                newPairs.push(pair);                
            }, this);
            this.set('pairs', newPairs);
        },
        
        _addRow: function (pair) {
            var row = Y.Node.create(this.ROW_TEMPLATE);
            this._display.one('#pairsBody').append(row);
            if (!Y.Lang.isUndefined(pair)){
                row.one("#key").set('value', pair.key);
                row.one("#value").set('value', pair.value);
            }            
            row.one("#key").after('change', this._updatePairs, this);
            row.one("#value").after('change', this._updatePairs, this);
        }
        

    }, {
        ATTRS: {
            pairs : {
                value : []
            },
            addButtonText : {
                value : "Add new pair"
            },
            keyText : {
                value : "Key"
            },
            valueText : {
                value : "Value"
            }
        }
    });

}, '0.1', {
    requires: ['base', 'widget']
});