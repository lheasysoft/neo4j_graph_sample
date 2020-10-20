
export class PersonModel {
  public static Label = "Person";
  private _name: string;
  public get Name() {return this._name};
  private _age?: number;
  public get Age(): number | null {return this._age?? null};

  constructor(name: string, age: number | null = null) {
    this._name = name;
    if(age != null){
      this._age = age;
    }
  }

  static fromNeo(neoResult: any): PersonModel{
    return new PersonModel(neoResult.name);
  }
}
