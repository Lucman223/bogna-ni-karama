/* ============================================================
   BOGNA NI KARAMA · Comportements partagés
   ============================================================ */

(() => {
  'use strict';

  /* --- Menu mobile --------------------------------------------- */
  document.addEventListener('click', (e) => {
    const bascule = e.target.closest('.nav-bascule');
    if (bascule) {
      const nav = document.getElementById('nav-principale');
      if (!nav) return;
      const ouvert = nav.classList.toggle('ouvert');
      bascule.setAttribute('aria-expanded', String(ouvert));
      return;
    }
    // Fermer en cliquant ailleurs
    const nav = document.getElementById('nav-principale');
    if (nav && nav.classList.contains('ouvert') && !e.target.closest('#nav-principale')) {
      nav.classList.remove('ouvert');
      const b = document.querySelector('.nav-bascule');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  });

  /* --- Apparition au défilement --------------------------------
     On n'active l'animation que si IntersectionObserver existe.
     Sinon on ne touche à rien : le contenu reste visible (CSS). */
  const cibles = document.querySelectorAll('.reveal');
  if (cibles.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-anime');

    const obs = new IntersectionObserver((entrees) => {
      entrees.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('dedans'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    cibles.forEach(c => obs.observe(c));

    // Filet de sécurité : si au bout de 3 s un élément n'a jamais été
    // révélé (onglet en arrière-plan, observateur muet), on l'affiche.
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.dedans)').forEach(c => c.classList.add('dedans'));
    }, 3000);
  }

  /* --- Année courante dans le pied de page --------------------- */
  document.querySelectorAll('[data-annee]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });
})();

/* ============================================================
   Fonctions partagées (portée globale, utilisées par les pages)
   ============================================================ */

/** Échappe le HTML — indispensable : les noms viennent d'un formulaire. */
function echapper(valeur) {
  return String(valeur ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/** Avatar : photo envoyée, sinon initiales sur fond vert. */
function avatarHtml(chauffeur) {
  if (chauffeur.photo) {
    return `<img class="avatar" src="${echapper(chauffeur.photo)}" alt="Photo de ${echapper(chauffeur.nom)}">`;
  }
  return `<div class="avatar" aria-hidden="true">${echapper(BNK.initiales(chauffeur.nom))}</div>`;
}

/** Étoiles de notation en texte. */
function etoilesHtml(note) {
  if (!note) return '<span class="courses">Nouveau chauffeur</span>';
  const pleines = Math.round(note);
  return `<span class="etoiles" aria-hidden="true">${'★'.repeat(pleines)}${'☆'.repeat(5 - pleines)}</span>
          <strong>${note.toFixed(1)}</strong>`;
}

/** Étiquette de statut. */
function etiquetteHtml(statut) {
  const s = BNK.STATUTS[statut];
  if (!s) return '';
  return `<span class="etiquette et-${s.couleur}">${s.libelle}</span>`;
}

/** Bandeau « dossier de séparation » — l'atout de Bogna Ni Karama. */
function dossierHtml(c) {
  if (!c.dossier) return '';
  return `<p class="ruban-dossier" title="Un dossier sépare le conducteur du passager">
            <span aria-hidden="true">🛡️</span> Dossier de séparation
          </p>`;
}

/** Carte publique d'un chauffeur validé. */
function carteChauffeurHtml(c) {
  const wa = BNK.telWhatsapp(c.tel);
  return `
    <article class="carte-chauffeur reveal">
      <div class="chauffeur-tete">
        ${avatarHtml(c)}
        <div>
          <h3>${echapper(c.nom)}</h3>
          <p class="chauffeur-zone">📍 ${echapper(c.zone)}</p>
        </div>
      </div>
      ${dossierHtml(c)}
      <div class="chauffeur-infos">
        <div class="info-bloc"><span>Moto</span><strong>${echapper(c.moto)}</strong></div>
        <div class="info-bloc"><span>Expérience</span><strong>${c.experience} an${c.experience > 1 ? 's' : ''}</strong></div>
      </div>
      <div class="note">${etoilesHtml(c.note)}
        ${c.courses ? `<span class="courses">· ${c.courses} courses</span>` : ''}
      </div>
      <div class="chauffeur-actions">
        <a class="btn btn-principal btn-petit" href="tel:+223${c.tel.replace(/\D/g, '')}">📞 Appeler</a>
        <a class="btn btn-contour btn-petit" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
      <a class="action-verrouillee" href="offres.html"
         title="Disponible à partir de la formule Plateforme">
        <span aria-hidden="true">🔒</span> Réserver en ligne
        <span class="mini-formule">Formule Plateforme</span>
      </a>
    </article>`;
}
