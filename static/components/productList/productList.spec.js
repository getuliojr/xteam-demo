describe('Component: productList', function () {

    //Variable for itens that are going to be used in the tests
    var $compile, directive, controllerAs, directiveName, isolateScope, $httpBackend ;

    //Load Module to be Tested
    beforeEach(module('components.productList', 'templates'));

    //Load Services
    beforeEach(module('shared', 'md.data.table', 'ngMaterial'));

    //Inject Dependencies
    beforeEach(inject(function (_$rootScope_, _$controller_, _$compile_, _$httpBackend_) {

        //Create new scope
        scope = _$rootScope_.$new();
        //Configure to always start as an empty config
        scope.config = {};

        //Inject dependencies
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;

        //Mock htppGet
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

        var mockedData2 =
            '{"id":"15-kdm41fx3hpmygb9","size":37,"price":614,"face":"( .-. )","date":"Wed Jan 27 2016 15:31:20 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"16-710y19tps8j8aor","size":15,"price":463,"face":"( .o.)","date":"Wed Jan 27 2016 13:20:57 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"17-j2w6fsejco758kt9","size":32,"price":357,"face":"( `Â·Â´ )","date":"Sun Jan 31 2016 11:25:48 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"18-n303fp745yfzuxr","size":35,"price":156,"face":"( Â° Í Ê Â°)","date":"Tue Feb 02 2016 15:56:15 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"19-zbgtll2tksh8h0k9","size":38,"price":539,"face":"( Í¡Â° ÍÊ Í¡Â°)","date":"Thu Jan 21 2016 01:30:58 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"20-a4v5piq6tvrevcxr","size":38,"price":519,"face":"( â _ â )","date":"Thu Jan 21 2016 11:53:43 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"21-dy2jp389rygv6lxr","size":12,"price":588,"face":"( ï¸¶ï¸¿ï¸¶)","date":"Wed Jan 27 2016 05:52:58 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"22-j24bi0z3fas8aor","size":27,"price":269,"face":"( ï¾ã®ï¾)","date":"Fri Jan 29 2016 05:01:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"23-uqw9l81x8l7hkt9","size":19,"price":188,"face":"(\\/)(Â°,,,Â°)(\\/)","date":"Mon Feb 01 2016 19:36:30 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"24-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"25-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"26-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"27-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"28-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"29-0o32fo71007tx1or","size":18,"price":955,"face":"(Â¬_Â¬)","date":"Wed Jan 27 2016 04:27:06 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' ;

        var mockedData3 =
            '{"id":"30-kdm41fx3hpmygb9","size":37,"price":614,"face":"( .-. )","date":"Wed Jan 27 2016 15:31:20 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' +
            '{"id":"31-710y19tps8j8aor","size":15,"price":463,"face":"( .o.)","date":"Wed Jan 27 2016 13:20:57 GMT-0200 (HorÃ¡rio brasileiro de verÃ£o)"}' + '\n' ;

        $httpBackend.whenGET("/api/products?limit=15&skip=0").respond(mockedData);
        $httpBackend.whenGET("/api/products?limit=15&skip=15").respond(mockedData2);
        $httpBackend.whenGET("/api/products?limit=15&skip=30").respond(mockedData3);

        //Create Directive
        var directiveElement = '<gr-product-list page-size="pageSize"></gr-product-list>';
        directive = getCompiledElement(directiveElement);

        //Other variables
        controllerAs = 'productList';
        directiveName = 'grProductList';
        isolateScope = directive.isolateScope();


    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('expect template to be replaced', function () {
        expect(directive.find('md-table-container').length).toBe(1);
    });

    it('expect controller to be defined', function () {
        var controller = directive.controller(directiveName);
        expect(controller).toBeDefined();
    });

    it('expect controllerAs name to be right', function () {
        expect(isolateScope.hasOwnProperty(controllerAs)).toBeTruthy();
    });

    it('expect parameter: "page-size" to be set', function () {
        var pageSize = 30;
        scope.pageSize = pageSize;

        var controller = isolateScope[controllerAs];

        //isolateScope in the controller shouldn´t have a value yet
        expect(controller.pageSize).toBe(15); //Default Value

        //Run digest, setting new values in outer scope
        scope.$digest();

        //Values should have been set
        expect(controller.pageSize).toBe(30);
    });

    it('expect function "showMore" to load next batch', function () {
        var controller = isolateScope[controllerAs];

        //should have 15 products showing
        expect(controller.products.length).toBe(15);

        //Run digest, setting new values in outer scope
        controller.showMore();
        $httpBackend.flush();
        scope.$digest();

        //should have 30 records showing
        expect(controller.products.length).toBe(30);
    });

    it('expect existsMoreData to be set to false when all records have been loaded', function () {
        var controller = isolateScope[controllerAs];

        //it should still have more records
        expect(controller.existsMoreData).toBe(true);

        //Run digest, setting new values in outer scope
        controller.showMore();
        $httpBackend.flush();
        scope.$digest();

        //should not have more records
        expect(controller.existsMoreData).toBe(false);
    });

    //Helper Function
    function getCompiledElement(el){
        var element = angular.element("<body>" + el + "</body>");
        var compiledElement = $compile(element)(scope);
        $httpBackend.flush();
        scope.$digest();
        return compiledElement;
    }

});
