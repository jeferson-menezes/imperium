<template>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'ColumnChart',
    props: {
        data: {
            type: Object,
            required: true
        },
        color: {
            type: String
        }
    },
    setup(props) {
        const series = computed(() => [{
            data: Object.values(props.data)
        }])

        const chartOptions = computed(() => {
            return {
                chart: {
                    height: 350,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: Object.keys(props.data),
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            }
        })

        return { series, chartOptions }
    },
})
</script>
