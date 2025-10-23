---
component: tarifs
lang: fr
translationKey: pricing-offer
defaultPlan: standard
plans:
  - slug: starter
    icon: plan-starter
    subtitle: "Abonnement diffusion"
    price: "80€ ht/mois*"
    footnote: "Contrat d’un an 960€ ht*"
    description: "Vous fournissez vos visuels, nous gérons la programmation et le suivi."
    moreInfoTitle: "Pour qui ?"
    moreInfoContent: >-
      <p class={styles.centered}>- Idéal pour démarrer -</p>
      <ul>
        <li>Vous disposez déjà de visuels prêts à diffuser.</li>
        <li>Vous avez besoin d'un accompagnement sur la mise en ligne.</li>
      </ul>
  - slug: standard
    icon: plan-standard
    subtitle: "Abonnement diffusion"
    price: "120€ ht/mois*"
    footnote: "Contrat d’un an 1 440€ ht*"
    description: "Notre équipe conçoit vos visuels et pilote vos campagnes."
    moreInfoTitle: "Ce qui est inclus"
    moreInfoContent: >-
      <p class={styles.centered}>- Création & accompagnement -</p>
      <ul>
        <li>Un visuel statique livré à chaque campagne.</li>
        <li>Mises à jour trimestrielles comprises.</li>
      </ul>
  - slug: premium
    icon: plan-premium
    subtitle: "Diffusion multi-formats"
    price: "Sur devis"
    footnote: "Accompagnement sur-mesure"
    description: "Une formule complète pour vos campagnes vidéo, motion design ou drone."
    moreInfoTitle: "Options sur-mesure"
    moreInfoContent: >-
      <p class={styles.centered}>- Production avancée -</p>
      <ul>
        <li>Création de visuels statiques illimités.</li>
        <li>Production de vidéos 10 secondes (tarif unitaire).</li>
        <li>Tournages sur site, drone, motion design.</li>
      </ul>
options:
  - id: static
    label: "Visuel statique*"
    description: "Visuel de 10 secondes créé par l'équipe"
    price: "150€ ht / achat unique"
    type: base
    defaultSelected: true
    defaultQuantity: 1
    minQuantity: 0
    unitPrice: 150
    priceSuffix: "€ ht / achat unique"
  - id: video-standard
    label: "Vidéo standard*"
    description: "Vidéo motion 10 secondes"
    price: "300€ ht / achat unique"
    type: video
    defaultQuantity: 0
    minQuantity: 0
    unitPrice: 300
    priceSuffix: "€ ht / achat unique"
  - id: video-premium
    label: "Tournage / motion design*"
    description: "Production sur devis selon vos besoins"
    price: "Sur devis"
    type: video
    showCounter: false
modal:
  title: "+ d'infos"
  content: >-
    <p>Chaque offre comprend l'installation, la programmation et la modification de vos campagnes (tous les trimestres) ainsi que leur diffusion (par boucle de 10 secondes toutes les 5 minutes).</p>
---
