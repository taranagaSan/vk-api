const getFriendsList = (checkedUsers) => {
    const list = []

    for (const user of checkedUsers) {
        user.friends.forEach((friend) => {
            const index = list.findIndex(item => item.id === friend.id)

            if (index === -1) {
                friend.users.push(user)
                list.push(friend)
            } else {
                list[`${index}`].users.push(user)
            }
        })
    }

    return list
}

export default getFriendsList
