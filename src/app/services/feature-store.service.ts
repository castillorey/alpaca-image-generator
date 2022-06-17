import { Injectable } from '@angular/core';
import { Feature } from '../models/feature.model';
import { State } from './state';
import { Store } from './store';
import collection from '../utils/data.json';
import { Alpaca } from '../models/alpaca.model';
import { Control } from '../models/control.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureStore extends Store<State> {

  constructor() { 
    super(new State());
  }

  public getFeatures() {
    const features : Feature[] = [...collection.data.map(feature => {
      let defaultStyle = feature.styles.find(style => style.name == 'default');
      if(!defaultStyle)
        defaultStyle = feature.styles[0];
        
      return {
        ...feature,
        activeStyle: defaultStyle
      }
    })]
    const currentFeature: Feature = features[0];
    this.setState({...this.state, features, currentFeature});
  }

  public setInitialAlpaca() {
    const features : Feature[]= [...this.state.features];
    let alpaca : Alpaca = {
      hair: "",
      ears: "",
      eyes: "",
      mouth: "",
      nose: "../assets/images/alpaca/nose.png",
      neck: "",
      leg: "",
      accessories: "",
      backgrounds: ""
    };
    //To initialize alpaca's default values
    features.forEach(feature => {
      switch (feature.name) {
        case 'hair':
          alpaca.hair = feature.activeStyle!.value;
          break;
        case 'ears':
          alpaca.ears = feature.activeStyle!.value;
          break;
        case 'eyes':
          alpaca.eyes = feature.activeStyle!.value;
          break;
        case 'mouth':
          alpaca.mouth = feature.activeStyle!.value;
          break;
        case 'neck':
          alpaca.neck = feature.activeStyle!.value;
          break;
        case 'leg':
          alpaca.leg = feature.activeStyle!.value;
          break;
        case 'accessories':
          alpaca.accessories = feature.activeStyle!.value;
          break;
        case 'backgrounds':
          alpaca.backgrounds = feature.activeStyle!.value;
          break;
      }
    });
    this.setState({...this.state, alpaca});
  }

  public setCurrentFeature(name: string): boolean {
    const feature = this.state.features.find(feature => feature.name === name);
    if(!feature)
      return false;

    this.setState({...this.state, currentFeature: feature});
    return true;
  }

  private setCurrentStyle(name: string) : boolean {
    let currentFeature : Feature = {...this.state.currentFeature};
    const style : Control | undefined = currentFeature.styles.find(style => style.name === name);
    currentFeature.activeStyle = style;
    if(!style)
      return false;
    this.setState({...this.state, currentFeature});

    //This is to keep the last actived style when selecting another feature
    const features : Feature[] = [...this.state.features];
    const featureIndex : number = features.findIndex(e => e.name == currentFeature.name);
    features[featureIndex].activeStyle = style; 
    this.setState({...this.state, features});

    this.setAlpacaState(currentFeature.name, style.value);
    return true;
  }

  public setAlpacaState(name: string, value: string){
    let alpaca : Alpaca = {...this.state.alpaca};
    alpaca[name as keyof Alpaca] = value;

    this.setState({...this.state, alpaca});
  }

  public setCurrentState(name: string): void {
    if(!this.setCurrentFeature(name))
      this.setCurrentStyle(name);
  }

}