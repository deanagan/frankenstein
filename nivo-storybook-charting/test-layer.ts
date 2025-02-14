const CustomTooltipLayer = ({ points }) => {
  return (
    <g>
      {points.map(point => (
        <g key={point.id}>
          {point.isHover && ( // Custom hover condition
            <foreignObject x={point.x + 10} y={point.y - 40} width={100} height={50}>
              <div
                style={{
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '5px',
                  pointerEvents: 'none',
                }}
              >
                <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
              </div>
            </foreignObject>
          )}
        </g>
      ))}
    </g>
  );
};

const MyLineChart = () => (
  <ResponsiveLine
    data={data}
    layers={['grid', 'axes', 'lines', CustomHoverLayer, CustomTooltipLayer, 'legends']}
  />
);