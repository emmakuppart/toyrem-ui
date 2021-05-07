import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { CategoriesEntity } from './categories.models';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  getCategories(): Observable<CategoriesEntity[]> {
    return this.apiService.get<CategoriesEntity[]>('/category')
  }
}