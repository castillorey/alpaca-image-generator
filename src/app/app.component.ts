import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from "@angular/core";
import { Alpaca } from "./models/alpaca.model";
import { Control } from "./models/control.model";
import { FeatureStore } from "./services/feature-store.service";
import html2canvas from "html2canvas"; 
import { PreviewComponent } from "./preview/preview.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild('preview') previewComponent: PreviewComponent;
  
  constructor(public store: FeatureStore, private renderer: Renderer2) {}

  ngOnInit() {
    this.store.getFeatures();
  }

  public getRandom = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  public randomizeImage(): void {
    let alpaca: Alpaca = <Alpaca> {
      nose: "../assets/images/alpaca/nose.png"
    };
    this.store.state.features.forEach((feature) => {
      const randomStyle: Control = feature.styles[this.getRandom(feature.styles.length)];
      alpaca[feature.name as keyof Alpaca] = randomStyle.value
    });
    this.store.setAlpacaState(alpaca);
  }

  public downloadImage(){    
    html2canvas(this.previewComponent.previewElement.nativeElement).then(canvas => {
      const imageUrl: string = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");

      const anchor = document.createElement('a');
      anchor.href = imageUrl;
      anchor.download = 'alpaca.png';
      anchor.click();
    });
  }
}