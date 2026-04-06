import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZooPage } from './pages/zoo-page/zoo-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZooPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('frontend');
}
