import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {exec} from 'child_process';
import {input} from '@inquirer/prompts';

// Prompt for sourceImagePath and projectName using input
async function promptUser() {
  const sourceImagePath = await input({
    message: 'Please provide the path to the source image:',
    validate: (input: string) => {
      if (!input || !fs.existsSync(input)) {
        return 'Error: Valid source image path is required. Please provide a correct path.';
      }
      return true;
    },
  });

  const projectName = await input({
    message: 'Please provide the project name:',
    validate: (input: string) =>
      input ? true : 'Error: Package name is required.',
  });

  return {sourceImagePath, projectName};
}

// Splash screen configuration
const splashConfig = {
  imports: [
    'import android.os.Bundle;',
    'import org.devio.rn.splashscreen.SplashScreen;',
  ],
  onCreateMethod: `
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // Show splash screen
      super.onCreate(savedInstanceState);
  }`,
};

// Utility functions for file operations
const readFile = (filePath: string) => fs.readFileSync(filePath, 'utf8');
const writeFile = (filePath: string, content: string) =>
  fs.writeFileSync(filePath, content, 'utf8');
const copyFile = (source: string, destination: string) =>
  fs.copyFileSync(source, destination);

// Android Update Functions
function updateAndroidSettingsGradle() {
  const settingsGradle = path.join(
    __dirname,
    '..',
    'android',
    'settings.gradle',
  );
  const additionalLines = `
include ':react-native-splash-screen'
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')`;

  const settingsContent = readFile(settingsGradle);
  if (!settingsContent.includes('react-native-splash-screen')) {
    fs.appendFileSync(settingsGradle, additionalLines);
    console.log(
      'Updated settings.gradle to include react-native-splash-screen.',
    );
  }
}

function updateAndroidBuildGradle() {
  const buildGradle = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'build.gradle',
  );
  const dependencyLine =
    "    implementation project(':react-native-splash-screen')\n";
  const buildGradleContent = readFile(buildGradle);

  if (!buildGradleContent.includes(dependencyLine.trim())) {
    const updatedBuildGradle = buildGradleContent.replace(
      'dependencies {',
      `dependencies {\n${dependencyLine}`,
    );
    writeFile(buildGradle, updatedBuildGradle);
    console.log('Added react-native-splash-screen dependency to build.gradle');
  }
}

function updateAndroidMainActivity(projectName: string) {
  const mainActivity = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'java',
    'com',
    String(projectName).toLowerCase(),
    'MainActivity.java',
  );
  const data = readFile(mainActivity);

  // Regex to find the package declaration
  const packageRegex = /package\s+[\w.]+;/;

  const packageMatch = data.match(packageRegex);

  if (packageMatch) {
    let updatedData = data;

    // Add imports for SplashScreen and Bundle
    const imports = [
      'import android.os.Bundle;',
      'import org.devio.rn.splashscreen.SplashScreen;',
    ];

    imports.forEach(imp => {
      if (!data.includes(imp)) {
        updatedData = updatedData.replace(
          packageMatch[0], // replace the whole package line
          `${packageMatch[0]}\n${imp}`, // add import below package
        );
        console.log(`Added import statement: ${imp}`);
      }
    });

    // Ensure the onCreate method is added correctly
    const classDeclarationIndex = updatedData.indexOf(
      'public class MainActivity extends ReactActivity {',
    );

    if (classDeclarationIndex !== -1) {
      const insertIndex = updatedData.indexOf('{', classDeclarationIndex) + 1;
      if (
        !data.includes('protected void onCreate(Bundle savedInstanceState)')
      ) {
        updatedData = `${updatedData.slice(0, insertIndex)}${
          splashConfig.onCreateMethod
        }\n${updatedData.slice(insertIndex)}`;
      }
    }

    writeFile(mainActivity, updatedData);
    console.log(
      'Successfully updated MainActivity.java with splash screen code.',
    );
  }
}

function updateAndroidResources(sourceImagePath: string) {
  const launchScreenXml = path.join(__dirname, 'launch_screen.xml');
  const layoutLaunchScreen = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'layout',
    'launch_screen.xml',
  );
  const destinationImagePath = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'drawable',
    'launch_screen.png',
  );
  const colorsXmlSource = path.join(__dirname, 'colors.xml');
  const colorsXmlDestination = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'values',
    'colors.xml',
  );
  copyFile(launchScreenXml, layoutLaunchScreen);
  copyFile(sourceImagePath, destinationImagePath);
  copyFile(colorsXmlSource, colorsXmlDestination);
}

function updateAndroidStylesXml() {
  const stylesXml = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'values',
    'styles.xml',
  );
  const data = readFile(stylesXml);
  const translucentItem =
    '\t<item name="android:windowIsTranslucent">true</item>';

  if (!data.includes(translucentItem)) {
    const styleStart =
      '<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">';
    const updatedContent = data.replace(
      styleStart,
      `${styleStart}\n    ${translucentItem}`,
    );
    writeFile(stylesXml, updatedContent);
    console.log(
      'Successfully updated styles.xml with android:windowIsTranslucent.',
    );
  }
}

