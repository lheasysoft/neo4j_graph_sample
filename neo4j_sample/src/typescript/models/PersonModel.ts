import { BaseModel } from '@/typescript/abstract/BaseModel';
import { NeoResult } from '@/typescript/abstract/NeoResult';

export class PersonModel implements BaseModel {
  public static Label = 'Person';
  public get Type(): string { return PersonModel.Label };
  private _name: string;
  public get Name() { return this._name };
  private _age?: number;
  public get Age(): number | null { return this._age ?? null };

  constructor(name: string, age: number | null = null) {
    this._name = name;
    if (age != null) {
      this._age = age;
    }
  }

  static fromNeo(neoPersonResult: NeoResult<NeoResultPerson>): PersonModel {
    return new PersonModel(neoPersonResult.properties.name);
  }

  public toNeoNode(identifier: string | null = null): string {
    let identifierCode = '';
    if (identifier != null && identifier.trim().length > 0) {
      identifierCode = `${identifier}:`;
    }
    return `(${identifierCode}${PersonModel.Label} {name: ${this.Name})`;
  }
}

interface NeoResultPerson {
  name: string;
}
