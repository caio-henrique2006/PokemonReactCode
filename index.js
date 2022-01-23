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
		this.handleAttacksInfo = this.handleAttacksInfo.bind(this);
		// Estados do Aliado e do inimigo;
		this.state = {
			allyStates: {life: 100},
			enemyStates: {life: 100},
			isAllyTurn: true,
			info: {damage: 0, effects: "none"},
		};
		this.allAttackEffects = {
			slashAttack: {damage: 20, effects: "none"},
			fireAttack: {damage: 15, effects: "burn"},
			flyAttack: {damage: 30, effects: "none"},
			stompAttack: {damage: 40, effects: "confuse"}
		};
	}

	SlashAttack() {
		let slashNewLife = this.state.enemyStates.life - this.allAttackEffects.slashAttack.damage;
		this.setState({enemyStates: {life: slashNewLife}});
		return(
			// Trocando de turno;
			this.Turns()
		);
	}
	// Ataque Fire, 15 de dano e efeito "burn";
	FireAttack() {
		let fireNewLife = this.state.enemyStates.life - this.allAttackEffects.fireAttack.damage;
		this.setState({enemyStates: {life: fireNewLife}});
		return(
			this.Turns()
		);
	}
	// Ataque Fly, 30 de dano e nenhum efeito;
	FlyAttack() {
		let flyNewLife = this.state.enemyStates.life - this.allAttackEffects.flyAttack.damage;
		this.setState({enemyStates: {life: flyNewLife}});
		return(
			this.Turns()
		);
	}
	// Ataque Stomp, 40 de dano e efeito "confuse";
	StompAttack() {
		let stompNewLife = this.state.enemyStates.life - this.allAttackEffects.stompAttack.damage;
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

	// Componente que lida com o evento mouseMove:
	handleAttacksInfo(whatAttackButton) {
		const self = this.allAttackEffects;
		// Modifica o state info em cada caso:
		if(whatAttackButton === "slash") {
			this.setState({info: {damage: self.slashAttack.damage, 
			effects: self.slashAttack.effects}});
		}else if(whatAttackButton === "fire") {
			this.setState({info: {damage: self.fireAttack.damage, 
				effects: self.fireAttack.effects}});
		}else if(whatAttackButton === "fly") {
			this.setState({info: {damage: self.flyAttack.damage, 
				effects: self.flyAttack.effects}});
		}else if(whatAttackButton === "stomp") {
			this.setState({info: {damage: self.stompAttack.damage, 
				effects: self.stompAttack.effects}});
		}
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
					<button className="attacksButton" onClick = {this.SlashAttack} 
							onMouseMove = {() => this.handleAttacksInfo("slash")}>
						Slash
					</button>

					<button className="attacksButton" onClick = {this.FireAttack}
							onMouseMove = {() => this.handleAttacksInfo("fire")}>
						Fire
					</button>

					<br/>

					<button className="attacksButton" onClick = {this.FlyAttack}
							onMouseMove = {() => this.handleAttacksInfo("fly")}>
						Fly
					</button>

					<button className="attacksButton" onClick = {this.StompAttack}
							onMouseMove = {() => this.handleAttacksInfo("stomp")}>
						Stomp
					</button>
				</div>
				<div id="attackInfo">
				<p>Damage: {this.state.info.damage}<br/>Effects: {this.state.info.effects}</p>
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











