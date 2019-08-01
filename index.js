const Path = require("path");
const ChildProcess = require("child_process");

const scopes = process.argv.slice(2) || ["@semvox", "@semvox-ai"];

for (let scope of scopes) {
  if (scope[0] !== "@") {
    console.error(`Scopes should start with "@"`);
    return;
  }
}

const { dependencies = {}, devDependencies = {} } = require(Path.join(
  process.cwd(),
  "./package.json"
));

const packageNames = Array.from(
  new Set(
    [...Object.keys(dependencies), ...Object.keys(devDependencies)].filter(_ =>
      _.startsWith(scope)
    )
  )
).sort();

if (!packageNames.length) {
  console.log(`Found 0 packages with scope "${scope}"`);
  return;
}

console.log(`Found ${packageNames.length} with scope "${scope}":`);
console.log(packageNames);
console.log(`Executing "npm update --no-save ${packageNames.join(" ")}"`);

ChildProcess.spawnSync("npm", ["update", "--no-save", ...packageNames], {
  stdio: "inherit"
});
