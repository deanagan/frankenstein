import type { Meta, StoryObj } from '@storybook/react';
import LineChart from './LineChart';



const sampleData = [
    {
        "id": "japan",
        "color": "green", //"hsl(357, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 134
            },
            {
                "x": "helicopter",
                "y": 102
            },
            {
                "x": "boat",
                "y": 195
            },
            {
                "x": "train",
                "y": 5
            },
            {
                "x": "subway",
                "y": 101
            },
            {
                "x": "bus",
                "y": 199
            },
            {
                "x": "car",
                "y": 178
            },
            {
                "x": "moto",
                "y": 89
            },
            {
                "x": "bicycle",
                "y": 194
            },
            {
                "x": "horse",
                "y": 271
            },
            {
                "x": "skateboard",
                "y": 285
            },
            {
                "x": "others",
                "y": 225
            }
        ]
    },
    {
        "id": "france",
        "color": "blue",
        "data": [
            {
                "x": "plane",
                "y": 270
            },
            {
                "x": "helicopter",
                "y": 187
            },
            {
                "x": "boat",
                "y": 103
            },
            {
                "x": "train",
                "y": 170
            },
            {
                "x": "subway",
                "y": 70
            },
            {
                "x": "bus",
                "y": 215
            },
            {
                "x": "car",
                "y": 113
            },
            {
                "x": "moto",
                "y": 216
            },
            {
                "x": "bicycle",
                "y": 209
            },
            {
                "x": "horse",
                "y": 283
            },
            {
                "x": "skateboard",
                "y": 170
            },
            {
                "x": "others",
                "y": 12
            }
        ]
    },
    {
        "id": "us",
        "color": "red",
        "data": [
            {
                "x": "plane",
                "y": 73
            },
            {
                "x": "helicopter",
                "y": 79
            },
            {
                "x": "boat",
                "y": 222
            },
            {
                "x": "train",
                "y": 172
            },
            {
                "x": "subway",
                "y": 273
            },
            {
                "x": "bus",
                "y": 13
            },
            {
                "x": "car",
                "y": 68
            },
            {
                "x": "moto",
                "y": 107
            },
            {
                "x": "bicycle",
                "y": 279
            },
            {
                "x": "horse",
                "y": 138
            },
            {
                "x": "skateboard",
                "y": 76
            },
            {
                "x": "others",
                "y": 182
            }
        ]
    },
    {
        "id": "germany",
        "color": "orange",
        "data": [
            {
                "x": "plane",
                "y": 125
            },
            {
                "x": "helicopter",
                "y": 253
            },
            {
                "x": "boat",
                "y": 63
            },
            {
                "x": "train",
                "y": 210
            },
            {
                "x": "subway",
                "y": 225
            },
            {
                "x": "bus",
                "y": 123
            },
            {
                "x": "car",
                "y": 223
            },
            {
                "x": "moto",
                "y": 265
            },
            {
                "x": "bicycle",
                "y": 99
            },
            {
                "x": "horse",
                "y": 270
            },
            {
                "x": "skateboard",
                "y": 189
            },
            {
                "x": "others",
                "y": 87
            }
        ]
    },
    {
        "id": "norway",
        "color": "purple",
        "data": [
            {
                "x": "plane",
                "y": 6
            },
            {
                "x": "helicopter",
                "y": 77
            },
            {
                "x": "boat",
                "y": 98
            },
            {
                "x": "train",
                "y": 189
            },
            {
                "x": "subway",
                "y": 13
            },
            {
                "x": "bus",
                "y": 158
            },
            {
                "x": "car",
                "y": 177
            },
            {
                "x": "moto",
                "y": 101
            },
            {
                "x": "bicycle",
                "y": 212
            },
            {
                "x": "horse",
                "y": 140
            },
            {
                "x": "skateboard",
                "y": 30
            },
            {
                "x": "others",
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
