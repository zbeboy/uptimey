const $ = require('jquery');
const _ = require('lodash');
const api = require('../helpers/api');
const toasts = require('../helpers/toasts');
const common = require('../helpers/common');

/**
 * Controller for the index route
 */
module.exports = {
    /**
     * Init method
     */
    init: function() {
        _.bindAll(this);

        this.gatherData();
        // this.handleData();
    },

    /**
     * Gathers all data from the API
     */
    gatherData() {

        if ( $('body').find('section.layout').attr('id') === 'index' ) {

            setInterval(function () {

                $.getJSON('/api', function (data) {

                    api.bindData(data);
                    toasts.init('success', 'Data has been updated!');

                }).fail(function() {
                    toasts.init('error', 'Server is not responding!');
                });

            }, 1000 * 60);

            $.getJSON('/api/advanced', function (data) {

                api.bindData(data);
                $('#server-info, #network-info').removeClass('loading');

            }).fail(function() {
                toasts.init('error', 'Server is not responding!');
            });

        }

    },

    handleData() {

        $('.list-value').on('click', function() {
            let element = $(this);
            common.copyText(element, function() {
                toasts.init('success', 'Text copied to clipboard');
            });
        });

    }
};