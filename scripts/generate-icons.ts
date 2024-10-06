import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import {input} from '@inquirer/prompts';

// Prompt for logoPath and packageName using input
async function promptUser() {
  const logoPath = await input({
    message: 'Please provide the path to the logo:',
    validate: (input: string) => {
      if (!input || !fs.existsSync(input)) {
        return 'Error: Valid logoPath is required. Please provide a correct path.';
      }
      return true;
    },
  });

  const packageName = await input({
    message: 'Please provide the package name:',
    validate: (input: string) =>
      input ? true : 'Error: Package name is required.',
  });

  return {logoPath, packageName};
}

(async () => {
  const {logoPath, packageName} = await promptUser();

  // Define paths for iOS and Android projects
  const iosAssetsPath = path.join(
    __dirname,
    '..',
    'ios',
    packageName,
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

  // Define Android resource directories and ensure they exist
  const androidResourceDirectories = [
    {size: 48, folder: 'mipmap-mdpi'},
    {size: 72, folder: 'mipmap-hdpi'},
    {size: 96, folder: 'mipmap-xhdpi'},
    {size: 144, folder: 'mipmap-xxhdpi'},
    {size: 192, folder: 'mipmap-xxxhdpi'},
  ];

  androidResourceDirectories.forEach(({folder}) => {
    const dirPath = path.join(androidAssetsPath, folder);
    fs.mkdirSync(dirPath, {recursive: true});
  });

  /**
   * Copy a file from source to destination with error handling
   * @param {string} source - The path to the source file
   * @param {string} destination - The path to the destination
   */
  const copyFileToDestination = (
    source: string,
    destination: string,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.copyFile(source, destination, err => {
        if (err) {
          console.error(
            `Error copying file from ${source} to ${destination}:`,
            err,
          );
          reject(err);
        } else {
          console.log(`Successfully copied file to ${destination}`);
          resolve();
        }
      });
    });
  };

  /**
   * Generate iOS icons
   */
  async function generateIOSIcons() {
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
    await Promise.all([
      copyFileToDestination(
        generalContentsSourcePath,
        path.join(iosAssetsPath, 'Contents.json'),
      ),
      copyFileToDestination(
        appIconContentsSourcePath,
        path.join(appIconSetPath, 'Contents.json'),
      ),
    ]);
  }

  /**
   * Generate icons for Android
   */
  async function generateAndroidIcons() {
    await Promise.all(
      androidResourceDirectories.map(async ({size, folder}) => {
        const outputFolder = path.join(androidAssetsPath, folder);
        const outputFileStandard = path.join(outputFolder, 'ic_launcher.png');
        const outputFileRound = path.join(
          outputFolder,
          'ic_launcher_round.png',
        );

        // Generate standard icon
        await sharp(logoPath).resize(size, size).toFile(outputFileStandard);
        console.log(
          `Generated standard launcher icon for ${folder} at size ${size}px`,
        );

        // Generate round icon
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
  }

  // Execute icon generation
  try {
    await Promise.all([generateIOSIcons(), generateAndroidIcons()]);
  } catch (error) {
    console.error('Error during icon generation:', error);
  }
})();
