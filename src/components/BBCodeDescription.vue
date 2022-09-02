<!-- <template>
<div class="px-4 py-2 " v-html="parsedDescription">

</div>
</template>

<script>
import bbCodeParser from 'js-bbcode-parser';

export default {
  data() {
    return {
      parsedDescription: '',
    };
  },
  props: {
    description: {
      type: String,
    }
  },
  created(){
      this.parsedDescription = bbCodeParser.parse(this.description)
  }
}
</script> -->