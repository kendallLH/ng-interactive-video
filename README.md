# NgInteractiveVideo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

# Getting Started

This project uses Angular, Node.js, and npm. The below steps will walk you through installation in order to view the app locally on [http://localhost:4200](http://localhost:4200/). If you already have node and npm installed on your computer, ensure you are using v22.12.0. You may skip Step 1

## Step 1 - Install Node.js Using NVM

#### For Windows: https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

#### For Mac

Open Terminal (Mac) or Command Prompt (Windows), copy and paste the below command and hit Enter:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your termainl after running the script. Verify it is installed by running `nvm -v`. If installed correctly it will return a version number.

Run the following commands to install Node:

```
nvm install 22.12.0
nvm use 22.12.0
```

Verify the installation by running `node -v`. You should see `v22.12.0`

## Step 2 - Install Angular CLI

You can stay in the same terminal window and run:

```
npm install -g @angular/cli
```

## Step 3 - Download The Repository And Install Dependencies

If you are familiar with repository cloning feel free to use your preferred method. Otherwise, you can use the below steps.

1. In the Github Repository select the green button that says **Code**. On the **Local** tab select **Download ZIP**

2. Navigate to the folder once downloaded and unzip it. Place it somewhere that is easily accessible (for example Documents or Desktop)

3. In your Terminal or Command Prompt navigate into the project folder (cd Desktop/project-folder-name)
   1. **Alternatively** For Mac you can right click on the folder and choose "New Terminal at Folder". For Windows click into the folder, shift + right click "Open Command Window" / "Open PowerShell Window"

### Install Dependencies

In the terminal inside of the project folder run the following command. It may take a few seconds to finish.

```
npm install
```

## Step 4 - View The Application In Localhost

Make sure you are still inside the project folder. To start the server run:

```
ng serve
```

Wait until it completes. You should see something like **Local: http://localhost:4200 press h + enter to show help** with a blank space where the cursor is below.

In a browser tab navigate to http://localhost:4200/. You should see a view where you're able to select "Teacher" or "Student". You're now able to navigate through the app!

<br>
<br>

# Development Documentation

## Libraries / Tools

- PrimeNG: Used for pre-styled design components such as cards, buttons, dropdowns etc.
- Flexbox: Used for flexible positioning, centering, and layout adaptability.
- VideoJS: Used in combination with the videojs-youtube plugin for video display.
- RxJS: Used for reacting to UI events, passing information between components, and managing / manipulating data.
- Angular Reactive Forms: Used for creating the annotation input for teachers. Very customizable and able to be expanded in the future to include multiple different types of annotations.
- Youtube Data API: Used to retrieve youtube video information such as the title.
- Figma: Used to create the logo.

## How It Works Together

#### Local Storage

Local storage is used as a pseudo-database to store the projects two primary data sources: videos and annotations. It’s a simple and efficient approach for small projects where data persistence isn’t critical or for front-end development before backend APIs are available.

While this approach wouldn’t be appropriate for production data storage, it works well in this case by providing basic storage and easy access to data. In production environments, local storage is better suited for non-essential data such as user preferences or UI state.

#### Observables

This project uses two main sources of data in the form of observables. Observables are used in order to enable real-time UI updates with efficient data handling and display. For example, when a teacher adds a new annotation, it is immediately viewable in the annotation list thanks to the annotations$ observable letting the DOM know that there has been a change and providing the updated list.

**videos$**: A single list of videos is stored in local storage. Currently this list of videos is shared between teacher and student, using the assumption that the student is in the logged in teacher's course. In a real-world implementation, videos would be stored in a database and associated with the appropriate user/course using a backend api.

**annotations$**: Annotations are stored in a single annotations list. Each annotation is associated with a video ID and are currently accessed by selecting a video, at which point the video ID is used to filter and retrieve the relevant annotations from local storage. In a real-world implementation, this ID would be sent to an API to fetch all annotations tied to that video.

#### Communication Service

This service is used to house core communication variables such as observables and signals. For projects of this size, a decentralized approach to state management works well, relying on services and observables rather than introducing a heavier library like NgRx, which would add unnecessary overhead. In this case the communication service acts as a central hub for shared state. Like an intersection that all communicated information passes through.

## Challenges / Tradeoffs

- Custom styling can be challenging when working within a design library. Sometimes standard approaches like targeting selectors in styles.scss or using ::host :ng-deep weren’t sufficient. I found that to be the case for styling the PrimeNG button. I ultimately resolved this by switching from p-button to pButton, which applies styles via a directive rather than a wrapped component, allowing my custom styles to bind directly to the native button element and take proper precedence.
- Though video-js itself was straightforward and well-documented, the Video.js plugins (aside from videojs-youtube) were difficult to work with due to limited documentation and inconsistent usage. For example, videojs-quiz wasn’t widely adopted and had minimal guidance, which led to import issues that persisted even after verifying module names directly in node_modules. Given the two-week timeline, I chose not to spend too much time debugging as this type of bug can sometimes take days to fix. Becuase the plugin was not overly complex, I was able to grab the relevant logic that I needed and use it directly. In this way I could also customize it to suit my needs more directly and allow for future adaptations with different types of questions / notes.
- Given the timeline and my lack of prior experience with Video.js and interactive quiz functionality, estimating effort of the unknowns was challenging. To manage that uncertainty, I tackled the most complex and unfamiliar logic first, ensuring the highest priority logic pieces were completed early. This left me with comfortable time to work on tasks I could estimate more accurately, allowing me to be intentional about what I added at the end. I chose to focus on the details that may not be immediately noticeable when included, but are glaring when ommitted such as the "No annotations" text in an empty list, applying styles on hover, and creating a logo. These extra steps helped make the site feel more complete.
- A key tradeoff was how much to account for future enhancements versus keeping the solution appropriately scoped. I used my best judgment to demonstrate where planning ahead made sense while avoiding unnecessary complexity for a project that was fundamentally a POC. For example, as I was building the annotation input form I chose to use a reactive form over a template-driven form in order to accommodate different annotations types in the future. Rather than overengineering every potential future path, I focused on keeping the code clean, readable, and flexible, leaving a solid foundation for future adaptations without prematurely locking the implementation into future features.

## Code Cleanliness

**File Structure:** Organized by feature

- I prefer organizing code by feature, even in smaller projects. Since work is usually done by feature, this structure makes related files easy to find, navigate between, and read while making updates. In larger or growing projects, feature-based organization also helps reduce overlap and merge conflicts when multiple developers are working in parallel. This means planning for future expansion early on so that updates do not become exponentially more complex later.

**Naming:** New Angular Best Practice

- Angular is moving away from automatically appending suffixes like **.component** and **.service** in favor of shorter file names. While I’m not fully sold on the change (it can make names a bit too vague), I’m trying it out to stay aligned with the framework. I did run into naming collisions, especially with services and models, so in this case I opted to keep a **-service** suffix to avoid confusion.

**Data Management**

- This repo uses constants for consistency, readability, and duplication prevention. Additionally they reduce the risk of errors from hard-coded values and make future updates easier and safer.
- Models are used to define shared types across the repository, providing a single source of truth for data structures. They promote consistency, improve type safety, and help developers clearly understand what data is required when creating or passing objects throughout the codebase.

<br>
<br>

# Future Enhancements

## Performance / Production Readiness

- Testing
- User Metrics
- Accessibility
- Screen Responsiveness
- Database / backend integration
- Authentication

## New Features / UX Enhancement

#### Teachers

- Ability to edit annotations and expand the annotations cards to see the answers.
- Ability to click an annotation and be brought to the relevant timestamp in the video.
- Dashboard where they can view/edit/add videos, view student answers, and view metrics.

#### Students

- An "annotations" page where they can search and view the answers to all annotations after completing videos.
- Ability to view and update answers before submitting them to the teacher.
- Ability to link questions to video timestamps and send them to the teacher.

#### Shared

- Ability to have a different number of multiple choice answers.
- Ability to filter / sort videos based on properties like completed status, most recent, due date, etc.
- A progress bar that shows indicators (like bookmarks) at the timestamps where there are video annotations
- Handle edge case of duplicate videos - do not allow a teacher to add the same video twice.
- Handle edge case for incorrect user input. Make sure all input is valid (url is an actual url, character limits to annotations, clear error messages, etc).
