<template>
    <main class="container">
        <b-button
            type="is-link"
            @click="goBack"
        >
            Назад
        </b-button>
        <div class="level">
            <div
                v-if="checkedFriend"
                class="level-left"
            >
                <h3 class="title">
                    Пользователи
                </h3>
                <ul class="vk-api-friend__list">
                    <li
                        class="vk-api-friend__list-item"
                        v-for="(user, index) in usersFromFriend"
                        :key="index"
                    >
                        <article class="card vk-api-user">
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
                        </article>
                    </li>
                </ul>
            </div>
            <div
                v-if="posts"
                class="level-right"
            >
                <h3 class="title">
                    Записи со стены
                </h3>
                <ul>
                    <li
                        v-for="(post, index) in posts"
                        :key="index"
                    >
                        <article>
                            <div class="card">
                                <div class="card-content">
                                    <div>
                                        {{ post.text }}
                                    </div>
                                    <div>
                                        Id поста - {{ post.id }}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Friend',
    computed: {
        checkedFriend() {
            return this.$store.state.checkedFriend
        },
        usersFromFriend() {
            return this.checkedFriend.users
        },
        posts() {
            return this.$store.state.friendPosts
        }
    },
    created() {
        this.$store.dispatch('getWallPosts', this.checkedFriend.id)
    },
    methods: {
        goBack() {
            this.$router.push({
                name: 'Main'
            })
        }
    }
}
</script>
