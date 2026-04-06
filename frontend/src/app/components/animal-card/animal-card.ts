import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-card.html',
  styleUrls: ['./animal-card.css'],
})
export class AnimalCard {
  @Input() animal!: Animal
}
