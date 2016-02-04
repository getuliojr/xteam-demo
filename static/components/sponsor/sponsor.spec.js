describe('Component: sponsor', function () {

    //Variable for itens that are going to be used in the tests
    var $compile, directive, controllerAs, directiveName, isolateScope ;

    //Load Module to be Tested
    beforeEach(module('components.sponsor', 'templates'));

    //Load Services
    beforeEach(module('shared'));

    //Inject Dependencies
    beforeEach(inject(function (_$rootScope_, _$controller_, _$compile_) {

        //Create new scope
        scope = _$rootScope_.$new();
        //Configure to always start as an empty config
        scope.config = {};

        //Inject dependencies
        $compile = _$compile_;

        //Create Directive
        var directiveElement = '<gr-sponsor></gr-sponsor>';
        directive = getCompiledElement(directiveElement);

        //Other variables
        controllerAs = 'sponsor';
        directiveName = 'grSponsor';
        isolateScope = directive.isolateScope();


    }));

    it('expect template to be replaced', function () {
        expect(directive.find('img').length).toBe(1);
    });

    it('expect controller to be defined', function () {
        var controller = directive.controller(directiveName);
        expect(controller).toBeDefined();
    });

    it('expect controllerAs name to be right', function () {
        expect(isolateScope.hasOwnProperty(controllerAs)).toBeTruthy();
    });

    it('expect src to be defined when the component is initialized', function () {
        var controller = isolateScope[controllerAs];

        //it should have been defined
        expect(controller.src).toBeDefined();

        //should have an src starting with /ad
        expect(controller.src.indexOf('/ad')).toBe(0)
    });

    //Helper Function
    function getCompiledElement(el){
        var element = angular.element("<body>" + el + "</body>");
        var compiledElement = $compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

});
