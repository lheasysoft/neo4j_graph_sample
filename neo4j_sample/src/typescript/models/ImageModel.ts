import { BaseModel } from '@/typescript/abstract/BaseModel';
import { NeoResult } from '@/typescript/abstract/NeoResult';

export class ImageModel implements BaseModel {
  public static Label = 'Image';
  public get Type() { return ImageModel.Label };
  private _name: string;
  public get Name() { return this._name };
  private _fileSource: string;
  public get FileSource() { return this._fileSource };

  constructor(name: string, fileSource: string) {
    this._name = name;
    this._fileSource = fileSource;
  }

  static fromNeo(neoImageResult: NeoResult<NeoResultImage>): ImageModel {
    return new ImageModel(neoImageResult.properties.name, neoImageResult.properties.src);
  }
}

interface NeoResultImage {
  name: string;
  src: string;
}
