import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ZooService } from '../../services/zoo-service';
import { AuthService } from '../../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Animal } from '../../models/animal';
import { forkJoin, Observable, map } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-zoo-controls',
  imports: [CommonModule, FormsModule],
  templateUrl: './zoo-controls.html',
  styleUrl: './zoo-controls.css',
})
export class ZooControls {
  @Input() status$! : Observable<string>;
  @Input() visitors$! : Observable<string>;
  @Input() animals$!: Observable<Animal[]>;

  constructor(private zooService: ZooService, public authService: AuthService) {}

  updateZooStatus(newStatus: string) {
    this.zooService.updateStatus(newStatus).pipe(
    switchMap(() => this.animals$.pipe(take(1))), // ✅ only once
    switchMap(animals => {
      const requests = animals.map(animal =>
        this.zooService.updateAnimalStatus(animal.id, newStatus)
      );

      return forkJoin(requests); // ✅ wait for all
    })
  ).subscribe(() => {
    if (newStatus === "Closed") {
        this.zooService.updateVisitors(0);
    }

    this.zooService.loadZooStatus();
    this.zooService.loadAnimals(); // ✅ only once AFTER all updates
  });
}

  updateVisitorCount(form: NgForm)
  {
    this.status$.pipe(take(1)).subscribe(status => {
      if (form.invalid || status == "Closed")
      {
        return;
      }

      let newCount = form.value.visitorCount;
      this.zooService.updateVisitors(newCount);

      form.resetForm();
      console.log(newCount);
    })
  }
}
