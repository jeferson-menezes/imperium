<template>
    <apexchart type="donut" height="370" :options="chartOptions" :series="series"></apexchart>
</template>

<script lang="ts">
import { toReal } from 'src/model/currency-helper';
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'DonutChart',
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
        const series = computed(() => Object.values(props.data))

        const chartOptions = computed(() => {
            return {
                labels: Object.keys(props.data),
                chart: {
                    type: 'donut',
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val: number) {
                            return toReal(val)
                        }
                    }
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 350
                            },
                            legend: {
                                position: 'right'
                            }
                        }
                    }
                ]
            }
        });

        return { series, chartOptions }
    },
})
</script>
