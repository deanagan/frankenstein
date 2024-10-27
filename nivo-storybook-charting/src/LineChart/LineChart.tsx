import { ResponsiveLine, Serie } from '@nivo/line'
import { useState } from 'react';

type LineChartData = Serie & { color?: string };

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
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
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
        />
    );
}

const LineChart = (lineChartData: LineChartProps) => {
    return (<div style={{ height: 400, width: 800 }}><WrappedResponsiveLine {...lineChartData} /></div>);
};

export default LineChart;