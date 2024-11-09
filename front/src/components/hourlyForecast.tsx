import {FC, useEffect, useState} from "react";
import {IHourlyForecastProps} from "../types/types.ts";
import {getWeatherFromLocalStorage} from "../services/localStorageManager.ts";
import Chart from 'react-apexcharts';

const HourlyForecast : FC<IHourlyForecastProps> = ({localStorageUpdated}) => {
    const [labels, setLabels] = useState<string[]>([]);
    const [temperatureData, setTemperatureData] = useState<number[]>([]);

    useEffect(() => {
        const weatherData = getWeatherFromLocalStorage();
        setLabels(weatherData.list.map(element =>
            element.dt_txt.split(' ')[1].slice(0, -3)
        ));
        setTemperatureData(weatherData.list.map(element => element.main.temp));
    }, [localStorageUpdated]);

    const chartOptions = {
        chart: {
            id: 'temperature-chart',
        },
        xaxis: {
            categories: labels,
            title: { text: 'Time (Hours)',
            },
        },
        yaxis: {
            title: {
                text: 'Temperature (°C)',
            },
        }
    };

    const chartSeries = [
        {
            name: 'Temperature',
            data: temperatureData,
        }
    ]

    return <Chart options={chartOptions} series={chartSeries} type={'bar'} height={300} width={500}/>
    // return <Line data={chartData}/>
    // return <Line data={chartData} options={options} />;
}

export default HourlyForecast;