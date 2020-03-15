<template>
    <aside
        class="panel vk-api-friends"
        v-if="!isEmpty"
    >
        <p class="panel-heading">
            Список друзей
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input
                    v-model="search"
                    class="input"
                    type="text"
                    placeholder="Поиск"
                >
            </p>
        </div>
        <div :class="{'vk-api-friends__list': filteredItems.length > 12}">
            <a
                class="panel-block"
                v-for="(friend, index) in filteredItems"
                :key="index"
                :style="{opacity: `${friend.users.length / maxFriends}`}"
                @click="goToFriend(friend)"
            >
                {{ friend.lastName }} {{ friend.firstName }}
            </a>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'FriendsList',
    data: () => ({
        search: '',
    }),
    computed: {
        friendsList() {
            return this.$store.state.usersFriendsList
        },
        filteredItems() {
            return this.friendsList.filter(item => item.lastName
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1)
        },
        isEmpty() {
            return !this.friendsList.length
        },
        maxFriends() {
            return this.$store.state.maxCount
        }
    },
    methods: {
        goToFriend(data) {
            this.$store.commit('setCheckedFriend', { ...data })
            this.$router.push(`friend/${data.id}`)
        }
    }
}
</script>
