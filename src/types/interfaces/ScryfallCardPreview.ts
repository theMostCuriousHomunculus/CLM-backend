interface ScryfallCardPreview {
  // The date this card was previewed.
  previewed_at?: Date;
  // The name of the source that previewed this card.
  source?: string;
  // A link to the preview for this card.
  source_uri?: string;
}

export default ScryfallCardPreview;
