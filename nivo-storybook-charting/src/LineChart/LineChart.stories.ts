import type { Meta, StoryObj } from '@storybook/react';
import LineChart from './LineChart';

// TODO: Add more data values

const sampleData = [
    {
        "id": "japan",
        "color": "green", //"hsl(357, 70%, 50%)",
        "data": [
            {
                "x": "January 2024",
                "y": 134
            },
            {
                "x": "February 2024",
                "y": 102
            },
            {
                "x": "March 2024",
                "y": 195
            },
            {
                "x": "April 2024",
                "y": 5
            },
            {
                "x": "May 2024",
                "y": 101
            },
            {
                "x": "June 2024",
                "y": 199
            },
            {
                "x": "July 2024",
                "y": 178
            },
            {
                "x": "August 2024",
                "y": 89
            },
            {
                "x": "September 2024",
                "y": 194
            },
            {
                "x": "October 2024",
                "y": 271
            },
            {
                "x": "November 2024",
                "y": 285
            },
            {
                "x": "December 2024",
                "y": 225
            }
        ]
    },
    {
        "id": "france",
        "color": "blue",
        "data": [
            {
                "x": "January 2024",
                "y": 270
            },
            {
                "x": "February 2024",
                "y": 187
            },
            {
                "x": "March 2024",
                "y": 103
            },
            {
                "x": "April 2024",
                "y": 170
            },
            {
                "x": "May 2024",
                "y": 70
            },
            {
                "x": "June 2024",
                "y": 215
            },
            {
                "x": "July 2024",
                "y": 113
            },
            {
                "x": "August 2024",
                "y": 216
            },
            {
                "x": "September 2024",
                "y": 209
            },
            {
                "x": "October 2024",
                "y": 283
            },
            {
                "x": "November 2024",
                "y": 170
            },
            {
                "x": "December 2024",
                "y": 12
            }
        ]
    },
    {
        "id": "us",
        "color": "red",
        "data": [
            {
                "x": "January 2024",
                "y": 73
            },
            {
                "x": "February 2024",
                "y": 79
            },
            {
                "x": "March 2024",
                "y": 222
            },
            {
                "x": "April 2024",
                "y": 172
            },
            {
                "x": "May 2024",
                "y": 273
            },
            {
                "x": "June 2024",
                "y": 13
            },
            {
                "x": "July 2024",
                "y": 68
            },
            {
                "x": "August 2024",
                "y": 107
            },
            {
                "x": "September 2024",
                "y": 279
            },
            {
                "x": "October 2024",
                "y": 138
            },
            {
                "x": "November 2024",
                "y": 76
            },
            {
                "x": "December 2024",
                "y": 182
            }
        ]
    },
    {
        "id": "germany",
        "color": "orange",
        "data": [
            {
                "x": "January 2024",
                "y": 125
            },
            {
                "x": "February 2024",
                "y": 253
            },
            {
                "x": "March 2024",
                "y": 63
            },
            {
                "x": "April 2024",
                "y": 210
            },
            {
                "x": "May 2024",
                "y": 225
            },
            {
                "x": "June 2024",
                "y": 123
            },
            {
                "x": "July 2024",
                "y": 223
            },
            {
                "x": "August 2024",
                "y": 265
            },
            {
                "x": "September 2024",
                "y": 99
            },
            {
                "x": "October 2024",
                "y": 270
            },
            {
                "x": "November 2024",
                "y": 189
            },
            {
                "x": "December 2024",
                "y": 87
            }
        ]
    },
    {
        "id": "norway",
        "color": "purple",
        "data": [
            {
                "x": "January 2024",
                "y": null // set to null to have a discontinued line effect
            },
            {
                "x": "February 2024",
                "y": 77
            },
            {
                "x": "March 2024",
                "y": 98
            },
            {
                "x": "April 2024",
                "y": 189
            },
            {
                "x": "May 2024",
                "y": null // set to null to have a discontinued line effect
            },
            {
                "x": "June 2024",
                "y": 158
            },
            {
                "x": "July 2024",
                "y": 177
            },
            {
                "x": "August 2024",
                "y": 101
            },
            {
                "x": "September 2024",
                "y": 212
            },
            {
                "x": "October 2024",
                "y": 140
            },
            {
                "x": "November 2024",
                "y": 30
            },
            {
                "x": "December 2024",
                "y": 28
            }
        ]
    }
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/LineChart',
  component: LineChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    data: {
      control: 'object', // Allows you to input an object for the series data
      description: 'Array of series data for the line chart',
    },
    // colors: {
    //   control: 'color', // Color picker for colors
    //   description: 'Color scheme for the chart lines',
    // },
    curve: {
      control: 'select', // Dropdown for selecting curve type
      options: ['linear', 'monotoneX', 'step'],
      description: 'The curve type for the lines',
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    data: sampleData,
    curve: 'linear'
  },
};
