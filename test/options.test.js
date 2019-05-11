/* eslint-disable */

const { expect } = require('chai')
const {
    isGoodTyped,
    isOptionsAlltrue,
    regroupOptions,
    isAllKeyGoodTyped,
} = require('../src/extractors/options')
const logger = require('../src/utils/logger')

// disable error log provide by parsers for readability of tests. Comment if you want full logs
logger.pause()

describe('isGoodTyped()', function() {
    it('should return false when key is not good typed', function() {
        expect(isGoodTyped('componentsDir', { componentsDir: {} })).to.be.false
    })
    it('should return true when key is well typed', function() {
        expect(isGoodTyped('componentsDir', { componentsDir: 'asdasdklaj' })).to
            .be.true
    })
})

describe('isOptionsAlltrue()', function() {
    it('should return false because all found with required are not true', function() {
        const opt = {
            test1: { found: true },
            test2: { found: false },
            test3: {
                required: true,
                found: false,
            },
        }
        expect(isOptionsAlltrue(opt)).to.be.false
    })

    it('should return true because all found true', function() {
        const opt = {
            test1: { found: true },
            test2: { found: true },
        }
        expect(isOptionsAlltrue(opt)).to.be.true
    })
})

describe('regroupOptions()', function() {
    const resultNeeded = {
        test: 'asdasds',
        p: 'asdkjd',
    }

    const givenOpts = {
        test: 'asdasds',
    }

    it('should regroup to obj with the default values', function() {
        const options = {
            p: {
                default: 'asdkjd',
            },
        }
        expect(regroupOptions(givenOpts, options)).to.deep.equal(resultNeeded)
    })

    it('should regroup to obj with the default values', function() {
        const options = {
            p: 'asdkjd',
        }

        expect(regroupOptions(givenOpts, options)).to.not.deep.equal(
            resultNeeded,
        )
    })
})

describe('isAllKeyGoodTyped()', function() {
    it('should return false when one error about type', function() {
        const obj1 = {
            componentsDir: 'asdsddad',
            debug: 'asdsds',
            sideBarName: 'asda',
        }

        const obj2 = {
            componentsDir: 'asdsddad',
            debug: true,
            sideBarName: false,
        }
        expect(isAllKeyGoodTyped(obj1)).to.be.false
        expect(isAllKeyGoodTyped(obj2)).to.be.false
    })

    it('should return true', function() {
        const obj = {
            componentsDir: 'asdsddad',
            debug: true,
            sideBarName: 'asda',
        }

        expect(isAllKeyGoodTyped(obj)).to.be.true
    })
})
