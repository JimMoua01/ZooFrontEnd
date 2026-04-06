import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-statistic-dashboard',
  imports: [CommonModule],
  templateUrl: './statistic-dashboard.html',
  styleUrls: ['./statistic-dashboard.css'],
})
export class StatisticDashboard {
  @Input() animals : Animal[] = [];

  totalAnimals = 0;
  totalSpecies = 0;
  openedAnimals = [""];
  closedAnimals = [""];
  healthyAnimals =[""];
  sickAnimals = [""];

  ngOnChanges() {
    this.totalAnimals = this.animals.reduce((total, animal) => total + animal.count, 0);
    this.totalSpecies = this.animals.length;
    this.openedAnimals = this.animals.filter(animal => animal.status === "Open").map(name => " " + name.species);
    this.closedAnimals = this.animals.filter(animal => animal.status === "Closed").map(name => " " + name.species);
    this.healthyAnimals = this.animals.filter(animal => animal.health === "Healthy").map(name => " " + name.species);
    this.sickAnimals = this.animals.filter(animal => animal.health === "Sick").map(name => " " + name.species);
  }
}
