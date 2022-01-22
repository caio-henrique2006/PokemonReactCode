import React from 'react';
import ReactDOM from 'react-dom';

// Classe responsável pela batalha:
class Battle extends React.Component {
	constructor(props){
		super(props);
		// Bindando ".this" nos componentes; 
		this.SlashAttack = this.SlashAttack.bind(this);
		this.FireAttack = this.FireAttack.bind(this);
		this.FlyAttack = this.FlyAttack.bind(this);
		this.StompAttack = this.StompAttack.bind(this);
		this.Turns = this.Turns.bind(this);
		this.EnemyAI = this.EnemyAI.bind(this);
		// Estados do Aliado e do inimigo;
		this.state = {
			allyStates: {life: 100},
			enemyStates: {life: 100},
			isAllyTurn: true,
		};
	}
	// Ataque Slash, 20 de dano e nenhum efeito;
	SlashAttack() {
		// Dicionário que guarda todos os efeitos desse ataque;
		const slashEffects = {damage: 20, effects: "none"};
		// Setando o dano causado a vida de "enemy";
		let slashNewLife = this.state.enemyStates.life - slashEffects.damage;
		this.setState({enemyStates: {life: slashNewLife}});
		return(
			// Trocando de turno;
			this.Turns()
		);
	}
	// Ataque Fire, 15 de dano e efeito "burn";
	FireAttack() {
		const fireEffects = {damage: 15, effects: "burn"};
		let fireNewLife = this.state.enemyStates.life - fireEffects.damage;
		this.setState({enemyStates: {life: fireNewLife}});
		return(
			this.Turns()
		);
	}
	// Ataque Fly, 30 de dano e nenhum efeito;
	FlyAttack() {
		const flyEffects = {damage: 30, effects: "none"};
		let flyNewLife = this.state.enemyStates.life - flyEffects.damage;
		this.setState({enemyStates: {life: flyNewLife}});
		return(
			this.Turns()
		);
	}
	// Ataque Stomp, 40 de dano e efeito "confuse";
	StompAttack() {
		const stompEffects = {damage: 40, effects: "confuse"};
		let stompNewLife = this.state.enemyStates.life - stompEffects.damage;
		this.setState({enemyStates: {life: stompNewLife}});
		return(
			this.Turns()
		);
	}

	// Sistema simples de troca de turnos:
	Turns() {	
		this.setState({isAllyTurn: false});
		console.log("Turno Inimigo...");
		this.EnemyAI();
		console.log("Turno Aliado..."); 
	}

	// Ataque inimigo, ocorre quando há troca de turno:
	EnemyAI() {
		const enemyEffects = {damage: 10};
		let enemyDamage = this.state.allyStates.life - enemyEffects.damage;
		this.setState({allyStates: {life: enemyDamage}});
		return(
			this.setState({isAllyTurn: true})
		)
	}

	// Renderização:
	render() {
		return(
			// Butões que executam os ataques Slash, Fire, Fly e Stomp
			<div className="allHUD">
				<div className="imageHUD">
				{
					//Imagens e status de vida
				}
					<p className="enemyLife">{this.state.enemyStates.life} HP</p>
					<p className="allyLife">{this.state.allyStates.life} HP</p>
					<img className="charmanderImagem" width="200px" src={require("./pokemonCharmander.jpg")} alt="Pókemon charmander do tipo fogo, imagem"/>
					<img className="bulbassaurImagem" width="200px" src={require("./pokemonBulbassaur.jpg")} alt="Pókemon bulbassaur do tipo grama, imagem"/>
				</div>
				<div className="attacksHUD">
				{
					// Butões que executam os ataques Slash, Fire, Fly e Stomp
				}	
					<button className="attacksButton" onClick = {this.SlashAttack}>
						Slash
					</button>

					<button className="attacksButton" onClick = {this.FireAttack}>
						Fire
					</button>

					<br/>

					<button className="attacksButton" onClick = {this.FlyAttack}>
						Fly
					</button>

					<button className="attacksButton" onClick = {this.StompAttack}>
						Stomp
					</button>
				</div>
				{
					// Ainda sem funcionar;
				}
				<div className="attackInfo">
					<p>Damage: 20</p>
					<p>Effect: "confuse"</p>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	// Executando a classes <Battle/>
	<Battle/>,
	document.getElementById("root")
);











