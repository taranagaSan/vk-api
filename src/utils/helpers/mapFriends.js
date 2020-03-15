const mapFriends = data => data.items.map(friend => ({
    firstName: friend.first_name,
    lastName: friend.last_name,
    parentId: data.id,
    id: friend.id,
    users: []
}))

export default mapFriends
