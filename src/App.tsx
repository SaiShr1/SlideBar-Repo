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
    <>
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
      <h3>Slider</h3>
      <SliderBar
        // step={10}
        defaultValue={0}
        discrete={false}
        labelsDescriptionArray={labelsDescriptionArrayShort}
        marks={true}
        markForEachStep={true}
        showValue={true}
      />
    </>
  )
}

export default App
