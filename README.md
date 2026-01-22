# NgInteractiveVideo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

# Getting Started

This project uses Angular, Node.js, and npm. The below steps will walk you through installation in order to view the app locally on [http://localhost:4200](http://localhost:4200/). If you already have node and npm installed on your computer, ensure you are using v22.12.0. You may skip Step 1

<br>

## Step 1 - Install Node.js Using NVM

### Step 1A - Install NVM

#### For Windows

https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

#### For Mac

Open a terminal window on your computer, copy and paste the below command and hit Enter:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your termainl after running the script. Verify it is installed by running `nvm -v`. If installed correctly it will return a version number.

### Step 1B - Install Node.js

Open Terminal (Mac) or Command Prompt (Windows) and run the following commands:

```
nvm install 22.12.0
nvm use 22.12.0
```

Verify the installation by running `node -v`. You should see `v22.12.0`

<br>

## Step 2 - Install Angular CLI

You can stay in the same terminal window and run:

```
npm install -g @angular/cli
```

<br>

## Step 3 - Download The Repository And Install Dependencies

If you are familiar with repository cloning feel free to use your preferred method. Otherwise, you can use the below steps.

### Download The Repository

1. In the Github Repository select the green button that says **Code**. On the **Local** tab select **Download ZIP**

2. Navigate to the folder once downloaded and unzip it. Place it somewhere that is easily accessible (for example Documents or Desktop)

3. In your Terminal or Command Prompt navigate into the project folder (cd Desktop/project-folder-name)
   1. **Alternatively** For Mac you can right click on the folder and choose "New Terminal at Folder". For Windows click into the folder, shift + right click "Open Command Window" / "Open PowerShell Window"

### Install Dependencies

In the terminal inside of the project folder run

```
npm install
```

Wait until it finishes (it may take a few seconds).

<br>

## Step 4 - View The Application In Localhost

### Start The Server

Make sure you are still inside the project folder. To start the server run

```
ng serve
```

Wait until it completes. You should see something like **Local: http://localhost:4200 press h + enter to show help** with a blank space where the cursor is below

### Go To Localhost

In a browser tab navigate to http://localhost:4200/. You should see a view where you're able to select "Teacher" or "Student". You're now able to navigate through the app!

<br>
<br>

# Development Documentation

<br>

## Decisions / Justification

### Code Cleanliness

**File Structure:** Organized by feature

- I prefer organizing code by feature, even in smaller projects. Since work is usually done by feature, this structure makes related files easy to find, navigate between, and read while making updates
- In larger or growing projects, feature-based organization also helps reduce overlap and merge conflicts when multiple developers are working in parallel. I like to plan for future expansion early on so that updates do not become exponentially more complex later.

**Naming:** New Angular Best Practice

- Angular is moving away from automatically appending suffixes like **.component** and **.service** in favor of shorter file names. While I’m not fully sold on the change (it can make names a bit too vague), I’m trying it out to stay aligned with the framework. I did run into naming collisions, especially with services and models, so in this case I opted to keep a **-service** suffix to avoid confusion.
- Constants
- Models - for good type practices and easy readability and single soruce of truth

### Libraries / Tools

- PrimeNG: Used for pre-styled design components such as cards, buttons, dropdowns etc.
- Flexbox: Used for flexible positioning, centering, and layout adaptability.
- VideoJS: Used in combination with the videojs-youtube plugin for video display.
- RxJS: Used for reacting to UI events, passing information between components, and managing / manipulating data
- Angular Reactive Forms: Used for creating the annotation input for teachers. Very customizable and able to be expanded in the future to include multiple different types of annotations
- Youtube Data API: Used to retrieve youtube video information such as the title

### Code

- Reactive Forms

**Observables**
This project uses two main sources of data in the form of observables annotations$ and videos$. Observables are used in order to enable real-time UI updates with efficient data handling and display. For example, when a teacher adds a new annotation, it is immediately viewable in the annotation list thanks to the annotations$ observable.

videos$: A single list of videos is stored in local storage. Currently this list of videos is shared between teacher and student, using the assumption that the student is in the logged in teacher's course. In a real-world implementation, videos would be stored in a database and associated with the appropriate user/course using a backend api.

annotations$: Annotations are stored in a single annotations list. Each annotation is associated with a video ID and are currently accessed by selecting a video, at which point the video ID is used to filter and retrieve the relevant annotations from local storage. In a real-world implementation, this ID would be sent to an API to fetch all annotations tied to that video.

**Local Storage**
In this repository, local storage is used as a pseudo-database to store user information. It’s a simple and efficient approach for small projects where data persistence isn’t critical, for POCs, or for front-end development before backend APIs are available. Local storage is used to manage the project’s two primary data sources: videos and annotations.

While this approach wouldn’t be appropriate for production data storage, it works well in this case by providing basic storage and easy access to data. In production environments, local storage is better suited for non-essential data such as user preferences or UI state.

<br>

## Future Enhancements

### Performance / Production Readiness

- Unit TEsts / Testing
- User Metrics
- Accessibility
- Screen Responsiveness and mobility
- Database / backend integration
- Authentication

### New Features / UX Enhancement

### Code Cleanliness / Refactoring

<br>

## Challenges / Tradeoffs

- primeng styling - Custom styling can be challenging when working within a design library. In this case, standard approaches like targeting selectors in styles.scss or using ::host :ng-deep weren’t sufficient to override the button styles. I ultimately resolved this by switching from p-button to pButton, which applies styles via a directive rather than a wrapped component, allowing my custom styles to bind directly to the native button element and take proper precedence.
- The Video.js plugins (aside from videojs-youtube) were difficult to work with due to limited documentation and inconsistent usage. For example, videojs-quiz wasn’t widely adopted and had minimal guidance, which led to import issues that persisted even after verifying module names directly in node_modules. Given the two-week timeline, I chose not to spend days debugging a low-complexity dependency. Becuase the plugin was not overly complex, I was able to grab the relevant logic that I needed and use it directly. In this way I could also customize it to suit my needs more directly and allow for future adaptations with different types of questions / notes.
- tradeoffs

## How It Works Together

- communication service
- videos$ and annotations$
- types
