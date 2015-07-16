'use strict';

angular.module('appControllers', ["checklist-model"]);


angular.module('appControllers', [])
    .service('sharedProperties', function () {
    	var today = new Date();
        var date = today;

        return {
            getChooseDate: function () {
                return date;
            },
            setChooseDate: function(value) {
                date = value;
            }
        };
    });