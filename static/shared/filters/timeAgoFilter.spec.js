describe('Shared.filters: timeAgoFilter', function () {

    //Variable for itens that are going to be used in the tests
    var $filter, scope;

    //Load Services
    beforeEach(module('shared.filters.timeAgo'));


    //Inject Dependencies
    beforeEach(inject(function (_$filter_, _$rootScope_) {

        $filter = _$filter_;
        scope = _$rootScope_.$new();

    }));

    it('expect timeAgoFilter to give answer in Hours Ago', function () {
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*1))).toEqual('1 hour ago');
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*2))).toEqual('2 hours ago');
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*10))).toEqual('10 hours ago');
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*23))).toEqual('23 hours ago');

    });

    it('expect timeAgoFilter to give answer in Days Ago', function () {
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*24*1))).toEqual('1 day ago');
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*24*5))).toEqual('5 days ago');
        expect($filter('timeAgo')(new Date((new Date)*1 - 1000*3600*24*6))).toEqual('6 days ago');
    });

    it('expect timeAgoFilter to give short date when time is older than a week', function () {
        var date = new Date((new Date)*1 - 1000*3600*24*7);
        expect($filter('timeAgo')(date)).toEqual($filter('date')(date, 'MMM-dd-yyyy'));

        date = new Date((new Date)*1 - 1000*3600*24*10);
        expect($filter('timeAgo')(date)).toEqual($filter('date')(date, 'MMM-dd-yyyy'));

        date = new Date((new Date)*1 - 1000*3600*24*60);
        expect($filter('timeAgo')(date)).toEqual($filter('date')(date, 'MMM-dd-yyyy'));
    });
});