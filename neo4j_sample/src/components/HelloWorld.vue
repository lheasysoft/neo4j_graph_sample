<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Click on the button to try to use Neo4J
      <button v-on:click="runNeo" >Start Neo</button>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { testNeo4J } from '@/typescript/neo4j/neoBase';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private runNeo () {
    testNeo4J();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
