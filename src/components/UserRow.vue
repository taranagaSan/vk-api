<template>
    <tr :class="{'is-selected':isChecked}" >
        <td>
            <b-checkbox v-model="isChecked"/>
        </td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.bdate }}</td>
        <td>{{ user.sex }}</td>
        <td>{{ user.freindsCount }}</td>
        <td>{{ user.id }}</td>
    </tr>
</template>

<script>
export default {
    name: 'UserRow',
    props: {
        user: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            required: true
        }
    },
    computed: {
        isChecked: {
            get() {
                return this.$store.state.users[this.index].isChecked
            },
            set(value) {
                this.$store.commit('setIsChecked', {
                    index: this.index,
                    isChecked: value
                })
            }
        }
    }
}
</script>
