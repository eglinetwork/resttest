/*
 * Module DataManager
 *
 * This module loads and stores data and makes it availabe to the application
 * Depending on the demands datastorage works locally or remote.
 * The DataManager also assures Sync between local and remote storage.
 *
 */

YUI.add('rt_datamanager', function (Y) {

    Y.namespace('RT').DataManager = Y.Base.create('datamanager', Y.Base, [],  {
        initializer: function () {

        },

        destructor: function () {

        },

        /**
         * Load date from
         */
        loadProject: function (pid) {
            this.set('data',
            {
                services : [{
                    name : 'First Service',
                    description  : 'Just a short decription'
                },
                {
                    name : 'Second Service',
                    description  : 'Another decription'
                }
                ]
            });

            return this.get('data');
        }
        
    }, {
        ATTRS: {
            data : {
                value : {}
            }
        }
    })

}, '0.1', {
    requires : ['base', 'io']
});


