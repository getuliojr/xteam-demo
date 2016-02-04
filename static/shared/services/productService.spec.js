describe('Shared.Services: productService', function () {

    //Variable for itens that are going to be used in the tests
    var productService, scope, $httpBackend;

    //Load Services
    beforeEach(module('shared.services.product'));


    //Inject Dependencies
    beforeEach(inject(function (_productService_, _$rootScope_, _$httpBackend_) {

        //data is not json-formated. it Is just like the backend servers data
        var mockedData =
            '{"id":"0-kdm41fx3hpmygb9","size":37,"price":614,"face":"( .-. )","date":"Wed Jan 27 2016 15:31:20 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"1-710y19tps8j8aor","size":15,"price":463,"face":"( .o.)","date":"Wed Jan 27 2016 13:20:57 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"2-j2w6fsejco758kt9","size":32,"price":357,"face":"( `Â·Â´ )","date":"Sun Jan 31 2016 11:25:48 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"3-n303fp745yfzuxr","size":35,"price":156,"face":"( Â° Í Ê Â°)","date":"Tue Feb 02 2016 15:56:15 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"4-zbgtll2tksh8h0k9","size":38,"price":539,"face":"( Í¡Â° ÍÊ Í¡Â°)","date":"Thu Jan 21 2016 01:30:58 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"5-a4v5piq6tvrevcxr","size":38,"price":519,"face":"( â _ â )","date":"Thu Jan 21 2016 11:53:43 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"6-dy2jp389rygv6lxr","size":12,"price":588,"face":"( ï¸¶ï¸¿ï¸¶)","date":"Wed Jan 27 2016 05:52:58 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"7-j24bi0z3fas8aor","size":27,"price":269,"face":"( ï¾ã®ï¾)","date":"Fri Jan 29 2016 05:01:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"8-uqw9l81x8l7hkt9","size":19,"price":188,"face":"(\\/)(Â°,,,Â°)(\\/)","date":"Mon Feb 01 2016 19:36:30 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"9-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"10-eklie3pnxs5ah5mi","size":21,"price":541,"face":"(Â¬Âº-Â°)Â¬","date":"Sat Jan 23 2016 06:53:52 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"11-f3xxy3glij05dn29","size":30,"price":259,"face":"(Â¬â¿Â¬)","date":"Fri Jan 22 2016 19:23:44 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"12-ohfv8oxipxhwipb9","size":37,"price":258,"face":"(Â°ã­Â°)â","date":"Wed Feb 03 2016 04:27:16 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"13-eth5eke1wziftj4i","size":26,"price":841,"face":"(Â´ã»Ïã»)ã£","date":"Fri Jan 22 2016 14:20:49 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"14-kz1zawludua3jtt9","size":38,"price":463,"face":"(Ã³ Ã¬_Ã­)","date":"Sat Jan 23 2016 08:06:46 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}'+ '\n';

        productService = _productService_;
        scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;

        $httpBackend.whenGET("/api/products").respond(mockedData);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('expect service to be defined', function () {
        expect(productService).toBeDefined();
        expect(productService.load).toBeDefined();

    });

    it('expect service to return formed json data', function () {
        var data = [];
        productService.load()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();
        scope.$digest();
        //check data length
        expect(data.length).toBe(15);

        //check one data item
        expect(data[2].price).toBe(357);
    });



});