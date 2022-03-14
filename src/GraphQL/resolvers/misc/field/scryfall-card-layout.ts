// import HTTPError from '../../../../types/classes/HTTPError.js';
import ScryfallCard from '../../../../types/interfaces/ScryfallCard.js';

export default function (
  document: ScryfallCard
  // context: any,
  // info: any
) {
  switch (document.layout) {
    // case 'normal':
    //   return 'NormalCard';
    case 'split':
      return 'SplitCard';
    case 'flip':
      return 'FlipCard';
    case 'transform':
      return 'TransformCard';
    case 'modal_dfc':
      return 'ModalDoubleFacedCard';
    case 'meld':
      return 'MeldCard';
    // case 'leveler':
    //   return 'LevelerCard';
    // case 'class':
    //   return 'ClassCard';
    // case 'saga':
    //   return 'SagaCard';
    case 'adventure':
      return 'AdventureCard';
    // case 'planar':
    //   return 'PlanarCard';
    // case 'scheme':
    //   return 'SchemeCard';
    // case 'vanguard':
    //   return 'VanguardCard';
    // case 'token':
    //   return 'TokenCard';
    case 'double_faced_token':
      return 'DoubleFacedTokenCard';
    // case 'emblem':
    //   return 'EmblemCard';
    // case 'augment':
    //   return 'AugmentCard';
    // case 'host':
    //   return 'HostCard';
    // case 'art_series':
    //   return 'ArtSeriesCard';
    case 'reversible_card':
      return 'ReversibleCard';
    default:
      return 'GenericCard';
  }

  // throw new HTTPError('Invalid type.', 500);
}
