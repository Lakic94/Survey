import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  Validators,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { MetadataService } from './metadata.service';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  constructor(private metaService: MetadataService) {}

  toFormGroup(questions: any) {
    const group: any = {};
    questions.forEach(element => {
      if (element.required === true) {
        if (element.questionType === 'Checkbox') {
          group[element.title] = new FormArray([], this.minSelected(1));
          element.options.map(i => {
            i = new FormControl(null);
            (group[element.title] as FormArray).push(i);
          });
        } else {
          group[element.title] = new FormControl('', Validators.required);
        }
      } else {
        if (element.questionType === 'Checkbox') {
          group[element.title] = new FormArray([], null);
          element.options.map(i => {
            i = new FormControl(null);
            (group[element.title] as FormArray).push(i);
          });
        } else {
          group[element.title] = new FormControl('');
        }
      }
    });

    return new FormGroup(group);
  }

  minSelected(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }
}
