import { Component, Input } from '@angular/core';
import { InputType } from '../../model/shared.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'toyrem-input',
  templateUrl: './toyrem-input.component.html'
})
export class ToyremInputComponent {
  @Input() label: string;
  @Input() type: InputType;
  @Input() key: string;
  @Input() form: FormGroup;
}