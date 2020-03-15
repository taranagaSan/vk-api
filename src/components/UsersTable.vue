<template>
    <div class="vk-api-users">
        <div>
            <table class="table is-stripe is-hoverable vk-api-table">
                <thead>
                    <tr>
                        <th
                            v-for="(header, index) in headers"
                            :key="index"
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <UserRow
                        v-for="(user, index) in users"
                        :key="index"
                        :user="user"
                        :index="index"
                    />
                </tbody>
            </table>
            <b-button
                type="is-info"
                @click="getUsersFriends"
            >
                Построить
            </b-button>
        </div>
        <FriendsList />
    </div>
</template>

<script>
import UserRow from './UserRow.vue'
import FriendsList from './FriendsList.vue'

export default {
    name: 'UsersTable',
    components: {
        UserRow,
        FriendsList
    },
    data: () => ({
        headers: [
            '',
            'Фамилия',
            'Имя',
            'Дата рождения',
            'Пол',
            'Кол-во друзей',
            'ID',
        ]
    }),
    computed: {
        users() {
            return this.$store.state.users
        }
    },
    methods: {
        getUsersFriends() {
            this.$store.commit('addUsersFriendsList')
        }
    }
}
</script>
