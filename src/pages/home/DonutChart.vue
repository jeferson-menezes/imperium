<template>

    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>

</template>

<script lang="ts">
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
                chart: { type: 'donut' },
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
