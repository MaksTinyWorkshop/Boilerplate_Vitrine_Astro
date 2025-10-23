---
component: contact-form
lang: en
translationKey: contact-form
title: "Get in touch!"
subtitle: "Choose the plan that fits your project and share your details so we can reach you quickly."
formulas:
  - id: starter
    label: "Starter"
    description: "You already have visuals and want them scheduled with ease."
    helper: "A team member replies within one business day."
    fields:
      - id: lastName
        label: "Last name"
      - id: firstName
        label: "First name"
      - id: email
        label: "Email address"
        type: email
      - id: phone
        label: "Phone"
        type: tel
      - id: company
        label: "Company"
      - id: city
        label: "City"
      - id: postalCode
        label: "Postcode"
      - id: address
        label: "Address"
      - id: industry
        label: "Industry"
      - id: siret
        label: "Company ID"
      - id: commitmentDuration
        label: "Commitment duration"
        type: select
        options:
          - label: "12 months"
            value: "12-months"
          - label: "24 months"
            value: "24-months"
          - label: "36 months"
            value: "36-months"
      - id: customRequest
        label: "Anything else?"
        type: textarea
        placeholder: "Tell us more about your needs"
        required: false
  - id: standard
    label: "Standard"
    description: "We design your visuals and manage your screens all year long."
    helper: "Share your goals, we handle every step afterwards."
    fields:
      - id: lastName
        label: "Last name"
      - id: firstName
        label: "First name"
      - id: email
        label: "Email address"
        type: email
      - id: phone
        label: "Phone"
        type: tel
      - id: company
        label: "Company"
      - id: city
        label: "City"
      - id: postalCode
        label: "Postcode"
      - id: address
        label: "Address"
      - id: industry
        label: "Industry"
      - id: siret
        label: "Company ID"
      - id: commitmentDuration
        label: "Commitment duration"
        type: select
        options:
          - label: "12 months"
            value: "12-months"
          - label: "24 months"
            value: "24-months"
          - label: "36 months"
            value: "36-months"
      - id: visuals
        label: "Visuals"
        type: number
        required: false
        min: 0
        step: 1
      - id: videos
        label: "Videos"
        type: number
        required: false
        min: 0
        step: 1
      - id: customRequest
        label: "Anything else?"
        type: textarea
        placeholder: "Tell us more about your needs"
        required: false
  - id: premium
    label: "Premium"
    description: "Tailor-made support for video, motion design, or drone campaigns."
    helper: "Share a few key details and we'll build a proposal that fits."
    fields:
      - id: lastName
        label: "Last name"
      - id: firstName
        label: "First name"
      - id: email
        label: "Email address"
        type: email
      - id: phone
        label: "Phone"
        type: tel
      - id: company
        label: "Company"
      - id: city
        label: "City"
      - id: postalCode
        label: "Postcode"
      - id: address
        label: "Address"
      - id: industry
        label: "Industry"
      - id: siret
        label: "Company ID"
      - id: commitmentDuration
        label: "Commitment duration"
        type: select
        options:
          - label: "12 months"
            value: "12-months"
          - label: "24 months"
            value: "24-months"
          - label: "36 months"
            value: "36-months"
      - id: visuals
        label: "Visuals"
        type: number
        required: false
        min: 0
        step: 1
      - id: videos
        label: "Videos"
        type: number
        required: false
        min: 0
        step: 1
      - id: customRequest
        label: "Project details"
        type: textarea
        placeholder: "Describe your project"
        required: false
defaultFormula: premium
submitLabel: "Send"
successMessage: "Thank you! We'll get back to you shortly."
---
