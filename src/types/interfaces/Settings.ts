import MeasurementSystem from '../enums/MeasurementSystem';

export default interface Settings {
  location_services: boolean;
  measurement_system: MeasurementSystem;
  radius: number;
}
