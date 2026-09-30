/**
 * Testimonial postcards (photos, pre-rotated, transparent background), one set per language.
 * Only the French set ("fr") is wired in for now (homepage + WAOW 1 museum show postcards 1-3).
 * The other sets are kept here for the translation work: swap a page's language by pointing its
 * <img> at TESTIMONIALS[lang][n]. "de" has no postcard 5 yet. Keep these files out of any clean-up.
 */
const TESTIMONIALS = {
  fr: [1, 2, 3, 4, 5].map(function (n) { return "images/testi-" + n + "-fr.webp"; }),
  en: [1, 2, 3, 4, 5].map(function (n) { return "images/testi-" + n + "-en.webp"; }),
  de: [1, 2, 3, 4].map(function (n) { return "images/testi-" + n + "-de.webp"; })
};
