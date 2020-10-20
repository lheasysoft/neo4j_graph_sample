import { BaseModel } from '@/typescript/abstract/BaseModel';
import { NeoResult } from '@/typescript/abstract/NeoResult';

export class LocationModel implements BaseModel {
  public static Label = 'Location';
  public get Type() { return LocationModel.Label };
  private _locationName: string;
  public get Name() { return this._locationName };
  public readonly UtmLat: number;
  public readonly UtmLong: number;

  constructor(locationName: string, utmLat: number, utmLong: number) {
    this._locationName = locationName;
    this.UtmLat = utmLat;
    this.UtmLong = utmLong;
  }

  public setName(locationName: string) {
    this._locationName = locationName;
  }

  static fromNeo(neoLocationResult: NeoResult<NeoResultLocation>): LocationModel {
    const props = neoLocationResult.properties;
    return new LocationModel(props.name, props.loc.x, props.loc.y);
  }
}

interface NeoResultLocation {
  name: string;
  loc: any;
}
