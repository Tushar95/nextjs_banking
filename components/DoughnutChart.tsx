'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
    const data = {
        labels : ['bank 1', 'bank 2', 'bank 3'],
        datasets: [
            {
                label: '# of banks',
                data: [1250, 2500, 2400],
                backgroundColor: [
                    '#747b6',
                    '#2265d8',
                    '#2f91fa'
                ]
            }
        ]
    }
  return (
    <Doughnut data={data}
    options = {
        {
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    } />
  )
}

export default DoughnutChart