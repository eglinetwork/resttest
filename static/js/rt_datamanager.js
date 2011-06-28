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
            var data = {
                name : 'A big Project',
                description : 'The description of the project',
                serverURL : 'http://resttest.elstr.com',
                services : [{
                    name : 'First Service',
                    description  : 'Just a short decription ... and more',
                    url : 'http://pipes.yahooapis.com/pipes/pipe.run?_id=giWz8Vc33BG6rQEQo_NLYQ&_render=json',
                    method : 'GET'
                },
                {
                    name : 'Second Service',
                    description  : 'Another decription',
                    url : 'http://pipes.yahooapis.com/pipes/pipe.run?_id=giWz8Vc33BG6rQEQo_NLYQ&_render=json',
                    method : 'POST'
                }
                ]
            }

            return data;
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


