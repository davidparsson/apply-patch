apply-patch
===========

A npm package for applying patches to files, based on [diff](https://www.npmjs.com/package/diff).

Usage
-----

`apply-patch` can be used from node.js as a regular package:

```JavaScript
var applyPatch = require("apply-patch").applyPatch;
applyPatch("path/to/file.patch");
```

`apply-patch` can also be used as a comand line tool:

```
npm install -g apply-patch
apply-patch path/to/file.patch
```

License
-------
[MIT](LICENSE)