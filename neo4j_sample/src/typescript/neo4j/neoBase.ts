
import * as neo4j from 'neo4j-driver';
import { PersonModel } from '@/typescript/models/PersonModel';

export class NeoBase {
  private URL = 'neo4j://localhost';
  private USERNAME = 'neo4j';
  private PASSWORD = '1234';
  private DATABASE = 'ImageLink';

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
    })

    session
      .run(`MATCH p = (:${PersonModel.Label}) RETURN NODES(p)`)
      .then(result => {
        // result.records.forEach(record => {
        result.records.forEach(record => {
          console.log('Person: ' + record);
          console.log('Name: ' + record.get('name'))
        })
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => session.close())

    return [];
  }

  public createPerson(person: PersonModel): PersonModel | null {
    const session = this._driver.session({
      // database: this.DATABASE,
      defaultAccessMode: neo4j.session.WRITE
    });

    session
      .run(`MERGE (p:${PersonModel.Label} {name : $nameParam}) RETURN p`, {
        nameParam: person.Name
      })
      .then(result => {
        result.records.forEach(record => {
          console.log('Person erstellt.');
          console.log(record);
          console.log('Name: ' + record.get('name'));
        })
      })
      .catch(error => {
        console.log(error)
      })
      .then(
        () => session.close()
      );

    return null;
  }
}

export function testNeo4J() {
  const neo = new NeoBase();
  neo.getPersonen();

  // const person = new PersonModel('Thomas');
  // neo.createPerson(person);
}
