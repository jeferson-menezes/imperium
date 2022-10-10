<template>
    <q-page class="flex flex-center">
        <apexchart
            type="area"
            width="600"
            :options="chartOptions"
            :series="series"
        ></apexchart>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomePage",

    setup() {
        const generateDayWiseTimeSeries = (
            baseval: number,
            count: number,
            yrange: {
                min: number;
                max: number;
            }
        ) => {
            let i = 0;
            const series = [];
            while (i < count) {
                const x = baseval;
                const y =
                    Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
                    yrange.min;

                series.push([x, y]);
                baseval += 86400000;
                i++;
            }
            return series;
        };

        const series = [
            {
                name: "South",
                data: generateDayWiseTimeSeries(
                    new Date("11 Feb 2017 GMT").getTime(),
                    20,
                    {
                        min: 10,
                        max: 60,
                    }
                ),
            },
            {
                name: "North",
                data: generateDayWiseTimeSeries(
                    new Date("11 Feb 2017 GMT").getTime(),
                    20,
                    {
                        min: 10,
                        max: 20,
                    }
                ),
            },
            {
                name: "Central",
                data: generateDayWiseTimeSeries(
                    new Date("11 Feb 2017 GMT").getTime(),
                    20,
                    {
                        min: 10,
                        max: 15,
                    }
                ),
            },
        ];

        const chartOptions = {
            chart: {
                type: "area",
                height: 500,
                stacked: true,
                events: {},
            },
            colors: ["#008FFB", "#00E396", "#CED4DC"],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8,
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "left",
            },
            xaxis: {
                type: "datetime",
            },
        };

        return { chartOptions, series };
    },
});
</script>
