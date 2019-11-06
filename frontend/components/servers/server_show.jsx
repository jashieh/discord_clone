import React from 'react';
import ChannelIndexContainer from '../channels/channel_index_container';
import Modal from '../modal/modal';

import { withRouter } from 'react-router-dom'



class ServerShow extends React.Component {
    constructor(props) {
        super(props);
        this.leaveServer = this.leaveServer.bind(this);
    }

    componentDidMount() {
        this.props.fetchServer(this.props.match.params.serverId)
            .then(()=>{}, ()=>{
                this.props.history.push('/home');
        });
        
        let collapse = document.getElementsByClassName('channels-header');
        let arrow = document.querySelector('.channels-arrow');
        for(let i = 0; i < collapse.length; i++) {
            collapse[i].addEventListener('click', function(e) {
                this.nextElementSibling.classList.toggle('collapse-item');
                arrow.classList.toggle('rotated');
            });
        }
    }

    leaveServer() {
        // this.props.leaveServer(this.props.match.params.serverId);
        this.props.leaveServer(this.props.server.id);
        this.props.history.push('/home');
    }

    render() {
        let serverName = "";
        let inviteUrl = "";
        let modal = null;
        if (this.props.server) {
            serverName = this.props.server.server_name;
            inviteUrl = this.props.server.invite_url;
            modal = <Modal serverId={this.props.server.id}/>;
        } else {
            serverName = "Server does not exist";
        }

        return(
            <div className="single-server-show">
                { modal }
                <div className="single-server-header-container">
                    <div className="single-server-header-name">
                        {serverName}
                    </div>
                </div>
                <div className="channel-list">
                    <ul className="channels">
                        <div className="channels-container">
                            <div className="channels-header">
                                <div className="channels-dropdown">
                                    <div className="channels-arrow">
                                        >
                                    </div>
                                    <div className="channels-header-element">
                                        TEXT CHANNELS
                                    </div>
                                </div>
                                <div className="channels-header-create-button">
                                    { this.props.otherForm }
                                </div>
                            </div>
                            <ChannelIndexContainer />
                        </div>
                    </ul>

                    
{/* 
                    <ul className="channels">
                        <div className="channels-container">
                            <label className="channel-header">
                                VOICE CHANNELS
                            </label>
                        </div>
                    </ul> */}

                </div>
                <button onClick={this.leaveServer}>Leave Server</button>
                
                <div className="footer-util-container">
                    <div className="user-icon-container">
                        <div className="user-icon">
                            user icon 
                        </div>
                    </div>
                    <div className="footer-user-info">
                        <div className="footer-user-name">
                            {this.props.currentUser.username}
                        </div>
                        <div className="footer-user-id">
                            #{this.props.currentUser.id}
                        </div>
                    </div>
                    <div className="footer-button-container">
                        <button onClick={this.props.logout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ServerShow);