# @philippklodt/update-by-scope

CLI tool for updating multiple packages of the same scope(s) simultaneously.
* Cross-platform
* Supports multiple scopes

Forked from https://www.npmjs.com/package/update-by-scope.

## Usage

```
npx @philippklodt/update-by-scope <scopeA [scopeB ...]>
```

or (after `npm install --save-dev @philippklodt/update-by-scope`)

```
update-by-scope <scopeA [scopeB ...]>
```

Will perform `npm update --no-save` on the provided scopes.

_If you have any ideas on how to improve the tool, feel free to open an issue or a PR._
