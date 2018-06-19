"use strict";

exports.options = {
  "valuesToSkip":    [null, undefined, ''],
  "depthIndicator":  "=>",
  "defaultValue":     "",
};

/**
 * Picks a valid value from the list of object paths.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
exports.pick = function(obj, listOfObjectPaths) {
  // Loop through the list
  for (var i = 0; i < listOfObjectPaths.length; i++) {
    var objectPath = listOfObjectPaths[i];

    // Parse the object path into an array
    var pathParts = objectPath.split(exports.options.depthIndicator);

    // iteratively check to see if this object key/path exists and if the value is valid
    var objPointer = obj;
    for (var j = 0; j < pathParts.length; j++) {
      var pathPart = pathParts[j];

      if (typeof objPointer[pathPart] == 'undefined') {
        // this path doesn't exist, so let's stop iterating
        break;
      }

      // move the reference pointer
      objPointer = objPointer[pathPart];

      // if this is the last path part, validate the value
      if (j + 1 >= pathParts.length) {
        if (exports.options.valuesToSkip.includes(objPointer)) {
          break;
        }

        // we found the appropriate value to pick. return it.
        return objPointer;
      }
    }
  }

  // if we get here, none of the object paths worked. return some default value.
  return exports.options.defaultValue
};
