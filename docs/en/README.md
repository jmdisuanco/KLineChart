## Getting started
### Installation
```bash
npm install klinecharts --save
```

### Create your first chart
```js
import { init } from 'klinecharts'
// init
const chart = init('container_id')
// Add data
chart.applyNewData([
  { close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
  { close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
  { close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
  { close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
  { close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
  { close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
  { close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
  { close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
  { close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
  { close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 }
])
```

## API
### Chart
```js
// Initialize a chart
// ds can be one of div node, node id and node class
// options style configuration, please refer to style details
init(ds, options)

// Destroy a chart. Once destroyed, the chart will no longer be available.
// dcs can be one of div node, node id, node class and chart instance
dispose(dcs)

// Get the version number of the chart
version()
```

### Chart instance
```js
// Set style configuration
// options style configuration, please refer to style details
setStyleOptions(options)

// Get style configuration
getStyleOptions()

// Set parameters of technical indicators
// technicalIndicatorType Technical indicator type, for details of the type, please refer to technical indicator
// params technical index calculation parameters, please refer to technical index parameters for details
setTechnicalIndicatorParams(technicalIndicatorType, params)

// Get all technical index parameters
getTechnicalIndicatorParamOptions()

// Set precision
// pricePrecision price accuracy, which affects the numerical accuracy of the price displayed on the entire chart, also includes technical indicators MA, EMA, BOLL, SAR, excluding the y-axis scale value
// volumePrecision quantity accuracy, which affects the numerical accuracy of the price displayed on the entire chart, also includes the technical indicator VOL, excluding the y-axis scale value
setPrecision(pricePrecision, volumePrecision)

// Set the time zone
// timezone time zone name, such as 'Asia/Shanghai'
// If not set, it will automatically get the local time zone
// Please refer to the list of names corresponding to the time zone to find related documents
setTimezone(timezone)

// Adjust the size of the chart, it will always fill the size of the container
// Note: This method will recalculate the size of each module of the entire chart, frequent calls may affect performance, please call carefully
resize()

// Set the gap that can be left on the right side of the chart
setOffsetRightSpace(space)

// Set the minimum number of candles visible on the left
setLeftMinVisibleBarCount(barCount)

// Set the minimum number of candles visible on the right
setRightMinVisibleBarCount(barCount)

// Set the space occupied by a piece of data in the chart
setDataSpace(space)

// Add new data
// This method will clear the chart data, no need to call the clearData method
// dataList is a KLineData array. For details of KLineData type, please refer to the data source
// more tells the chart whether there is more historical data, can be default, the default is true
applyNewData(dataList, more)

// Add more historical data
// dataList is a KLineData array. For details of KLineData type, please refer to the data source
// more tells the chart whether there is more historical data, can be default, the default is true
applyMoreData(dataList, more)

// update data
// At present, only the timestamp of the last piece of data will be matched.
updateData(data)

// Get the current data source of the chart
getDataList()

// Clear data
// In general, clearing data is to add new data. In order to avoid repeated drawing, all here is just to clear the data, the chart will not be redrawn
clearData()

// Set to load more callback functions
// cb is a callback method, the callback parameter is the timestamp of the first piece of data
loadMore(cb)

// Set candle chart type
// The types are 'candle_stick' and 'real_time'
setCandleStickChartType(chartType)

// Set the type of technical indicator on the candlestick
// theoretically support all technical indicators supported by the current chart
// Generally speaking, just set 'NO', 'MA', 'EMA', 'BOLL', 'SAR', when set to 'NO' it will not be displayed
setCandleStickTechnicalIndicatorType(technicalIndicatorType)

// Add technical indicator chart
// technicalIndicatorType Technical indicator type, please refer to the technical indicators for details, can default, the default is 'MACD'
// height The height of the technical indicator chart, which can be the default, the default is 100
// Whether the dragEnabled technical indicator graph can be dragged to adjust the height, which can be the default and the default is true
// The return value is a string-type technical indicator chart identifier, which is very important, and some subsequent operations on the chart require this identifier
addTechnicalIndicator(technicalIndicatorType, height, dragEnabled)

// Set the indicator type of other technical indicator graphs
// technicalIndicatorType Technical indicator type. When technicalIndicatorType is 'NO', the chart will remove the current technical indicator chart. For details of the type, please refer to technical indicators
// tag technical indicator chart identification
setTechnicalIndicatorType(tag, technicalIndicatorType)

// Remove the technical indicator graph
// tag technical indicator chart identification
removeTechnicalIndicator(tag)

// Add graphic mark
// Input parameter type:
// 'none', 'horizontalStraightLine', 'verticalStraightLine', 'straightLine', 'horizontalRayLine'
// 'verticalRayLine', 'rayLine', 'horizontalSegmentLine', 'verticalSegmentLine', 'segmentLine'
// 'priceLine', 'priceChannelLine', 'parallelStraightLine', 'fibonacciLine'
addGraphicMark(graphicMarkType)

// remove all graphics marks
removeAllGraphicMark()

// Get the picture url after the chart is converted into a picture
// Whether includeFloatLayer needs to include floating layer, can be default
// includeGraphicMark, default
// type The type of the converted picture. The type is one of three types: 'png', 'jpeg', and 'bmp'. It can be the default, and the default is 'jpeg'
// backgroundColor background color, can be default, the default is '# 333333'
getConvertPictureUrl(includeFloatLayer, includeGraphicMark, type, backgroundColor)
```

