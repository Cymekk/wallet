<template>
	<div class="add-transaction-panel">
		<div class="panel">
			<h2>Dodaj Transakcje</h2>
			<select
				@change="e => $emit('update:selectedValue', e.target.value)"
				:value="selectedValue">
				<option value="0" disabled selected>wybierz opcje</option>
				<option value="1">Przychody</option>
				<option value="2">Obciążenia</option>
			</select>

			<input
				type="text"
				placeholder="Wpisz tytuł transakcji"
				@input="e => $emit('update:transactionName', e.target.value)"
				:value="transactionName" />
			<input
				type="number"
				placeholder="Wpisz kwotę"
				@input="e => $emit('update:amountValue', e.target.value)"
				:value="amountValue" />
			<p class="error" v-if="error">
				Musisz wybrać przychód albo obciążenie, dodatkowo tytuł oraz kwota
				transakcji nie mogą być puste
			</p>
			<div class="buttons-box">
				<button class="add" @click="pushToArray">Dodaj transkacje</button>
				<button class="cancel" @click="handlePanel">Anuluj</button>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from "vue"

export default {
	name: "PopupComponent",
	emits: ["handle-panel"],

	props: {
		selectedValue: {
			type: Number,
		},

		transactionName: {
			type: String,
		},
		amountValue: {
			type: String,
		},

		error: {
			type: Boolean,
			default: false,
		},
	},

	setup(props, { emit }) {
		let selectValue = ref(0)

		function handlePanel() {
			emit("handle-panel")
		}

		function onChange(e) {
			console.log(e.target)
			console.log(selectValue.value)
		}

		function pushToArray() {
			emit("push-to-array")
		}

		return { handlePanel, onChange, pushToArray, selectValue }
	},
}
</script>
<style lang="scss">
.add-transaction-panel {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: -150%;
	transition: top 0.5s;

	.panel {
		padding: 2em;
		width: 80%;
		height: 50%;
		background-color: #d3d3d3;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		h2 {
			text-align: center;
			font-size: 1.4rem;
		}

		select,
		input,
		button {
			padding: 10px 20px;
			border: none;
			outline: none;
			border-radius: 8px;
		}

		button {
			cursor: pointer;
		}
		.error {
			text-align: center;
			font-size: 0.7rem;
			font-weight: bold;
			color: rgb(255, 59, 59);
		}

		.buttons-box {
			display: flex;
			flex: row;
			justify-content: space-around;

			.add {
				background-color: rgb(116, 255, 116);
				font-weight: bold;
			}

			.cancel {
				font-weight: bold;
				background-color: rgb(241, 123, 123);
			}
		}
	}
}

.active {
	top: 0;
}

@media (min-width: 992px) {
	.add-transaction-panel {
		.panel {
			width: 60%;
		}
	}
}

@media (min-width: 1200px) {
	.add-transaction-panel {
		.panel {
			width: 50%;
		}
	}
}
</style>
