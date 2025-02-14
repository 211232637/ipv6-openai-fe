<template>
  <div>
    <v-carousel cycle :height="$vuetify.breakpoint.mdAndUp ? '600' : '300'" hide-delimiter-background
      show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-row class="mt-1">
      <v-col cols="12" md="6">
        <div class="grey lighten-2" style="min-height: 400px;"></div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="grey lighten-2" style="min-height: 400px;"></div>
      </v-col>
    </v-row>
    <v-row class="mt-1">
      <v-col cols="12">
        <div class="grey lighten-2" style="min-height: 400px;"></div>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'grey lighten-2',
        'grey lighten-2', 'grey lighten-2', 'grey lighten-2', 'grey lighten-2',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  mounted() {

  },
  methods: {
    showToast() {
      this.$evenBus.$emit('toast', 'warning', 'asd');
    }
  }
};
</script>

<style></style>