## Data source
The chart data source needs a specific format, and the single data format is as follows：
```js
{ open, close, high, low, volume, turnover, timestamp }
```
The timestamp needs ```milliseconds```, others need the ```number``` type,
The turnover field is not necessary, but if you need to display the ```moving average``` of the time-sharing chart and the technical indicator ```EMV```,
you need to fill in the data for this field.

## Technical indicator
The chart supports 21 technical indicators, the following are the types and calculation parameters:
<table>
    <tbody>
        <tr>
            <th>Type</th>
            <th>MA</th>
            <th>EMA</th>
            <th>VOL</th>
            <th>MACD</th>
            <th>BOLL</th>
            <th>KDJ</th>
        </tr>
        <tr>
            <th>Parameters</th>
            <th>[5,10,30,60]</th>
            <th>[6,12,20]</th>
            <th>[5,10,20]</th>
            <th>[12,26,9]</th>
            <th>[20]</th>
            <th>[9,3,3]</th>
        </tr>
        <tr>
           <th>Type</th>
           <th>RSI</th>
           <th>BIAS</th>
           <th>BRAR</th>
           <th>CCI</th>
           <th>DMI</th>
           <th>CR</th>
        </tr>
        <tr>
            <th>Parameters</th>
            <th>[6,12,24]</th>
            <th>[6,12,24]</th>
            <th>[26]</th>
            <th>[13]</th>
            <th>[14,6]</th>
            <th>[26,10,20,40,60]</th>
        </tr>
        <tr>
            <th>Type</th>
            <th>PSY</th>
            <th>DMA</th>
            <th>TRIX</th>
            <th>OBV</th>
            <th>VR</th>
            <th>WR</th>
        </tr>
        <tr>
            <th>Parameters</th>
            <th>[12]</th>
            <th>[10,50,10]</th>
            <th>[12,20]</th>
            <th>[30]</th>
            <th>[24,30]</th>
            <th>[13,34,89]</th>
        </tr>
        <tr>
            <th>Type</th>
            <th>MTM</th>
            <th>EMV</th>
            <th>SAR</th>
        </tr>
        <tr>
            <th>Parameters</th>
            <th>[6,10]</th>
            <th>[14,9]</th>
            <th>[2,2,20]</th>
        </tr>
    </tbody>
</table>

## Style option
For full configuration please see [here](../style.md).


## Hot key
Currently only supports moving and zooming.
+ ```shift + ←``` shift left
+ ```shift + →``` shift right
+ ```shift + ↑``` zoom out
+ ```shift + ↓``` zoom in

