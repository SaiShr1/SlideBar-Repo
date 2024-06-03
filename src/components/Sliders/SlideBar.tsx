import React, { useState, useRef } from 'react'
import './SliderBar.css'

interface SliderProps {
    defaultValue?: number
    start?: number
    end?: number
    step?: number
    fill?: string
    background?: string
    /**
     * An optional function to be called when form is saved
     **/
    onChange?: (arg?: number) => void
    discrete?: boolean
}

const labels = [
    'None',
    'Plain',
    'Straightforward',
    'Technical',
]

const SliderBar = (props: SliderProps) => {
    const { start = 0, end = 100, defaultValue = 0, step = 1, fill, background, onChange, discrete = false } = props
    const [value, setValue] = useState(defaultValue)
    const sliderRef = useRef<HTMLDivElement>(null)
    console.log(value, 'value', typeof value);

    const onSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.round(Number(event.target.value));
        setValue(newValue)
        if (onChange) {
            onChange(newValue)
        }
    }

    const settings = {
        fill: fill || '#A9B6CB',
        background: background || '#EDF1F7',
    }

    const percentage = (100 * (value - start)) / (end - start)

    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1
        }%)`

    const labelsMapper = labels.map((item: string, index: number) => {
        const labelPosition = (100 / (labels.length - 1)) * index;
        return (
            <span key={index} className='SliderBar-labels' style={{ left: `${labelPosition}%` }}>
                {item}
            </span>
        )
    })

    const customThumbPositionLogic = () => {
        const positionFromStartToValue = (value - start);
        const totalRange = (end - start);
        return {
            left: `${((positionFromStartToValue) / (totalRange)) * 100}%`
        }
    }

    const stepCalculator = (discrete ? (100 / (labels.length - 1)) : step).toFixed(2);
    // console.log('stepCalculator', stepCalculator, typeof stepCalculator);

    const handleMouseDown = (e: React.MouseEvent) => {

        const handleMouseMove = (e: MouseEvent) => {
            if (!sliderRef.current) {
                return;
            }
            const slider = sliderRef.current;
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.right - rect.left;
            let newValue = ((x / width) * (end - start)) + start;

            // Calculate the nearest step
            newValue = Math.round((newValue / step) * step);

            //Ensure the value is within the range
            newValue = Math.max(start, Math.min(end, newValue));

            setValue(newValue);
            if (onChange) {
                onChange(newValue);
            }

            console.log('newValue Mouse Event', newValue);
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        // Remove the old event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // Add new event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault(); // Prevent any default action

    }


    return (
        <div className='SliderBar-Wrapper'>
            <div className="SliderBar">
                <input
                    type="range"
                    min={start}
                    max={end}
                    className="SliderBar-track"
                    style={{ background: bg, color: `${settings.fill}` }}
                    value={value}
                    onChange={onSlide}
                    step={stepCalculator}
                />
                <div className='Slider-custom-thumb-wrapper'>
                    <span className='Slider-custom-thumb' style={customThumbPositionLogic()} onMouseDown={handleMouseDown}></span>
                </div>
                <div className="SliderBar-label-container">
                    {labelsMapper}
                </div>
            </div>
        </div>
    )
}

// SliderBar.defaultProps = {
//     defaultValue: 0,
//     start: 0,
//     end: 100,
//     fill: '#A9B6CB',
//     background: '#EDF1F7',
//     step: 1,
// } as Partial<SliderProps>

export default SliderBar