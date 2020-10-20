
export class ImageModel {
  public static Label = "Image";
  private _fileSource: string;
  public get FileSource() {return this._fileSource};

  constructor(fileSource: string) {
    this._fileSource = fileSource;
  }

  static fromNeo(neoResult: any): ImageModel{
    return new ImageModel(neoResult.src);
  }

}
