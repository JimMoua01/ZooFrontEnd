import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZooService {
  private animalList = new BehaviorSubject<Animal[]>([]);
  private zooStatus = new BehaviorSubject<string>("");
  private visitorCount = new BehaviorSubject<string>("");

  animals$ = this.animalList.asObservable();
  zooStatus$ = this.zooStatus.asObservable();
  visitorCount$ = this.visitorCount.asObservable();

  // api = "http://localhost:3000";
  // api = "https://localhost:7297/api/zoo"
  // api = "https://ntczoobackend.onrender.com";
  api = "https://zoobackendapi.onrender.com/api/zoo"

  constructor(private http: HttpClient) {
    this.loadZooStatus();
    this.loadVisitorCount();
    this.loadAnimals();
  }

  loadAnimals() {
    this.http.get<Animal[]>(`${this.api}/animalData`).subscribe(data => {
      this.animalList.next(data.sort((a, b) => a.id - b.id));
    });
  }

  loadZooStatus() {
    (this.http.get(`${this.api}/zooStatus`, { responseType: 'text' as const })).subscribe(data => {
      this.zooStatus.next(data);
    });
  }

  loadVisitorCount() {
    (this.http.get(`${this.api}/visitorCount`, {responseType: 'text' as const})).subscribe(data => {
      this.visitorCount.next(data);
    })
  }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.api}/animalData`);
  }

  addAnimal(animal: object) {
    this.http.post(`${this.api}/animalData/add`, animal).subscribe(() => {
      this.loadAnimals();
    });
  }

  updateAnimalStatus(animalId: number, newStatus: string)
  {
    return this.http.put(`${this.api}/animalData/${animalId}/status`, { status : newStatus });
  }

  getStatus(): Observable<string> {
    return this.http.get(`${this.api}/zooStatus`, { responseType: 'text' as const });
  }

  updateStatus(status: string) {
    return this.http.put(`${this.api}/zooStatus/change`, { newStatus : status }, {responseType: 'text'});
  }
  
  getVisitors(): Observable<string> {
    return this.http.get(`${this.api}/visitorCount`, {responseType: 'text' as const});
  }

  updateVisitors(count: number) {
    (this.http.put(`${this.api}/visitorCount/change`, { newCount : count })).subscribe(() => {
      this.loadVisitorCount();
    });
  }
}
