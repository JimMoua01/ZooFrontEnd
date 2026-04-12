import { Component, EventEmitter, Output, Input, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ZooService } from '../../services/zoo-service';
import { Animal } from '../../models/animal';

import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-animal-form',
  imports: [FormsModule],
  templateUrl: './add-animal-form.html',
  styleUrl: './add-animal-form.css',
})
export class AddAnimalForm {

  @Input() animals$!: Observable<Animal[]>;
  @ViewChild('imageInput') imageInput!: ElementRef;

  constructor(private zooService: ZooService, private cdr: ChangeDetectorRef) {}

  imageError = false;
  newAnimal = {
    // id: 0,
    name: '',
    species: '',
    count: 0,
    gender: 'Male',
    health: 'Healthy',
    status: 'Open',
    longitude: 0,
    latitude: 0,
    feeding: '',
    image : ''
  };

  submitAnimal(form: NgForm) {
    this.imageError = this.newAnimal.image === "";
    if (form.invalid || !this.newAnimal.image) {
        return;
      }

    this.zooService.addAnimal(this.newAnimal);

    form.resetForm({
      animalName: "",
      animalSpecies: "",
      animalCount: null,
      animalGender: "Male",
      animalHealth: "Healthy",
      animalStatus: "Open",
      animalLongitude: null,
      animalLatitude: null,
      animalFeedingTime: ""
    });

    this.newAnimal.gender = "Male";
    this.newAnimal.image = "";
    this.imageInput.nativeElement.value = "";
  };

  async onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.newAnimal.image = await this.readFileAsDataURL(file);
      this.cdr.detectChanges();
    }
    else {
      this.newAnimal.image = "";
      this.cdr.detectChanges();
    }
  };

  readFileAsDataURL (file: File): Promise<string>  {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
  };


};
