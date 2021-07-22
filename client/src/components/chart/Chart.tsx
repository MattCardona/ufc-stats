import { ResponsiveBar, } from '@nivo/bar'
import "./Chart.styles.scss"

interface DataFormat {
  "catagory": string,
  'Sig.Str_Landed': string | number
  'Sig.Str_Absorbed': string | number
}


interface Data {
  data: DataFormat[] | any,
  text?: string
}

const MyResponsiveBar = ({ data }: Data) => (
  <div className="chart">
    <ResponsiveBar
      data={data}
      keys={['Sig.Str_Landed', 'Sig.Str_Absorbed']}
      indexBy={'catagory'}
      groupMode="grouped"
      margin={{ top: 70, right: 130, bottom: 50, left: 100 }}
      padding={0.3}
      innerPadding={1}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={["#00ffc3", "#bdff5b"]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      enableGridY={false}
      gridYValues={[0, 1, 2, 3, 4, 5, 6, 7]}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Strike Per Min',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={
        [
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 90,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
    />
  </div>
)

export default MyResponsiveBar;