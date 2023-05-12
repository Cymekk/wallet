<template>
	<BodyComponent
		:incomingArray="incomingArray"
		:outcomingArray="outcomingArray"
		@handle-panel="handlePanel"
		@remove-incoming-element="removeIncomingElement"
		@remove-outcoming-element="removeOutcomingElement"
		@remove-all="deleteAll"
		:money="allMoney" />
	<teleport to="#popup">
		<PopupComponent
			@handle-panel="handlePanel"
			@push-to-array="pushToArray"
			:class="{ active: isVisible }"
			v-model:transactionName="transactionName"
			v-model:amountValue="amountValue"
			v-model:selectedValue="selectedValue"
			:error="isError" />
	</teleport>
</template>
<script>
import BodyComponent from "./BodyComponent.vue"
import PopupComponent from "./PopupComponent.vue"
import { ref, computed } from "vue"
import { useStore } from "vuex"

export default {
	name: "MainComponent",
	components: { BodyComponent, PopupComponent },

	setup() {
		const store = useStore()
		const incomingArray = computed(() => store.state.incomingArray)
		const outcomingArray = computed(() => store.state.outcomingArray)
		let allMoney = ref(0)
		let selectedValue = ref(0)
		let transactionName = ref("")
		let amountValue = ref("")
		let isVisible = ref(false)
		let isError = ref(false)

		store.commit("GET_INCOMING_ARRAY")
		store.commit("GET_OUTCOMING_ARRAY")
		checkMoney()

		function handlePanel() {
			selectedValue.value = 0
			transactionName.value = ""
			amountValue.value = ""

			if (isVisible.value == false) {
				isVisible.value = true
			} else {
				isVisible.value = false
			}
		}

		function pushToArray() {
			if (
				selectedValue.value !== 0 &&
				transactionName.value !== "" &&
				amountValue.value !== ""
			) {
				isError.value = false

				store.commit("PUSH_TO_ARRAY", {
					selectedValue,
					transactionName,
					amountValue,
				})
				storeIncomingArray()
				checkMoney()
				handlePanel()
			} else {
				isError.value = true
			}
		}

		function removeIncomingElement(index) {
			store.commit("REMOVE_INCOMING_ELEMENT", index)
			checkMoney()
		}
		function removeOutcomingElement(index) {
			store.commit("REMOVE_OUTCOMING_ELEMENT", index)
			checkMoney()
		}

		function deleteAll() {
			store.commit("REMOVE_ALL")
			storeIncomingArray()
			storeOutcomingArray()
			checkMoney()
		}

		function checkMoney() {
			let incomingSum = ref(0)
			let outcomingSum = ref(0)

			incomingArray.value.forEach(el => {
				incomingSum.value += parseFloat(el.amount)
				return incomingSum
			})
			outcomingArray.value.forEach(el => {
				outcomingSum.value += parseFloat(el.amount)
				return outcomingSum
			})

			allMoney.value = incomingSum.value - outcomingSum.value
			return allMoney
		}

		function storeIncomingArray() {
			store.commit("STORE_INCOMING_ARRAY")
		}

		function storeOutcomingArray() {
			store.commit("STORE_OUTCOMING_ARRAY")
		}

		return {
			allMoney,
			checkMoney,
			selectedValue,
			transactionName,
			amountValue,
			isVisible,
			handlePanel,
			pushToArray,
			isError,
			incomingArray,
			outcomingArray,
			removeIncomingElement,
			removeOutcomingElement,
			deleteAll,
			storeIncomingArray,
			storeOutcomingArray,
		}
	},
}
</script>
<style lang="scss"></style>
