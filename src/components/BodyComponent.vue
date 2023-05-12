<template>
	<div class="wrapper">
		<div class="header">
			<img src="../assets/dollar-sign.svg" alt="" />
			<h1>Twój Manager Finansów</h1>
		</div>
		<div class="main">
			<div class="box settings">
				<h2 class="title">Twoje saldo: {{ money }} zł</h2>
				<div class="buttons-box">
					<button class="button add" @click="handlePanel">
						<img src="../assets/plus.svg" alt="plus button" />
						Dodaj transakcje
					</button>
					<button class="button delete" @click="deleteAll">
						<img src="../assets/trash.svg" alt="trash button" />
						Usuń wszystko
					</button>
				</div>
			</div>
			<div class="box incoming">
				<h2 class="title">Przychody</h2>
				<div
					class="container incoming"
					v-for="(item, index) in incomingArray"
					:key="index">
					<div>{{ item.name }}</div>
					<div>{{ item.amount }}</div>
					<button
						class="delete-mark"
						@click="removeIncomingElement(index)"></button>
				</div>
			</div>
			<div class="box outcoming">
				<h2 class="title">Obciążenia</h2>
				<div
					class="container outocming"
					v-for="(item, index) in outcomingArray"
					:key="index">
					<div>{{ item.name }}</div>
					<div>{{ item.amount }}</div>
					<button
						class="delete-mark"
						@click="removeOutcomingElement(index)"></button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "BodyComponent",
	props: {
		incomingArray: {
			type: Object,
			default: () => ({}),
		},
		outcomingArray: {
			type: Object,
			default: () => ({}),
		},

		money: {
			type: Number,
		},
	},

	emits: [
		["handle-panel"],
		{ "remove-incoming-element": index => typeof index === Number },
		{ "remove-outcoming-element": index => typeof index === Number },
		["remove-all"],
	],

	setup(props, { emit }) {
		function handlePanel() {
			emit("handle-panel")
		}

		function removeIncomingElement(index) {
			emit("remove-incoming-element", index)
		}
		function removeOutcomingElement(index) {
			emit("remove-outcoming-element", index)
		}

		function deleteAll() {
			emit("remove-all")
		}

		return {
			handlePanel,
			removeIncomingElement,
			removeOutcomingElement,
			deleteAll,
		}
	},
}
</script>
<style lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100svh;
	justify-content: center;
	align-items: center;
}

.header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 2em;
	h1 {
		font-size: 1.8rem;
		text-align: center;
	}
}

.main {
	width: 90%;
	padding: 1em;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: #d3d3d3;
	border-radius: 10px;
	box-shadow: 0 0 15px #000;

	.box {
		width: 100%;
		min-height: 10svh;
		margin-top: 2em;
		.title {
			font-size: 1.6rem;
			text-align: center;
		}

		.buttons-box {
			margin-top: 2em;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			.button {
				padding: 10px;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				background: none;
				border: 1px solid #000;
				border-radius: 8px;
				font-weight: bold;
				cursor: pointer;

				img {
					padding-right: 10px;
				}
			}
		}
	}

	.container {
		margin: 1em;
		width: 90%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 1rem;

		div {
			width: 25%;
			text-align: center;
			font-weight: bold;
		}

		button {
			width: 30px;
			height: 30px;
			border: none;
			background: none;
			cursor: pointer;
		}

		.delete-mark {
			background-image: url("../assets/x.svg");
			background-repeat: no-repeat;
			background-position: center;
		}
	}

	.incoming {
		div {
			color: rgb(7, 194, 7);
		}
	}

	.outcoming {
		div {
			color: rgb(255, 26, 26);
		}
	}
}

@media (min-width: 576px) {
	.main {
		.box {
			.buttons-box {
				.button {
					width: 40%;
					transition: background-color 0.3s;
				}

				.add:hover {
					background-color: rgb(116, 255, 116);
				}

				.delete:hover {
					background-color: rgb(241, 123, 123);
				}
			}
		}
	}
}

@media (min-width: 768px) {
	.main {
		.box {
			.buttons-box {
				width: 80%;
				margin: 2em auto 0 auto;
				.button {
					width: 30%;
				}
			}
		}
	}
}
@media (min-width: 992px) {
	.main {
		.settings {
			order: 3;
		}
		flex-direction: row;
		.box {
			.buttons-box {
				width: 100%;
				margin: 2em auto 0 auto;
				.button {
					width: 45%;
				}
			}
		}
	}
}
</style>
