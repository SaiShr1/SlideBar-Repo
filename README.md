# Code Playground

This is a React project set up with Vite.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the project using ESLint and reports any unused disable directives and warnings.

### `npm run preview`

Runs a preview of the built app in the browser.

## Dependencies

- React
- ReactDOM

## Dev Dependencies

- @types/react
- @types/react-dom

## Learn More

You can learn more about [React](https://reactjs.org/) and [Vite](https://vitejs.dev/).

# SliderBar Component

## Description

The SliderBar component is a customizable slider bar component built with React and TypeScript. It allows users to select a value within a specified range.

## Props

The SliderBar component accepts the following props:

- `labelsDescriptionArray`: An array of objects, where each object has a label and description property. These labels are displayed along the slider bar.
- `defaultValue`: The initial value of the slider. Defaults to 0.
- `discrete`: A boolean that determines whether the slider snaps to the nearest step. Defaults to false.
- `start`: The start value of the slider. Defaults to 0.
- `end`: The end value of the slider. Defaults to 100.
- `step`: The step size for the slider. Defaults to 1.
- `fill`: The color of the filled part of the slider. Defaults to #6C5CE7.
- `background`: The color of the unfilled part of the slider. Defaults to #C7B9FA.
- `onChange`: A function that is called when the slider value changes. It receives the new value as its argument.
- `marks`: A boolean that determines whether marks are displayed along the slider. Defaults to false.
- `markForEachStep`: A boolean that determines whether a mark is displayed for each step. Defaults to false.
- `showValue`: A boolean that determines whether the current value is displayed above the slider thumb. Defaults to false.

## Usage

## Styling

The SliderBar component uses CSS for styling. The styles can be found in the SliderBar.css file. You can modify these styles to customize the appearance of the slider bar.

## Edge Cases

The SliderBar component handles several edge cases:

- If `labelsDescriptionArray` contains less than 2 objects, a fallback UI is displayed with a message.
- If `step` is less than or equal to 0, a fallback UI is displayed with a message.
- If `start` or `end` are not finite numbers, or if `start` is greater than or equal to `end`, or if `start` is less than 0, or if `end` is less than or equal to 0, a fallback UI is displayed with a message.