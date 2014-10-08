/*!
 * angular-ls-settings
 * 
 * Version: 0.1.0 - 2014-10-08T22:25:01.319Z
 * License: 
 */
!function(){"use strict";angular.module("lsSettings",[]).provider("lsSettingsConfig",function(){this.availableSettings={},this.$get=function(){return{availableSettings:this.availableSettings}},this.settings=function(t){this.availableSettings=t}}).factory("lsSettingsManager",["lsSettingsConfig",function(t){var e={},n="_lssst_",i=window.localStorage;e.availableSettings=t.availableSettings;var a=function(t){return n+t};return e.getSetting=function(t){if(void 0!==e.availableSettings[t]){var n=a(t),s=i.getItem(n);return null===s?(e.setSetting(t,e.availableSettings[t]),e.availableSettings[t]):JSON.parse(s)}},e.setSetting=function(t,n){if(void 0!==e.availableSettings[t]){var s=a(t);return i.setItem(s,JSON.stringify(n))}},e.resetSettings=function(){_.keys(e.availableSettings);angular.forEach(availableSettings,function(t,n){e.setSetting(n,e.availableSettings[n])})},e.allSettings=function(){var t={};return angular.forEach(e.availableSettings,function(n,i){t[i]=e.getSetting(i)}),t},e.setting=function(t,n){return 1==arguments.length?e.getSetting(t):2==arguments.length?e.setSetting(t,n):void 0},e}])}();