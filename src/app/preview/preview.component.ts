import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeatureStore } from '../services/feature-store.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @ViewChild('preview') previewElement: ElementRef<HTMLInputElement>;

  constructor(public store: FeatureStore) { }

  ngOnInit(): void {
    
  }
}
