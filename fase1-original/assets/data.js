/* ============================================================
   BOGNA NI KARAMA · Couche de données (DÉMO)
   ------------------------------------------------------------
   Cette démo stocke tout dans le navigateur (localStorage).
   Aucun serveur, aucune base de données, aucun coût.

   ⚠️ Les chauffeurs pré-chargés sont FICTIFS (démonstration).
   Seuls sont réels : le nom de l'entreprise, Sunna TV Savana,
   la date du lancement et les numéros de téléphone officiels.

   POUR PASSER EN PRODUCTION :
   remplacer les 6 fonctions de l'API en bas de ce fichier par
   des appels à Supabase. Le reste du site ne change pas.
   ============================================================ */

const BNK = (() => {
  'use strict';

  const CLE = 'bnk_demo_v1';
  const CLE_SESSION = 'bnk_session_v1';

  /* --- Données réelles de l'entreprise (issues de l'affiche) --- */
  const ENTREPRISE = {
    nom: 'Bogna Ni Karama',
    activite: 'Moto Taxi',
    ville: 'Bamako, Mali',
    lancement: '2026-08-08',
    partenaire: 'Sunna TV Savana',
    telephones: ['71 02 91 58', '71 87 27 74', '71 74 98 13'],
  };

  /* --- Zones de couverture --- */
  const ZONES = [
    'Badalabougou', 'Hamdallaye', 'Lafiabougou', 'Magnambougou',
    'Kalaban Coura', 'Sabalibougou', 'Djélibougou', 'Faladié',
    'Sogoniko', 'Missira', 'Banconi', 'Niamakoro',
  ];

  /* `equipement` : le chauffeur s'est inscrit sans dossier de séparation.
     On ne le refuse pas — on le met en relation avec l'atelier qui installe
     le dossier. Une fois la moto équipée, il rejoint la plateforme. */
  const STATUTS = {
    en_attente: { libelle: 'En attente',    couleur: 'attente' },
    equipement: { libelle: 'En équipement', couleur: 'equipement' },
    valide:     { libelle: 'Validé',        couleur: 'valide' },
    refuse:     { libelle: 'Refusé',        couleur: 'refuse' },
    suspendu:   { libelle: 'Suspendu',      couleur: 'suspendu' },
  };

  /* Atelier partenaire qui installe les dossiers de séparation.
     ⚠️ DÉMO : coordonnées à remplacer par celles du vrai atelier. */
  const ATELIER = {
    nom: 'Atelier partenaire Bogna Ni Karama',
    tel: '71 02 91 58',   // en attendant, le numéro de l'entreprise
  };

  /* --- Jeu de démonstration (chauffeurs fictifs) --------------- */
  /* `dossier` : la moto est équipée du dossier de séparation installé derrière
     le conducteur — le service qui distingue Bogna Ni Karama. */
  const DEMO = [
    { nom: 'Moussa Traoré',    tel: '76 12 34 56', zone: 'Badalabougou', moto: 'Djakarta 125', immat: 'BKO 4521 MC', experience: 6, dossier: true,  statut: 'valide',      note: 4.8, courses: 1240, inscrit: '2026-07-02' },
    { nom: 'Aliou Coulibaly',  tel: '65 88 21 09', zone: 'Hamdallaye',   moto: 'Sanili 110',   immat: 'BKO 1183 MC', experience: 3, dossier: true,  statut: 'valide',      note: 4.6, courses: 610,  inscrit: '2026-07-05' },
    { nom: 'Ibrahim Keïta',    tel: '78 45 90 12', zone: 'Lafiabougou',  moto: 'Apsonic 125',  immat: 'BKO 9027 MC', experience: 9, dossier: true,  statut: 'valide',      note: 4.9, courses: 2130, inscrit: '2026-06-28' },
    { nom: 'Sekou Diarra',     tel: '73 20 55 41', zone: 'Magnambougou', moto: 'Djakarta 110', immat: 'BKO 3345 MC', experience: 2, dossier: true,  statut: 'valide',      note: 4.4, courses: 305,  inscrit: '2026-07-11' },
    { nom: 'Bakary Sangaré',   tel: '66 74 12 88', zone: 'Kalaban Coura',moto: 'Sanili 125',   immat: 'BKO 7712 MC', experience: 5, dossier: true,  statut: 'valide',      note: 4.7, courses: 980,  inscrit: '2026-07-09' },
    { nom: 'Oumar Cissé',      tel: '79 33 61 24', zone: 'Sabalibougou', moto: 'Apsonic 110',  immat: 'BKO 5504 MC', experience: 4, dossier: true,  statut: 'valide',      note: 4.5, courses: 720,  inscrit: '2026-07-14' },
    { nom: 'Adama Sidibé',     tel: '75 19 47 63', zone: 'Djélibougou',  moto: 'Djakarta 125', immat: 'BKO 6690 MC', experience: 7, dossier: true,  statut: 'valide',      note: 4.8, courses: 1580, inscrit: '2026-07-01' },
    { nom: 'Mamadou Konaté',   tel: '64 05 78 30', zone: 'Faladié',      moto: 'Sanili 110',   immat: 'BKO 2218 MC', experience: 1, dossier: true,  statut: 'en_attente',  note: 0,   courses: 0,    inscrit: '2026-08-06' },
    { nom: 'Salif Doumbia',    tel: '77 62 10 95', zone: 'Sogoniko',     moto: 'Apsonic 125',  immat: 'BKO 8874 MC', experience: 3, dossier: false, statut: 'equipement',  note: 0,   courses: 0,    inscrit: '2026-08-07' },
    { nom: 'Yacouba Camara',   tel: '69 41 27 58', zone: 'Missira',      moto: 'Djakarta 110', immat: 'BKO 1096 MC', experience: 2, dossier: true,  statut: 'en_attente',  note: 0,   courses: 0,    inscrit: '2026-08-08' },
    { nom: 'Drissa Fofana',    tel: '72 84 36 17', zone: 'Banconi',      moto: 'Sanili 125',   immat: 'BKO 4407 MC', experience: 8, dossier: true,  statut: 'suspendu',    note: 3.9, courses: 1710, inscrit: '2026-06-20' },
  ];

  /* --- Stockage ------------------------------------------------ */
  function base() {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) return JSON.parse(brut);
    } catch (e) { /* stockage indisponible : on repart du jeu de démo */ }
    const initial = { chauffeurs: DEMO.map((c, i) => ({ id: i + 1, photo: null, ...c })), suivant: DEMO.length + 1 };
    ecrire(initial);
    return initial;
  }

  function ecrire(donnees) {
    try { localStorage.setItem(CLE, JSON.stringify(donnees)); } catch (e) { /* mode privé */ }
  }

  /* --- Utilitaires --------------------------------------------- */
  function initiales(nom) {
    return nom.trim().split(/\s+/).slice(0, 2).map(m => m[0]).join('').toUpperCase();
  }

  function telWhatsapp(tel) {
    return '223' + tel.replace(/\D/g, '');
  }

  function dateFr(iso) {
    const [a, m, j] = iso.split('-');
    return `${j}/${m}/${a}`;
  }

  /* ============================================================
     API — les 6 fonctions à remplacer pour passer en production
     ============================================================ */

  /** Liste les chauffeurs. filtres : { statut, zone, dossier, recherche } */
  function listerChauffeurs(filtres = {}) {
    let liste = base().chauffeurs.slice();
    if (filtres.statut) liste = liste.filter(c => c.statut === filtres.statut);
    if (filtres.zone)   liste = liste.filter(c => c.zone === filtres.zone);
    if (filtres.dossier) liste = liste.filter(c => c.dossier);
    if (filtres.recherche) {
      const q = filtres.recherche.toLowerCase().trim();
      liste = liste.filter(c =>
        c.nom.toLowerCase().includes(q) ||
        c.zone.toLowerCase().includes(q) ||
        c.moto.toLowerCase().includes(q) ||
        c.immat.toLowerCase().includes(q));
    }
    return liste;
  }

  /** Un chauffeur par son identifiant. */
  function chauffeur(id) {
    return base().chauffeurs.find(c => c.id === Number(id)) || null;
  }

  /** Inscription d'un nouveau chauffeur.
      Moto équipée → « en attente » de validation.
      Moto non équipée → « en équipement » : on l'oriente vers l'atelier
      partenaire au lieu de le refuser. */
  function inscrireChauffeur(donnees) {
    const d = base();
    const nouveau = {
      id: d.suivant,
      nom: donnees.nom,
      tel: donnees.tel,
      zone: donnees.zone,
      moto: donnees.moto,
      immat: donnees.immat,
      experience: Number(donnees.experience) || 0,
      dossier: Boolean(donnees.dossier),
      photo: donnees.photo || null,
      statut: donnees.dossier ? 'en_attente' : 'equipement',
      note: 0,
      courses: 0,
      inscrit: new Date().toISOString().slice(0, 10),
    };
    d.chauffeurs.push(nouveau);
    d.suivant += 1;
    ecrire(d);
    return nouveau;
  }

  /** Change le statut d'un chauffeur (validation, refus, suspension). */
  function changerStatut(id, statut) {
    const d = base();
    const c = d.chauffeurs.find(x => x.id === Number(id));
    if (!c) return null;
    c.statut = statut;
    ecrire(d);
    return c;
  }

  /** L'atelier a posé le dossier : la moto devient équipée et la fiche
      repart en validation normale. */
  function marquerEquipee(id) {
    const d = base();
    const c = d.chauffeurs.find(x => x.id === Number(id));
    if (!c) return null;
    c.dossier = true;
    c.statut = 'en_attente';
    ecrire(d);
    return c;
  }

  /** Supprime définitivement un chauffeur. */
  function supprimerChauffeur(id) {
    const d = base();
    d.chauffeurs = d.chauffeurs.filter(c => c.id !== Number(id));
    ecrire(d);
  }

  /** Compteurs pour le tableau de bord. */
  function statistiques() {
    const l = base().chauffeurs;
    const valides = l.filter(c => c.statut === 'valide');
    const notes = valides.filter(c => c.note > 0);
    return {
      total: l.length,
      valides: valides.length,
      attente: l.filter(c => c.statut === 'en_attente').length,
      suspendus: l.filter(c => c.statut === 'suspendu').length,
      refuses: l.filter(c => c.statut === 'refuse').length,
      equipement: l.filter(c => c.statut === 'equipement').length,
      dossier: valides.filter(c => c.dossier).length,
      courses: valides.reduce((s, c) => s + c.courses, 0),
      note: notes.length ? (notes.reduce((s, c) => s + c.note, 0) / notes.length).toFixed(1) : '—',
    };
  }

  /* --- Session admin (démo : mot de passe en clair, voir README) */
  const ADMIN = { utilisateur: 'admin', motdepasse: 'bogna2026' };

  function connexion(utilisateur, motdepasse) {
    if (utilisateur === ADMIN.utilisateur && motdepasse === ADMIN.motdepasse) {
      try { sessionStorage.setItem(CLE_SESSION, '1'); } catch (e) {}
      return true;
    }
    return false;
  }
  function connecte() {
    try { return sessionStorage.getItem(CLE_SESSION) === '1'; } catch (e) { return false; }
  }
  function deconnexion() {
    try { sessionStorage.removeItem(CLE_SESSION); } catch (e) {}
  }

  /** Remet la démo à zéro (bouton dans le panneau admin). */
  function reinitialiser() {
    try { localStorage.removeItem(CLE); } catch (e) {}
  }

  return {
    ENTREPRISE, ZONES, STATUTS, ATELIER,
    listerChauffeurs, chauffeur, inscrireChauffeur, changerStatut,
    marquerEquipee, supprimerChauffeur, statistiques,
    connexion, connecte, deconnexion, reinitialiser,
    initiales, telWhatsapp, dateFr,
  };
})();
