import { ResponsivePie } from '@nivo/pie'
import "./PieChart.styles.scss"

interface Strike {
  id: string,
  label: string,
  value?: string | number | null
}

interface TakeDown {
  id: string,
  label: string,
  value?: string | number | null
}


interface PieData {
  data: Strike[] | TakeDown[],
  text?: string
}


const Piechart = ({ data, text }: PieData) => (
  <div
    className="pie_chart"

  >
    <h3>{text}</h3>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={["#80ffdb", "#64dfdf", "#56cfe1", "#5390d9"]}
      borderColor={"aliceblue"}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="aliceblue"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={"aliceblue"}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={"black"}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 50,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 20,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: 'black"'
              }
            }
          ]
        }
      ]}
    />
  </div>
)

export default Piechart;