#!/usr/bin/env node
var diff = require("diff");
var fs = require("fs");

function applyPatch(patchFile) {
  var patch = fs.readFileSync(patchFile, "utf8");

  var sourceFileMatch = /--- ([^ \n\r]+).*/.exec(patch);
  var sourceFile;
  if (sourceFileMatch && sourceFileMatch[1]) {
    sourceFile = sourceFileMatch[1];
  } else {
    throw Error("Unable to find source file in '" + patchFile + "'");
  }
  var destinationFileMatch = /\+\+\+ ([^ \n\r]+).*/.exec(patch);
  var destinationFile;
  if (destinationFileMatch && destinationFileMatch[1]) {
    destinationFile = destinationFileMatch[1];
  } else {
    throw Error("Unable to find destination file in '" + patchFile + "'");
  }

  var original = fs.readFileSync(sourceFile, "utf8");
  var patched = diff.applyPatch(original, patch);

  if (patched === false) {
    throw Error("Failed apply patch '" + patchFile + "' to '" + sourceFile + "'");
  } else if (sourceFile !== destinationFile) {
    console.log("Applied '" + patchFile + "' to '" + sourceFile + "' and stored it as '" +
      destinationFile + "'");
  } else {
    console.log("Applied '" + patchFile + "' to '" + sourceFile + "'");
  }

  fs.writeFileSync(destinationFile, patched);
}

module.exports.applyPatch = applyPatch;

if (require.main === module) {
  var argv = process.argv;
  for (var i = 2; i < argv.length; i++) {
    applyPatch(argv[i]);
  }
}
