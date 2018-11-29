# Table of Contents

* Spec
    * [Feature Definitions](#feature-definitions)
    * [Sitemap](#sitemap)
    * [Interface](#interface)
        * [Information Architecture](#information-architecture)
        * [Browser Support](#browser-support)
    * [Infrastructure](#infrastructure)
        * [Technical Requirements](#technical-requirements)
        * [Programming Languages](#programming-languages)
        * [Integrations](#integrations)
        * [Deployment Workflow](#development-workflow)
        * [Web Host](#web-host)

# Spec

## Feature Definitions

[Link to Features](https://github.com/jessicakarpovich/capstone/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Afeature)

* log in/oAuth/logout - if time allows
* Firebase connection
* kanji, phrase of the day
* 10 most recent test scores - if time allows
* review kana by row, kanji be level
* test - randomly generated questions from selected content
* translation using Google API
* kana charts
* getting started guides

### Scoring

The score screen will display the 10 most recent user test scores. It enables the user to track how they are doing on tests, when they have last completed a test, and whether or not they should review.

If a user is logged in through Google, their scores will presist across devices. If a user is not logged in, their scores will be saved into AsyncStorage and will persist on restarting the app. This ensures user login is never a requirement! :)

## Sitemap

Home

    - Recent Scores
    - Kanji/Phrase of the day

Review 

    - Recent Scores
    -> Hiragana
        -> Rows
            - Display Hiragana Details (back/next buttons)
    -> Katakana
        -> Rows
            - Display Katakana Details (back/next buttons)
    -> Kanji
        -> Levels
            - Display Kanji Details (back/next buttons)

Test
    
    - Recent Scores
    - Selection Screen for question content, number, and language
        - Question with 4 possible answers
        - Score screen when done

Resources

    - Recent Scores
    - Search/Translate Box
    - Link to Hiragana Chart
    - Link to Katakana Chart
    - Links to Getting Started Guides

Settings

    - Log in
    - Log out

Recent Scores

    - 10 most recent scores

## Interface

### Information Architecture

Home
    
    - Recent Scores

    Kanji of the day
        Kanji
            Kunyomi
            Onyomi
            Meaning
    Phrase of the day
        Phrase
            Romaji
            Meaning

Review 

    - Recent Scores

    Review
    Please select what to review.

    -> Hiragana
        Review - Hiragana
        Start from:

        -> Rows
            Hiragana - __ Row
            Hiragana __
            Hiragana Character
                Romaji

    -> Katakana
        -> Rows
            Katakana - __ Row
            Katakana __
            Katakana Character
                Romaji
    -> Kanji
        -> Levels
            Kanji - Level __
            Kanji __
            Kanji Character
                Kunyomi
                Onyomi
                Meaning
Test
    
    - Recent Scores

    Select test content:
    Hiragana
        あーん
        がーぱ
        きゃーぴょ
    Katakana
        アーン
        ガーパ
        キャーピョ
    Kanji
        Level 1
        Level 2
    Number of questions:
    Questions in:
        English/Romaji
        Japanese
    Mission Start

    - Mission In Progress
        Question __/__
        Select the matching romaji
        Character
            4 options
        - Mission Complete
            Congrats!
            __/__
            percent correct%

Resources

    - Recent Scores
    - Hiragana Chart
    - Katakana Chart
    - Search/Translate
    - Getting Started Guides

Settings

    - Log in
    - Log out

Recent Scores

    - 10 most recent scores
        1. date  percent%

### Browser Support

#### OS Support
This app will support portrait mode in iOS (and Android if time allows). To make Android support easier, I will avoid using any platform specific React Native components. Ideally, I want the app to be open to iOS and Andriod users.

#### Portrait/Landscape Mode Support
Because of the nature of the app, content is best listed top to bottom. It will look and be most usable in portrait mode, so I will not be adding support for landscape mode.

#### Screen Resolutions

As my app focuses on displaying data vertically, key resolution is smallest acceptable width. For this, I'll be looking at phones, not tablets.

- iPhone 7 - 750-pixels wide at 326 ppi
- Galaxy S8 - 1440-pixels wide at 570 ppi

## Infrastructure

### Technical Requirements

* Firebase: Store/authenticate users
* Firestore: Store app content and user scores

### Programming Languages

* [JavaScript](https://www.javascript.com/)

#### Framework

* [React Native](https://facebook.github.io/react-native/)

### Integrations

* [Firebase/Firebase Authentication](https://firebase.google.com/docs/)
* [Google Translate API](https://cloud.google.com/translate/docs/)

### Deployment Workflow

I will be following the Github workflow for deployment. For new features, I will create a branch off of dev and work on it there. Once complete, I will merge it into dev. After I have completed the features for the release, I will create a pull request and merge into the release branch. I will also create a PR for merging the release into master and will request approval from at least one instructor before merging. Upon approval, I will merge my changes into dev and they will be live.

### Web Host

As my app is written in React Native and is meant for mobile devices, I will not be providing a live hosted version. However, anyone interested will be able to follow the setup instructions in the readme to run the app using Expo either on their phone, or through a simulator.