const getUsersCount = (friends) => {
    let count = 0

    friends.forEach((friend) => {
        if (friend.users.length > count) {
            count = friend.users.length
        }
    })

    return count
}

export default getUsersCount
