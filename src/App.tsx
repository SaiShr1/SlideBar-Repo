import './App.css'
import SliderBar from './components/Sliders/SlideBar'

function App() {

  return (
    <>
      <h3>Discrete Slider</h3>
      <SliderBar defaultValue={0} discrete={true} />
      <h3>Slider</h3>
      <SliderBar defaultValue={0} discrete={false} />
    </>
  )
}

export default App
