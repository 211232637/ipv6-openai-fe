<template>
  <v-container fluid>
   
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Acces",
          align: "center",
          margin: 40,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
      },
      series: [44, 55, 41, 17],
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
