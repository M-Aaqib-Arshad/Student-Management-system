import React, { useEffect, useRef } from 'react'
import Chart from '../../../../node_modules/chart.js/auto';

export default function Index() {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    useEffect(()=>{
     if(chartInstance.current){
        chartInstance.current.destroy()
     }
     const myChartRef = chartRef.current.getContext("2d")
     chartInstance.current = new Chart(myChartRef,{
        type:"line",
        data:{
            labels:['january','Feburary','March','April','May'],
            datasets:[
                {
                    label:"Line Chart",
                    data:[65,34,65,34,56],
                   fill: false,
                   borderColor:'rgb(75,192,192',
                   borderwidth:2
                   
                }
            ]
        }
     })
     return()=>{
        if(chartInstance.current){
            chartInstance.current.destroy()
        }
     }

    },[])
    
    return (
        <main>
           <div style={{height:"500px"}}>
            <canvas ref={chartRef} style={{width:"300px",height:"200px" }} />
           </div>
        </main>
    )
}
