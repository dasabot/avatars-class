import React from 'react';
import Button from '../button/Button';
import './AvatarApp.css'

export default class AvatarApp extends React.Component {
    constructor() {
        super()
        let newAvatars = [];
        let avatarsUsed = 0;
    }

    // async function getAvatars() {
    //     let response = await axios.get('https://tinyfac.es/api/data?limit=50&quality=0')
    //     return response.data
    //   }

    render() {
        return <Button buttonText='button'></Button>
    }
}