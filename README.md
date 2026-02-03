# Human Rights First: Asylum Report Generator

React Frontend Integration Project
> An interactive data visualization app built as a part of a Bloomtech team project using React, Axios, and Auth0

## Overview

The Human Rights First Asylum Report Generator is a single-page React application that allows users to search and explore U.S asylum case data with dynamic data visualizations. This project was developed as a part of a structured three ticket spring during my Bloomtech Full-Stack Web Development program.


I was responsible for implementing the following:

- Integrating frontend components with a real backend API
- Replacing mock data with live data in visualizations
- Implementing secure authentication with Auth0
- Adding protected routes and a user profile page

I also fixed a few minor bugs outside of the tickets' scope to remove some console errors.

## Tech Stack

This project uses the following tech:

- React 
- JavaScript
- Axios
- React Router
- Auth0
- CSS/LESS

## Features I Implemented

- Live API Integration
    - I replaced static test data with real data that utilized Axios to fetch from the given API endpoints `/fiscalSummary` and `/citizenshipSummary`
    - I then hydrated the existing visualization components with this data
- Authenticated Routes
    - Added login/logout buttons to navigation bar
    - Added a protected Profile page route that is only accessible when a user is logged in and authenticated
- Profile Page (displays basic Auth0 user information)
- Minor UI Fixes (resolved a few console warnings/errors)


## Sprint Tickets Implemented

This project was developed by working through the following tickets:

#### Build Sprint 1 - Landing Page

- Implemented landing page UI to match provided design and fit design specs
- Extended existing React components and updated styles

#### Build Sprint 2 - Api Integration

- Integrated the frontend application with a backend API to fetch asylum case data
- Refactored data visualization logic to use API responses instead of local JSON

#### Build Sprint 3 - Auth0 Integration

- Implemented Auth0 for user authentication
- Implemented protected routes and a dynamic user Profile page


### Notes

This codebase was developed in a sprint-based learning environment during my time attending Bloomtech. This repo reflects the project requirements as specified in the build tickets provided as a part of the project. This was meant to demonstrate my ability to integrate APIs, implement secure authentication, work with external components, and adapting existing component structures for real data usage.
