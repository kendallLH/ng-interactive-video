# NgInteractiveVideo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

# Getting Started

This project uses Angular, Node.js, and npm. The below steps will walk you through installation in order to view the app locally on http//localhost:4200. If you already have node and npm installed on your computer, ensure you are using v22.12.0. You may skip Steps 1 -

## Step 1 - Install Node.js - These Instructions Use NVM

### Step 1A - Install NVM

### For Windows Use This Guide

https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

### For Mac Use The Below Steps (also detailed in the guide)

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

## Step 2 - Install Angular CLI

You can stay in the same terminal window and run:

```
npm install -g @angular/cli
```

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

## Step 4 - View The Application In Localhost

### Start The Server

Make sure you are still inside the project folder. To start the server run

```
ng serve
```

Wait until it completes. You should see something like **Local: http://localhost:4200 press h + enter to show help** with a blank space where the cursor is below

### Go To Localhost

In a browser tab navigate to http://localhost:4200/. You should see a view where you're able to select "Teacher" or "Student". You're now able to navigate through the app!
