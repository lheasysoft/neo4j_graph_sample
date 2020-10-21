<template>
    <article class="nodeFull">
      <header>
        <h2>{{node.Name}}</h2>
        <p class="nodeTypeCaption">{{node.Type}}</p>
      </header>
      <section class="nodeInformation">
<!--        Use a Switch to display the specific information of that node-type-->
      </section>
      <section class="nodeRelations">

      </section>
    </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { NeoBase } from '@/typescript/neo4j/neoBase';
import { BaseModel } from '@/typescript/abstract/BaseModel';

@Component
export default class DisplayNodeMaster extends Vue {
  @Prop() private node!: BaseModel;
  private neo: NeoBase = new NeoBase();

  private deselectNode() {
    this.$emit('deselectNode');
  }
}
</script>

<style scoped>

</style>
