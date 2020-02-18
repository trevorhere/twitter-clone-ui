import { addUser } from '../../API'
import { User } from '../../Models'
import { buildFollowing } from '../Following'
import { follow } from '../util'

it("handles buildFollowing properly",() => {

    const user1 = new User("alias1","alias1","email1","password1", "picture");
    const user2 = new User("alias2","alias2","email2","password2", "picture");
    const user3 = new User("alias3","alias3","email3","password3", "picture");

    addUser(user1);
    addUser(user2);
    addUser(user3);

    const preBuiltFollowing = buildFollowing(user1.getID());
    expect(preBuiltFollowing?.length).toEqual(0);

    follow(user1.getID(), user2.getID());
    follow(user1.getID(), user3.getID());

    const postBuiltFollowing = buildFollowing(user1.getID());
    expect(postBuiltFollowing?.length).toEqual(2);
});

it("handles userID error properly when buildFollowing runs",() => {
    const preBuiltFollowing = buildFollowing("badID");
    expect(preBuiltFollowing).toEqual(null);
});