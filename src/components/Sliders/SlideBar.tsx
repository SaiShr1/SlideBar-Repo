import React, { useState } from 'react'
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
}

const labels = [
    'None',
    'Plain',
    'Straightforward',
    'Technical',
]

const SliderBar = (props: SliderProps) => {
    const { start = 0, end = 100, defaultValue = 0, step = 33.33, fill, background, onChange } = props
    const [value, setValue] = useState(defaultValue)

    const onSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
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
            <span className='SliderBar-labels' style={{ left: `${labelPosition}%` }}>
                {item}
            </span>
        )
    })

    return (
        <div className="SliderBar">
            <input
                type="range"
                min={start}
                max={end}
                className="SliderBar-track"
                style={{ background: bg, color: `${settings.fill}` }}
                value={value}
                onChange={onSlide}
                step={step}
            />
            <div className='Slider-custom-thumb-wrapper'>
                <span className='Slider-custom-thumb'></span>
            </div>
            <div className="SliderBar-label-container">
                {labelsMapper}
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