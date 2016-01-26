(function () {
    'use strict';

    angular
        .module('shared.filters.timeAgo', [

        ])
        .filter('timeAgo', timeAgoFilter);

    //Inject Dependencies
    timeAgoFilter.$inject = ['$filter'];

    function timeAgoFilter($filter) {

        return function (timeAgo) {
            //Gets a new Date
            var timeNow = new Date();
            //Convert user date to a date object
            var timeAgo = new Date(timeAgo);

            //Consider UTC differences
            var utcTimeAgo = Date.UTC(timeAgo.getFullYear(), timeAgo.getMonth(), timeAgo.getDate());
            var utcTimeNow = Date.UTC(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate());

            //Difference in Days (desconsider time)
            var diffinDays = (utcTimeNow-utcTimeAgo)/1000/60/60/24;

            if (diffinDays > 7){
                //Return formated date
                return $filter('date')(timeAgo, 'MMM-dd-yyyy');
            }else if (diffinDays >= 2){
                //Return a message in days ago
                return diffinDays + " days ago";
            }else if  (diffinDays >= 1){
                //Return a message in one day ago
                return diffinDays + " day ago";
            }else{
                //Return a message in hours ago
                return Math.ceil((timeNow - timeAgo)/1000/60/60) + " hours ago";
            }
        };

    }
})();