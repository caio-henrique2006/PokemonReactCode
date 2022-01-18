import React from 'react';
import ReactDOM from 'react-dom';

// Classe responsável pela batalha:
class Battle extends React.Component {
	constructor(props){
		super(props);
		this.AllyMoves = this.AllyMoves.bind(this);
		// Estados do Aliado e do inimigo;
		this.state = {
			allyStates: [{life: 100}],
			enemyStates: [{life: 100}]
		};
	}
	// Ataques do Aliado:
	AllyMoves() {
		// Dano do ataque:
		const SlashAttack = 20;
		// Setando a nova vida:
		const GivenDamage = this.state.enemyStates[0].life - SlashAttack;
		this.setState({enemyStates: [{life: GivenDamage}]})
		return(
			console.log("Ally deal " + SlashAttack + " of damage in Enemy"),
			console.log(this.state.enemyStates[0].life)
		);
	}
	// Renderização:
	render() {
		return(
			<button onClick = {this.AllyMoves}>
			 Attack
			</button>
		);
	}
}

ReactDOM.render(
	<Battle/>,
	document.getElementById("root")
);