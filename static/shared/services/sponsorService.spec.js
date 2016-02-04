describe('Shared.Services: sponsorService', function () {

    //Variable for itens that are going to be used in the tests
    var sponsorService, scope;

    //Load Services
    beforeEach(module('shared.services.sponsor'));


    //Inject Dependencies
    beforeEach(inject(function (_sponsorService_, _$rootScope_) {

        sponsorService = _sponsorService_;
        scope = _$rootScope_.$new();

    }));

    it('expect service to be defined', function () {
        //service should exists
        expect(sponsorService).toBeDefined();

        //load method should exists
        expect(sponsorService.getSponsorURL).toBeDefined();

    });

    it('expect service to return a random url', function () {
        var adURL, adURL2;

        adURL = sponsorService.getSponsorURL();
        scope.$digest();
        expect(adURL).toBeDefined();

        adURL2 = sponsorService.getSponsorURL();
        scope.$digest();
        expect(adURL2).not.toBe(adURL);

    });

});