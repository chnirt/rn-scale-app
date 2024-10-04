import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Read the logoPath from command-line arguments
const logoPath = process.argv[2];

if (!logoPath) {
  console.error(
    'Error: logoPath is required. Please provide the path to the logo.',
  );
  process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(logoPath)) {
  console.error(`Error: File not found at path: ${logoPath}`);
  process.exit(1);
}

// Define the project name from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const projectName = packageJson.name;

// Define paths for copying Contents.json for iOS and Android projects
const iosAssetsPath = path.join(
  __dirname,
  '..',
  'ios',
  projectName,
  'Images.xcassets',
);
const androidAssetsPath = path.join(
  __dirname,
  '..',
  'android',
  'app',
  'src',
  'main',
  'res',
);

// Define source paths for Contents.json
const generalContentsSourcePath = path.join(__dirname, 'Contents.json');
const appIconContentsSourcePath = path.join(
  __dirname,
  'AppIcon.appiconset',
  'Contents.json',
);

// Ensure directories exist for Android
const androidResourceDirectories = [
  {size: 48, folder: 'mipmap-mdpi'},
  {size: 72, folder: 'mipmap-hdpi'},
  {size: 96, folder: 'mipmap-xhdpi'},
  {size: 144, folder: 'mipmap-xxhdpi'},
  {size: 192, folder: 'mipmap-xxxhdpi'},
];

// Create Android resource directories if they don't exist
androidResourceDirectories.forEach(({folder}) => {
  const dirPath = path.join(androidAssetsPath, folder);
  fs.mkdirSync(dirPath, {recursive: true});
});

/**
 * Reusable function to copy a file from source to destination
 * @param {string} source - The path to the source file
 * @param {string} destination - The path to the destination
 */
const copyFileToDestination = (source: string, destination: string): void => {
  fs.copyFile(source, destination, err => {
    if (err) {
      console.error(
        `Error copying file from ${source} to ${destination}:`,
        err,
      );
    } else {
      console.log(`Successfully copied file to ${destination}`);
    }
  });
};

/**
 * Generate icons for iOS
 */
async function generateIOSIcons() {
  try {
    const iosSizes = [
      16, 20, 29, 32, 40, 48, 50, 55, 57, 58, 60, 64, 66, 72, 76, 80, 87, 88,
      92, 100, 102, 114, 120, 128, 144, 152, 167, 172, 180, 192, 196, 216, 234,
      256, 258, 512, 1024,
    ];

    const appIconSetPath = path.join(iosAssetsPath, 'AppIcon.appiconset');
    fs.mkdirSync(appIconSetPath, {recursive: true}); // Create AppIcon set directory

    // Generate icons for iOS
    await Promise.all(
      iosSizes.map(async size => {
        const outputFileIOS = path.join(appIconSetPath, `${size}.png`);
        await sharp(logoPath).resize(size, size).toFile(outputFileIOS);
        console.log(`Generated iOS icon of size ${size}`);
      }),
    );

    // Copy Contents.json files
    copyFileToDestination(
      generalContentsSourcePath,
      path.join(iosAssetsPath, 'Contents.json'),
    );
    copyFileToDestination(
      appIconContentsSourcePath,
      path.join(appIconSetPath, 'Contents.json'),
    );
  } catch (error) {
    console.error('Error generating iOS icons:', error);
  }
}

/**
 * Generate icons for Android
 */
async function generateAndroidIcons() {
  try {
    await Promise.all(
      androidResourceDirectories.map(async ({size, folder}) => {
        const outputFileStandard = path.join(
          androidAssetsPath,
          folder,
          'ic_launcher.png',
        );
        await sharp(logoPath).resize(size, size).toFile(outputFileStandard);
        console.log(
          `Generated standard launcher icon for ${folder} at size ${size}px`,
        );

        const outputFileRound = path.join(
          androidAssetsPath,
          folder,
          'ic_launcher_round.png',
        );
        const circleMask = Buffer.from(
          `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${
            size / 2
          }" /></svg>`,
        );
        await sharp(logoPath)
          .resize(size, size)
          .composite([{input: circleMask, blend: 'dest-in'}])
          .toFile(outputFileRound);
        console.log(
          `Generated round launcher icon for ${folder} at size ${size}px`,
        );
      }),
    );
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Execute icon generation
(async () => {
  await generateIOSIcons();
  await generateAndroidIcons();
})();
