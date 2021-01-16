// *** CURRENTLY UNUSED *** //
import React from 'react'
import { Button, Header, Modal, Grid, Segment, Form } from 'semantic-ui-react'

const DevModal = () => (
    <div>
        <Container>
            <Modal
                className="repoModal"
                open={rowClick >= 0}
                size="tiny"
            >
                <Modal.Header className="modalHeader">Update Repository:  <span>{state.repoName}</span></Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleSubmit}>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                placeholder={state.firstName}
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                placeholder={state.lastName}
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder={state.email}
                                type="email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        {/* LinkedIn */}
                        <div className="linkedInLink">
                            <label htmlFor="linkedInLink">LinkedIn link</label>
                            <input
                                placeholder={state.linkedInLink}
                                type="text"
                                name="linkedInLink"
                                onChange={handleChange}
                            />
                        </div>
                        {/* LinkedIn */}
                        {/* resume */}
                        <div className="resumeLink">
                            <label htmlFor="resumeLink">Resume Link</label>
                            <input
                                placeholder={state.resumeLink}
                                type="text"
                                name="resumeLink"
                                onChange={handleChange}
                            />
                        </div>
                        {/* resume */}
                        {/* portfolio */}
                        <div className="portfolioLink">
                            <label htmlFor="portfolioLink">Portfolio Link</label>
                            <input
                                placeholder={state.portfolioLink}
                                type="text"
                                name="portfolioLink"
                                onChange={handleChange}
                            />
                        </div>
                        {/* portfolio */}
                        <div className="createAccount">
                            <button type="submit">Change Settings</button>
                        </div>
                    </form>
                    <Button color="teal" fluid active
                        onClick={e => handleClick()}>
                        Close
                </Button>
                </Modal.Content>
            </Modal>
        </Container>
    </div>

)

export default DevModal