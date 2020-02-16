
import { User } from '../Models/User'
import { Status } from '../Models/Status'

import { addUser, addStatus, getUsers, getStatuses } from '../API'

let currentUserID; 

export const signup = async (email:string, alias:string, password:string) => {

    if(!goodAlias(alias)){
        return null;
    }


    const newUser = new User(alias, alias, email, password, "https://i.imgur.com/ylyowqj.png");
    addUser(newUser);
    currentUserID = newUser.getID();

    const StatusX1 = new Status(alias, alias,`this is status 1 for ${alias}`);
    const StatusX2 = new Status(alias,alias, `this is status 2 for ${alias}`);
    const StatusX3 = new Status(alias,alias,`this is status 3 for ${alias}`);

    addStatus(StatusX1);
    addStatus( StatusX2);
    addStatus(StatusX3);

    return currentUserID;
}

export const signin =  async (alias:string, password:string) => {
    console.log('signing in');
    let currentUserArr = getUsers().filter(user => {
        return (user.alias === alias && user.password === password)
    });

    if(currentUserArr.length < 1){
        console.log('no user found');
        currentUserID = null;
        return null;;

    } else {
        console.log('returning id: ', currentUserArr[0].getID())
        currentUserID = currentUserArr[0].getID();
        return currentUserID;
    }
}

export const signout = () => {
    currentUserID = null;
    console.log('signing out');
    console.log('current user ID: ', currentUserID);
    // window.location.reload();
}

export const getCurrentUserID = (): string | null => {
    if(currentUserID != null){
        return currentUserID;
    } else {
        return null;
    }
}

export const goodAlias = (alias) => {

    let result = true;

    if(!alias.match(/^[a-z]+$/i)){
        console.log('failed on 2');
        result = false;
    }

    if(alias.length > 50){
        console.log('failed on 3');
        result = false;
    }

    let existing_aliases = getUsers().filter(user => {
        return(alias === user.alias)
    });

    if(existing_aliases.length > 0){
        result = false;
    }

    return result;
}



