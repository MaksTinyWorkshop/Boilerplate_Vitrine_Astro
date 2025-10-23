---
component: contact-form
lang: fr
translationKey: contact-form
title: "Contactez-nous !"
subtitle: "Choisissez la formule qui correspond à votre projet et partagez-nous vos informations pour être recontacté rapidement."
formulas:
  - id: starter
    label: "Starter"
    description: "Vous disposez déjà de vos visuels et souhaitez les programmer simplement."
    helper: "Un membre de l'équipe vous répond sous 24h ouvrées."
    fields:
      - id: lastName
        label: "Nom"
      - id: firstName
        label: "Prénom"
      - id: email
        label: "Adresse mail"
        type: email
      - id: phone
        label: "Téléphone"
        type: tel
      - id: company
        label: "Structure"
      - id: city
        label: "Ville"
      - id: postalCode
        label: "Code postal"
      - id: address
        label: "Adresse"
      - id: industry
        label: "Secteur d'activité"
      - id: siret
        label: "Numéro de SIRET"
      - id: commitmentDuration
        label: "Durée d'engagement"
        type: select
        options:
          - label: "12 mois"
            value: "12-mois"
          - label: "24 mois"
            value: "24-mois"
          - label: "36 mois"
            value: "36-mois"
      - id: customRequest
        label: "Demande particulière"
        type: textarea
        placeholder: "Précisez vos besoins"
        required: false
  - id: standard
    label: "Standard"
    description: "Nous créons vos visuels et animons vos écrans toute l'année."
    helper: "Indiquez-nous vos besoins, nous nous chargeons du reste."
    fields:
      - id: lastName
        label: "Nom"
      - id: firstName
        label: "Prénom"
      - id: email
        label: "Adresse mail"
        type: email
      - id: phone
        label: "Téléphone"
        type: tel
      - id: company
        label: "Structure"
      - id: city
        label: "Ville"
      - id: postalCode
        label: "Code postal"
      - id: address
        label: "Adresse"
      - id: industry
        label: "Secteur d'activité"
      - id: siret
        label: "Numéro de SIRET"
      - id: commitmentDuration
        label: "Durée d'engagement"
        type: select
        options:
          - label: "12 mois"
            value: "12-mois"
          - label: "24 mois"
            value: "24-mois"
          - label: "36 mois"
            value: "36-mois"
      - id: visuals
        label: "Visuel(s)"
        type: number
        required: false
        min: 0
        step: 1
      - id: videos
        label: "Vidéo(s)"
        type: number
        required: false
        min: 0
        step: 1
      - id: customRequest
        label: "Demande particulière"
        type: textarea
        placeholder: "Précisez vos besoins"
        required: false
  - id: premium
    label: "Premium"
    description: "Un accompagnement sur-mesure pour vos campagnes vidéo, motion design ou drone."
    helper: "Partagez quelques détails clés et nous construirons une proposition adaptée."
    fields:
      - id: lastName
        label: "Nom"
      - id: firstName
        label: "Prénom"
      - id: email
        label: "Adresse mail"
        type: email
      - id: phone
        label: "Téléphone"
        type: tel
      - id: company
        label: "Structure"
      - id: city
        label: "Ville"
      - id: postalCode
        label: "Code postal"
      - id: address
        label: "Adresse"
      - id: industry
        label: "Secteur d'activité"
      - id: siret
        label: "Numéro de SIRET"
      - id: commitmentDuration
        label: "Durée d'engagement"
        type: select
        options:
          - label: "12 mois"
            value: "12-mois"
          - label: "24 mois"
            value: "24-mois"
          - label: "36 mois"
            value: "36-mois"
      - id: visuals
        label: "Visuel(s)"
        type: number
        required: false
        min: 0
        step: 1
      - id: videos
        label: "Vidéo(s)"
        type: number
        required: false
        min: 0
        step: 1
      - id: customRequest
        label: "Demande particulière"
        type: textarea
        placeholder: "Décrivez votre projet"
        required: false
defaultFormula: premium
submitLabel: "Envoyer"
successMessage: "Merci pour votre message ! Nous revenons vers vous rapidement."
---
