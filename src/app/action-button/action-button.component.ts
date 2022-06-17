import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Output() clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onClick() : void {
    this.clickEvent.emit();
  }
}
