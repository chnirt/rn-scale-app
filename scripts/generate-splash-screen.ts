import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {exec} from 'child_process';

// Define the project name from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const projectName = packageJson.name; // Convert to lowercase
const lowerProjectName = projectName.toLowerCase(); // Convert to lowercase

// Define paths for important files
const paths = {
  settingsGradle: path.join(__dirname, '..', 'android', 'settings.gradle'),
  buildGradle: path.join(__dirname, '..', 'android', 'app', 'build.gradle'),
  mainActivity: path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'java',
    'com',
    lowerProjectName,
    'MainActivity.java',
  ),
  launchScreenXml: path.join(__dirname, 'launch_screen.xml'),
  sourceImagePath: path.join(__dirname, 'launch_screen.png'),
  destinationImagePath: path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'drawable',
    'launch_screen.png',
  ),
  layoutLaunchScreen: path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'layout',
    'launch_screen.xml',
  ),
  colorsXmlSource: path.join(__dirname, 'colors.xml'),
  colorsXmlDestination: path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'values',
    'colors.xml',
  ),
  stylesXml: path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'values',
    'styles.xml',
  ),
  appDelegate: path.join(__dirname, '..', 'ios', projectName, 'AppDelegate.mm'),
  xcodeAssetsPath: path.join(
    __dirname,
    '..',
    'ios',
    projectName,
    'Images.xcassets',
    'LaunchImage.imageset',
  ),
  storyboardPath: path.join(
    __dirname,
    '..',
    'ios',
    projectName,
    'LaunchScreen.storyboard',
  ),
};

// Splash screen configuration
interface SplashConfig {
  imports: string[];
  onCreateMethod: string;
}

