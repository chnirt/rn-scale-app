# Icon Generator Script

This script automates the process of generating app icons for iOS and Android from a specified logo image. The icons are generated in the required sizes and formats for both platforms, including round icons for Android.

## Features

- **Generates iOS app icons** according to Apple's guidelines.
- **Generates Android launcher icons**, including both square and round variants.
- **Handles image processing** using the `sharp` library for efficient resizing and manipulation.

## Prerequisites

Before using this script, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. Install the required dependencies:
   ```bash
   npm install sharp
   ```

## Usage

To generate app icons, run the script using the following command:

```bash
node generateIcon.js <path-to-logo>
```

## Parameters

- `<path-to-logo>`: The path to your logo image (must be in PNG format). The script expects the image to be at least 1024x1024 pixels for optimal results.

## Example

```bash
node generateIcon.js ./path/to/logo.png
```

After running the command, the script will generate the following icons:

- **iOS Icons**: Sizes include 16x16, 20x20, 29x29, and more, stored in the `ios/<project-name>/Images.xcassets/` directory.
- **Android Icons**: Standard `ic_launcher.png` and `ic_launcher_round.png` for different resolutions, stored in `android/app/src/main/res/`.

## Troubleshooting

- **Blurry Icons**: If the generated icons appear blurry, ensure that the input image is at least 1024x1024 pixels. Higher resolution images yield better results.
- **File Not Found:** Ensure that the provided path to the logo is correct and that the file exists.

## Contributing

If you wish to contribute to this project, feel free to submit a pull request. Please ensure your code adheres to the project's coding standards.

## License

This project is licensed under the MIT [License](). See the LICENSE file for details.

## Acknowledgements

- [Sharp](https://github.com/lovell/sharp): The library used for image processing.
  csharp

```
You can copy and paste this directly into your README.md file. If you need further modifications or additions, just let me know!
```
