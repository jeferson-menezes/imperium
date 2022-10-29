<template>
    <apexchart ref="spark" type="area" height="60" :options="chartOptions" :series="series"></apexchart>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'AreaChart',
    props: {
        data: Object,
        color: String
    },
    setup(props) {
        const series = computed(() => [
            {
                data: props.data,
            },
        ])

        const chartOptions = {
            chart: {
                type: "area",
                height: 160,
                sparkline: {
                    enabled: true,
                },
            },
            colors: [`${props.color}`],
            stroke: {
                curve: "straight",
            },
            fill: {
                opacity: 0.3,
                type: "gradient",
                gradient: {
                    shade: "dark",
                    gradientToColors: ["#fdd535"],
                    shadeIntensity: 1,
                    type: "vertical",
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100],
                },
            },
            xaxis: {
                crosshairs: {
                    width: 1,
                },
            },
            yaxis: {
                min: 0,
            },
            title: {
                offsetX: 0,
                style: {
                    fontSize: "24px",
                },
            },
            subtitle: {
                offsetX: 0,
                style: {
                    fontSize: "14px",
                },
            },
        }
        return { chartOptions, series }
    },
})
</script>