// iOS Update Functions
function updateiOSAppDelegate(projectName: string) {
  const appDelegate = path.join(
    __dirname,
    '..',
    'ios',
    projectName,
    'AppDelegate.mm',
  );
  const data = readFile(appDelegate);
  const importLine = '#import "RNSplashScreen.h"\n';
  const splashScreenCode = `BOOL didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show]; // Show the splash screen
  return didFinish;`;

  let updatedData = data;

  // Check and add import line for RNSplashScreen
  if (!data.includes(importLine.trim())) {
    updatedData = updatedData.replace(
      /#import <React\/RCTBundleURLProvider.h>/,
      `${importLine}$&`,
    );
    console.log('Added import statement for RNSplashScreen.');
  }

  // Update the didFinishLaunchingWithOptions method
  const launchOptionsIndex = updatedData.indexOf(
    'return [super application:application didFinishLaunchingWithOptions:launchOptions];',
  );

  if (launchOptionsIndex !== -1) {
    // Remove the existing return statement
    updatedData = updatedData.replace(
      /return \[super application:application didFinishLaunchingWithOptions:launchOptions\];/,
      splashScreenCode,
    );
    console.log(
      'Updated didFinishLaunchingWithOptions to include splash screen code in AppDelegate.mm.',
    );
  }

  writeFile(appDelegate, updatedData);
}

const updateLaunchScreenStoryboard = (projectName: string) => {
  const storyboardPath = path.join(
    __dirname,
    '..',
    'ios',
    projectName,
    'LaunchScreen.storyboard',
  );
  const readStoryboard = (): string => fs.readFileSync(storyboardPath, 'utf-8');

  const writeStoryboard = (content: string): void =>
    fs.writeFileSync(storyboardPath, content, 'utf-8');

  const updateStoryboard = (content: string): string => {
    content = content.replace(
      /<document.*?>/,
      '<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="22155" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">',
    );

    const labelsToRemove = [
      /<label[^>]*>.*?<\/label>\s*/gs,
      /<color key="backgroundColor" systemColor="systemBackgroundColor" cocoaTouchSystemColor="whiteColor"\/>\s*/g,
      /<constraints>.*?<\/constraints>\s*/gs,
    ];

    labelsToRemove.forEach(regex => {
      content = content.replace(regex, '');
    });

    const newImageView = `
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFit" horizontalHuggingPriority="251" verticalHuggingPriority="251" fixedFrame="YES" image="LaunchImage" translatesAutoresizingMaskIntoConstraints="NO" id="AEW-P6-hcz">
                                <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
                                <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                            </imageView>`;

    if (!content.includes('<imageView id="AEW-P6-hcz"')) {
      content = content.replace(/(<subviews>)/, `$1${newImageView}`);
      console.log('ImageView inserted into storyboard.');
    } else {
      console.log('ImageView already exists in the storyboard.');
    }

    content = content.replace(
      /<plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="15704"\s*\/>/,
      '<plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="22131"/>',
    );

    if (!content.includes('<resources>')) {
      const resourcesSection = `
    <resources>
        <image name="LaunchImage" width="621" height="1344"/>
    </resources>`;
      content = content.replace(
        '</document>',
        resourcesSection + '\n</document>',
      );
    }

    return content;
  };

  const originalContent = readStoryboard();
  const updatedContent = updateStoryboard(originalContent);
  writeStoryboard(updatedContent);
};

// Function to create splash screens from a logo
function createSplashScreen(sourceImagePath: string, projectName: string) {
  const xcodeAssetsPath = path.join(
    __dirname,
    '..',
    'ios',
    projectName,
    'Images.xcassets',
    'LaunchImage.imageset',
  );
  // Ensure Assets.xcassets exists
  if (!fs.existsSync(xcodeAssetsPath)) {
    fs.mkdirSync(xcodeAssetsPath, {recursive: true});
  }

  // Resize and create the files
  const splashScreenFiles = [
    'launch_screen.png',
    'launch_screen 1.png',
    'launch_screen 2.png',
  ];

  splashScreenFiles.forEach(fileName => {
    const splashScreenPath = path.join(xcodeAssetsPath, fileName);

    // Resize image if necessary (you can adjust the dimensions)
    sharp(sourceImagePath)
      .resize(1242, 2688) // Adjust dimensions as needed
      .toFile(splashScreenPath, err => {
        if (err) {
          console.error(`Error creating splash screen for ${fileName}:`, err);
        } else {
          console.log(`Splash screen created successfully for ${fileName}!`);
        }
      });
  });

  // Check if the Simulator is running
  exec('pgrep -x Simulator', (simErr, simStdout) => {
    if (!simErr) {
      const simulatorPid = simStdout.trim();
      if (simulatorPid) {
        exec('killall Simulator', killSimErr => {
          if (killSimErr) {
            console.error('Error killing Simulator:', killSimErr);
          } else {
            console.log('Simulator killed.');
          }
        });
      } else {
      }
    }
  });
}

// Function to restart the Metro bundler
function restartMetroBundler() {
  exec('lsof -t -i:8081', (err, stdout) => {
    if (!err) {
      const metroPid = stdout.trim();
      if (metroPid) {
        exec(`kill ${metroPid}`, killMetroErr => {
          if (killMetroErr) {
            console.error('Error killing Metro bundler:', killMetroErr);
          } else {
            console.log('Metro bundler killed successfully. Restarting...');
            exec('npx react-native start', startErr => {
              if (startErr) {
                console.error('Error restarting Metro bundler:', startErr);
              } else {
                console.log('Metro bundler restarted successfully.');
              }
            });
          }
        });
      } else {
        console.log('Metro bundler is not running.');
      }
    } else {
      console.error('Error checking for Metro bundler:', err);
    }
  });
}

(async () => {
  const {sourceImagePath, projectName} = await promptUser();
  // Update Android
  updateAndroidSettingsGradle();
  updateAndroidBuildGradle();
  updateAndroidMainActivity(projectName);
  updateAndroidResources(sourceImagePath);
  updateAndroidStylesXml();

  // Update iOS
  updateiOSAppDelegate(projectName);
  updateLaunchScreenStoryboard(projectName);
  createSplashScreen(sourceImagePath, projectName);

  await restartMetroBundler(); // Ensure Metro is restarted after changes

  console.log('Update completed for both Android and iOS.');
})();
