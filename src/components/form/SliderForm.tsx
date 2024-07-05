// import React, { useState } from 'react'
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import SliderBar from '../Sliders/SlideBar';


const SliderForm = () => {


    const handleOnSubmit = (values: any) => {
        console.log(values, "SliderFormValues")
    }

    return (
        <div className='form-layout'>
            <FinalForm
                onSubmit={handleOnSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FinalField name="tone" type='text'>
                            {({ input, meta }) => (
                                <div className='tone-of-voice-slider'>
                                    <section className="tone-of-voice-slider-field-label">Tone Of Voice</section>
                                    <SliderBar
                                        {...input}
                                        value={+input.value}
                                        discrete={true}
                                        labelsDescriptionArray={[
                                            {
                                                label: "Optimistic",
                                                description: "A positive and hopeful tone that emphasizes the bright side of situations."
                                            },
                                            {
                                                label: "Neutral",
                                                description: "A balanced and unbiased tone, presenting information without emotional influence."
                                            },
                                            {
                                                label: "Respectful",
                                                description: "A considerate and polite tone, showing esteem for others' feelings and perspectives."
                                            },
                                            {
                                                label: "Assertive",
                                                description: "A confident and direct tone, clearly communicating ideas or needs without aggression."
                                            }

                                        ]}
                                    />
                                    {/* {console.log("ToneOfVoiceSliderValue:::", input.value, "Type:", typeof input.value)} */}
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>
                            )}
                        </FinalField>

                        <FinalField name="Added" type='text'>
                            {({ input, meta }) => (
                                <div className='tone-of-voice-slider'>
                                    <section className="tone-of-voice-slider-field-label">Tone Of Voice</section>
                                    <SliderBar
                                        {...input}
                                        // value={+input.value}
                                        defaultValue={75}
                                        labelsDescriptionArray={[
                                            {
                                                label: "Optimistic",
                                                description: "A positive and hopeful tone that emphasizes the bright side of situations."
                                            },
                                            {
                                                label: "Neutral",
                                                description: "A balanced and unbiased tone, presenting information without emotional influence."
                                            },
                                            {
                                                label: "Respectful",
                                                description: "A considerate and polite tone, showing esteem for others' feelings and perspectives."
                                            },
                                            {
                                                label: "Assertive",
                                                description: "A confident and direct tone, clearly communicating ideas or needs without aggression."
                                            }

                                        ]}
                                    />
                                    {/* {console.log("ToneOfVoiceSliderValue:::", input.value, "Type:", typeof input.value)} */}
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>
                            )}
                        </FinalField>

                        <FinalField name="Bhumil" type='text'>
                            {({ input, meta }) => (
                                <div className='tone-of-voice-slider'>
                                    <section className="tone-of-voice-slider-field-label">Tone Of Voice</section>
                                    <SliderBar
                                        {...input}
                                        value={+input.value}
                                        labelsDescriptionArray={[
                                            {
                                                label: "Optimistic",
                                                description: "A positive and hopeful tone that emphasizes the bright side of situations."
                                            },
                                            {
                                                label: "Neutral",
                                                description: "A balanced and unbiased tone, presenting information without emotional influence."
                                            },
                                            {
                                                label: "Respectful",
                                                description: "A considerate and polite tone, showing esteem for others' feelings and perspectives."
                                            },
                                            {
                                                label: "Assertive",
                                                description: "A confident and direct tone, clearly communicating ideas or needs without aggression."
                                            }

                                        ]}
                                    />
                                    {/* {console.log("ToneOfVoiceSliderValue:::", input.value, "Type:", typeof input.value)} */}
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>
                            )}
                        </FinalField>
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        </div>
    )
}

export default SliderForm
