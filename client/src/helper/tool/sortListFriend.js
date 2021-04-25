export const sortListFriend = (users, thisUser) => {
    return users.sort((currentUser, nextUser) => {
        if (currentUser.id === thisUser.id) return -1
        if (nextUser.id === thisUser.id) return 1
        return 0
    })
}