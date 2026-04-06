import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-zoo-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zoo-forms.html',
  styleUrl: './zoo-forms.css',
})
export class ZooForms {
  selectedForm: string = 'member';

  submitForm(form: NgForm){
    form.resetForm();
  };

}


