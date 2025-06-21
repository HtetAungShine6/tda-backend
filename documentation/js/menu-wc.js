'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tda documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' : 'data-bs-target="#xs-controllers-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' :
                                            'id="xs-controllers-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' : 'data-bs-target="#xs-injectables-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' :
                                        'id="xs-injectables-links-module-AppModule-81716249895a405e7adc25c2918aa65fbdfee9f794c5acfbc06818f891c493366b0dc662263fcd824b2b406d5023230b2bf7ca7e4994ba1894336c8908f39423"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' :
                                            'id="xs-controllers-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' :
                                        'id="xs-injectables-links-module-AuthModule-29a417e98f1d840f8452ec086d4140bb01cba4410d01a4863d949d0ae61f102aebfa467290f4ee92eb448126d305b69949ec8cb9041a749ee2ac19bfbcb779a8"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' :
                                            'id="xs-controllers-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' :
                                        'id="xs-injectables-links-module-EmployeeModule-460ae87adabcecf7ab404a205b2f53cbba541c9dffdd8b6d265e3bbf2cf6c82153e457010a5a69bdc2d168565b0417517fa00aec3159254cf669e85fdc9acd79"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeServiceImpl.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeServiceImpl</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' :
                                            'id="xs-controllers-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' :
                                        'id="xs-injectables-links-module-ProductModule-7d205ab734f0093a4270c5764d80fbc24e4e9614ee3309ac1058944d3b1608afd6def1ba5f018cf681f78f026ded624cec90fe403781af7ce0a7dbda5995dde2"' }>
                                        <li class="link">
                                            <a href="injectables/ProductServiceImpl.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductServiceImpl</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' : 'data-bs-target="#xs-controllers-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' :
                                            'id="xs-controllers-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' : 'data-bs-target="#xs-injectables-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' :
                                        'id="xs-injectables-links-module-UserModule-474c37cf490d4cf1fe32ec07936e908e4f263e8b8a6db75237e13b0b48d195f263c9ab61d21e7c6a26ae67af612afcc2d65eb3afb5d52469dfa470466d821063"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserServiceImpl.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserServiceImpl</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateEmployeeDto.html" data-type="entity-link" >CreateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link" >Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeDto.html" data-type="entity-link" >UpdateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthInterface.html" data-type="entity-link" >AuthInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeInterface.html" data-type="entity-link" >EmployeeInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductInterface.html" data-type="entity-link" >ProductInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});