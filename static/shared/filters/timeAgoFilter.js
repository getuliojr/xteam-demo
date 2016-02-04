(function () {
    'use strict';

    angular
    /**
     * @ngdoc overview
     * @name shared.filters.timeAgoFilter
     * @description
     *
     * # timeAgoFilter - Filter #
     *
     * This filter applied to a date returns how many days or hours has been passed or
     * if longer than 7 days, it returns the full date
     *
     */
        .module('shared.filters.timeAgo', [

        ])
        .filter('timeAgo', timeAgoFilter);

    //Inject Dependencies
    timeAgoFilter.$inject = ['$filter'];

    /**
     * @ngdoc function
     * @name timeAgoFilter
     * @methodOf shared.filters.function:timeAgoFilter
     *
     * @description
     *
     * This filter applied to a date returns how many days or hours has been passed or
     * if longer than 7 days, it returns the full date
     */
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

            if (diffinDays >= 7){
                //Return formated date (1 week older)
                return $filter('date')(timeAgo, 'MMM-dd-yyyy');
            }else if (diffinDays > 1){
                //Return a message in days ago
                return diffinDays + " days ago";
            }else if  (diffinDays <= 1){
                //Return a message in hours ago
                var hours = Math.floor((timeNow - timeAgo)/1000/60/60);
                if (hours <= 1){
                    return "1 hour ago";
                }else if (hours <24) {
                    return hours + " hours ago";
                }else {
                    //Return a message in one day ago
                    return "1 day ago";
                }
            }
        };

    }
})();