/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-176fe0b1'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "layouts/footer.html.ejs",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }, {
    "url": "layouts/i18n.html",
    "revision": "c20373972ba21e164d14aa3e3a268efc"
  }, {
    "url": "layouts/nav.html.ejs",
    "revision": "5caf0129ccbd3b1a54a8d96926cb30a7"
  }, {
    "url": "layouts/project.html.ejs",
    "revision": "5e9d77bb7bb0ef3dde7d4fffdc9342df"
  }, {
    "url": "layouts/project_title.html.ejs",
    "revision": "e2c92c9bdfea6e0dca44b893943ca8eb"
  }, {
    "url": "layouts/status_icon.html",
    "revision": "5d338d5f7410790dbedce191cbce9fd0"
  }, {
    "url": "list-project.html.ejs",
    "revision": "985c75fe456266290e9d4eea350d4fc3"
  }, {
    "url": "list.html.ejs",
    "revision": "826408feebbce9ba34100e8ad7dee323"
  }, {
    "url": "main.css",
    "revision": "2f9b7133657f354e2c5c2560dcde5127"
  }, {
    "url": "main.js",
    "revision": "53184e91a191b3174174d8a8795b4d16"
  }, {
    "url": "post.html.ejs",
    "revision": "deb4535482da62d67c7b26ca2e0c3e1a"
  }, {
    "url": "root.ejs",
    "revision": "16233da79aa513bf6ce005e0332e7de8"
  }], {});

}));
