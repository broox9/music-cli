const { parseLine, start } = require('./music')

jest.mock('./handlers', () => ({
  handleQuit: jest.fn(),
  handleAdd: jest.fn(),
  handlePlay: jest.fn(),
  handleShow: jest.fn()
}))

jest.genMockFromModule('./helpers')
const { handleShow } = require('./handlers')

describe('music-cli', () => {

  describe('handler functions', () => {
    test('parseLine', () => {
      expect(parseLine.constructor).toBeDefined()
    })
  })

  describe('handlers', () => {
    test('handleShow', () => {
      parseLine('show all "Teddy Riley"')
      expect(handleShow).toHaveBeenCalled()
      expect(handleShow).toHaveBeenCalledWith(
        'show', 'all', ['"Teddy Riley"']
      )
    })
  })
})

/** @TODO: finish the tests */
/** @TODO: fix the node process issue when running tests */