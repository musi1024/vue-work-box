/**
 * @NOTE add this in package.json scripts
 * "build-prod": "cross-env VUE_APP_VCONSOLE=false vue-cli-service build",
 **/
import vconsoleReloadPlugin from '../un/vconsoleReloadPlugin';
if (process.env.VUE_APP_VCONSOLE !== 'false') {
  if (!/localhost/.test(window.location.origin)) {
    const VConsole = require('vconsole');
    const vc = new VConsole();
    vc.addPlugin(vconsoleReloadPlugin(VConsole));
  }
}
