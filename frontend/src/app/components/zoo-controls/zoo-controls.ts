import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ZooService } from '../../services/zoo-service';
import { AuthService } from '../../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Animal } from '../../models/animal';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-zoo-controls',
  imports: [CommonModule, FormsModule],
  templateUrl: './zoo-controls.html',
  styleUrl: './zoo-controls.css',
})
export class ZooControls {
  @Input() status : string = '';
  @Input() visitors : string = '';
  @Input() animals!: Animal[];

  @Output() visitorUpdate = new EventEmitter<number>();
  @Output() statusUpdate = new EventEmitter<string>();
  @Output() animalUpdate = new EventEmitter<void>();

  constructor(private zooService: ZooService, public authService: AuthService) {}

  updateZooStatus(newStatus: string)
  {
    this.zooService.updateStatus(newStatus).subscribe({
      next: () => {
        let animalUpdates = this.animals.map(animal => 
          this.zooService.updateAnimalStatus(animal.id, newStatus));

          let requests = [...animalUpdates];

          if (newStatus = "Closed")
          {
            requests.push(this.zooService.updateVisitors(0));
          }

          forkJoin(requests).subscribe(() => {
            this.statusUpdate.emit();
            this.animalUpdate.emit();
            this.visitorUpdate.emit();
          });
      }
    });
  }

  updateVisitorCount(form: NgForm)
  {
    if (form.invalid || this.status == "Closed")
    {
      return;
    }

    let newCount = form.value.visitorCount;
    this.zooService.updateVisitors(newCount).subscribe({
      next: () => {
        this.visitorUpdate.emit();
      }
    });

    form.resetForm();
    console.log(newCount);
  }
}
