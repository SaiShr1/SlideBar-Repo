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

  return (
    <>
      <h3>Discrete Slider</h3>
      <SliderBar
        defaultValue={0}
        discrete={true}
        labelsDescriptionArray={labelsDescriptionArray}
        marks={true}
      />
      <h3>Slider</h3>
      <SliderBar
        defaultValue={0}
        discrete={false}
        labelsDescriptionArray={labelsDescriptionArray}
        marks={true}
        markForEachStep={true}
      />
    </>
  )
}

export default App
