<template>
    <div class="vk-api-center">
        <header class="vk-api-header">
            <div class="vk-api-search">
                <div class="vk-api-search__input">
                    <b-field label="Поиск пользователя">
                        <b-input
                            v-model="id"
                            placeholder="Введите ID"
                        />
                    </b-field>
                </div>
                <div class="vk-api-search__button">
                    <b-button
                        type="is-primary"
                        :loading="isLoading"
                        @click="findUserById"
                    >
                        Поиск
                    </b-button>
                </div>
            </div>
        </header>
        <article
            class="card vk-api-user"
            v-if="user"
        >
            <div class="card-content">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Фамилия</td>
                            <td>{{ user.lastName }}</td>
                        </tr>
                        <tr>
                            <td>Имя</td>
                            <td>{{ user.firstName }}</td>
                        </tr>
                        <tr>
                            <td>Дата рождения</td>
                            <td>{{ user.bdate }}</td>
                        </tr>
                        <tr>
                            <td>Пол</td>
                            <td>{{ user.sex }}</td>
                        </tr>
                        <tr>
                            <td>Друзей</td>
                            <td>{{ user.freindsCount }}</td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{{ user.id }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <footer class="card-footer">
                <div class="card-footer-item">
                    <b-button
                        v-if="!inList"
                        type="is-primary"
                        @click="addUser"
                    >
                        Добавить
                    </b-button>
                    <b-button
                        v-else
                        type="is-danger"
                        @click="removeUser"
                    >
                        Удалить
                    </b-button>
                </div>
            </footer>
        </article>
    </div>
</template>

<script>
export default {
    name: 'SearchUsers',
    computed: {
        id: {
            get() {
                return this.$store.state.userId
            },
            set(value) {
                this.$store.commit('setUserId', Number(value))
            }
        },
        isLoading() {
            return this.$store.state.isLoading
        },
        user() {
            return this.$store.state.user
        },
        inList() {
            return this.user.inList
        }
    },
    methods: {
        findUserById() {
            this.$store.dispatch('findUserById')
        },
        addUser() {
            this.$store.commit('addUser', this.user)
        },
        removeUser() {
            this.$store.commit('removeUser', this.user)
        }
    }
}
</script>
