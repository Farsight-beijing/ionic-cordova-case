// The main app definition
// --> where you should load other module depdendencies
//define是引入main.js的paths
define([
	'angular',
	'angularAMD',

	"ui-router",

//	'angularUiRouter',

	'angular-translate',
	'../app/services/language',
		'ionic',
	//'angularUiRouterExtra',


  //'angular-translate-languager'
], function (angular,angularAMD) {
  'use strict';

    var controllerNameByParams = function($stateParams)
    {
        // naive example of dynamic controller name mining
        // from incoming state params

        var controller = "OtherCtrl";

        if ($stateParams.id === 1) {
            controller = "DefaultCtrl";
        }

        return controller;
    }

  var registerRoutes = function($stateProvider, $urlRouterProvider,$translateProvider) {
  // default
  $urlRouterProvider.otherwise("/app/index");
  // route
  $stateProvider
    // home

  				  .state('app', angularAMD.route({
				    url: '/app',
				    abstract: true,
				    templateUrl: 'app/templates/main.html',
						//controllerUrl: '../app/controllers/frameworkcontroller.js',
            resolve: {
                loadController: ['$q', '$stateParams',
                    function ($q, $stateParams)
                    {
                        // get the controller name === here as a path to Controller_Name.js
                        // which is set in main.js path {}
                        var controllerName = "../app/controllers/frameworkcontroller.js";

                        var deferred = $q.defer();
                        require([controllerName], function () { deferred.resolve(); });
                        return deferred.promise;
                    }]
            },
            controllerProvider: function ($stateParams)
            {
                // get the controller name === here as a dynamic controller Name
               // var controllerName = controllerNameByParams($stateParams);
                return "OtherCtrl";
            },

				  }))
			  //首页
				  .state('app.index', angularAMD.route({
				    url: '/index',
				    views: {
				      'menuContent': {
				        templateUrl: 'app/templates/firstindex.html',

				      }
				    }
				  }))
		  //图表列表
		  .state('app.chartslist', angularAMD.route({
		    url: '/chartslist',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/charts/chartslist.html',
				controller: 'ChartslistCtrl'
		      }
		    },
            resolve: {
                loadController: ['$q', '$stateParams',
                    function ($q, $stateParams)
                    {
                        // get the controller name === here as a path to Controller_Name.js
                        // which is set in main.js path {}
                        var controllerName = "../app/controllers/frameworkcontroller1.js";

                        var deferred = $q.defer();
                        require([controllerName], function () { deferred.resolve(); });
                        return deferred.promise;
                    }]
            },


		  }))
		  //设备列表
		  .state('app.devicelist', angularAMD.route({
		    url: '/devicelist',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/device/devicelist.html',
						controller: 'DevicelistCtrl'
		      }
		    }
		  }))
		  //功能列表
		  .state('app.functionlist', angularAMD.route({
		    url: '/functionlist',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/function/functionlist.html',
						controller: 'FunctionlistCtrl'
		      }
		    }
		  }));

			//国际化配置
			$translateProvider.translations('en', translationsEN);
			$translateProvider.translations('zh', translationZH);
			//$translateProvider.preferredLanguage('en');
			//$translateProvider.fallbackLanguage('en');
			$translateProvider.determinePreferredLanguage();//这个方法是获取手机默认语言设置
			$translateProvider.registerAvailableLanguageKeys(['en','zh'],{
				'en-*':'en',
				'zh-*':'zh'
			}
			);

};
  // the app with its used plugins
  var app = angular.module('app', [
    'ionic','pascalprecht.translate',"ui.router"
  ]);
// config
app.config(["$stateProvider", "$urlRouterProvider", '$translateProvider',registerRoutes]);
app.run(function($ionicPlatform,$rootScope, $location,$timeout, $ionicHistory) {

	//注意：$cordovaToast是消息提示框，若要使用需要安装才支持。命令cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

});

  //app.init = function() {
  return  angularAMD.bootstrap(app);     //replace angular.bootstrap(document, ['app']);
 // };
  // return the app so you can require it in other components
  //return app;
});
