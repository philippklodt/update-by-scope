const Path = require("path");
const spawn = require("cross-spawn");

const scopes = process.argv.slice(2);

if (scopes.some(scope => scope[0] !== "@")) {
  console.error(`Scopes should start with "@"`);
  return;
}

const { dependencies = {}, devDependencies = {} } = require(Path.join(
  process.cwd(),
  "./package.json"
));

const packageNames = Array.from(
  new Set(
    [...Object.keys(dependencies), ...Object.keys(devDependencies)].filter(
      pkgName => scopes.some(scope => pkgName.startsWith(scope))
    )
  )
).sort();

if (!packageNames.length) {
  console.log(`Found 0 packages with scopes "${scopes}"`);
  return;
}

console.log(`Found ${packageNames.length} with scopes "${scopes}":`);
console.log(packageNames);
console.log(`Executing "npm update --no-save ${packageNames.join(" ")}"`);

spawn("npm", ["update", "--no-save", ...packageNames], {
  stdio: "inherit"
});
