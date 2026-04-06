import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZooService {

  // api = "http://localhost:3000";
  api = "http://localhost:5230/api/zoo"
  // api = "https://ntczoobackend.onrender.com";

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.api}/animalData`);
  }

  addAnimal(animal: object) {
    return this.http.post(`${this.api}/animalData/add`, animal);
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
    return this.http.put(`${this.api}/visitorCount/change`, { newCount : count });
  }
}
