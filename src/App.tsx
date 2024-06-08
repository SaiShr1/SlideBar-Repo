import './App.css'
import SliderBar from './components/Sliders/SlideBar'

function App() {

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
          defaultValue={0}
          discrete={true}
          labelsDescriptionArray={labelsDescriptionArray}
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
          // step={10}
          defaultValue={0}
          discrete={false}
          labelsDescriptionArray={labelsDescriptionArrayShort}
          marks={false}
          markForEachStep={true}
          showValue={true}
        />
      </div>
    </div>
  )
}

export default App
