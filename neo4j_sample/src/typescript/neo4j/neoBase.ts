
import * as neo4j from 'neo4j-driver';
import { PersonModel } from '@/typescript/models/PersonModel';
import { BaseModel } from '@/typescript/abstract/BaseModel';
import { LocationModel } from '@/typescript/models/LocationModel';
import { ImageModel } from '@/typescript/models/ImageModel';

export class NeoBase {
  private URL = 'neo4j://localhost';
  private USERNAME = 'neo4j';
  private PASSWORD = '1234';

  private _driver: neo4j.Driver;

  constructor() {
    this._driver = neo4j.driver(this.URL, neo4j.auth.basic(this.USERNAME, this.PASSWORD))
  }

  public closeConnection() {
    this._driver.close();
  }

  public getPersonen(): PersonModel[] {
    const session = this._driver.session({
      defaultAccessMode: neo4j.session.READ
    });

    const personen: PersonModel[] = [];
    session
      .run(`MATCH (p:${PersonModel.Label}) RETURN p as person`)
      .then(result => {
        result.records.forEach(record => {
          const p = record.get('person');
          personen.push(PersonModel.fromNeo(p));
          // console.log('Person: ');
          // console.log(p);
          // console.log('Name: ' + p.properties.name);
        })
      })
      .catch(error => {
        console.warn(error)
      })
      .then(() => session.close())

    return personen;
  }

  public createPerson(person: PersonModel): boolean {
    const session = this._driver.session({
      defaultAccessMode: neo4j.session.WRITE
    });

    let success = false;
    session
      .run(`MERGE (p:${PersonModel.Label} {name : $nameParam}) RETURN p as person`, {
        nameParam: person.Name
      })
      .then(result => {
        result.records.forEach(record => {
          success = true;
          const personNeu = record.get('person');
          console.log('Person erstellt.');
          console.log('Name: ' + personNeu.properties.name);
        })
      })
      .catch(error => {
        console.log(error)
      })
      .then(
        () => session.close()
      );

    return success;
  }

  public powerSearchName(search: string): BaseModel[] {
    const session = this._driver.session({
      defaultAccessMode: neo4j.session.READ
    });

    const nodes: BaseModel[] = [];

    search = search.trim();
    if (search.length < 1) {
      return nodes;
    }

    session
      .run('MATCH (p) WHERE p.name =~ $regex RETURN p as node', {
        regex: `(?i).*${search}.*`
      })
      .then(result => {
        result.records.forEach(record => {
          const node = record.get('node');
          switch (node.labels[0]) {
            case PersonModel.Label:
              nodes.push(PersonModel.fromNeo(node));
              break;
            case LocationModel.Label:
              nodes.push(LocationModel.fromNeo(node));
              break;
            case ImageModel.Label:
              nodes.push(ImageModel.fromNeo(node));
              break;
            default:
              break;
          }
          // personen.push(PersonModel.fromNeo(node));
          // console.log('Person: ');
          // console.log(node);
          // console.log('Name: ' + node.properties.name);
        })
      })
      .catch(error => {
        console.warn(error)
      })
      .then(() => session.close())

    return nodes;
  }
}
