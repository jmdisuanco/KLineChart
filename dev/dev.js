/**
 * This is dev demo
 */

import { init } from '../src/index'
import QuickSettings from './quicksettings.min.js'

const loadData = async (c)=>{
  
  //  { close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 }
  let response = await fetch('https://cex.io/api/ohlcv/hd/20200513/BTC/USD')
  let data = await response.json()
  let chartdata= JSON.parse(data.data1m).map(o=> {
    //ohlcv
    return { timestamp: o[0] * 1000, close: o[4], high: o[2], low: o[3], open: o[1],  volume:o[5]}
})

  c.applyNewData(chartdata)
}

const chart = init('Chart')
loadData(chart)

// UI Controls
const parent = document.getElementById('control')
const indicatorControl = QuickSettings.create(1, 1, 'Candle Indicator', parent); //main chart
const graphicMarkControl = QuickSettings.create(1, 90, 'Graphic Marks', parent);
const chartTypeControl = QuickSettings.create(1, 790, 'Chart Type', parent);
const chartIndicator = QuickSettings.create(window.innerWidth - 210, 1, 'Chart Indicators', parent); 
const chartActiveIndicatorControl = QuickSettings.create(window.innerWidth - 410, 1, 'Active Indicators', parent); 

const indicators=['NO' , 'MA' , 'EMA' , 'VOL' , 'MACD' , 'BOLL' , 'KDJ' , 'RSI' , 'BIAS' , 'BRAR' , 'CCI' , 'DMI' , 'CR' , 'PSY' , 'DMA' , 'TRIX' , 'OBV' , 'VR' , 'WR' , 'MTM' , 'EMV' , 'SAR']
const graphicMarks = ['horizontalStraightLine' , 'verticalStraightLine' , 'straightLine' , 'horizontalRayLine' , 'verticalRayLine' , 'rayLine' , 'horizontalSegmentLine' , 'verticalSegmentLine' , 'segmentLine' , 'priceLine' , 'priceChannelLine' , 'parallelStraightLine' , 'fibonacciLine']
const chartTypes = ['candle_stick','real_time']
let activeIndicators=[]



const getIndicatorInfo =(tag)=>{
  const chartIndicators = chart._chartSeries._technicalIndicatorSeries
  
  let selectedIndicator = chartIndicators.find(function (o) { return o._tag === tag  })
  return selectedIndicator
}





  /**
 * function callback that handles candle 
 * @param {*} option 
 */
const handleCandleStickTechnicalIndicatorSelector = (option)=>{
  chart.setCandleStickTechnicalIndicatorType(option.value)

}

const handleChartTypeSelector = (option)=>{
  chart.setCandleStickChartType(option.value) 
}

const updateActiveIndicatorControl=()=>{
  let tag =''
  let idx = 0
  let selectedIndicator = {}
  let currentParams =[]
  let drawControl =(option)=>{
    let {index, value} = option     
    tag= value
    idx = index -1
    let param = []
    selectedIndicator = getIndicatorInfo(tag)
    let indicator = selectedIndicator._technicalIndicatorType
    console.log(indicator)
    currentParams = selectedIndicator._chartData._technicalIndicatorParamOptions[indicator]
    chartActiveIndicatorControl.removeControl('Parameter 1')
    chartActiveIndicatorControl.removeControl('Parameter 2')
    chartActiveIndicatorControl.removeControl('Parameter 3')
    chartActiveIndicatorControl.removeControl('Parameter 4')
    currentParams.forEach((i,idx)=>{
      param.push(i)
      chartActiveIndicatorControl.addNumber(`Parameter ${idx+1}`, 0, 100, i, 1, (val)=>{param[idx] = val })
    })
    chartActiveIndicatorControl.addButton('Set Parameter',()=>{chart.setTechnicalIndicatorParams(indicator,param)})
  }

  chartActiveIndicatorControl.removeControl('active indicators')
  chartActiveIndicatorControl.removeControl('Remove')
 

  chartActiveIndicatorControl.addDropDown('active indicators', activeIndicators, drawControl)
  chartActiveIndicatorControl.addButton('Remove',()=>{
    chart.removeTechnicalIndicator(tag)
    activeIndicators.shift(idx,1)
    updateActiveIndicatorControl()
  })

  
  
}



const handleAddChartIndicator =(option)=>{
 let tag =  chart.addTechnicalIndicator(option.value,undefined,true)
 activeIndicators.push(tag)
 updateActiveIndicatorControl()
}


//Populate the UI Controls

//candle indicators
indicatorControl.addDropDown('Candle indicator', indicators, handleCandleStickTechnicalIndicatorSelector);

//add GraphicMarks buttons
graphicMarks.forEach(gm=>{
  graphicMarkControl.addButton(gm, ()=>{chart.addGraphicMark(gm) });  
})
graphicMarkControl.addButton('Remove all Graphic Marks', ()=>{chart.removeAllGraphicMark()})


//chart type
chartTypeControl.addDropDown('Chart Type',chartTypes, handleChartTypeSelector)


//chart indicators 
indicators.forEach((i)=>{
  chartIndicator.addButton(i,  handleAddChartIndicator);  
})