
export class LocationModel {
  public static Label = "Location";
  private _locationName: string;
  public get LocationName() {return this._locationName};
  public readonly UtfLat: number;
  public readonly UtfLong: number;

  constructor(locationName: string, utfLat: number, utfLong: number) {
    this._locationName = locationName;
    this.UtfLat = utfLat;
    this.UtfLong = utfLong;
  }

  public setName(locationName: string) {
    this._locationName = locationName;
  }

  static fromNeo(neoResult: any): LocationModel {
    return new LocationModel(neoResult.name, neoResult.lat, neoResult.long);
  }
}
