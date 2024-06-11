import React, { useState, useRef } from 'react'
import './SliderBar.css'

export interface labelsDescriptionArrayProps {
    label: string,
    description: string
}
export interface SliderProps {
    labelsDescriptionArray: Array<labelsDescriptionArrayProps>
    defaultValue?: number
    discrete?: boolean
    start?: number
    end?: number
    step?: number
    fill?: string
    background?: string
    /**
     * An optional function to be called when form is saved
     **/
    onChange?: (arg?: number) => void
    marks?: boolean
    markForEachStep?: boolean
    showValueTooltip?: boolean
    showDescription?: boolean

}

const SliderBar = (props: SliderProps) => {
    // const { start = 0, end = 100, step = 1, onChange } = props

    const start = props.start!;
    const end = props.end!;
    const step = props.step!;
    const onChange = props.onChange;
    const defaultValue = props.defaultValue!;

    // console.log(step, 'step', typeof step);


    const [value, setValue] = useState(props.defaultValue || 0)
    const sliderRef = useRef<HTMLInputElement>(null)
    // const thumbRef = useRef<HTMLSpanElement>(null)
    const [isHoveredOrActive, setIsHoveredOrActive] = useState(false);
    // const [isActive, setIsActive] = useState(false);


    const labelDescriptionArray: labelsDescriptionArrayProps[] = props.labelsDescriptionArray;
    // console.log(value, 'value', typeof value);

    // Edge cases
    if (labelDescriptionArray.length <= 1) {
        // Return fallback UI
        return <div className='SlideBar-fallback-UI'>No objects in labels Array provided, Provide at least 2 objects</div>;
    }
    else if (step <= 0 || !step) {
        // Return fallback UI
        return <div className='SlideBar-fallback-UI'>Step value cannot be {step}, Provide a valid step value</div>;
    }
    else if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end || start < 0 || end <= 0) {
        // Return fallback UI
        return <div className='SlideBar-fallback-UI'>{start === 0 ? null : `Start value cannot be {start} and `} End value cannot be {end}, Provide a valid start and end value</div>;
    }

    const onSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const newValue = Math.round((Number(event.target.value)).toFixed(2));
        const newValue = Number(Math.round(Number(event.target.value)).toFixed(2));
        setValue(newValue)
        if (onChange) {
            onChange(newValue)
        }
    }

    const settings = {
        fill: props.fill || '#6C5CE7', //dark
        background: props.background || '#C7B9FA', //light
    }

    const percentage = (100 * (value - start)) / (end - start)

    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1
        }%)`

    const labelsMapper = labelDescriptionArray.map((item: labelsDescriptionArrayProps, index: number) => {
        const labelPosition = (100 / (labelDescriptionArray.length - 1)) * index;
        return (
            <span
                key={index}
                className='SliderBar-labels'
                style={{ left: `${(labelPosition).toFixed(2)}%` }}
                onClick={() => { handleMarkAndLabelClick(index) }}
            >
                {item.label}
            </span>
        )
    });

    const customThumbPositionLogicAndStyles = () => {
        const positionFromStartToValue = (value - start);
        const totalRange = (end - start);
        return {
            left: `${((positionFromStartToValue) / (totalRange)) * 100}%`,
            background: `${settings.fill}`,
        }
    };

    const stepCalculator = Math.round(Number((props.discrete ? (100 / (labelDescriptionArray.length - 1)) : step).toFixed(2)));
    // console.log('stepCalculator', stepCalculator, typeof stepCalculator);

    const handleMouseDown = () => {
        setIsHoveredOrActive(true);
        // Add new event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        // e.preventDefault(); // Prevent any default action
    };

    const handleMouseMove = (e: MouseEvent) => {
        setIsHoveredOrActive(true);
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
            const stepInNumber = stepCalculator;
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
        setIsHoveredOrActive(false);
        // Remove the event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMarkAndLabelClick = (index: number) => {
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
                className='SliderBar-mark'
                style={{
                    left: `${(markLeftPosition).toFixed(2)}%`,
                    backgroundColor: markLeftPosition <= value ? props.background || '#c7b9fa' : props.fill || '#5d50bf'
                }}
                onClick={() => { handleMarkAndLabelClick(index) }}
            ></span>
        )
    });

    const totalSteps = 100 / stepCalculator;
    const stepsArray = Array.from({ length: totalSteps + 1 }, (_, i) => i * stepCalculator);
    const marksForEachStepMapper = stepsArray.map((currentStep) => {
        return (
            <span
                key={currentStep}
                className='SliderBar-mark-for-each-step'
                style={{
                    left: `${(currentStep).toFixed(2)}%`,
                    backgroundColor: currentStep <= value ? props.background || '#c7b9fa' : props.fill || '#5d50bf'
                }}
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
        // Use defaultValue when value is undefined
        const valueToUse = value !== undefined ? value : defaultValue;
        // Converting value to percentage but not multiplying by 100
        const valueToPercentage = (valueToUse / 100);
        // Multiplying by (labelDescriptionArray.length - 1)  then rounding it up to get the index of the labelDescriptionArray
        const indexToRenderDescriptionDynamically = Math.round(valueToPercentage * (labelDescriptionArray.length - 1));
        return (
            props.discrete ?
                <span className='SliderBar-label-description'>
                    {labelDescriptionArray[(indexToRenderDescriptionDynamically)].description}
                </span>
                :
                null
        )
    };

    const handleMouseDownCombinedThumb = () => {
        setIsHoveredOrActive(true);
        handleMouseDown();
    }


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
                <div className='SliderBar-marks-wrapper'>
                    {props.marks && props.markForEachStep ?
                        marksForEachStepMapper
                        :
                        props.marks ?
                            marksMapper
                            :
                            null
                    }
                </div>
                <div className='SliderBar-custom-thumb-container'>
                    {/* Add ref={thumbRef} for access thumb in future */}
                    <span
                        data-testid="SliderBar-custom-thumb"
                        className='SliderBar-custom-thumb'
                        style={customThumbPositionLogicAndStyles()}
                        onMouseDown={handleMouseDownCombinedThumb}
                        onMouseEnter={() => setIsHoveredOrActive(true)}
                        onMouseLeave={() => setIsHoveredOrActive(false)} //Turn on if you want to hide tooltip on mouse leave
                    >
                        {
                            props.showValueTooltip ?
                                <span
                                    className={
                                        `SliderBar-custom-thumb-tooltip ${isHoveredOrActive ?
                                            'SliderBar-custom-thumb-tooltip-visible'
                                            :
                                            ''
                                        }`}
                                >
                                    {(Math.round(value)).toString()}
                                </span>
                                // <span
                                //     className='SliderBar-custom-thumb-tooltip SliderBar-custom-thumb-tooltip-visible'
                                // >
                                //     {(Math.round(value)).toString()}
                                // </span>
                                :
                                null
                        }
                    </span>
                </div>
                <div className="SliderBar-label-container">
                    {labelsMapper}
                </div>
                <div className="SliderBar-label-description-container">
                    {props.showDescription ?
                        labelDescriptionMapper()
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}


SliderBar.defaultProps = {
    defaultValue: 0,
    start: 0,
    end: 100,
    fill: '#6C5CE7',
    background: '#C7B9FA',
    step: 1,
} as Partial<SliderProps>

export default SliderBar