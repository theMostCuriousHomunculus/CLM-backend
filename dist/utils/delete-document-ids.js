export default function deleteDocumentIDs(copiedObjectWithID) {
  if (
    copiedObjectWithID != null &&
    typeof copiedObjectWithID !== 'string' &&
    typeof copiedObjectWithID !== 'number' &&
    typeof copiedObjectWithID !== 'boolean'
  ) {
    if (!Array.isArray(copiedObjectWithID)) {
      delete copiedObjectWithID._id;
      for (const key in copiedObjectWithID) {
        deleteDocumentIDs(copiedObjectWithID[key]);
      }
    } else {
      for (const element of copiedObjectWithID) {
        deleteDocumentIDs(element);
      }
    }
  }
}
//# sourceMappingURL=delete-document-ids.js.map
