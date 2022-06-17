import { Injectable } from "@angular/core";
import { Feature } from "../models/feature.model";
import { State } from "./state";
import { Store } from "./store";
import collection from "../utils/data.json";
import { Alpaca } from "../models/alpaca.model";
import { Control } from "../models/control.model";

@Injectable({
  providedIn: "root",
})
export class FeatureStore extends Store<State> {
  constructor() {
    super(new State());
  }

  public getFeatures() {
    let alpaca: Alpaca = <Alpaca> {
      nose: "../assets/images/alpaca/nose.png"
    };
    const features: Feature[] = [
      ...collection.data.map((feature) => {
        let defaultStyle = feature.styles.find(
          (style) => style.name == "default"
        );
        if (!defaultStyle) defaultStyle = feature.styles[0];

        //To initialize alpaca's default values
        alpaca[feature.name as keyof Alpaca] = defaultStyle.value;

        return {
          ...feature,
          activeStyle: defaultStyle,
        };
      }),
    ];
    const currentFeature: Feature = features[0];
    this.setState({ ...this.state, features, currentFeature, alpaca });
  }

  public setCurrentFeature(name: string): boolean {
    const feature = this.state.features.find(
      (feature) => feature.name === name
    );
    if (!feature) return false;

    this.setState({ ...this.state, currentFeature: feature });
    return true;
  }

  private setCurrentStyle(name: string): boolean {
    let currentFeature: Feature = { ...this.state.currentFeature };
    const style: Control | undefined = currentFeature.styles.find(
      (style) => style.name === name
    );
    currentFeature.activeStyle = style;
    if (!style) return false;

    //This is to keep the last actived style when selecting another feature
    const features: Feature[] = [...this.state.features];
    const featureIndex: number = features.findIndex(
      (e) => e.name == currentFeature.name
    );
    features[featureIndex].activeStyle = style;
    this.setState({ ...this.state, currentFeature, features });

    this.setAlpacaProperty(currentFeature.name, style.value);
    return true;
  }

  private setAlpacaProperty(name: string, value: string) : void {
    let alpaca: Alpaca = { ...this.state.alpaca };
    alpaca[name as keyof Alpaca] = value;

    this.setState({ ...this.state, alpaca });
  }

  public setAlpacaState(alpaca: Alpaca) : void {
    this.setState({ ...this.state, alpaca });
  }

  public setCurrentState(name: string): void {
    if (!this.setCurrentFeature(name)) this.setCurrentStyle(name);
  }
}
