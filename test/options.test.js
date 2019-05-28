/* eslint-disable */

const { expect } = require('chai')
const { checkTemplates, extractOptions, options } = require('../src/extractors/options')
const logger = require('../src/utils/logger')

// disable error log provide by parsers for readability of tests. Comment if you want full logs
logger.pause()

describe('componentsDir', function() {
    it('should return false when componentsDir key is not present', function() {
        expect(checkTemplates(options)).to.be.false
    })
})

describe('templatesGoodType', function() {
    it('all templates should be functions', function() {
        expect(checkTemplates(options.templates)).to.be.true
    })

    it('should return false', function() {
        const obj = {
            components: {
                ...options.templates.components,
                index: ''
            }
        }

        expect(checkTemplates(obj)).to.be.false;
    })
})
