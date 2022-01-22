import mongoose from 'mongoose';

import Location from '../../types/interfaces/Location';

const LocationSchema = new mongoose.Schema<Location>(
  {
    type: {
      default: 'Point',
      type: String
    },
    coordinates: {
      type: [Number],
      validate: {
        message:
          'Coordinates is an array with two numbers, the first longitude (-180, 180) and the second latitude (-90, 90).',
        validator: function (value: [number, number]) {
          if (
            value.length !== 2 ||
            value[0] < -180 ||
            value[0] > 180 ||
            value[1] < -90 ||
            value[1] > 90
          ) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  },
  {
    _id: false
  }
);

export default LocationSchema;
