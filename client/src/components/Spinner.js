import React, { useContext } from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import Modal from 'react-modal'
import SetupContext from '../contexts/SetupContext'

const Spinner = () => {
  const setupCtx = useContext(SetupContext)
  let openModal = JSON.parse(localStorage.getItem('dynamic-sync'))
  return (
    <div>
      {/* <Segment>
      <Dimmer active>
        <Loader>Syncing</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment> */}

      <Modal isOpen={openModal} onRequestClose={() => setupCtx.openRepoModal(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(155, 155, 155, 0.5)'
          },
          content: {
            borderRadius: '10px',
            top: '90px',
            border: 'none',
            width: '400px',
            margin: '0 auto',
            height: '108px',
            background: 'transparent'
          }
        }}
      >
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Syncing...</Loader>
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      </Modal>
    </div>
  )
}
export default Spinner