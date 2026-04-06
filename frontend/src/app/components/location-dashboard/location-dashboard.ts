import { Component } from '@angular/core';

@Component({
  selector: 'app-location-dashboard',
  imports: [],
  templateUrl: './location-dashboard.html',
  styleUrl: './location-dashboard.css',
})
export class LocationDashboard {
  northKiosk = { latitude: 45.5, longitude: -92.7 };
  eastKiosk = { latitude: 44.4, longitude: -90.5 };
  southKiosh = { latitude: 43.9, longitude: -92.1 };
  westKiosk = { latitude: 44.6, longitude: -93.5 };
  emergencyService = { latitude: 44.7, longitude: -92.0 };
  maintenanceStationA = { latitude: 44.1, longitude: -92.2 };
  maintenanceStationB = { latitude: 42.5, longitude: -91.5 };
}
