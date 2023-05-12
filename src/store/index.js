import { createStore } from "vuex"

const store = createStore({
	state: {
		incomingArray: [],
		outcomingArray: [],
	},
	getters: {},
	mutations: {
		PUSH_TO_ARRAY(state, { selectedValue, transactionName, amountValue }) {
			let obj = { name: transactionName.value, amount: amountValue.value }

			if (selectedValue.value == 1) {
				state.incomingArray.push(obj)
			} else {
				state.outcomingArray.push(obj)
			}
		},

		REMOVE_INCOMING_ELEMENT(state, index) {
			state.incomingArray.splice(index, 1)
		},

		REMOVE_OUTCOMING_ELEMENT(state, index) {
			state.outcomingArray.splice(index, 1)
		},

		REMOVE_ALL(state) {
			state.incomingArray = []
			state.outcomingArray = []
		},

		STORE_INCOMING_ARRAY(state) {
			localStorage.setItem("incomingArray", JSON.stringify(state.incomingArray))
		},

		STORE_OUTCOMING_ARRAY(state) {
			localStorage.setItem(
				"outcomingArray",
				JSON.stringify(state.outcomingArray)
			)
		},

		GET_INCOMING_ARRAY(state) {
			state.incomingArray = JSON.parse(
				localStorage.getItem("incomingArray") || "[]"
			)
		},
		GET_OUTCOMING_ARRAY(state) {
			state.outcomingArray = JSON.parse(
				localStorage.getItem("outcomingArray") || "[]"
			)
		},
	},
	actions: {},
})

export default store
