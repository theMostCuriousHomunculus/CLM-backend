interface DocumentObject extends Object {
  [key: string]: any;
}

export default function deleteDocumentIDs(copiedObjectWithID: DocumentObject) {
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
