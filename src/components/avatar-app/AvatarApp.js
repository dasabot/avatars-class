import React from 'react';
import Button from '../button/Button';
import './AvatarApp.css';
import axios from 'axios';
import { debounce } from 'lodash';
import Avatar from '../avatar/Avatar';
import AddAvatarBtn from '../add-avatar-btn/AddAvatarBtn';

class AvatarApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            renderAvatars: []
        }
        this.newAvatars = [];
        this.avatarsUsed = 0;
    }

    // () => this.setState({ count: this.state.count + 1 })

    getAvatars = async () => {
        let response = await axios.get('https://tinyfac.es/api/data?limit=50&quality=0')
        return response.data;
    }

    getNewAvatars = async (count = 1) => {
        const res = [];
        while (count) {
            if (this.newAvatars.length <= this.avatarsUsed) {
                this.newAvatars = await this.getAvatars();
                this.avatarsUsed = 0;
            }
            res.push(this.newAvatars[this.avatarsUsed++]);
            count--
        }
        return res
    }

    addAvatar = async () => {
        this.setState({ renderAvatars: this.state.renderAvatars.concat(await this.getNewAvatars()) })
    }

    changeAvatar = async (e) => {
        e.currentTarget?.childNodes[1]?.setAttribute("src", `${(await this.getNewAvatars())[0].url}`)
    }

    refresh = async () => {
        this.setState({ renderAvatars: (await this.getNewAvatars(this.state.renderAvatars.length)) })
    }

    render() {
        return <div className='container'>
            {this.state.renderAvatars.map(a => <Avatar key={a.id} onClickFunction={this.changeAvatar} avatarUrl={a.url} avatarId={a.id}></Avatar>)}
            <AddAvatarBtn onClickFunction={this.addAvatar}></AddAvatarBtn>
            <Button onClickFunction={this.refresh} buttonText="refresh all"></Button>
        </div>
    }
}

export default AvatarApp;

