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
                                            'data-bs-target="#controllers-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' :
                                            'id="xs-controllers-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' :
                                        'id="xs-injectables-links-module-AppModule-e071f3a5df03c0fe59542f2dff48a92e2556dc528173961a446812be2da2c4864b915f16366af36e1161890a27d3ed24ee1199969d6c99d4a45fc2fafc96bf62"' }>
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
                                            'data-bs-target="#controllers-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' :
                                            'id="xs-controllers-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' :
                                        'id="xs-injectables-links-module-EmployeeModule-486c18556c662f39c2c4e4dbe52a39e6723d5ac173b7985a782c0961193b7b5e02b4e69db1a3f9a5fdfb19ccce4f9a13bd251a650bdd9b41065441a6202b2cff"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeServiceImpl.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeServiceImpl</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeProductModule.html" data-type="entity-link" >EmployeeProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' : 'data-bs-target="#xs-controllers-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' :
                                            'id="xs-controllers-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeeProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' : 'data-bs-target="#xs-injectables-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' :
                                        'id="xs-injectables-links-module-EmployeeProductModule-9f5e9a16aafd653a87a27cc8abbb8e1302f559c2d115ac806d0fcf48ff9b7eef1d161c39edbd9e69a2034e77806e16ba1ebe15d365f8fddb8b04ba84971de5b0"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeeProductServiceImpl.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeProductServiceImpl</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' :
                                            'id="xs-controllers-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' :
                                        'id="xs-injectables-links-module-ProductModule-c47faa8bee2c226cdd6d33dc14c3201db2b6154bdb65f41c001e6709846bf3ff142cd6f93234d02bef515aca047681feea55a0b3b1634e1c8a3a3cf5d1a06b51"' }>
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
                                            'data-bs-target="#controllers-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' : 'data-bs-target="#xs-controllers-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' :
                                            'id="xs-controllers-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' : 'data-bs-target="#xs-injectables-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' :
                                        'id="xs-injectables-links-module-UserModule-56aee9da9b6edf014472acde65c3e19a3a0954aa291c4945d84385c3d2878c7f235f8c184e333b4a232d2fa77451f7e7bec29df1b324935a7a770a9b16850fad"' }>
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
                                <a href="classes/CreateEmployeeProductDto.html" data-type="entity-link" >CreateEmployeeProductDto</a>
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
                                <a href="classes/EmployeePayroll.html" data-type="entity-link" >EmployeePayroll</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeProduct.html" data-type="entity-link" >EmployeeProduct</a>
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
                                <a href="classes/UpdateEmployeeProductDto.html" data-type="entity-link" >UpdateEmployeeProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeStatusDto.html" data-type="entity-link" >UpdateEmployeeStatusDto</a>
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
                                <a href="interfaces/EmployeeProductInterface.html" data-type="entity-link" >EmployeeProductInterface</a>
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