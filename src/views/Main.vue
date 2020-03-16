<template>
    <div class="container">
        <div class="level">
            <div class="tabs is-centered is-boxed is-large">
                <ul>
                    <li
                        :class="{'is-active': service === 'SearchUsers'}"
                        @click="changeService('SearchUsers')"
                    >
                        <a>Поиск пользователей</a>
                    </li>
                    <li
                        :class="{'is-active': service === 'UsersTable'}"
                        @click="changeService('UsersTable')"
                    >
                        <a>Список пользователей</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="level">
            <component
                :is="service"
                v-if="service !== null"
            />
        </div>
    </div>
</template>

<script>
import {
    SearchUsers,
    UsersTable
} from '@/components'

export default {
    name: 'Main',
    components: {
        SearchUsers,
        UsersTable
    },
    computed: {
        service: {
            get() {
                return this.$store.state.service
            },
            set(value) {
                this.$store.commit('setService', value)
            }
        }
    },
    methods: {
        changeService(name) {
            this.service = name
        }
    }
}
</script>
