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

This app will support portrait mode in iOS (Android if time allows). Because of the nature of the app, it will look and be most usable in portrait mode, so I will not be adding support for landscape mode.

## Infrastructure

### Technical Requirements

* Firebase: (store users, user progress,) and app content

### Programming Languages

* [React Native](https://facebook.github.io/react-native/)

### Integrations

* [Firebase Authentication](https://firebase.google.com/docs/auth/)

### Deployment Workflow

I will use the steps outlined [here](https://www.christianengvall.se/react-native-build-for-ios-app-store/) and [here](https://codeburst.io/how-to-deploy-a-create-react-native-app-to-the-appstore-229a8fa36fb1) to deploy it. As I don't intend to get an Apple Developer account, I will only be able to locally test the iOS version of the app. After adding a new feature, I will build it and test it on my Android and iOS devices.