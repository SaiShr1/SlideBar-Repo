import { useState } from 'react'
import './App.css'
import SliderBar from './components/Sliders/SlideBar'

function App() {

  const [discreteValue, setDiscreteValue] = useState<number>()
  const [smoothValue, setSmoothValue] = useState<number>()


  const handleDiscreteValueChange = (newValue: number) => {
    setDiscreteValue(newValue)
  }
  const handleSmoothValueChange = (newValue: number) => {
    setSmoothValue(newValue)
  }

  const labelsDescriptionArray = [
    {
      label: "None",
      description: ""
    },
    {
      label: 'Plain',
      description: "Atma Rama Anand Ramana"
    },
    {
      label: 'Straightforward',
      description: "Achyut Keshav Hari Narayan"
    },
    {
      label: 'Technical',
      description: "Atma Rama Anand Ramana"
    },
    {
      label: 'Complex',
      description: "Achyut Keshav Hari Narayan"
    },
  ]

  const labelsDescriptionArrayShort = [
    {
      label: "None",
      description: ""
    },
    {
      label: 'Complex',
      description: "Achyut Keshav Hari Narayan"
    },
  ]

  return (
    <div className='Slider'>
      <div className='Slider__discrete'>
        <h3>Discrete Slider</h3>
        <SliderBar
          onChange={handleDiscreteValueChange}
          value={discreteValue}
          defaultValue={25}
          discrete={true}
          labelsDescriptionArray={labelsDescriptionArray}
          showValueTooltip={true}
          showDescription={true}
          // labelsDescriptionArray={[]}
          marks={true}
        // start={0}
        // end={1}
        // step={-1}

        />
      </div>
      <div className='Slider__smooth'>

        <h3>Smooth Slider With Value ToolTip!</h3>
        <SliderBar
          step={1}
          start={0}
          end={100}
          onChange={handleSmoothValueChange}
          value={smoothValue}
          defaultValue={35}
          discrete={false}
          labelsDescriptionArray={labelsDescriptionArrayShort}
          marks={true}
          markForEachStep={true}
          showValueTooltip={true}
        />
      </div>
    </div>
  )
}

export default App
