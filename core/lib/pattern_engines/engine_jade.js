/*
 * jade pattern engine for patternlab-node - v0.15.1 - 2015
 *
 * Geoffrey Pursell, Brian Muenzenmeyer, and the web community.
 * Licensed under the MIT license.
 *
 * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice.
 *
 */

/*
 * ENGINE SUPPORT LEVEL:
 *
 * Test
 *
 */

"use strict";

var Jade = require('jade');

var engine_jade = {
  engine: Jade,
  engineName: 'jade',
  engineFileExtension: '.jade',

  //Important! Needed for Jade compilation. Can't resolve paths otherwise.
  expandPartials: true,

  // regexes, stored here so they're only compiled once
  findPartialsRE: /include.*[\'\"]([\w-\/.]+)(?:.|\s+)*?[\'\"]/g,
  //findListItemsRE: /({{#( )?)(list(I|i)tems.)(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)( )?}}/g,

  // will be needed to cut out trailing line breaks to allow interpolation ( #[include 'atoms-image'] ). Currently not supported
  emptyTrailingLinesRE: /[\r\f]*$/g,

  // render it
  renderPattern: function renderPattern(template, data) {
    var compiled = Jade.compile(template);
    return compiled(data);
  },


  // find and return any {{> template-name }} within pattern
  findPartials: function findPartials(pattern) {
    var matches = pattern.template.match(this.findPartialsRE);
    return matches;
  },
  findPartialsWithStyleModifiers: function () {
    // TODO: make the call to this from oPattern objects conditional on their
    // being implemented here.
    return [];
  },

  // returns any patterns that match {{> value(foo:"bar") }} or {{>
  // value:mod(foo:"bar") }} within the pattern
  findPartialsWithPatternParameters: function () {
    // TODO: make the call to this from oPattern objects conditional on their
    // being implemented here.
    return [];
  },

  findListItems: function (pattern) {
    return [];
    // No list items in Jade (yet)
    // var matches = pattern.template.match(this.findListItemsRE);
    // return matches;
  },

  // given a pattern, and a partial string, tease out the "pattern key" and
  // return it.
  findPartialKey: function (partialString) {
    var partialKey = partialString.replace(this.findPartialsRE, '$1');

    return partialKey;
  }
};

module.exports = engine_jade;
