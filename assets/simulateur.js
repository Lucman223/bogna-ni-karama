/* ============================================================
   BOGNA NI KARAMA · Moteur du simulateur
   ------------------------------------------------------------
   Fait vivre un cycle complet sur un seul écran : le client
   commande, le chauffeur accepte, la course se déroule, l'admin
   voit tout. Chaque panneau représente un téléphone différent.

   Tout est en mémoire : rien n'est envoyé, rien n'est gardé.
   En production, ces états vivraient dans la base de données et
   chaque acteur serait sur son propre appareil.
   ============================================================ */

const SIM = (() => {
  'use strict';

  /* --- Étapes de la vie d'une course --------------------------- */
  const ETATS = {
    demandee:  { libelle: 'Demandée',        couleur: 'attente'   },
    acceptee:  { libelle: 'Acceptée',        couleur: 'valide'    },
    en_route:  { libelle: 'Chauffeur en route', couleur: 'equipement' },
    a_bord:    { libelle: 'Course en cours', couleur: 'equipement' },
    terminee:  { libelle: 'Terminée',        couleur: 'valide'    },
    refusee:   { libelle: 'Refusée',         couleur: 'refuse'    },
    annulee:   { libelle: 'Annulée',         couleur: 'refuse'    },
  };

  /* --- Tarifs indicatifs par quartier (démonstration) ----------- */
  const PRIX_BASE = 500;      // FCFA
  const PRIX_KM   = 150;      // FCFA par kilomètre estimé

  /* --- État vivant de la simulation ---------------------------- */
  let etat = null;
  const abonnes = [];

  function neuf() {
    return {
      courses: [],
      inscriptions: [],   // chauffeurs inscrits pendant la démo
      suivant: 1,
      journal: [],
    };
  }

  /** Prévient les panneaux qu'il faut se redessiner.
      L'erreur d'un panneau n'arrête pas les autres, mais elle est
      signalée en console : un panneau muet est un bug, pas un détail. */
  function prevenir() {
    abonnes.forEach(f => {
      try { f(etat); }
      catch (e) { console.error('Panneau en erreur :', e); }
    });
  }

  function heure() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  /** Écrit une ligne dans le journal des évènements. */
  function noter(acteur, texte) {
    etat.journal.unshift({ heure: heure(), acteur, texte });
    if (etat.journal.length > 40) etat.journal.pop();
  }

  /* --- Distance et prix estimés (démonstration) ---------------- */
  function estimer(depart, arrivee) {
    // Distance fictive mais stable : même paire de quartiers = même prix.
    const cle = [depart, arrivee].join('|');
    let somme = 0;
    for (let i = 0; i < cle.length; i++) somme += cle.charCodeAt(i);
    const km = 2 + (somme % 9);                    // entre 2 et 10 km
    const prix = PRIX_BASE + km * PRIX_KM;
    return { km, prix, minutes: Math.max(5, Math.round(km * 3.5)) };
  }

  /* ============================================================
     Actions du CLIENT
     ============================================================ */

  /** Le client demande une course. */
  function demanderCourse({ nomClient, depart, arrivee }) {
    const e = estimer(depart, arrivee);
    const course = {
      id: etat.suivant++,
      nomClient,
      depart,
      arrivee,
      km: e.km,
      prix: e.prix,
      minutes: e.minutes,
      etat: 'demandee',
      chauffeur: null,
      note: null,
      demandeeA: heure(),
    };
    etat.courses.unshift(course);
    noter('client', `${nomClient} demande une moto : ${depart} → ${arrivee}`);
    prevenir();
    return course;
  }

  /** Le client annule avant qu'un chauffeur accepte. */
  function annulerCourse(id) {
    const c = trouver(id);
    if (!c || c.etat !== 'demandee') return null;
    c.etat = 'annulee';
    noter('client', `${c.nomClient} annule sa demande`);
    prevenir();
    return c;
  }

  /** Le client note le chauffeur à la fin. */
  function noterChauffeur(id, note) {
    const c = trouver(id);
    if (!c || c.etat !== 'terminee' || c.note) return null;
    c.note = note;
    noter('client', `${c.nomClient} donne ${note} étoiles à ${c.chauffeur.nom}`);
    prevenir();
    return c;
  }

  /* ============================================================
     Actions du CHAUFFEUR
     ============================================================ */

  /** Le chauffeur accepte la demande. */
  function accepterCourse(id, chauffeur) {
    const c = trouver(id);
    if (!c || c.etat !== 'demandee') return null;
    c.etat = 'acceptee';
    c.chauffeur = chauffeur;
    noter('chauffeur', `${chauffeur.nom} accepte la course de ${c.nomClient}`);
    prevenir();
    return c;
  }

  /** Le chauffeur refuse : la demande repart aux autres chauffeurs. */
  function refuserCourse(id, chauffeur) {
    const c = trouver(id);
    if (!c || c.etat !== 'demandee') return null;
    noter('chauffeur', `${chauffeur.nom} refuse : la demande reste ouverte`);
    prevenir();
    return c;
  }

  /** Fait avancer la course : en route → à bord → terminée. */
  function avancerCourse(id) {
    const c = trouver(id);
    if (!c) return null;
    const suite = { acceptee: 'en_route', en_route: 'a_bord', a_bord: 'terminee' };
    const prochain = suite[c.etat];
    if (!prochain) return null;
    c.etat = prochain;

    const messages = {
      en_route: `${c.chauffeur.nom} est en route vers ${c.depart}`,
      a_bord:   `${c.nomClient} est montée : direction ${c.arrivee}`,
      terminee: `Course terminée · ${c.prix.toLocaleString('fr-FR')} FCFA encaissés`,
    };
    noter('chauffeur', messages[prochain]);
    prevenir();
    return c;
  }

  /* ============================================================
     Actions de l'ADMIN
     ============================================================ */

  /* --- Le parcours d'admission, comme sur le vrai formulaire ---- */
  const ETAPES_INSCRIPTION = [
    { cle: 'identite',  nom: 'Votre identité',  detail: 'Nom, téléphone, quartier, expérience' },
    { cle: 'moto',      nom: 'Votre moto',      detail: 'Modèle, immatriculation, dossier de séparation' },
    { cle: 'documents', nom: 'Vos documents',   detail: 'Permis, identité, carte grise, assurance' },
    { cle: 'depot',     nom: 'Dépôt du dossier', detail: 'Le candidat certifie et dépose' },
  ];

  /** Les quatre pièces exigées pour rejoindre la flotte. */
  const PIECES = [
    { cle: 'permis',     nom: 'Permis de conduire' },
    { cle: 'identite',   nom: 'Pièce d\'identité' },
    { cle: 'carteGrise', nom: 'Carte grise' },
    { cle: 'assurance',  nom: 'Assurance' },
  ];

  /** Un chauffeur commence son inscription : il est à l'étape 1. */
  function commencerInscription({ nom, zone, moto, dossier }) {
    const insc = {
      id: 'i' + etat.suivant++,
      nom, zone, moto,
      dossier: Boolean(dossier),
      etape: 0,                 // index dans ETAPES_INSCRIPTION
      pieces: {},               // pièces cochées par le candidat
      etat: 'en_cours',         // en_cours → en_attente / equipement → valide
      inscritA: heure(),
    };
    etat.inscriptions.unshift(insc);
    noter('chauffeur', `${nom} commence son inscription — étape 1 : son identité`);
    prevenir();
    return insc;
  }

  /** Le candidat passe à l'étape suivante du formulaire. */
  function avancerInscription(id) {
    const i = etat.inscriptions.find(x => x.id === id);
    if (!i || i.etat !== 'en_cours') return null;

    // L'étape « documents » ne se franchit qu'avec les quatre pièces.
    if (ETAPES_INSCRIPTION[i.etape].cle === 'documents') {
      const fournies = PIECES.filter(p => i.pieces[p.cle]).length;
      if (fournies < PIECES.length) {
        noter('chauffeur',
          `${i.nom} ne peut pas continuer : ${PIECES.length - fournies} document(s) manquant(s)`);
        prevenir();
        return null;
      }
    }

    i.etape += 1;

    // Dernière étape franchie : le dossier part en vérification.
    if (i.etape >= ETAPES_INSCRIPTION.length) {
      i.etape = ETAPES_INSCRIPTION.length - 1;
      i.etat = i.dossier ? 'en_attente' : 'equipement';
      noter('chauffeur', i.dossier
        ? `${i.nom} dépose son dossier complet — en attente de vérification`
        : `${i.nom} dépose son dossier — moto à équiper avant publication`);
    } else {
      noter('chauffeur',
        `${i.nom} passe à l'étape ${i.etape + 1} : ${ETAPES_INSCRIPTION[i.etape].nom.toLowerCase()}`);
    }

    prevenir();
    return i;
  }

  /** Le candidat coche (ou décoche) une pièce à fournir. */
  function basculerPiece(id, cle) {
    const i = etat.inscriptions.find(x => x.id === id);
    if (!i) return null;
    i.pieces[cle] = !i.pieces[cle];
    const p = PIECES.find(x => x.cle === cle);
    noter('chauffeur', i.pieces[cle]
      ? `${i.nom} peut présenter : ${p.nom.toLowerCase()}`
      : `${i.nom} retire : ${p.nom.toLowerCase()}`);
    prevenir();
    return i;
  }

  /** Raccourci de démonstration : le candidat coche tout d'un coup. */
  function fournirToutesPieces(id) {
    const i = etat.inscriptions.find(x => x.id === id);
    if (!i) return null;
    PIECES.forEach(p => { i.pieces[p.cle] = true; });
    noter('chauffeur', `${i.nom} présente ses quatre documents`);
    prevenir();
    return i;
  }

  /** L'admin valide, refuse ou marque une moto comme équipée. */
  function traiterInscription(id, action) {
    const i = etat.inscriptions.find(x => x.id === id);
    if (!i) return null;

    if (action === 'valider') {
      i.etat = 'valide';
      noter('admin', `L'admin valide ${i.nom} : sa fiche est publiée`);
    } else if (action === 'refuser') {
      i.etat = 'refuse';
      noter('admin', `L'admin refuse ${i.nom}`);
    } else if (action === 'equipee') {
      i.dossier = true;
      i.etat = 'en_attente';
      noter('admin', `Moto de ${i.nom} équipée à l'atelier — à valider`);
    }
    prevenir();
    return i;
  }

  /* ============================================================
     Lecture
     ============================================================ */
  function trouver(id) {
    return etat.courses.find(c => c.id === Number(id)) || null;
  }

  function courses(filtre) {
    if (!filtre) return etat.courses.slice();
    return etat.courses.filter(c => filtre.includes(c.etat));
  }

  function inscriptions() { return etat.inscriptions.slice(); }
  function journal()      { return etat.journal.slice(); }

  /** Compteurs pour le panneau de l'admin. */
  function chiffres() {
    const t = etat.courses;
    const terminees = t.filter(c => c.etat === 'terminee');
    const notes = terminees.filter(c => c.note);
    return {
      demandees: t.filter(c => c.etat === 'demandee').length,
      enCours:   t.filter(c => ['acceptee', 'en_route', 'a_bord'].includes(c.etat)).length,
      terminees: terminees.length,
      revenus:   terminees.reduce((s, c) => s + c.prix, 0),
      note: notes.length
        ? (notes.reduce((s, c) => s + c.note, 0) / notes.length).toFixed(1)
        : '—',
      aValider: etat.inscriptions.filter(i => i.etat === 'en_attente').length,
      aEquiper: etat.inscriptions.filter(i => i.etat === 'equipement').length,
      enCoursInscription: etat.inscriptions.filter(i => i.etat === 'en_cours').length,
    };
  }

  /* --- Cycle de vie du simulateur ------------------------------ */
  function demarrer() { etat = neuf(); prevenir(); }
  function reinitialiser() { demarrer(); }
  function abonner(f) { abonnes.push(f); if (etat) f(etat); }

  demarrer();

  return {
    ETATS, ETAPES_INSCRIPTION, PIECES, estimer,
    demanderCourse, annulerCourse, noterChauffeur,
    accepterCourse, refuserCourse, avancerCourse,
    commencerInscription, avancerInscription, basculerPiece, fournirToutesPieces,
    traiterInscription,
    trouver, courses, inscriptions, journal, chiffres,
    reinitialiser, abonner,
  };
})();
