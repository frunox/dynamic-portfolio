import React, { useContext, Fragment } from "react";
import DevDataContext from "../../contexts/DevDataContext";
import { Grid, Image, Container } from 'semantic-ui-react'
import './style.css'

function AboutUser() {
    const devCtx = useContext(DevDataContext);
    return (
        <Fragment>
            <Container className="grid">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3>About {devCtx.state.fname} {devCtx.state.lname}</h3>
                            <p>
                                A web developer with the following skills:
                            </p>
                            <p>
                                Javascript, MongoDB, ExpressJS, React, Node, MySQL, Sequelize, HTML, CSS.
                            </p>
                            <p>
                                MERN Full-Stack Web Developer Certificate, with additional online coursework
                                in Java and Semantic-UI.
                            </p>
                            <p>See my:</p>
                            <p><a className="links" href={devCtx.state.resumeLink} rel="noopener noreferrer" target="_blank">Resume</a></p>
                            {/* <p><a className="links" href={devData.portfolioLink} rel="noopener noreferrer" target="_blank">Portfolio</a></p> */}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Image src='https://i.ibb.co/bW5z1PX/Vermilion-Sunset-1-crop.jpg' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src='https://i.ibb.co/10QLhFw/Waterfall-crop.jpg' />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <p> I am a former environmental engineer who has re-trained to become a web developer.  The process of project implementation relates directly to web design, in that careful planning and management are required to for successful completion.</p>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={11}>
                            <p>Having worked with firms with 2 to 80,000 employees, I am used to working both on my own and with multidisciplinary groups.  Self-learning is key to my development as an engineer.</p>
                            <p>My skills include technical writing, project management and computer-aided design.</p>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Image src='https://i.ibb.co/jz9q1Gb/IMGP9237.jpg' />
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src='https://i.ibb.co/WGLz1Ws/Loon-Close-Up.jpg' />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <p> I am also an avid photographer, concentrating on landscapes and wildlife. Some of my images are used in this application.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <p>*</p>
        </Fragment>
    )
}
export default AboutUser;