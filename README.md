# 👩‍💻 WEB103 Prework - Female Voices of TikTok

Submitted by: **Daria Taradina**

About this web app: **A curated collection of female TikTok creators worth following — spanning STEM, art, marketing, fashion, and more. Users can browse creators, view their profiles, and add, edit, or delete entries.**

Time spent: **13** hours

## ✅ Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] Persistent navbar with View All and Add Creator buttons accessible on every page
* [x] Masonry card layout with alternating TikTok brand color accents (cyan/red)
* [x] Three-dot dropdown menu on each card for Edit and Delete actions
* [x] Form validation — required fields, TikTok handle format check, and duplicate handle detection
* [x] Reusable DeleteButton component used across Card, EditCreator, and ViewCreator
* [x] Dark mode UI with TikTok-branded color palette (#69C9D0 and #EE1D52)
* [x] Avatar fallback showing creator's initial when no image is provided

## 📽 Video Walkthrough

<img width="800" height="450" alt="ezgif-65abc6c4e4159e5b" src="https://github.com/user-attachments/assets/6dc8e977-ce22-466a-82bf-2d74f3e619ae" />



## 📝 Notes

The most challenging part was resolving a duplicate React instance error caused by mismatched package versions between react-router-dom and the React version. This was fixed by pinning all three packages to aligned versions. Form validation including real-time duplicate TikTok handle checking against Supabase was also added beyond the base requirements.

## © License

Copyright 2026 Daria Taradina

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
