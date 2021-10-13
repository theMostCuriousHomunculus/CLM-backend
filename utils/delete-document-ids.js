export default function deleteDocumentIDs (copiedObjectWithID) {
  if (
    copiedObjectWithID != null &&
    typeof(copiedObjectWithID) != 'string' &&
    typeof(copiedObjectWithID) != 'number' &&
    typeof(copiedObjectWithID) != 'boolean'
  ) {
    if (!Array.isArray(copiedObjectWithID)) {
      delete copiedObjectWithID._id;
      for (const key in copiedObjectWithID) {
        deleteDocumentIDs(copiedObjectWithID[key]); // recursive del calls on object elements
      }
    }
    else {
      for (const element of copiedObjectWithID) {
        deleteDocumentIDs(element); // recursive del calls on array elements
      }
    }
  }
}