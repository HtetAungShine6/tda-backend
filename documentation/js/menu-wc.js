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
                                            'data-bs-target="#controllers-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' : 'data-bs-target="#xs-controllers-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' :
                                            'id="xs-controllers-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' : 'data-bs-target="#xs-injectables-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' :
                                        'id="xs-injectables-links-module-AppModule-50304a9893818df2f3bb35020f392123a19b91437c9041a2f49195358054e0fbea31228d36d009c21fd108f11ea09222961767d9e47b563edca79c5ad3e6cc77"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' :
                                            'id="xs-controllers-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' :
                                        'id="xs-injectables-links-module-AuthModule-4fdcb0242e8ff98fa20fb767d5061e399058dc2d4274135d28754ffdcdddbc921a20d6213ac2d354d8e2e58a0af893bb773ea5c97b3981bb1f3e2732e7455c73"' }>
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
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' : 'data-bs-target="#xs-controllers-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' :
                                            'id="xs-controllers-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' : 'data-bs-target="#xs-injectables-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' :
                                        'id="xs-injectables-links-module-UserModule-6148b29e517ad8f70d69d2f15501dda3787861e2f984fccfeae36c3d0fb2647f400781ae774ed97df462f2745078f8095c3cf2a5ef91f3ae082039f609055300"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthInterface.html" data-type="entity-link" >AuthInterface</a>
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