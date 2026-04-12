import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-statistic-dashboard',
  imports: [CommonModule],
  templateUrl: './statistic-dashboard.html',
  styleUrls: ['./statistic-dashboard.css'],
})
export class StatisticDashboard {
  @Input() animals$! : Observable<Animal[]>;

  totalAnimals$!: Observable<number>;
  totalSpecies$!: Observable<number>;
  openedAnimals$!: Observable<string[]>;
  closedAnimals$!: Observable<string[]>;
  healthyAnimals$!: Observable<string[]>;
  sickAnimals$!:  Observable<string[]>;

  ngOnChanges() {
    this.totalAnimals$ = this.animals$!.pipe(
      map(animals => animals.reduce((total, animal) => total + Number(animal.count), 0))
    );

    this.totalSpecies$ = this.animals$!.pipe(
      map(animals => animals.length)
    );

    this.openedAnimals$ = this.animals$.pipe(
      map(animals => animals.filter(animal => animal.status === "Open").map(name => " " + name.species)) 
    );

    this.closedAnimals$ = this.animals$.pipe(
      map(animals => animals.filter(animal => animal.status === "Closed").map(name => " " + name.species)) 
    );

    this.healthyAnimals$ = this.animals$.pipe(
      map(animals => animals.filter(animal => animal.health === "Healthy").map(name => " " + name.species)) 
    );

    this.sickAnimals$ = this.animals$.pipe(
      map(animals => animals.filter(animal => animal.health === "Sick").map(name => " " + name.species)) 
    );
  }
}
