---
component: tarifs
defaultPlan: standard
plans:
  - slug: starter
    icon: plan-starter
    subtitle: "Tarif diffusion"
    price: "80€ ht/mois*"
    footnote: "Contrat d’un an 960€ ht*"
    description: "Une offre essentielle pour diffuser un visuel créé par vos soins."
    moreInfoTitle: "Ce qui est inclus dans l'offre Starter"
    moreInfoContent: >-
      <p class={styles.centered}>- Prérequis -</p>
      <ul>
        <li>Vidéos ou visuels statiques fournis par le client dans le format requis par le lecteur d'affichage
        </li>
      </ul>
  - slug: standard
    icon: plan-standard
    subtitle: "Tarif diffusion"
    price: "80€ ht/mois*"
    footnote: "Contrat d’un an 960€ ht*"
    description: "Nous créons pour vous un visuel percutant pour animer vos écrans."
    moreInfoTitle: "Ce qui est inclus dans l'offre Standard"
    moreInfoContent: >-
      <p class={styles.centered}>- Option disponible -</p>
        <ul>
          <li>
          Création visuel statique (<span class={styles.bold}>150€ ht</span> par création réalisée par notre studio)
          </li>
        </ul>
      
  - slug: premium
    icon: plan-premium
    subtitle: "Tarif diffusion"
    price: "80€ ht/mois*"
    footnote: "Contrat d’un an 960€ ht*"
    description: "Une formule complète pour vos campagnes vidéo multi-formats."
    moreInfoTitle: "Ce qui est inclus dans l'offre Premium"
    moreInfoContent: >-
      <p class={styles.centered}>- Options disponibles -</p>
        <ul>
          <li>
          Création visuel statique (<span class={styles.bold}>150€ ht</span>/création réalisée par notre studio)
          </li>
          <li>
          Création vidéo de 10 secondes (<span class={styles.bold}>300€ ht</span> par vidéo produite par notre équipe)
          </li>
          <li>
          Création d'une vidéo drone | motion design (<span class={styles.bold}>Sur devis</span> uniquement)
          </li>
        </ul>
options:
  - id: static
    label: "Le visuel statique*"
    description: "Visuel de 10 secondes créé par le studio"
    price: "150€ ht / achat unique"
    type: base
    defaultSelected: true
    defaultQuantity: 1
    minQuantity: 1
    unitPrice: 150
    priceSuffix: "€ ht / achat unique"
  - id: video-standard
    label: "La vidéo standard*"
    description: "Vidéo de 10 secondes produite par le studio"
    price: "300€ ht / achat unique"
    type: video
    defaultQuantity: 0
    minQuantity: 0
    unitPrice: 300
    priceSuffix: "€ ht / achat unique"
  - id: video-premium
    label: "Vidéo drone* / motion design*"
    description: "Production sur devis selon vos besoins"
    price: "Sur devis"
    type: video
    showCounter: false
modal:
  title: "+ d'infos"
  content: >-
    <p>Chaque offre comprend l'installation, la programmation et la modification de vos campagnes (tous les trimestres) ainsi que leur diffusion (par boucle de 10 secondes toutes les 5 minutes).</p>
---
