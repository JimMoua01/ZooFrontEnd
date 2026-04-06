import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ZooService } from '../../services/zoo-service';
import { AuthService } from '../../services/auth-service';
import { Animal } from '../../models/animal';
import { AnimalCard } from '../../components/animal-card/animal-card';
import { LocationDashboard } from '../../components/location-dashboard/location-dashboard';
import { StatisticDashboard } from '../../components/statistic-dashboard/statistic-dashboard';
import { AddAnimalForm } from "../../components/add-animal-form/add-animal-form";
import { ZooControls } from '../../components/zoo-controls/zoo-controls';
import { ZooForms } from '../../components/zoo-forms/zoo-forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-zoo-page',
  standalone: true,
  imports: [CommonModule, AnimalCard, LocationDashboard, StatisticDashboard, AddAnimalForm, ZooControls, ZooForms],
  templateUrl: './zoo-page.html',
  styleUrls: ['./zoo-page.css'],
})
export class ZooPage {
  animals: Animal[] = [];
  status: string = '';
  visitors: string = '';
  isLoggedIn: boolean = false;

  constructor(private zooService: ZooService, public authService: AuthService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAnimals();
    this.loadStatus();
    this.loadVisitors();
  }

  onAnimalAdded() {
    this.loadAnimals();
  }

  onVisitorUpdate() {
    this.loadVisitors();
  }

  onZooStatusUpdate() {
    this.loadStatus();
  }

  loadAnimals() {
    this.zooService.getAnimals().subscribe(data => {
      console.log("Animals from the API: ", data);
      this.animals = data.sort((a, b) => a.id - b.id);
      this.cd.detectChanges();
    });
  }

  loadStatus() {
   this.zooService.getStatus().subscribe(data => {
    console.log("Current Zoo Status: ", data);
    this.status = data;
    this.cd.detectChanges();
   });
  }

  loadVisitors() {
    this.zooService.getVisitors().subscribe(data => {
      console.log("Current Visitor Count: ", data);
      this.visitors = data;
      this.cd.detectChanges();
    });
  }
}
