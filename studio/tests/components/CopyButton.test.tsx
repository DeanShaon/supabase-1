import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import CopyButton from 'components/ui/CopyButton'
import { render } from 'tests/helpers'

test('shows copied text', async () => {
    const callback = jest.fn()
  render(<CopyButton text="some text" onClick={callback} />)
  userEvent.click(await screen.findByText('复制'))
  await screen.findByText('已复制')
  expect(callback).toBeCalled()
})
