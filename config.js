System.config({
  baseURL: "dist/",
  defaultJSExtensions: true,
  transpiler: "false",
  typescriptOptions: {
    "tsconfig": true
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "main": "bootstrap",
      "format": "system",
      "defaultExtension": "js"
    }
  },

  map: {
    "@angular/common": "npm:@angular/common@2.0.0-rc.0",
    "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
    "@angular/core": "npm:@angular/core@2.0.0-rc.0",
    "@angular/http": "npm:@angular/http@2.0.0-rc.0",
    "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@2.0.0-rc.0",
    "@angular/platform-server": "npm:@angular/platform-server@2.0.0-rc.0",
    "@angular/router": "npm:@angular/router@2.0.0-rc.0",
    "@angular/upgrade": "npm:@angular/upgrade@2.0.0-rc.0",
    "es6-promise": "npm:es6-promise@3.1.2",
    "es6-shim": "github:es-shims/es6-shim@0.35.0",
    "reflect-metadata": "npm:reflect-metadata@0.1.3",
    "rxjs": "npm:rxjs@5.0.0-beta.7",
    "zone.js": "npm:zone.js@0.6.12",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:@angular/common@2.0.0-rc.0": {
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/compiler@2.0.0-rc.0": {
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/core@2.0.0-rc.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "rxjs": "npm:rxjs@5.0.0-beta.6",
      "zone.js": "npm:zone.js@0.6.12"
    },
    "npm:@angular/http@2.0.0-rc.0": {
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "rxjs": "npm:rxjs@5.0.0-beta.6"
    },
    "npm:@angular/platform-browser-dynamic@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/platform-browser@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/platform-server@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0"
    },
    "npm:@angular/router@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0"
    },
    "npm:@angular/upgrade@2.0.0-rc.0": {
      "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:es6-promise@3.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:rxjs@5.0.0-beta.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.0.0-beta.7": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:zone.js@0.6.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
