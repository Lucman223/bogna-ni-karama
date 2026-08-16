/* ============================================================
   BOGNA NI KARAMA · Version simple — données et écrans
   ------------------------------------------------------------
   Cette version est autonome : elle ne dépend pas des fichiers
   du site complet. Les chauffeurs sont les mêmes qu'ailleurs,
   mais recopiés ici pour que le dossier « simple » puisse être
   livré seul.

   ⚠️ Chauffeurs fictifs (démonstration).
   ============================================================ */

const SIMPLE = (() => {
  'use strict';

  const TELEPHONES = ['71 02 91 58', '71 87 27 74', '71 74 98 13'];

  /* Les quartiers, avec un repère visuel pour ceux qui lisent peu. */
  const QUARTIERS = [
    { nom: 'Badalabougou', ico: '🏠' },
    { nom: 'Hamdallaye',   ico: '🕌' },
    { nom: 'Lafiabougou',  ico: '🌳' },
    { nom: 'Magnambougou', ico: '🏫' },
    { nom: 'Kalaban Coura',ico: '🏬' },
    { nom: 'Sabalibougou', ico: '⚽' },
    { nom: 'Djélibougou',  ico: '🏥' },
    { nom: 'Faladié',      ico: '🚌' },
    { nom: 'Sogoniko',     ico: '🛒' },
    { nom: 'Missira',      ico: '🕌' },
    { nom: 'Banconi',      ico: '🏘️' },
    { nom: 'Niamakoro',    ico: '🌾' },
  ];

  const CHAUFFEURS = [
    { nom: 'Moussa Traoré',   tel: '76 12 34 56', zone: 'Badalabougou', moto: 'Djakarta 125' },
    { nom: 'Aliou Coulibaly', tel: '65 88 21 09', zone: 'Hamdallaye',   moto: 'Sanili 110'   },
    { nom: 'Ibrahim Keïta',   tel: '78 45 90 12', zone: 'Lafiabougou',  moto: 'Apsonic 125'  },
    { nom: 'Sekou Diarra',    tel: '73 20 55 41', zone: 'Magnambougou', moto: 'Djakarta 110' },
    { nom: 'Bakary Sangaré',  tel: '66 74 12 88', zone: 'Kalaban Coura',moto: 'Sanili 125'   },
    { nom: 'Oumar Cissé',     tel: '79 33 61 24', zone: 'Sabalibougou', moto: 'Apsonic 110'  },
    { nom: 'Adama Sidibé',    tel: '75 19 47 63', zone: 'Djélibougou',  moto: 'Djakarta 125' },
    { nom: 'Salif Doumbia',   tel: '77 62 10 95', zone: 'Sogoniko',     moto: 'Apsonic 125'  },
    { nom: 'Yacouba Camara',  tel: '69 41 27 58', zone: 'Missira',      moto: 'Djakarta 110' },
    { nom: 'Drissa Fofana',   tel: '72 84 36 17', zone: 'Banconi',      moto: 'Sanili 125'   },
  ];

  /** Échappe le HTML : les noms viennent de données, pas de code. */
  function ech(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function initiales(nom) {
    return nom.trim().split(/\s+/).slice(0, 2).map(m => m[0]).join('').toUpperCase();
  }

  const numero = (tel) => '223' + tel.replace(/\D/g, '');

  function parQuartier(zone) {
    return zone ? CHAUFFEURS.filter(c => c.zone === zone) : CHAUFFEURS;
  }

  return { TELEPHONES, QUARTIERS, CHAUFFEURS, parQuartier, ech, initiales, numero };
})();
