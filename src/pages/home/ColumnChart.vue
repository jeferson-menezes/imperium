<template>
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script lang="ts">
import { toReal } from 'src/model/currency-helper'
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
            name: 'Total',
            data: Object.values(props.data)
        }])

        const chartOptions = computed(() => {
            return {
                chart: {
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        distributed: true,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    },
                    formatter: toReal,
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val: number) {
                            return toReal(val)
                        }
                    }
                },
                legend: {
                    show: false
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    categories: Object.keys(props.data),
                    labels: {
                        show: false,
                        position: 'top',
                        style: {
                            fontSize: '9px'
                        }
                    }
                }
            }
        })

        return { series, chartOptions }
    },
})
</script>
