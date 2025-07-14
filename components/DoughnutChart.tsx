'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({accounts} : DoughnutChartProps) {
    const accountNames = accounts.map((a) => a.name);
    const balances = accounts.map((a) => a.currentBalance);
    const data = {
        labels : accountNames,
        datasets: [
            {
                label: '# of banks',
                data: balances,
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