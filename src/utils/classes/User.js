class User {
    constructor(user) {
        this.firstName = user.first_name || ''
        this.lastName = user.last_name || ''
        this.sex = user.sex === 2
            ? 'Мужской'
            : 'Женский'
        this.id = Number(user.id) || ''
        this.bdate = user.bdate || ''
        this.freindsCount = user.counters.friends || 0
        this.inList = false
        this.isChecked = false
        this.friends = user.friends || []
    }
}

export default User
