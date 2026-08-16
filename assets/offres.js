/* ============================================================
   BOGNA NI KARAMA · Les trois offres
   ------------------------------------------------------------
   Source unique des formules, des prix et des coûts de
   fonctionnement. La page tarifs et la présentation lisent
   toutes les deux ce fichier : un seul endroit à modifier.

   Taux fixe euro / franc CFA : 1 € = 655,957 FCFA (parité fixe).
   ============================================================ */

const OFFRES = (() => {
  'use strict';

  const TAUX = 655.957;

  /** Formate un prix en FCFA arrondi au millier, façon « 1 640 000 FCFA ». */
  function fcfa(euros) {
    const v = Math.round(euros * TAUX / 1000) * 1000;
    return v.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' FCFA';
  }

  /** Formate un prix en euros, façon « 2 500 € ». */
  function eur(euros) {
    return euros.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €';
  }

  /* --- Les trois formules ------------------------------------- */
  const FORMULES = [
    {
      cle: 'vitrine',
      nom: 'Vitrine',
      accroche: 'Être trouvé sur internet',
      pour: 'Pour exister en ligne dès le lancement, sans rien gérer.',
      prix: 990,
      recommande: false,
      /* Pas de limite technique : les fiches sont écrites dans le site.
         Ce qui se compte, c'est le travail de saisie — au-delà, la formule
         Plateforme est plus intéressante puisque les chauffeurs s'inscrivent. */
      capacite: '20 fiches saisies par nos soins',
      volume: 'Mise à jour par nos soins',
      inclus: [
        'Site web complet sur votre nom de domaine',
        'Page d\'accueil avec le dossier de séparation mis en avant',
        'Annuaire de vos chauffeurs (photo, moto, quartier)',
        'Boutons appeler et WhatsApp sur chaque fiche',
        'Adapté au téléphone, chargement rapide',
        'Formation à la prise en main',
      ],
      absent: [
        'Les chauffeurs ne peuvent pas s\'inscrire seuls',
        'Pas de panneau d\'administration',
        'Chaque modification passe par nous',
        'Au-delà de 20 fiches, la formule Plateforme est plus avantageuse',
      ],
    },
    {
      cle: 'plateforme',
      nom: 'Plateforme',
      accroche: 'Réserver en ligne et gérer votre flotte',
      pour: 'Pour recevoir des réservations et tout piloter depuis votre téléphone.',
      prix: 2500,
      recommande: true,
      capacite: 'Jusqu\'à 150 chauffeurs',
      volume: 'Vous gérez tout, en direct',
      inclus: [
        'Tout ce que contient la formule Vitrine',
        'Réservation en ligne : le client commande sans appeler',
        'Le chauffeur reçoit la demande et accepte ou refuse',
        'Base de données : les inscriptions vous arrivent vraiment',
        'Les chauffeurs s\'inscrivent seuls depuis leur téléphone',
        'Panneau d\'administration : valider, refuser, suspendre',
        'Suivi des motos en cours d\'équipement (atelier partenaire)',
        'Export Excel de toute votre flotte',
        'Comptes administrateurs sécurisés (plusieurs personnes)',
        'Photos des chauffeurs hébergées en ligne',
        'Formation complète à la gestion',
      ],
      absent: [
        'Pas de statistiques ni de suivi des revenus',
        'Pas d\'espace chauffeur',
      ],
    },
    {
      cle: 'complete',
      nom: 'Complète',
      accroche: 'Piloter avec des chiffres',
      pour: 'Pour suivre vos revenus, vos chauffeurs et faire grandir le service.',
      prix: 3200,
      recommande: false,
      capacite: 'Chauffeurs illimités',
      volume: 'Statistiques et croissance',
      inclus: [
        'Tout ce que contient la formule Plateforme',
        'Attribution automatique au chauffeur le plus proche',
        'Réservations programmées (départ à une heure précise)',
        'Historique des courses par chauffeur et par quartier',
        'Tableau de bord : courses, revenus, quartiers les plus actifs',
        'Notifications automatiques par WhatsApp',
        'Notes et avis des clients après la course',
        'Espace chauffeur : il suit ses courses et ses gains',
        'Formation approfondie à la gestion et aux chiffres',
      ],
      absent: [
        'Le suivi du trajet en direct est une option (voir ci-dessous)',
      ],
    },
  ];

  /* --- Option : suivi du trajet en direct ----------------------
     Réservé à la formule Complète, et nécessite l'application
     installable : un navigateur fermé n'envoie plus la position. */
  const SUIVI = {
    nom: 'Suivi du trajet en direct',
    prix: 1400,
    delai: '3 à 4 semaines',
    exige: ['complete', 'pwa'],
    description:
      'Le client voit la moto avancer sur une carte, comme sur les grandes ' +
      'applications de transport. Il sait où est son chauffeur et dans combien ' +
      'de temps il arrive. Un proche peut suivre le trajet depuis chez lui.',
    apporte: [
      'Position de la moto sur une carte, mise à jour en continu',
      'Temps d\'arrivée estimé pour le client',
      'Lien de partage : un proche suit le trajet à distance',
      'Trajet enregistré : distance réelle et durée de chaque course',
      'Vous voyez sur une carte où sont toutes vos motos disponibles',
    ],
    /* Ce qu'il faut dire honnêtement avant de vendre. */
    contraintes: [
      'Le chauffeur doit garder l\'application ouverte pendant la course',
      'Consomme de la batterie et des données sur son téléphone',
      'La position se perd dans les zones sans réseau, puis se rattrape',
      'Nécessite l\'application installable (comprise dans le prix ci-dessus)',
    ],

    /* Pourquoi c'est le poste le plus cher : ce qu'il y a à construire.
       Expliqué en langage simple — le client doit comprendre qu'il paie
       du travail réel, pas « un mapa ». */
    travaux: [
      {
        titre: 'Envoyer la position sans vider la batterie',
        detail:
          'Le téléphone du chauffeur doit envoyer sa position toutes les quelques ' +
          'secondes, pendant des heures, sans se décharger. Il faut régler la ' +
          'fréquence, arrêter l\'envoi quand la moto ne bouge pas, et reprendre ' +
          'automatiquement. C\'est ce réglage qui fait la différence entre une ' +
          'application qu\'on garde et une application qu\'on désinstalle.',
      },
      {
        titre: 'Garder la connexion ouverte des deux côtés',
        detail:
          'Le client et le chauffeur doivent rester reliés pendant toute la course. ' +
          'Une page web normale demande des informations puis se referme ; ici la ' +
          'liaison reste ouverte en permanence, dans les deux sens. C\'est une ' +
          'autre façon de construire, et c\'est le cœur du travail.',
      },
      {
        titre: 'Tenir le coup quand le réseau tombe',
        detail:
          'À Bamako, la connexion se coupe régulièrement. Les positions doivent ' +
          'être gardées sur le téléphone puis renvoyées quand le réseau revient, ' +
          'sans perdre le trajet ni afficher n\'importe quoi au client.',
      },
      {
        titre: 'Afficher une carte qui bouge, sur un téléphone modeste',
        detail:
          'La moto doit glisser sur la carte de façon fluide, même sur un ' +
          'téléphone d\'entrée de gamme et avec une connexion lente. Cela demande ' +
          'de lisser les positions reçues pour éviter que l\'icône saute.',
      },
      {
        titre: 'Tester en vrai, dans la circulation',
        detail:
          'Ce genre de fonction ne se vérifie pas sur un ordinateur : il faut ' +
          'sortir avec un téléphone, faire de vrais trajets, traverser des zones ' +
          'sans réseau et corriger. C\'est une part importante des 3 à 4 semaines.',
      },
    ],

    /* Services extérieurs utilisés — le client doit savoir qu'une partie
       repose sur des sociétés spécialisées, pas sur du bricolage. */
    services: [
      {
        nom: 'Le fond de carte',
        role: 'Les rues de Bamako affichées à l\'écran',
        fournisseur: 'OpenStreetMap (libre) ou Google Maps (payant)',
        cout: 'Gratuit avec la carte libre',
      },
      {
        nom: 'Le service de position en temps réel',
        role: 'Transporter les positions du chauffeur vers le client, sans délai',
        fournisseur: 'Service spécialisé, mêmes bases que les grandes applications',
        cout: 'Gratuit jusqu\'à un usage important',
      },
      {
        nom: 'Le GPS du téléphone',
        role: 'Mesurer la position réelle de la moto',
        fournisseur: 'Le téléphone du chauffeur lui-même',
        cout: 'Aucun',
      },
    ],
    /* Deux qualités de carte : gratuite ou payante. */
    cartes: [
      {
        cle: 'libre',
        nom: 'Carte libre (OpenStreetMap)',
        prixMois: 0,
        recommande: true,
        portee: [
          'Aucun coût, quel que soit le nombre de courses',
          'Rues principales de Bamako bien couvertes',
          'Suffisant pour voir la moto approcher et estimer l\'arrivée',
        ],
        limites: [
          'Certaines petites rues sont incomplètes ou mal nommées',
          'Pas de calcul d\'itinéraire tenant compte de la circulation',
          'Fond de carte moins détaillé que Google Maps',
        ],
      },
      {
        cle: 'google',
        nom: 'Carte Google Maps',
        prixMois: 30,
        recommande: false,
        portee: [
          'Cartographie de Bamako plus complète et à jour',
          'Itinéraires tenant compte de la circulation',
          'Fond de carte que tout le monde reconnaît',
        ],
        limites: [
          'Gratuit jusqu\'à un certain nombre d\'affichages par mois',
          'Au-delà, environ 20 000 FCFA (30 €) par mois selon les courses',
          'Nécessite une carte bancaire enregistrée chez Google',
        ],
      },
    ],
  };

  /* --- Coûts de fonctionnement (ne vont PAS dans ma poche) ----- */
  const FRAIS = {
    vitrine: [
      { poste: 'Nom de domaine (.com ou .ml)', prixAn: 15, note: 'Renouvelé chaque année' },
      { poste: 'Hébergement du site', prixAn: 0, note: 'Gratuit sur cette formule' },
    ],
    plateforme: [
      { poste: 'Nom de domaine (.com ou .ml)', prixAn: 15, note: 'Renouvelé chaque année' },
      { poste: 'Hébergement du site', prixAn: 0, note: 'Gratuit jusqu\'à un fort trafic' },
      { poste: 'Base de données et photos', prixAn: 0, note: 'Gratuit jusqu\'à 150 chauffeurs environ' },
    ],
    complete: [
      { poste: 'Nom de domaine (.com ou .ml)', prixAn: 15, note: 'Renouvelé chaque année' },
      { poste: 'Hébergement du site', prixAn: 0, note: 'Gratuit jusqu\'à un fort trafic' },
      { poste: 'Base de données et photos', prixAn: 300, note: 'Formule payante nécessaire au-delà de 150 chauffeurs' },
      { poste: 'Envoi des messages WhatsApp', prixAn: 120, note: 'Selon le volume de notifications' },
      { poste: 'Carte pour le suivi en direct', prixAn: 0, note: 'Gratuit avec la carte libre · en option Google Maps' },
    ],
  };

  /* --- Option application mobile ------------------------------- */
  const APP = {
    /* Ce que coûte le développement en plus de la plateforme web. */
    options: [
      {
        cle: 'pwa',
        nom: 'Application installable (PWA)',
        prix: 600,
        delai: '2 semaines',
        recommande: true,
        description:
          'Le site s\'installe sur le téléphone comme une application : icône sur ' +
          'l\'écran d\'accueil, ouverture en plein écran, fonctionne même avec une ' +
          'connexion faible. Rien à télécharger sur Play Store.',
        avantages: [
          'Aucun frais de boutique (ni Apple, ni Google)',
          'Installation en un clic depuis le site',
          'Mise à jour immédiate, sans que personne ne télécharge quoi que ce soit',
          'Fonctionne sur Android comme sur iPhone',
          'Léger : quelques secondes à installer, peu de données',
        ],
        limites: [
          'N\'apparaît pas dans la recherche du Play Store',
          'Notifications limitées sur iPhone',
        ],
      },
      {
        cle: 'native',
        nom: 'Application Play Store et App Store',
        prix: 3500,
        delai: '2 à 3 mois',
        recommande: false,
        description:
          'Une vraie application téléchargeable depuis le Play Store et l\'App Store, ' +
          'développée séparément du site. C\'est un second produit à construire et à ' +
          'maintenir, en plus de la plateforme web.',
        avantages: [
          'Présence dans le Play Store et l\'App Store',
          'Notifications complètes sur tous les téléphones',
          'Accès au GPS en continu (suivi du trajet en direct)',
          'Image de marque plus forte',
        ],
        limites: [
          'Coût de développement 3 à 6 fois supérieur',
          'Chaque mise à jour doit être validée par Apple et Google (plusieurs jours)',
          'Les clients doivent télécharger et mettre à jour',
          'Frais annuels de boutique à payer, même sans nouvelle version',
        ],
      },
    ],
    /* Frais de boutique — chiffres publics, vérifiables. */
    fraisBoutique: [
      { poste: 'Compte développeur Google Play', prix: 23, note: 'Une seule fois, à vie (25 $)' },
      { poste: 'Compte développeur Apple', prix: 92, note: 'Chaque année (99 $)' },
    ],
  };

  /* --- Maintenance mensuelle ----------------------------------- */
  const MAINTENANCE = {
    prixMois: 49,
    inclus: [
      'Vos modifications de textes, photos et quartiers',
      'Ajout ou retrait de fonctions simples',
      'Surveillance du site et corrections',
      'Sauvegarde régulière de vos données',
      'Assistance par WhatsApp en journée',
    ],
  };

  return { TAUX, fcfa, eur, FORMULES, FRAIS, APP, SUIVI, MAINTENANCE };
})();
