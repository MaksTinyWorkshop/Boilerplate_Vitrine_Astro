---
component: tarifs
lang: en
translationKey: pricing-offer
defaultPlan: standard
plans:
  - slug: starter
    icon: plan-starter
    subtitle: "Broadcast subscription"
    price: "€80 ex VAT / month*"
    footnote: "12-month contract €960 ex VAT*"
    description: "You provide the visuals, we handle scheduling and monitoring."
    moreInfoTitle: "Best for"
    moreInfoContent: >-
      <p class={styles.centered}>- Perfect to get started -</p>
      <ul>
        <li>You already have visuals ready to publish.</li>
        <li>You need support for programming and updates.</li>
      </ul>
  - slug: standard
    icon: plan-standard
    subtitle: "Broadcast subscription"
    price: "€120 ex VAT / month*"
    footnote: "12-month contract €1,440 ex VAT*"
    description: "Our team designs your visuals and manages each campaign."
    moreInfoTitle: "What’s included"
    moreInfoContent: >-
      <p class={styles.centered}>- Creation & guidance -</p>
      <ul>
        <li>One static visual produced for every campaign.</li>
        <li>Quarterly updates included.</li>
      </ul>
  - slug: premium
    icon: plan-premium
    subtitle: "Multi-format broadcast"
    price: "On quotation"
    footnote: "Tailor-made support"
    description: "A complete package for video, motion design, or drone campaigns."
    moreInfoTitle: "Bespoke options"
    moreInfoContent: >-
      <p class={styles.centered}>- Advanced production -</p>
      <ul>
        <li>Unlimited static visuals.</li>
        <li>10-second videos (unit pricing).</li>
        <li>On-site shooting, drone footage, motion design.</li>
      </ul>
options:
  - id: static
    label: "Static visual*"
    description: "10-second visual produced by our team"
    price: "€150 ex VAT / one-off"
    type: base
    defaultSelected: true
    defaultQuantity: 1
    minQuantity: 0
    unitPrice: 150
    priceSuffix: "€ ex VAT / one-off"
  - id: video-standard
    label: "Standard video*"
    description: "10-second motion graphic"
    price: "€300 ex VAT / one-off"
    type: video
    defaultQuantity: 0
    minQuantity: 0
    unitPrice: 300
    priceSuffix: "€ ex VAT / one-off"
  - id: video-premium
    label: "Filming / motion design*"
    description: "Produced on quotation according to your needs"
    price: "On quotation"
    type: video
    showCounter: false
modal:
  title: "More details"
  content: >-
    <p>Every plan includes installation, scheduling, and quarterly updates for your campaigns, plus broadcasting on a 10-second loop every five minutes.</p>
---
