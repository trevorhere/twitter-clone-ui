import { getUser } from '../API'
import  { Status } from '../Models'
import moment from 'moment';


export const  buildFeed = ( userID: string | null) => {

    if(userID){
        let currUser = getUser(userID);
        // console.log('followers: \n', util.inspect(currUser?.getFollowers()));

        if(!currUser)
            return null;

        let followees = [...currUser.getFollowing()];
        let feed = [...currUser.getStatuses()];

        if(followees.length > 0){
            followees.map(followee => {
                followee.getStatuses().map(status => {
                    feed.push(status);
                })
            });
        };


        return feed.sort((b, a) => moment(a.created_at).diff(b.created_at));

    } else return null;
}

export const createStatus = (userID:string, message: string):void => {
    const user = getUser(userID);
    const newStatus = new Status(userID, user!.alias, message);
    user?.addStatus(newStatus);
}

export const aliasCStatus = () => {
    const user = getUser("aliasC");
    const newStatus = new Status("aliasC", "aliasC", "this is a new status from @aliasC");
    user?.addStatus(newStatus);
}