const splashConfig: SplashConfig = {
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
const readFile = (filePath: string): string =>
  fs.readFileSync(filePath, 'utf8');
const writeFile = (filePath: string, content: string): void =>
  fs.writeFileSync(filePath, content, 'utf8');

// Function to update settings.gradle
function updateSettingsGradle(): void {
  const additionalLines = `
include ':react-native-splash-screen'
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')`;

  const settingsContent = readFile(paths.settingsGradle);
  if (!settingsContent.includes('react-native-splash-screen')) {
    fs.appendFileSync(paths.settingsGradle, additionalLines);
    console.log(
      'Updated settings.gradle to include react-native-splash-screen.',
    );
  }
}

// Function to update build.gradle
function updateBuildGradle(): void {
  const dependencyLine =
    "    implementation project(':react-native-splash-screen')\n";
  const buildGradleContent = readFile(paths.buildGradle);

  if (!buildGradleContent.includes(dependencyLine.trim())) {
    const updatedBuildGradle = buildGradleContent.replace(
      'dependencies {',
      `dependencies {\n${dependencyLine}`,
    );
    writeFile(paths.buildGradle, updatedBuildGradle);
    console.log('Added react-native-splash-screen dependency to build.gradle');
  }
}

// Function to update MainActivity.java
function updateMainActivity(): void {
  const data = readFile(paths.mainActivity);
  const packageStatement = 'package com.scaleapp;';

  if (data.includes(packageStatement)) {
    let updatedData = data;

    // Add imports
    splashConfig.imports.forEach(imp => {
      if (!data.includes(imp)) {
        updatedData = updatedData.replace(
          packageStatement,
          `${packageStatement}\n${imp}`,
        );
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

    writeFile(paths.mainActivity, updatedData);
    console.log(
      'Successfully updated MainActivity.java with splash screen code.',
    );
  }
}

// Function to copy files
function copyFile(source: string, destination: string): void {
  fs.copyFile(source, destination, err => {
    if (err) {
      console.error(`Error copying file: ${err}`);
    } else {
      console.log(`Successfully copied file to ${destination}`);
    }
  });
}

// Update other resources
function updateResources(): void {
  copyFile(paths.launchScreenXml, paths.layoutLaunchScreen);
  copyFile(paths.sourceImagePath, paths.destinationImagePath);
  copyFile(paths.colorsXmlSource, paths.colorsXmlDestination);
}

// Function to update styles.xml
function updateStylesXml(): void {
  const data = readFile(paths.stylesXml);
  const translucentItem =
    '\t<item name="android:windowIsTranslucent">true</item>';

  if (!data.includes(translucentItem)) {
    const styleStart =
      '<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">';
    const updatedContent = data.replace(
      styleStart,
      `${styleStart}\n    ${translucentItem}`,
    );
    writeFile(paths.stylesXml, updatedContent);
    console.log(
      'Successfully updated styles.xml with android:windowIsTranslucent.',
    );
  }
}

// Function to update AppDelegate.mm
function updateAppDelegate(): void {
  const data = readFile(paths.appDelegate);
  const importLine = '#import "RNSplashScreen.h"\n';
  const splashScreenCode = `BOOL didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show]; // Show the splash screen\n\t`;

  let updatedData = data;
  if (!data.includes(importLine.trim())) {
    updatedData = updatedData.replace(
      /#import <React\/RCTBundleURLProvider.h>/,
      `${importLine}$&`,
    );
    console.log('Added import statement for RNSplashScreen.');
  }

  if (!data.includes('[RNSplashScreen show];')) {
    const launchOptionsIndex = updatedData.indexOf(
      'return [super application:application didFinishLaunchingWithOptions:launchOptions];',
    );
    if (launchOptionsIndex !== -1) {
      updatedData = `${updatedData.slice(
        0,
        launchOptionsIndex,
      )}${splashScreenCode}${updatedData.slice(launchOptionsIndex)}`;
      console.log('Added splash screen display code to AppDelegate.mm.');
    }
  }

  writeFile(paths.appDelegate, updatedData);
}

// Function to update the LaunchScreen.storyboard
const updateLaunchScreenStoryboard = (): void => {
  // Read the existing storyboard file
  const readStoryboard = (): string => {
    return fs.readFileSync(paths.storyboardPath, 'utf-8');
  };

  // Write updated content back to the storyboard file
  const writeStoryboard = (content: string): void => {
    fs.writeFileSync(paths.storyboardPath, content, 'utf-8');
  };

  // Update storyboard content
  const updateStoryboard = (content: string): string => {
    // Update XML version and toolsVersion
    content = content.replace(
      /<document.*?>/,
      '<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="22155" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">',
    );

    // Remove specified labels
    const labelsToRemove = [
      /<label[^>]*>.*?<\/label>\s*/gs, // This will remove any label
      /<color key="backgroundColor" systemColor="systemBackgroundColor" cocoaTouchSystemColor="whiteColor"\/>\s*/g,
      /<constraints>.*?<\/constraints>\s*/gs, // Remove constraints
    ];

    labelsToRemove.forEach(regex => {
      content = content.replace(regex, '');
    });

    // Define the new <imageView> element to insert
    const newImageView = `
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFit" horizontalHuggingPriority="251" verticalHuggingPriority="251" fixedFrame="YES" image="LaunchImage" translatesAutoresizingMaskIntoConstraints="NO" id="AEW-P6-hcz">
                                <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
                                <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                            </imageView>`;

    // Check if newImageView already exists in the content
    if (!content.includes('<imageView id="k1D-WG-FdW"')) {
      // Insert the new <imageView> after <subviews>
      content = content.replace(/(<subviews>)/, `$1${newImageView}`);
      console.log('After ImageView Insertion:', content); // Log after insertion
    } else {
      console.log('ImageView already exists, skipping insertion.');
    }

    // Update plugin version
    content = content.replace(
      /<plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="15704"\s*\/>/,
      '<plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="22131"/>',
    );

    // Add resources section with an image resource
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

  // Main logic to execute the update
  const originalContent = readStoryboard();
  const updatedContent = updateStoryboard(originalContent);
  writeStoryboard(updatedContent);
  console.log('Storyboard updated successfully!');
};

// Function to create splash screens from a logo
function createSplashScreen() {
  // Ensure Assets.xcassets exists
  if (!fs.existsSync(paths.xcodeAssetsPath)) {
    fs.mkdirSync(paths.xcodeAssetsPath, {recursive: true});
  }

  // Resize and create the files
  const splashScreenFiles = [
    'launch_screen.png',
    'launch_screen 1.png',
    'launch_screen 2.png',
  ];

  splashScreenFiles.forEach(fileName => {
    const splashScreenPath = path.join(paths.xcodeAssetsPath, fileName);

    // Resize image if necessary (you can adjust the dimensions)
    sharp(paths.sourceImagePath)
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

// Function to execute all updates
async function executeUpdates() {
  updateSettingsGradle();
  updateBuildGradle();
  updateMainActivity();
  updateResources();
  updateStylesXml();
  updateAppDelegate();
  updateLaunchScreenStoryboard();
  await createSplashScreen(); // Wait for splash screen creation
  await restartMetroBundler(); // Ensure Metro is restarted after changes
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

// Call the function to execute all updates
executeUpdates();
