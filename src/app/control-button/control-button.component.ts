import { Component, Input, OnInit } from '@angular/core';
import { FeatureStore } from '../services/feature-store.service';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss']
})
export class ControlButtonComponent implements OnInit {

  @Input() name: string;
  @Input() isActive: boolean;

  constructor(public store: FeatureStore) { }

  ngOnInit(): void {
  }

  selectControl(): void {
    this.store.setCurrentState(this.name);
  }

}
