const sortByNames = (users) => {
    users.sort((a, b) => {
        const lastNameA = a.lastName.toLowerCase()
        const lastNameB = b.lastName.toLowerCase()
        const firstNameA = a.firstName.toLowerCase()
        const firstNameB = b.firstName.toLowerCase()

        if (lastNameA < lastNameB) {
            return -1
        }
        if (lastNameA > lastNameB) {
            return 1
        }

        if (firstNameA < firstNameB) {
            return -1
        }
        if (firstNameA > firstNameB) {
            return 1
        }

        return 0
    })

    return users
}

export default sortByNames
