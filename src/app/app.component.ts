import { Component, OnInit } from '@angular/core';
import { FeatureStore } from './services/feature-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public store: FeatureStore) {}

  ngOnInit(){
    this.store.getFeatures();
    this.store.setInitialAlpaca();
  }
}
