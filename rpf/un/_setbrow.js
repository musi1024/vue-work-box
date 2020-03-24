const fs = require('fs');
const path = require('path');
const pkgPath = path.resolve(process.cwd(), './package.json');
const brConfigPath = path.resolve(process.cwd(), './.browserslistrc');

const config = `
> 1%
ios >= 9
android >= 5
chrome >= 36
not dead
not op_mini all
`;

if (!fs.existsSync(pkgPath)) {
  console.log('package.json 不存在，请在项目根目录中运行');
} else {
  if (fs.existsSync(brConfigPath)) {
    console.log('set .browserslistrc');
    fs.writeFileSync(brConfigPath, config.trim());
  } else {
    console.log('set browserslist in package.json');
    const pkg = fs.readFileSync(pkgPath, 'utf-8');
    const pkgJSON = JSON.parse(pkg);
    if (pkgJSON.browserslist && pkgJSON.browserslist.production) {
      pkgJSON.browserslist.production = config.trim().split('\n');
    } else {
      pkgJSON.browserslist = config.trim().split('\n');
    }
    fs.writeFileSync(pkgPath, JSON.stringify(pkgJSON, null, 2));
  }
}
