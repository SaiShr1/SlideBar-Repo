import React, { useState, useRef } from 'react'
import './SliderBar.css'

interface labelsDescriptionArrayProps {
    label: string,
    description: string
}
interface SliderProps {
    defaultValue: number
    start?: number
    end?: number
    step?: number
    fill?: string
    background?: string
    /**
     * An optional function to be called when form is saved
     **/
    onChange?: (arg?: number) => void
    discrete: boolean
    labelsDescriptionArray: Array<labelsDescriptionArrayProps>
    marks: boolean
    markForEachStep?: boolean

}

const SliderBar = (props: SliderProps) => {
    const { start = 0, end = 100, step = 1, onChange } = props
    const [value, setValue] = useState(props.defaultValue)
    const sliderRef = useRef<HTMLInputElement>(null)
    // const thumbRef = useRef<HTMLSpanElement>(null)
    const labelDescriptionArray: labelsDescriptionArrayProps[] = props.labelsDescriptionArray;
    console.log(value, 'value', typeof value);

    const onSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const newValue = Math.round((Number(event.target.value)).toFixed(2));
        const newValue = Number(Math.round(Number(event.target.value)).toFixed(2));
        setValue(newValue)
        if (onChange) {
            onChange(newValue)
        }
    }

    const settings = {
        fill: props.fill || '#6C5CE7',
        background: props.background || '#C7B9FA',
    }

    const percentage = (100 * (value - start)) / (end - start)

    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1
        }%)`

    const labelsMapper = labelDescriptionArray.map((item: labelsDescriptionArrayProps, index: number) => {
        const labelPosition = (100 / (labelDescriptionArray.length - 1)) * index;
        return (
            <span key={index} className='SliderBar-labels' style={{ left: `${labelPosition}%` }}>
                {item.label}
            </span>
        )
    });

    const customThumbPositionLogic = () => {
        const positionFromStartToValue = (value - start);
        const totalRange = (end - start);
        return {
            left: `${((positionFromStartToValue) / (totalRange)) * 100}%`
        }
    };

    const stepCalculator = (props.discrete ? (100 / (labelDescriptionArray.length - 1)) : step).toFixed(2);
    // console.log('stepCalculator', stepCalculator, typeof stepCalculator);

    const handleMouseDown = () => {
        // Add new event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        // e.preventDefault(); // Prevent any default action
    };

    const handleMouseMove = (e: MouseEvent) => {
        // const thumbStepInNumber = Math.round(Number(stepCalculator))
        if (!sliderRef.current) {
            return;
        }
        // Get the slider element
        const slider = sliderRef.current;
        // Get the slider's bounding rectangle
        const rect = slider.getBoundingClientRect();
        // Calculate the x position of the mouse relative to the slider
        // here e.clientX is the x position of the mouse relative to the window
        // And rect.left is the x position of the slider relative to the window
        const x = e.clientX - rect.left;
        // Calculate the width of the slider
        const width = rect.right - rect.left;
        // Calculate the new value of the slider by converting the x position to a value within the range of the slider
        // here (x / width) gives the percentage of the slider that the mouse is over
        // and (end - start) gives the range of the slider
        // and ((end - start) * (x / width)) gives the value within the range of the slider
        // and start + ((end - start) * (x / width)) gives the value within the range of the slider starting from the start value
        let newValue = Number(Math.round(((x / width) * (end - start)) + start).toFixed(2));

        // This logic is used to snap the thumb to the nearest step
        if (props.discrete) {
            // Calculate the nearest step
            const stepInNumber = Math.round(Number(stepCalculator));
            // Calculate the remainder which is used to determine if the thumb should snap to the next step
            const remainder = newValue % stepInNumber;
            // If the remainder is less than half of the step, snap to the lower step, otherwise snap to the higher step
            if (remainder < stepInNumber / 2) {
                // Snap to the lower step if remainder is less than half of the step
                newValue = newValue - remainder;
            } else {
                // Snap to the higher step if remainder is greater than half of the step
                newValue = newValue + stepInNumber - remainder;
            }
        }
        //Ensure the value is within the range
        newValue = Math.round(Math.max(start, Math.min(end, newValue)));
        // Update the value
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMarkClick = (index: number) => {
        const newValue = start + ((end - start) / (labelDescriptionArray.length - 1)) * index;
        // console.log('newValue:::::---->', newValue);
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    const marksMapper = labelDescriptionArray.map((_item: labelsDescriptionArrayProps, index: number) => {
        const markLeftPosition = ((100 / (labelDescriptionArray.length - 1))) * index;
        return (
            <span
                key={index}
                className='Slider-mark'
                style={{ left: `${markLeftPosition}%` }}
                onClick={() => { handleMarkClick(index) }}
            ></span>
        )
    });

    const totalSteps = 100 / step;
    const stepsArray = Array.from({ length: totalSteps + 1 }, (_, i) => i * step);
    const marksForEachStepMapper = stepsArray.map((currentStep) => {
        return (
            <span
                key={currentStep}
                className='Slider-mark-for-each-step'
                style={{ left: `${currentStep}%` }}
                onClick={() => {
                    const newValue = start + (currentStep / 100) * (end - start);
                    setValue(newValue);
                    if (onChange) {
                        onChange(newValue);
                    }
                }}
            ></span>
        )
    });


    const labelDescriptionMapper = () => {
        // Converting value to percentage but not multiplying by 100
        const valueToPercentage = (value / 100);
        // Multiplying by (labelDescriptionArray.length - 1)  then rounding it up to get the index of the labelDescriptionArray
        const indexToRenderDescriptionDynamically = Math.round(valueToPercentage * (labelDescriptionArray.length - 1));
        return (
            props.discrete ?
                <span className='Slider-label-description'>
                    {labelDescriptionArray[(indexToRenderDescriptionDynamically)].description}
                </span>
                :
                null
        )
    };


    return (
        <div className='SliderBar-Wrapper'>
            <div className="SliderBar">
                <input
                    ref={sliderRef}
                    type="range"
                    min={start}
                    max={end}
                    className="SliderBar-track"
                    style={{ background: bg, color: `${settings.fill}` }}
                    value={value}
                    onChange={onSlide}
                    step={stepCalculator}
                />
                <div className='Slider-marks-wrapper'>
                    {props.marks && props.markForEachStep ?
                        marksForEachStepMapper
                        :
                        props.marks ?
                            marksMapper
                            :
                            null
                    }
                </div>
                <div className='Slider-custom-thumb-container'>
                    {/* Add ref={thumbRef} for access thumb in future */}
                    <span className='Slider-custom-thumb' style={customThumbPositionLogic()} onMouseDown={handleMouseDown}></span>
                </div>
                <div className="SliderBar-label-container">
                    {labelsMapper}
                </div>
                <div className="SliderBar-label-description-container">
                    {labelDescriptionMapper()}
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