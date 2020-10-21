<template>
  <main>
    <section class="search">
      <h1>What do you need to find?</h1>
      <input type="text" v-model="searchString" v-on:keyup="startPowersearch" >
      <section class="results">
        <ul>
          <li v-for="result in searchResults" v-bind:key="result.Name" v-on:click="selectNode(result)">
            {{result.Name}}
          </li>
        </ul>
      </section>
    </section>
    <display-node-master v-if="isNodeSelected" v-bind:node="selectedNode">
    </display-node-master>
    <section class="tests">
      <p>
        Click on the button to try to use Neo4J
        <button v-on:click="runNeo" >Start Neo</button>
      </p>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { NeoBase } from '@/typescript/neo4j/neoBase';
import { PersonModel } from '@/typescript/models/PersonModel';
import { BaseModel } from '@/typescript/abstract/BaseModel';
import DisplayNodeMaster from '@/components/DisplayNodeMaster.vue';
@Component({
  components: { DisplayNodeMaster }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private searchString = '';
  private neo: NeoBase = new NeoBase();
  private searchResults: BaseModel[] = [];
  private selectedNode: BaseModel | null = null;

  private runNeo () {
    // neo.getPersonen();
    const person = new PersonModel('Wolfgang');
    this.neo.createPerson(person);
  }

  private startPowersearch() {
    if (this.searchString.trim().length < 1) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.neo.powerSearchName(this.searchString);
  }

  private selectNode(node: BaseModel) {
    this.selectedNode = node;
  }

  private deselectNode() {
    this.selectedNode = null;
  }

  private get isNodeSelected (): boolean {
    return this.selectedNode != null;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: square;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
