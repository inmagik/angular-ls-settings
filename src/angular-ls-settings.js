(function() {

    "use strict";

    angular.module("lsSettings", [] )

    .provider("lsSettingsConfig", function() {

      this.availableSettings = {};

      this.$get = function() {
          return {
            availableSettings:this.availableSettings
          };
      };

      this.settings = function(availableSettings) {
        this.availableSettings = availableSettings;
      };
    })

    .factory("lsSettingsManager", [ "lsSettingsConfig", function(lsSettingsConfig) {

        var svc = {};
        var prefix = "_lssst_";
        var storage = window.localStorage;

        svc.availableSettings = lsSettingsConfig.availableSettings;

        var getSettingName = function(name){
          return prefix + name;
        };

        svc.getSetting = function(name) {
            if (svc.availableSettings[name] === undefined){return;}
            var sname = getSettingName(name);
            var storageValue = storage.getItem(sname);
            if (storageValue === null){
                svc.setSetting(name, svc.availableSettings[name]);
                return svc.availableSettings[name];
            }
            return JSON.parse(storageValue);
        };

        svc.setSetting = function(name, value) {
            if (svc.availableSettings[name] === undefined){return;}
            var sname = getSettingName(name);
            return storage.setItem(sname, JSON.stringify(value));
        };

        svc.resetSettings = function() {
            var s = _.keys(svc.availableSettings);
            angular.forEach(availableSettings, function(value, key) {
                svc.setSetting(key, svc.availableSettings[key]);
            });
        };

        svc.allSettings = function() {
            var out = {};
            angular.forEach(svc.availableSettings, function(value, key) {
                out[key] = svc.getSetting(key);
            });
            return out;
        };

        svc.setting = function(name, value) {
            if (arguments.length == 1) {
                return svc.getSetting(name);
            }
            if (arguments.length == 2){
                return svc.setSetting(name, value);
            }
        };

        return svc;

    } ]);

}());
