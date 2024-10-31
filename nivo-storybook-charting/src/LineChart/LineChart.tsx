import { ResponsiveLine, Serie, CustomLayerProps } from '@nivo/line';

import { useState } from 'react';

type LineChartData = Serie & { color?: string };

// Use below to customise tooltip
// const CustomTooltip = ({ point }) => {
//     return (
//         <div style={{ padding: "10px", background: "#fff", border: "1px solid #ccc" }}>
//             <strong>{point.data.x}</strong>
//             <div>Y: {point.data.y}</div>
//             <div>Info: {point.data.info}</div> {/* Additional info */}
//         </div>
//     );
// };

const CustomBackgroundLayer: React.FC<CustomLayerProps> = ({ yScale, innerWidth }) => {
    const yScaleFn = yScale as (value: number) => number;

    return (
        <>
            {/* Blue zone from y = 0 to y = 600 */}
            <rect
                x={0}
                y={yScaleFn(80)}       // y-axis value where the blue zone starts
                width={innerWidth}        // Full chart width
                height={yScaleFn(0) - yScaleFn(80)} // From y = 4 down to y = 0
                fill="blue"
                opacity={0.2}
            />

            {/* Label background and text for the blue region */}
            <rect
                x={-72}                              // Offset to the left of y-axis
                y={yScaleFn(80)}                 // Center background vertically within region
                width={50}                           // Width of the label background
                height={84}                          // Height of the label background
                fill="blue"                          // Background color matching the rectangle
                opacity={0.3}
            />

            {/* Label to the left of the y-axis */}
            <text
                x={-40}                            // Position label to the left of the y-axis
                y={yScaleFn(40)}                      // Center label within the rectangle
                fill="blue"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12px"
            >
                LZ
            </text>

            {/* Green zone from y = 600 to y = 900 */}
            <rect
                x={0}
                y={yScaleFn(200)}       // y-axis value where the green zone starts
                width={innerWidth}        // Full chart width
                height={yScaleFn(80) - yScaleFn(200)} // From y = 10 down to y = 4
                fill="green"
                opacity={0.2}
            />

            {/* <rect
                x={-60}
                y={yScaleFn(7) - 10}                 // Center background vertically within region
                width={50}
                height={20}
                fill="green"
                opacity={0.3}
            /> */}

            {/* Label to the left of the second rectangle */}
            <text
                x={-50}                            // Position label to the left of the y-axis
                y={yScaleFn(200)}                      // Center label within the rectangle
                fill="green"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12px"
            >
                HZ
            </text>
        </>
    );
};


export type LineChartProps = {
    data: LineChartData[];
    curve?: 'linear' | 'monotoneX' | 'step';
};

const WrappedResponsiveLine = ({ data, curve }: LineChartProps) => {
    const [visibleSeries, setVisibleSeries] = useState<boolean[]>(new Array(data.length).fill(true));
    console.log(visibleSeries)
    const toggleSeriesVisibility = (index: number) => {
        setVisibleSeries((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index]; // Toggle visibility
            return newVisibility;
        });
    };

    const filteredData = data.map((serie, index) => ({
        ...serie,
        color: visibleSeries[index] ?
            serie.color : 'transparent',
    }));

    console.log(filteredData)
    return (
        <ResponsiveLine
            data={filteredData}
            // colors={['green', 'red', 'yellow', 'blue', 'orange']}
            colors={filteredData.map((datum) => datum.color || '#0000')}
            areaBlendMode="normal"
            curve={curve}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                //stacked: true, // we want this if we want the lines to add up in value
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 20, // rotate to fit
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45, // rotate to fit
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableArea={true}
            enableTouchCrosshair={true}
            //tooltip={CustomTooltip} // TODO: Use your custom tooltip component
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    onClick: (e) => {
                        const index = data.findIndex(serie => serie.id === e.id);
                        toggleSeriesVisibility(index);
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            layers={[
                CustomBackgroundLayer, // Add custom background layer first
                'grid',                // Optional grid layer
                'markers',
                'axes',
                'lines',
                'points',
                'slices',
                'mesh',
                'legends'
            ]}
        />
    );
}

const LineChart = (lineChartData: LineChartProps) => {
    return (<div style={{ height: 400, width: 900 }}><WrappedResponsiveLine {...lineChartData} /></div>);
};

export default LineChart;